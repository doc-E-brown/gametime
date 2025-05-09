import {PlayerState} from "~/pages/game_time/context.ts";
import {Fragment} from "react";

export function PlayerStateRow({player, onClick} : { player: PlayerState, onClick: () => void }) {
    return (
        <Fragment key={player.name}>
            <div className="col-span-1">
                <button onClick={onClick}>{player.name}</button>
            </div>
            <div className="col-span-1">
                <p>{player.status}</p>
            </div>
            <div className="col-span-1">
                <checkbox></checkbox>
            </div>
        </Fragment>
    )
}
