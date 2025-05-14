import { Player, PlayerState, PlayerStatus } from '../data'

export default function ChangePlayerStatus(
  player: Player,
  status: PlayerStatus,
  existingStates: PlayerState[],
): PlayerState[] {
  return existingStates.map((state) => {
    if (state.player === player) {
      return {
        ...state,
        status,
        subOffTime: status === 'isReserve' ? new Date().getTime() : state.subOffTime,
        timesAsSub: status === 'isReserve' ? state.timesAsSub + 1 : state.timesAsSub,
      }
    }
    return state
  })
}
