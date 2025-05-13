import { Team } from './team'

export function getListOfTeams(): Team[] {
  const allTeams = localStorage.getItem('teamsList')
  if (allTeams) {
    return JSON.parse(allTeams)
  }
  return []
}

export function setListOfTeams(teams: Team[]): void {
  localStorage.setItem('teamsList', JSON.stringify(teams))
}

export function isTeamNameAvailable(name: string) {
  const teams = getListOfTeams()
  return !teams.some((team) => team.name === name)
}

export function addNewTeam(team: Team): void {
  const allTeams = getListOfTeams()
  allTeams.push(team)
  setListOfTeams(allTeams)
}
