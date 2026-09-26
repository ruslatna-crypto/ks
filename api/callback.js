// Vercel Serverless Function: GitHub OAuth Callback endpoint for Decap CMS
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

    // Post message back to Decap CMS window
    const script = `
      <!doctype html>
      <html>
        <head><title>Authentication Success</title></head>
        <body>
          <script>
            (function() {
              function receiveMessage(e) {
                window.opener.postMessage(
                  'authorization:github:success:${content}',
                  e.origin
                );
                window.removeEventListener("message", receiveMessage, false);
                window.close();
              }
              window.addEventListener("message", receiveMessage, false);
              window.opener.postMessage("authorizing:github", "*");
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
