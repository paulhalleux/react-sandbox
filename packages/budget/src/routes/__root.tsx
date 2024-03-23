import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Header } from "../components";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow w-full">
        <Outlet />
      </div>
    </div>
  ),
});
