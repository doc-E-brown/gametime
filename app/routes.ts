import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./pages/HomeRoute.tsx"),
    route("/in_game", "./pages/InGameRoute.tsx"),
    route("/export_data", "./pages/ExportDataRoute.tsx"),
    route('*', 'NotFound.tsx'),
] satisfies RouteConfig;
