import {PlayerState} from "~/pages/game_time/context.ts";
import {PlayerCard} from "~/pages/game_time/PlayerCard.tsx";

export type KeeperComponentProps = {
    players: PlayerState[],
    onDown: (name: string) => void
}

export function KeeperComponent({players, onDown}: KeeperComponentProps) {
    return(
        <div className="w-full border-white rounded-md">
            <h2 className="font-bold">Keeper</h2>
            {
                players.filter((player) => player.status === 'isKeeper')
                    .map((keeper) => {
                    return (<PlayerCard player={keeper} key={keeper.name} onDown={() => onDown(keeper.name)} />)
                })
            }
            </div>
    )
}
