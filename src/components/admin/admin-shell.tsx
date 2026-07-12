import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOutAdmin } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/social-links", label: "Social Links" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-soft">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-line bg-bg-raised px-5 py-6 lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
          <p className="font-display text-lg font-medium text-ink">Admin</p>
          <p className="mt-1 truncate text-xs text-ink-faint">{email}</p>

          <nav className="mt-8 flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-ink-muted hover:bg-bg-soft hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <form action={signOutAdmin} className="mt-8">
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-muted hover:bg-bg-soft hover:text-ink"
            >
              <LogOut size={16} aria-hidden="true" />
              Sign out
            </button>
          </form>
        </aside>

        <div className="flex-1 px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
