import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('./routes/HomeRoute.tsx'),
  route('/in_game', './routes/InGameRoute.tsx'),
  route('/export_data', './routes/ExportDataRoute.tsx'),
  route('*', 'NotFound.tsx'),
] satisfies RouteConfig
