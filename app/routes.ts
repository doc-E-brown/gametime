import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./pages/home/HomeRoute.tsx"),
    route("/game_time/in_game", "./pages/game_time/InGameRoute.tsx"),
    route("/game_time/export_data", "./pages/game_time/ExportDataRoute.tsx"),
    route('*', 'NotFound.tsx'),
] satisfies RouteConfig;
