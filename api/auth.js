// Vercel Serverless Function: GitHub OAuth Authorization endpoint for Decap CMS
export default function handler(req, res) {
  const { host } = req.headers;
  const clientId = process.env.GITHUB_CLIENT_ID || process.env.OAUTH_CLIENT_ID;
  
  if (!clientId) {
    return res.status(500).json({ error: 'Missing GITHUB_CLIENT_ID in environment variables.' });
  }

  const protocol = host.includes('localhost') ? 'http' : 'https';
  const redirectUri = `${protocol}://${host}/api/callback`;
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&scope=repo,user&redirect_uri=${encodeURIComponent(redirectUri)}`;

  res.redirect(302, githubAuthUrl);
}
