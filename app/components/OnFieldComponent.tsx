import {PlayerState} from "~/pages/context.ts";
import {PlayerCard} from "~/components/PlayerCard.tsx";

export type OnFieldComponentProps = {
    players: PlayerState[],
    onDown: (name: string) => void
    onUp: (name: string) => void
}

export function OnFieldComponent({players, onDown, onUp}: OnFieldComponentProps) {
    return(
        <div className="w-full border-white rounded-md">
            <h2 className="font-bold pt-2">On Field</h2>
            {
                players.filter((player) => player.status === 'onField')
                    .sort((a, b) => b.timePlayed - a.timePlayed)
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
