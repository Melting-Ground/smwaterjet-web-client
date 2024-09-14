export interface Route {
  path: string;
  label: string;
}
export type RouteCategory = {
  title: string;
  routes: Route[];
};
