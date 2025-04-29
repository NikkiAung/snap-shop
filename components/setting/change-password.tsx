import React from "react";
import { KeyRound } from "lucide-react";
import SettingsCard from "./setting-card";

const ChangePassword = () => {
  return (
    <SettingsCard>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Change Password</p>
        <KeyRound className="w-5 h-5" />
      </div>
    </SettingsCard>
  );
};

export default ChangePassword;
