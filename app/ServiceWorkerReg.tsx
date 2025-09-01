"use client";
import { useEffect } from "react";

export default function ServiceWorkerReg() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (!window.isSecureContext) {
      console.warn("[sw] Secure context required (HTTPS or localhost).");
      return;
    }

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        console.log("[sw] registered:", reg.scope);

        // opcjonalnie: automatyczny skipWaiting przy aktualizacji
        if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
        reg.addEventListener("updatefound", () => {
          const nw = reg.installing;
          nw?.addEventListener("statechange", () => {
            if (nw.state === "installed" && navigator.serviceWorker.controller) {
              console.log("[sw] new content available (reload to activate)");
            }
          });
        });
      })
      .catch((err) => console.error("[sw] register failed", err));
  }, []);

  return null;
}
