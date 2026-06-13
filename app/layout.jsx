import './globals.css'

export const metadata = {
  title: "Best For Pets — Chennai's Trusted Pet Care Family",
  description: "Grooming · Food · Everything your pet needs",
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com" defer></script>
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
