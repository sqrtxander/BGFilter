import type { Dispatch, SetStateAction } from "react";
import type { playerCount } from "@/types/BGFilter";
import "./BGFilter.css";

function PlayerCount({
    playerCount,
    setPlayerCount,
}: {
    playerCount: playerCount;
    setPlayerCount: Dispatch<SetStateAction<playerCount>>;
}) {
    const playerCountClick = (idx: number) => {
        if (idx === 0) {
            setPlayerCount({
                min: -1,
                max: -1,
            });
            return;
        }
        setPlayerCount((pc) => {
            if (pc.min === -1 || (idx >= pc.min && idx <= pc.max)) {
                return { min: idx, max: idx };
            } else if (idx < pc.min) {
                return { min: idx, max: pc.max };
            } else {
                return { min: pc.min, max: idx };
            }
        });
    };

    return (
        <div className="playerCount">
            <button
                className={`ghostbutton any ${playerCount.min === -1 ? "on" : ""}`}
                onClick={() => playerCountClick(0)}
            >
                Any
            </button>
            <button
                className={`ghostbutton ${playerCount.min <= 1 && 1 <= playerCount.max ? "on" : ""}`}
                onClick={() => playerCountClick(1)}
            >
                1
            </button>
            <button
                className={`ghostbutton ${playerCount.min <= 2 && 2 <= playerCount.max ? "on" : ""}`}
                onClick={() => playerCountClick(2)}
            >
                2
            </button>
            <button
                className={`ghostbutton ${playerCount.min <= 3 && 3 <= playerCount.max ? "on" : ""}`}
                onClick={() => playerCountClick(3)}
            >
                3
            </button>
            <button
                className={`ghostbutton ${playerCount.min <= 4 && 4 <= playerCount.max ? "on" : ""}`}
                onClick={() => playerCountClick(4)}
            >
                4
            </button>
            <button
                className={`ghostbutton ${playerCount.min <= 5 && 5 <= playerCount.max ? "on" : ""}`}
                onClick={() => playerCountClick(5)}
            >
                5
            </button>
            <button
                className={`ghostbutton ${playerCount.min <= 6 && 6 <= playerCount.max ? "on" : ""}`}
                onClick={() => playerCountClick(6)}
            >
                6
            </button>
            <button
                className={`ghostbutton ${playerCount.min <= 7 && 7 <= playerCount.max ? "on" : ""}`}
                onClick={() => playerCountClick(7)}
            >
                7
            </button>
            <button
                className={`ghostbutton ${playerCount.min <= 8 && 8 <= playerCount.max ? "on" : ""}`}
                onClick={() => playerCountClick(8)}
            >
                8
            </button>
            <button
                className={`ghostbutton ${playerCount.min <= 9 && 9 <= playerCount.max ? "on" : ""}`}
                onClick={() => playerCountClick(9)}
            >
                9
            </button>
            <button
                className={`ghostbutton ${playerCount.min <= 10 && 10 <= playerCount.max ? "on" : ""}`}
                onClick={() => playerCountClick(10)}
            >
                10+
            </button>
        </div>
    );
}

export default PlayerCount;
