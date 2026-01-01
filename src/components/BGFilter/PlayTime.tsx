import type { Dispatch, SetStateAction } from "react";
import type { playTime } from "@/types/BGFilter";
import "./BGFilter.css";

function PlayTime({
    playTime,
    setPlayTime,
}: {
    playTime: playTime;
    setPlayTime: Dispatch<SetStateAction<playTime>>;
}) {
    return (
        <div className="playTime">
            <p>
                <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={playTime.min === -1 ? "" : playTime.min}
                    onChange={(n) =>
                        setPlayTime((pt) => ({
                            min:
                                n.target.value === ""
                                    ? -1
                                    : Number(n.target.value),
                            max: Math.max(pt.max, Number(n.target.value)),
                        }))
                    }
                />{" "}
                &ndash;{" "}
                <input
                    type="number"
                    inputMode="numeric"
                    min={playTime.min}
                    value={playTime.max === -1 ? "" : playTime.max}
                    onChange={(n) =>
                        setPlayTime((pt) => ({
                            min: pt.min,
                            max:
                                n.target.value === ""
                                    ? -1
                                    : Number(n.target.value),
                        }))
                    }
                />{" "}
                mins
            </p>
        </div>
    );
}

export default PlayTime;
