import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import RootShell from "@/components/root-shell";
import AuthNavigationProvider from "@/components/auth-navigation-provider";
import { isAuthConfigured } from "@/lib/auth-config";

export { metadata } from "@/components/root-shell";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <RootShell>
      {isAuthConfigured ? (
        <ClerkProvider
          signInUrl="/sign-in/"
          signUpUrl="/sign-up/"
          signInFallbackRedirectUrl="/my-account/"
          signUpFallbackRedirectUrl="/my-account/"
          afterSignOutUrl="/"
          appearance={{
            variables: {
              colorBackground: "#101b24",
              colorForeground: "#f1f5f7",
              colorMutedForeground: "#b5c1ca",
              colorPrimary: "#00efef",
              colorPrimaryForeground: "#07090d",
              colorInput: "#0c1219",
              colorInputForeground: "#f1f5f7",
              fontFamily: "var(--font-geist), system-ui, sans-serif",
            },
          }}
        >
          <AuthNavigationProvider>{children}</AuthNavigationProvider>
        </ClerkProvider>
      ) : (
        children
      )}
    </RootShell>
  );
}
