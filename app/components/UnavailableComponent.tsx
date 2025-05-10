import {PlayerState} from "~/pages/game_time/context.ts";
import {PlayerCard} from "~/components/PlayerCard.tsx";

export type UnavailableComponentProps = {
    players: PlayerState[],
    onUp: (name: string) => void
}

export function UnavailableComponent({players, onUp}: UnavailableComponentProps) {
    const allAvailable = () => {
        players.forEach((player) => {
            onUp(player.name)
        })
    }
    return(
        <div className="w-full border-white rounded-md">
            <h2 className="font-bold pt-2">Unavailable</h2>
            <p className="p-4"><button onClick={allAvailable}>All Available</button></p>
            {
                players.filter((player) => player.status === 'isUnavailable')
                    .map((player) => {
                    return (<PlayerCard player={player} key={player.name} onUp={() => onUp(player.name)} />)
                })
            }
            </div>
    )
}
