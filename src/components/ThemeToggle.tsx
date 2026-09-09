"use client";

const STORAGE_KEY = "bajio-theme";

/**
 * El tema vive en la clase `dark` de <html>, que el script de arranque de
 * `layout.tsx` aplica antes de pintar. El botón solo la voltea y guarda la
 * elección; el icono y la etiqueta salen de esa misma clase vía CSS, así que
 * no hay estado que hidratar ni parpadeo mientras carga el JS.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const dark = root.classList.toggle("dark");
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    } catch {
      /* Modo privado o storage bloqueado: el tema dura la sesión. */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rule bg-paper text-ink-soft hover:border-brand hover:bg-brand-soft hover:text-brand"
    >
      <span className="sr-only inline dark:hidden">Activar modo oscuro</span>
      <span className="sr-only hidden dark:inline">Activar modo claro</span>
      <MoonIcon className="block h-4 w-4 dark:hidden" />
      <SunIcon className="hidden h-4 w-4 dark:block" />
    </button>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 14.3A8.5 8.5 0 0 1 9.7 3 7 7 0 1 0 21 14.3Z"
      />
    </svg>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.1 5.1l1.6 1.6M17.3 17.3l1.6 1.6M18.9 5.1l-1.6 1.6M6.7 17.3l-1.6 1.6"
      />
    </svg>
  );
}
