import { createClient } from "@supabase/supabase-js";

export async function getOrCreateProfile(userId: string, getToken: () => Promise<string | null>) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.error("Supabase profile storage is not configured.");
    return null;
  }

  const token = await getToken();
  if (!token) return null;

  const supabase = createClient(url, key, { accessToken: async () => token });
  // Ignore conflicts so repeat visits and concurrent requests preserve the original profile.
  const { error: insertError } = await supabase.from("profiles").upsert(
    { clerk_user_id: userId },
    { onConflict: "clerk_user_id", ignoreDuplicates: true },
  );

  if (insertError) {
    console.error("Unable to initialize Supabase profile.", insertError.code);
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("created_at")
    .eq("clerk_user_id", userId)
    .single<{ created_at: string }>();

  if (error) {
    console.error("Unable to load Supabase profile.", error.code);
    return null;
  }

  return data;
}
