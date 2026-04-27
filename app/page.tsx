// Root page — redirects visitors to the default English lander.
// On cPanel (static export), this generates index.html with a meta refresh.
export default function RootPage() {
  return (
    <>
      <html>
        <head>
          <meta httpEquiv="refresh" content="0;url=/en/" />
          <title>Redirecting...</title>
        </head>
        <body />
      </html>
    </>
  );
}
