import ChangePassword from "@/components/setting/change-password";
import ProfileCard from "@/components/setting/profile-card";
import SettingsCard from "@/components/setting/setting-card";
import TwoFactor from "@/components/setting/two-factor";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const Settings = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/");

  return (
    <SettingsCard title="Settings" description="Manage your account settings">
      <main className="flex flex-1 flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <ProfileCard session={session} />
        </div>
        <div className="space-y-4 flex-1">
          <ChangePassword />
          <TwoFactor />
        </div>
      </main>
    </SettingsCard>
  );
};

export default Settings;
