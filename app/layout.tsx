
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Form Layout Example',
  description: 'Header-Main-Footer Layout with Form',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-screen">
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-xl font-bold">My App Header</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>

        <footer className="bg-gray-200 text-center text-sm p-4">
          © 2025 My Footer
        </footer>
      </body>
    </html>
  )
}
