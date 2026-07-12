export function SetupNotice() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-soft px-4">
      <div className="card-shadow max-w-md rounded-2xl border border-line bg-bg-raised p-8 text-center">
        <p className="font-display text-xl font-medium text-ink">Connect Supabase to continue</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          The admin dashboard needs a Supabase project for authentication and
          data. Add <code className="rounded bg-bg-soft px-1.5 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="rounded bg-bg-soft px-1.5 py-0.5 text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your
          environment, run the migrations in <code className="rounded bg-bg-soft px-1.5 py-0.5 text-xs">supabase/migrations</code>,
          and add yourself to the <code className="rounded bg-bg-soft px-1.5 py-0.5 text-xs">admins</code> table. See the README for the full setup steps.
        </p>
      </div>
    </div>
  );
}
