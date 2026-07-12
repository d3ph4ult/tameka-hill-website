import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// See src/lib/types.ts for why this client isn't parameterized with a
// hand-rolled Database generic.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // setAll is called from a Server Component during render, where
            // cookie writes are a no-op. Session refresh still happens in
            // proxy.ts, so this can be safely ignored here.
          }
        },
      },
    }
  );
}
