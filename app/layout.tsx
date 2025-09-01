// src/app/layout.tsx
import type { Metadata } from "next";
import './globals.css'
import { FixedLayout } from './FixedLayout'
import ServiceWorkerReg from "./ServiceWorkerReg";

export const metadata: Metadata = {
  title: "Next.js PWA Keyboard Layout",
  description: "A Progressive Web App with a fixed header, scrollable main section, and fixed footer that adjusts for keyboard visibility.",
  other: {
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ServiceWorkerReg />
        <FixedLayout>
          <header className="shrink-0 bg-blue-600 text-white px-4 py-6 text-center border-b border-blue-800 overflow-y-auto">
            <h1 className="text-2xl font-bold">My App Header</h1>
          </header>

          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-4">
            {children}
          </main>

          <footer className="shrink-0 bg-gray-200 text-center text-sm px-4 py-4 border-t border-gray-400">
            © 2025 My Footer
          </footer>
        </FixedLayout>

      </body>
    </html>
  )
}