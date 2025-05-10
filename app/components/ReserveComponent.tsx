import {PlayerState} from "~/pages/game_time/context.ts";
import {PlayerCard} from "~/components/PlayerCard.tsx";

export type ReserveComponentProps = {
    players: PlayerState[],
    onDown: (name: string) => void
    onUp: (name: string) => void
}

export function ReserveComponent({players, onDown, onUp}: ReserveComponentProps) {
    return(
        <div className="w-full border-white rounded-md">
            <h2 className="font-bold pt-2">Reserves</h2>
            {
                players.filter((player) => player.status === 'isSub')
                    .sort((a, b) => a.timePlayed - b.timePlayed)
                    .map((player) => {
                    return (<PlayerCard
                        player={player}
                        key={player.name}
                        onDown={() => onDown(player.name)}
                        onUp={() => onUp(player.name)} />)
                })
            }
            </div>
    )
}
