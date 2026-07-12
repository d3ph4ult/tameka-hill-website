import { createBrowserClient } from "@supabase/ssr";

// See src/lib/types.ts for why this client isn't parameterized with a
// hand-rolled Database generic.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
