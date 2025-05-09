import {useContext, useState} from "react";
import {EventContext, GameContext} from "~/pages/game_time/context";
import { useNavigate} from "react-router";

export function MidGame() {
    const navigate = useNavigate()
    return(<button onClick={() => {navigate('..')}}>MidGame</button>)
}
