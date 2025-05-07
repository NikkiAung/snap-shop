import ChangePassword from "@/components/setting/change-password";
import DeleteAccount from "@/components/setting/delete-account";
import ProfileCard from "@/components/setting/profile-card";
import SettingsCard from "@/components/setting/setting-card";
import TwoFactor from "@/components/setting/two-factor";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const Settings = async () => {
  const session = await auth();
  console.log(session);
  if (!session?.user) return redirect("/");

  return (
    <SettingsCard title="Settings" description="Manage your account settings">
      <main className="flex flex-col gap-5">
        <ProfileCard session={session} />

        {!session.user.isOauth && (
          <>
            <ChangePassword email={session.user.email!} />
            <TwoFactor
              email={session?.user.email!}
              isTwoFactorEnabled={session?.user.isTwofactorEnabled!}
            />
          </>
        )}
        <DeleteAccount email={session?.user.email!} />
      </main>
    </SettingsCard>
  );
};

export default Settings;
