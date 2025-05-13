import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes'

export default [
  index('./routes/HomeRoute.tsx'),
  ...prefix('team', [
    index('./routes/TeamRoute.tsx'),
    route('/new', './routes/CreateNewTeamRoute.tsx'),
    route('/manage', './routes/ManageTeamRoute.tsx'),
  ]),
  route('/in_game', './routes/InGameRoute.tsx'),
  route('/export_data', './routes/ExportDataRoute.tsx'),
  route('*', 'NotFound.tsx'),
] satisfies RouteConfig
