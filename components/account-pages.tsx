import { SignIn, SignUp, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { getOrCreateProfile } from "@/lib/account-profile";

function AccountShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader accountPage />
      <main id="main-content" className="accountPage">
        <h1>{title}</h1>
        {children}
      </main>
      <SiteFooter shopPage />
    </>
  );
}

export function SignInPage() {
  return (
    <AccountShell title="Sign In">
      <SignIn />
    </AccountShell>
  );
}

export function SignUpPage() {
  return (
    <AccountShell title="Sign Up">
      <SignUp />
    </AccountShell>
  );
}

export async function MyAccountPage() {
  const { userId, getToken } = await auth.protect();
  const profile = await getOrCreateProfile(userId, getToken);

  return (
    <AccountShell title="My Account">
      <section className="accountPanel" aria-label="Account details">
        <div className="accountPanelHeader">
          <h2>Profile</h2>
          <UserButton showName />
        </div>
        {profile ? (
          <p>
            Profile created{" "}
            <time dateTime={profile.created_at}>
              {new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" })
                .format(new Date(profile.created_at))}
            </time>
          </p>
        ) : (
          <p role="status">Your profile is temporarily unavailable. Reload to try again.</p>
        )}
      </section>
    </AccountShell>
  );
}
