import {useEffect, useState} from "react";

export default function useTick(tickPeriod: number, callback: (timeDelta: number) => void) {
    const [prevTime, setPrevTime] = useState(new Date().getTime())

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime()
            const deltaTime = (now - prevTime) / 1000 // convert to seconds
            setPrevTime(now)
            callback(deltaTime)
        }, tickPeriod)
        return () => clearInterval(interval)
    }, [prevTime, setPrevTime])
}
