"use client";

import { useEffect, useRef } from "react";
import styles from "./AppShell.module.css";

/**
 * Kontener trzymający wysokość równą visual viewportowi.
 * Scroll jest dozwolony tylko w .main.
 * Gdy klawiatura zakrywa focusowany input w .main, przewiń .main tak,
 * aby top inputa był ~24px pod headerem.
 */
export default function VisualViewportContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (!el) return;

    // Zadbaj, żeby strona/okno nie przewijały się pod spodem (best effort)
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const vv = window.visualViewport as VisualViewport | undefined;

    const REVEAL_OFFSET = 40; // ~24px pod headerem

    const isEditableEl = (n: Element | null): n is HTMLElement =>
      !!n &&
      (n.tagName === "INPUT" ||
        n.tagName === "TEXTAREA" ||
        (n as HTMLElement).isContentEditable);

    const getEls = () => {
      const main = el.querySelector(`.${styles.main}`) as HTMLElement | null;
      const header = el.querySelector(`.${styles.header}`) as HTMLElement | null;
      const footer = el.querySelector(`.${styles.footer}`) as HTMLElement | null;
      return { main, header, footer };
    };

    // Oblicz widoczny slot main (vv.height - header - footer) i
    // jeśli target jest przykryty od dołu, przewiń .main płynnie tak,
    // aby jego górna krawędź była REVEAL_OFFSET poniżej headera.
    const revealIfCoveredFromBottom = (target: HTMLElement) => {
      const { main, header, footer } = getEls();
      if (!main) return;
      // Przewijamy tylko jeśli target faktycznie w .main
      if (!target.closest(`.${styles.main}`)) return;

      const containerRect = el.getBoundingClientRect();
      const headerH = header?.getBoundingClientRect().height ?? 0;
      const footerH = footer?.getBoundingClientRect().height ?? 0;

      const vvH = window.visualViewport?.height ?? containerRect.height;
      const visibleMainHeight = Math.max(0, vvH - headerH - footerH);

      const visibleTop = containerRect.top + headerH;
      const visibleBottom = visibleTop + visibleMainHeight;

      const tRect = target.getBoundingClientRect();

      // warunek: input przykryty od dołu (klawiaturą/stópką)
      const coveredFromBottom = tRect.bottom > visibleBottom + 0.5; // mały margines

      if (!coveredFromBottom) {
        // wymaganie #2: jeśli nie pokryty — nie ruszaj
        return;
      }

      const desiredTop = visibleTop + REVEAL_OFFSET;
      const delta = tRect.top - desiredTop;

      const newScrollTop = Math.max(
        0,
        Math.min(
          (main.scrollTop || 0) + delta,
          main.scrollHeight - main.clientHeight
        )
      );

      // płynnie
      main.scrollTo({ top: newScrollTop, behavior: "smooth" });
    };

    const setSize = () => {
      let h = window.innerHeight ?? 0;
      let w = window.innerWidth ?? 0;
      let top = 0;
      let left = 0;

      if (vv) {
        h = Math.round(vv.height);
        w = Math.round(vv.width);
        top = Math.round(vv.offsetTop);
        left = Math.round(vv.offsetLeft);
      }

      el.style.setProperty("--vvh", `${h}px`);
      el.style.setProperty("--vvw", `${w}px`);
      el.style.setProperty("--vv-top", `${top}px`);
      el.style.setProperty("--vv-left", `${left}px`);

      // Gdy vv jeszcze się „dogrywa”, przesuń aktywny input jeśli jest przykryty
      if (el.classList.contains("keyboard-open") && isEditableEl(document.activeElement)) {
        requestAnimationFrame(() => revealIfCoveredFromBottom(document.activeElement as HTMLElement));
      }
    };

    setSize();

    // iOS: reaguj na zmiany vv przy klawiaturze i pasku adresu
    vv?.addEventListener("resize", setSize);
    vv?.addEventListener("scroll", setSize);
    window.addEventListener("resize", setSize);

    // --- tylko .main może się przewijać (blokujemy gesty poza .main) ---
    const allowOnlyMainToScroll = (e: TouchEvent) => {
      const t = e.target as Element | null;
      if (!t?.closest(`.${styles.main}`)) {
        e.preventDefault();
      }
    };
    // passive:false jest kluczowe, żeby dało się zablokować scroll
    document.addEventListener("touchmove", allowOnlyMainToScroll, { passive: false });

    // --- twarda blokada scrolla okna, gdy klawiatura jest otwarta ---
    const lockWindowScroll = () => {
      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
      }
    };

    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (isEditableEl(t)) {
        el.classList.add("keyboard-open");
        // przy otwarciu klawiatury trzymaj window na (0,0)
        window.scrollTo(0, 0);
        window.addEventListener("scroll", lockWindowScroll, { passive: true });

        // Po klatce (i mikrotimingu) przesuń, jeśli input przykryty
        requestAnimationFrame(() => {
          setTimeout(() => revealIfCoveredFromBottom(t), 0);
        });
      }
    };
    const onFocusOut = () => {
      el.classList.remove("keyboard-open");
      window.removeEventListener("scroll", lockWindowScroll);
    };
    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);

    return () => {
      vv?.removeEventListener("resize", setSize);
      vv?.removeEventListener("scroll", setSize);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("scroll", lockWindowScroll);
      document.removeEventListener("touchmove", allowOnlyMainToScroll);
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return (
    <div ref={ref} className={styles.viewportLock}>
      {children}
    </div>
  );
}