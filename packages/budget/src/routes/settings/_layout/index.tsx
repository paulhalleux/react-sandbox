import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/_layout/")({
  component: SettingsIndex,
});

function SettingsIndex() {
  return (
    <div>
      <h3>Welcome to the Settings</h3>
    </div>
  );
}
