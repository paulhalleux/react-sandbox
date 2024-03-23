import {
  createFileRoute,
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";

import { SettingSections } from "../../components/Settings";

export const Route = createFileRoute("/settings/_layout")({
  component: SettingsLayout,
});

const rootRoute = createRootRoute({
  component: () => {
    return <Outlet />;
  },
});

const SectionRouteTree = createRouter({
  routeTree: rootRoute.addChildren(
    SettingSections.map((value) => {
      return createRoute({
        getParentRoute: () => Route,
        path: `settings${value.path}`,
        component: () => {
          return (
            <div>
              <h3>{value.title}</h3>
            </div>
          );
        },
      });
    })
  ),
});

function SettingsLayout() {
  return (
    <div className="flex w-full">
      <aside className="border-r bg-contrast max-w-[320px] w-full p-4 py-3">
        <nav>
          <ul>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            {SettingSections.map((value) => {
              return (
                <li key={value.path}>
                  <Link
                    to={`/settings/${value.path.replace(/^\//, "")}` as any}
                  >
                    {value.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 px-4 py-3">
        <Outlet />
        <RouterProvider router={SectionRouteTree} />
      </main>
    </div>
  );
}
