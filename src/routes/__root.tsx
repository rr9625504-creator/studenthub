import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "../components/ui/sonner";
import { GigGridProvider } from "../context/GigGridContext";
import { DemoSwitcherBar } from "../components/common/DemoSwitcherBar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-7xl font-black text-blue-600">404</h1>
        <h2 className="mt-4 text-xl font-bold text-slate-800">Page Not Found</h2>
        <p className="mt-2 text-sm text-slate-500">
          The requested GigGrid page does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
        >
          Return to GigGrid Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">Application Error</h1>
        <p className="mt-2 text-sm text-slate-500">Something went wrong while rendering this view.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
          >
            Retry
          </button>
          <a
            href="/"
            className="border border-slate-200 hover:bg-slate-50 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GigGrid — Trusted Local Services & Cooperative Platform" },
      {
        name: "description",
        content:
          "SIH26089 — Cooperative Gig Services Platform for Household & Community Services. Fair work, transparent earnings, and trusted local providers in Maduravoyal & Chennai.",
      },
      { property: "og:title", content: "GigGrid — Trusted Local Services & Cooperative Platform" },
      {
        property: "og:description",
        content: "Empowering gig service workers with cooperative ownership, fair earnings, and community trust.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <GigGridProvider>
        <DemoSwitcherBar />
        <Outlet />
        <Toaster position="top-right" richColors />
      </GigGridProvider>
    </QueryClientProvider>
  );
}
