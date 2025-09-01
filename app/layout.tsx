import "./globals.css";
import type { Metadata } from "next";
import styles from "./AppShell.module.css";
import VisualViewportContainer from "./VisualViewportContainer";
import ServiceWorkerReg from "./ServiceWorkerReg";

export const metadata: Metadata = {
  title: "Test App",
  description: "Demo z headerem, main i footerem",
  other: {
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <head>
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <meta name="theme-color" content="#ffffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA2" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>
        <VisualViewportContainer>
          <header className={styles.header}>
            <div className={`${styles.headerInner} flex items-center justify-center`}>
              <span className="font-semibold">Header</span>
            </div>
          </header>

          <main id="main" className={`${styles.main} p-4 bg-gray-50`}>
            {children}
          </main>

          <footer className={styles.footer}>
            <div className="flex items-center justify-around bottom-0 left-0 right-0 h-[56px] bg-white border-t border-gray-300 z-50 flex items-center justify-around transition-all duration-300">
              <button className="text-blue-600">Home</button>
              <button className="text-blue-600">Settings</button>
            </div>
          </footer>
        </VisualViewportContainer>
        <ServiceWorkerReg />
      </body>
    </html>
  );
}