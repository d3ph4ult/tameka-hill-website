import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";
import { SetupNotice } from "@/components/admin/setup-notice";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function AdminLoginPage() {
  if (!isSupabaseConfigured()) {
    return <SetupNotice />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-soft px-4">
      <div className="w-full max-w-sm">
        <p className="text-center font-display text-2xl font-medium text-ink">Admin sign in</p>
        <p className="mt-1 text-center text-sm text-ink-muted">Jordan Blake dashboard</p>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
