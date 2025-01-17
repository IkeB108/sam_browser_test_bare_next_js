export const metadata = {
  title: 'UntarIDB Test',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Load untar.js with a script tag */}
        <script src="/untar.js"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
