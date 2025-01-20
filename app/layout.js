const useBasePath = process.env.USEBASEPATH==="true"
const basePrefix = useBasePath ? "/sam_browser_test_bare_next_js/out" : ""
export const metadata = {
  title: 'UntarIDB Test',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Load untar.js with a script tag */}
        
        <script src={basePrefix + "/untar.js"}></script>
        
      </head>
      <body>{children}</body>
    </html>
  )
}
