@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --color-cyan: var(--cyan);
  --color-violet: var(--violet);
  --color-panel: var(--panel);
  --color-panel-foreground: var(--panel-foreground);

  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-border: var(--sidebar-border);

  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
}

:root {
  color-scheme: dark;

  /* deep navy / almost-black base */
  --background: oklch(0.16 0.024 264);
  --foreground: oklch(0.95 0.008 250);

  --card: oklch(0.21 0.028 264);
  --card-foreground: oklch(0.95 0.008 250);

  --popover: oklch(0.19 0.028 264);
  --popover-foreground: oklch(0.95 0.008 250);

  /* cyan primary */
  --primary: oklch(0.82 0.13 200);
  --primary-foreground: oklch(0.16 0.03 240);

  --secondary: oklch(0.27 0.03 264);
  --secondary-foreground: oklch(0.95 0.008 250);

  --muted: oklch(0.27 0.03 264);
  --muted-foreground: oklch(0.68 0.02 258);

  /* violet accent */
  --accent: oklch(0.62 0.2 292);
  --accent-foreground: oklch(0.97 0.01 250);

  --destructive: oklch(0.65 0.2 18);

  --border: oklch(0.98 0.01 250 / 9%);
  --input: oklch(0.98 0.01 250 / 12%);
  --ring: oklch(0.82 0.13 200 / 60%);

  --cyan: oklch(0.82 0.13 200);
  --violet: oklch(0.66 0.2 292);
  --panel: oklch(0.22 0.03 264 / 55%);
  --panel-foreground: oklch(0.95 0.008 250);

  --chart-1: oklch(0.82 0.13 200);
  --chart-2: oklch(0.66 0.2 292);
  --chart-3: oklch(0.75 0.15 165);
  --chart-4: oklch(0.78 0.15 85);
  --chart-5: oklch(0.7 0.16 20);

  --sidebar: oklch(0.18 0.026 264 / 70%);
  --sidebar-foreground: oklch(0.95 0.008 250);
  --sidebar-border: oklch(0.98 0.01 250 / 8%);

  --radius: 0.75rem;
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    @apply bg-background;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }

  /* Technical grid + subtle cyan/violet glow background */
  .app-backdrop {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-color: var(--background);
    background-image:
      radial-gradient(
        60rem 40rem at 12% -8%,
        oklch(0.82 0.13 200 / 0.1),
        transparent 60%
      ),
      radial-gradient(
        55rem 40rem at 100% 0%,
        oklch(0.66 0.2 292 / 0.12),
        transparent 55%
      ),
      radial-gradient(
        50rem 50rem at 50% 120%,
        oklch(0.66 0.2 292 / 0.08),
        transparent 60%
      ),
      linear-gradient(
        to right,
        oklch(0.98 0.01 250 / 0.035) 1px,
        transparent 1px
      ),
      linear-gradient(
        to bottom,
        oklch(0.98 0.01 250 / 0.035) 1px,
        transparent 1px
      );
    background-size:
      100% 100%,
      100% 100%,
      100% 100%,
      46px 46px,
      46px 46px;
  }

  ::selection {
    background: oklch(0.82 0.13 200 / 0.3);
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: oklch(0.98 0.01 250 / 0.1);
    border-radius: 9999px;
    border: 3px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: oklch(0.82 0.13 200 / 0.3);
    background-clip: content-box;
  }
}

@layer components {
  /* Glass panel */
  .glass {
    background: var(--panel);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border);
    box-shadow:
      0 1px 0 0 oklch(0.98 0.01 250 / 0.04) inset,
      0 20px 40px -24px oklch(0 0 0 / 0.7);
  }

  .glass-strong {
    background: oklch(0.2 0.028 264 / 0.85);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--border);
    box-shadow:
      0 1px 0 0 oklch(0.98 0.01 250 / 0.05) inset,
      0 30px 60px -30px oklch(0 0 0 / 0.8);
  }

  .glow-cyan {
    box-shadow: 0 0 0 1px oklch(0.82 0.13 200 / 0.35),
      0 0 30px -6px oklch(0.82 0.13 200 / 0.4);
  }

  .glow-violet {
    box-shadow: 0 0 0 1px oklch(0.66 0.2 292 / 0.35),
      0 0 30px -6px oklch(0.66 0.2 292 / 0.45);
  }

  .text-glow-cyan {
    text-shadow: 0 0 18px oklch(0.82 0.13 200 / 0.5);
  }

  .mono-label {
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 0.68rem;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.4);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
