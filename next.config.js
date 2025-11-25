/**
 * next.config.js
 * Adds a Content-Security-Policy header that allows Jira to embed the widget route
 * Replace 'https://mokeshwar.atlassian.net' with your exact Jira origin if different
 */
module.exports = {
  async headers() {
    return [
      {
        // Match the widget route (update if your route is different)
        source: '/',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Allow same origin and the Jira Cloud origin to frame the page
            value: "frame-ancestors 'self' https://mokeshwar.atlassian.net",
          },
          {
            key: 'X-Frame-Options',
            // Explicitly allow framing by not setting DENY/SAMEORIGIN.
            // Some CDNs still add this header; setting to ALLOW-FROM is deprecated,
            // we prefer controlling via CSP - so we clear it by setting a permissive value.
            value: 'ALLOW-FROM https://mokeshwar.atlassian.net',
          },
        ],
      },
    ];
  },
};
