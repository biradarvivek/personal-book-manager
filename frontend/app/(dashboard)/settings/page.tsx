import AppearanceSettings from "@/components/AppearanceSettings";
import AccountSettings from "@/components/AccountSettings";

export default function SettingsPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Customize your Bindery experience.
        </p>

      </div>

      <AppearanceSettings />

      <AccountSettings />

    </div>
  );
}