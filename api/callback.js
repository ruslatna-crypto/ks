// Vercel Serverless Function: GitHub OAuth Callback endpoint for Decap CMS

const TRUSTED_ORIGINS = [
  'https://www.infraks.uz',
  'https://infraks.uz',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000'
];

export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.GITHUB_CLIENT_ID || process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET || process.env.OAUTH_CLIENT_SECRET;

  if (!code) {
    return res.status(400).send('Missing authorization code from GitHub.');
  }
  if (!clientId || !clientSecret) {
    return res.status(500).send('OAuth server configuration error: Missing credentials.');
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    });

    const data = await tokenResponse.json();

    if (data.error) {
      return res.status(400).send(`GitHub OAuth Error: ${data.error_description || data.error}`);
    }

    const token = data.access_token;
    const content = JSON.stringify({
      token,
      provider: 'github'
    });

    // Safely serialize for injection into inline <script>
    const serializedContent = JSON.stringify(content)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e');

    const serializedOrigins = JSON.stringify(TRUSTED_ORIGINS);

    // Post message back to Decap CMS window with strict origin & source checks
    const script = `
      <!doctype html>
      <html>
        <head><title>Authentication Success</title></head>
        <body>
          <script>
            (function() {
              var trustedOrigins = ${serializedOrigins};
              var expectedOrigin = window.location.origin;

              // 1. Validate that the current window is on a trusted origin (exact match)
              if (!trustedOrigins.includes(expectedOrigin)) {
                console.error('[OAuth Callback] Untrusted origin rejected:', expectedOrigin);
                return;
              }

              // 2. Validate that window.opener exists
              if (!window.opener) {
                console.error('[OAuth Callback] Missing window.opener');
                return;
              }

              function receiveMessage(e) {
                // 3. Strict origin validation: exact match against expectedOrigin
                if (e.origin !== expectedOrigin) {
                  console.warn('[OAuth Callback] Blocked message from untrusted origin:', e.origin);
                  return;
                }

                // 4. Strict source validation: must originate from window.opener
                if (!e.source || e.source !== window.opener) {
                  console.warn('[OAuth Callback] Blocked message from invalid source');
                  return;
                }

                // 5. Strict message type and payload validation
                if (typeof e.data !== 'string' || e.data !== 'authorizing:github') {
                  console.warn('[OAuth Callback] Blocked unexpected message data:', e.data);
                  return;
                }

                // 6. Safe dispatch strictly to expectedOrigin (never "*" or arbitrary e.origin)
                window.opener.postMessage(
                  'authorization:github:success:' + ${serializedContent},
                  expectedOrigin
                );
                window.removeEventListener("message", receiveMessage, false);
                window.close();
              }

              window.addEventListener("message", receiveMessage, false);

              // 7. Initial handshake directed strictly to expectedOrigin
              window.opener.postMessage("authorizing:github", expectedOrigin);
            })();
          </script>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(script);
  } catch (err) {
    console.error('Error during token exchange:', err);
    return res.status(500).send('Internal Server Error exchanging OAuth token.');
  }
}
