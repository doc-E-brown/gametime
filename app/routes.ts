import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes'

export default [
  index('./routes/HomeRoute.tsx'),
  route('/welcome', './routes/WelcomeRoute.tsx'),
  ...prefix('team', [
    route('/new', './routes/team/CreateNewTeamRoute.tsx'),
    route('/manage', './routes/team/ManageTeamRoute.tsx'),
  ]),
  ...prefix('match', [
    index('./routes/match/ListMatchRoute.tsx'),
    route('/new', './routes/match/CreateNewMatchRoute.tsx'),
    route('/:matchId', './routes/match/MatchRoute.tsx'),
    // route('/manage', './routes/ManageMatchRoute.tsx'),
  ]),
  route('/in_game', './routes/InGameRoute.tsx'),
  route('/export_data', './routes/ExportDataRoute.tsx'),
  route('*', 'NotFound.tsx'),
] satisfies RouteConfig
