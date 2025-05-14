import { InMatchForm } from 'app/forms/Match'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { isFieldFull, isKeeperAssigned } from 'app/forms/Match'
import { ChangePlayerStatus, Player, PlayerState, PlayerStatus } from 'app/data'
import { Keeper, OnField, Reserve, Unavailable } from '../PlayerState'

export function PlayerManagement() {
  const { watch, setValue } = useFormContext<InMatchForm>()

  const playerStates = watch('playerStates')
  const teamConfig = watch('team.configuration')
  const deltaTime = watch('deltaTime')

  ///////////////////////////////////////////////////////////////////////////////////////////
  // Manage player status
  const changeStatus = (player: Player, status: PlayerStatus) => {
    setValue('playerStates', ChangePlayerStatus(player, status, playerStates))
  }

  const onFieldAction = (player: Player) => {
    if (!isFieldFull(playerStates, teamConfig)) {
      changeStatus(player, 'isOnField')
    }
  }

  const onKeeperAction = (player: Player) => {
    if (!teamConfig.playWithKeeper) {
      return
    }
    if (!isKeeperAssigned(playerStates, teamConfig)) {
      changeStatus(player, 'isKeeper')
    }
  }

  const onReserveAction = (player: Player) => {
    changeStatus(player, 'isReserve')
  }

  const anyUnavailable = playerStates.some((state) => state.status === 'isUnavailable')
  ///////////////////////////////////////////////////////////////////////////////////////////
  // Update Playtime

  useEffect(() => {
    setValue(
      'playerStates',
      playerStates.map((state: PlayerState) => {
        return {
          ...state,
          timePlayed:
            state.status === 'isOnField' ? state.timePlayed + deltaTime : state.timePlayed,
        }
      }),
    )
  }, [deltaTime])

  ///////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <h2 className="font-bold p-2">Roster</h2>
      <div className="p-4 bg-gray-800 rounded-2xl">
        {Boolean(teamConfig) && teamConfig.playWithKeeper ? (
          <Keeper
            playerStates={playerStates}
            onReserveAction={onReserveAction}
            onFieldAction={onFieldAction}
          />
        ) : null}
        <OnField
          playerStates={playerStates}
          onReserveAction={onReserveAction}
          onKeeperAction={onKeeperAction}
          playWithKeeper={teamConfig.playWithKeeper}
          maxOnField={teamConfig.playersOnField}
        />
        <Reserve
          playerStates={playerStates}
          onKeeperAction={onKeeperAction}
          onFieldAction={onFieldAction}
          playWithKeeper={teamConfig.playWithKeeper}
          maxReserves={teamConfig.maximumReserves}
        />
        {anyUnavailable && (
          <Unavailable
            playerStates={playerStates}
            onReserveAction={onReserveAction}
            onFieldAction={onFieldAction}
            onKeeperAction={onKeeperAction}
            playWithKeeper={teamConfig.playWithKeeper}
          />
        )}
      </div>
    </>
  )
}
