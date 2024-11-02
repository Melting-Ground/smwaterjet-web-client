import { routeCategories } from "../_config/routes";

export const findLabelByPathname = (pathname: string): string | null => {
  const trimmedPath = pathname.replace(/^\/+|\/+$/g, "");
  const basePathName = "/" + trimmedPath.split("/").slice(0, 2).join("/");

  for (const category of routeCategories) {
    for (const route of category.routes) {
      if (route.path === basePathName) {
        return route.label;
      }
    }
  }

  return null;
};
