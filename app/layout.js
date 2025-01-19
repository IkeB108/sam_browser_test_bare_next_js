export const metadata = {
  title: 'UntarIDB Test',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Load untar.js with a script tag */}
        
        {/* For production */}
        <script src="/sam_browser_test_bare_next_js/out/untar.js"></script>
        
        {/* For local testing */}
        {/* <script src="/untar.js"></script> */}
      </head>
      <body>{children}</body>
    </html>
  )
}
