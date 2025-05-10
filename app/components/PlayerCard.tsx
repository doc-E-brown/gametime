import { PlayerState } from "../pages/context.ts"
import { LuCircleChevronDown, LuCircleChevronUp } from "react-icons/lu";

export type PlayerCardProps = {
    player: PlayerState
    onDown?: () => void
    onUp?: () => void
}

export function timeToString(time: number): string {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export function PlayerCard({player, onUp, onDown} : PlayerCardProps) {
    return (
        <div className="flex flex-col items-left justify-center w-full p-2 border rounded-lg bg-gray-700" >
            <div className="grid grid-cols-7">
            <div className="font-bold col-span-3 text-white">{player.name}</div>
            <div className="col-span-2 text-white gap-4">{timeToString(player.timePlayed)}</div>
            <div className="col-span-1 text-white gap-4">
                {onUp && <button onClick={onUp}><LuCircleChevronUp className="h-full"/></button>}
            </div>
            <div className="col-span-1 text-white gap-4">
                {onDown && <button onClick={onDown}><LuCircleChevronDown className="h-full"/></button>}
            </div>
            </div>
        </div>
    )
}
