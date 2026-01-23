import { useMemo, useState } from "react";
import gameData from "./gameData.json";
import categoriesList from "./categories.json";
import mechanicsList from "./mechanics.json";
import "./Filter.css";
import useLocalStorage from "use-local-storage";
import PlayerCount from "@/components/BGFilter/PlayerCount";
import PlayTime from "@/components/BGFilter/PlayTime";
import MultiDropDown from "@/components/BGFilter/MultiDropDown";
import Game from "@/components/BGFilter/Game";
import PageTurner from "@/components/BGFilter/PageTurner";
import {
    type playerCount,
    type playTime,
    type selectOption,
    type filterState,
} from "@/types/BGFilter";

function Filter() {
    const [filterState, setFilterState] = useLocalStorage<filterState>(
        "filter-state",
        {
            playerCount: { min: -1, max: -1 },
            playTime: { min: -1, max: -1 },
            mechanics: [],
            categories: [],
        },
    );
    const items = gameData;

    const filtered = useMemo(() => {
        if (!filterState) {
            return gameData;
        }

        return items.filter((it) => {
            // player count
            if (filterState.playerCount.min !== -1) {
                if (
                    it.min_players > filterState.playerCount.min ||
                    it.max_players < filterState.playerCount.max
                ) {
                    return false;
                }
            }

            // play time
            if (
                filterState.playTime.min !== -1 &&
                filterState.playTime.max !== -1
            ) {
                if (
                    it.min_playtime < filterState.playTime.min ||
                    it.max_playtime > filterState.playTime.max
                ) {
                    return false;
                }
            }

            // mechanics
            if (
                filterState.mechanics
                    .map((x) => x.value)
                    .some((mech) => !it.mechanics.includes(mech))
            ) {
                return false;
            }

            // categories
            if (
                filterState.categories
                    .map((x) => x.value)
                    .some((cat) => !it.categories.includes(cat))
            ) {
                return false;
            }

            return true;
        });
    }, [filterState, items]);

    const loaded = true;
    const [page, setPage] = useState(0);

    const perPage = 20;

    const incPage = () =>
        setPage((p) => ((p + 1) * 20 >= filtered.length ? p : p + 1));
    const decPage = () => setPage((p) => (p <= 0 ? p : p - 1));

    const setPlayerCount = (
        value: playerCount | ((val: playerCount) => playerCount),
    ) => {
        const valueToStore =
            value instanceof Function ? value(filterState.playerCount) : value;
        setFilterState((fs) => ({ ...fs!, playerCount: valueToStore }));
    };

    const setPlayTime = (value: playTime | ((val: playTime) => playTime)) => {
        const valueToStore =
            value instanceof Function ? value(filterState.playTime) : value;
        setFilterState((fs) => ({ ...fs!, playTime: valueToStore }));
    };

    const setCategories = (
        value: selectOption[] | ((val: selectOption[]) => selectOption[]),
    ) => {
        const valueToStore =
            value instanceof Function ? value(filterState.categories) : value;
        setFilterState((fs) => ({ ...fs!, categories: valueToStore }));
    };

    const setMechanics = (
        value: selectOption[] | ((val: selectOption[]) => selectOption[]),
    ) => {
        const valueToStore =
            value instanceof Function ? value(filterState.mechanics) : value;
        setFilterState((fs) => ({ ...fs!, mechanics: valueToStore }));
    };

    const reset = () => {
        setFilterState({
            playerCount: { min: -1, max: -1 },
            playTime: { min: -1, max: -1 },
            mechanics: [],
            categories: [],
        });
    };

    return (
        <>
            {!loaded ? (
                <p>Loading...</p>
            ) : (
                <div className="vstack hcenter fullwide">
                    <div className="wide controls">
                        <p className="header tmar">Player count</p>
                        <PlayerCount
                            playerCount={filterState.playerCount}
                            setPlayerCount={setPlayerCount}
                        />
                        <p className="header">Play time</p>
                        <PlayTime
                            playTime={filterState.playTime}
                            setPlayTime={setPlayTime}
                        />
                        <div className="mystack mybmar">
                            <div className="vstack myrbmar">
                                <p className="header">Mechanics</p>
                                <MultiDropDown
                                    options={mechanicsList}
                                    value={filterState.mechanics}
                                    setValue={setMechanics}
                                />
                            </div>
                            <div className="vstack mylbmar">
                                <p className="header">Categories</p>
                                <MultiDropDown
                                    options={categoriesList}
                                    value={filterState.categories}
                                    setValue={setCategories}
                                />
                            </div>
                        </div>
                        <div className="hstack bmar">
                            <button
                                className="ghostbutton mybutton rmar"
                                onClick={reset}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                    <PageTurner
                        increment={incPage}
                        decrement={decPage}
                        page={page}
                        qty={filtered.length}
                    />
                    <div className="vstack hcenter wide">
                        {filtered
                            .slice(page * perPage, (page + 1) * perPage)
                            .map((it, i) => (
                                <Game key={i} data={it} />
                            ))}
                    </div>
                    {filtered.length > 0 && (
                        <PageTurner
                            increment={incPage}
                            decrement={decPage}
                            page={page}
                            qty={filtered.length}
                        />
                    )}
                </div>
            )}
        </>
    );
}

export default Filter;
