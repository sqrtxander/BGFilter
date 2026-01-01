import { useState } from "react";
import gameData from "./gameData.json";
import categoriesList from "./categories.json";
import mechanicsList from "./mechanics.json";
import "./Filter.css";
import PlayerCount from "@/components/BGFilter/PlayerCount";
import PlayTime from "@/components/BGFilter/PlayTime";
import MultiDropDown from "@/components/BGFilter/MultiDropDown";
import Game from "@/components/BGFilter/Game";
import PageTurner from "@/components/BGFilter/PageTurner";
import { type game, type selectOption } from "@/types/BGFilter";

function Filter() {
    // const [items, setItems] = useState<game[]>([]);
    // const [items, setItems] = useState<game[]>(gameData);
    // const [loaded, setLoaded] = useState(false);
    // const [loaded, setLoaded] = useState(true);
    // const [filtered, setFiltered] = useState<game[]>([]);
    const items = gameData;
    const loaded = true;
    const [filtered, setFiltered] = useState<game[]>(gameData);
    const [page, setPage] = useState(0);
    const [mechanics, setMechanics] = useState<selectOption[]>([]);
    const [categories, setCategories] = useState<selectOption[]>([]);
    const [playTime, setPlayTime] = useState({
        min: -1,
        max: -1,
    });
    const [playerCount, setPlayerCount] = useState({
        min: -1,
        max: -1,
    });

    const perPage = 20;

    const incPage = () =>
        setPage((p) => ((p + 1) * 20 >= filtered.length ? p : p + 1));
    const decPage = () => setPage((p) => (p <= 0 ? p : p - 1));

    const filter = () => {
        setFiltered(
            items.filter((it) => {
                // player count
                if (playerCount.min !== -1) {
                    if (
                        it.min_players > playerCount.min ||
                        it.max_players < playerCount.max
                    ) {
                        return false;
                    }
                }

                // play time
                if (playTime.min !== -1 && playTime.max !== -1) {
                    if (
                        it.min_playtime < playTime.min ||
                        it.max_playtime > playTime.max
                    ) {
                        return false;
                    }
                }

                // mechanics
                if (
                    mechanics
                        .map((x) => x.value)
                        .some((mech) => !it.mechanics.includes(mech))
                ) {
                    return false;
                }

                // categories
                if (
                    categories
                        .map((x) => x.value)
                        .some((cat) => !it.categories.includes(cat))
                ) {
                    return false;
                }

                return true;
            }),
        );
        setPage(0);
    };

    const reset = () => {
        setPlayerCount({ min: -1, max: -1 });
        setPlayTime({ min: -1, max: -1 });
        setMechanics([]);
        setCategories([]);
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
                            playerCount={playerCount}
                            setPlayerCount={setPlayerCount}
                        />
                        <p className="header">Play time</p>
                        <PlayTime
                            playTime={playTime}
                            setPlayTime={setPlayTime}
                        />
                        <div className="mystack bmar">
                            <div className="vstack myrbmar">
                                <p className="header">Mechanics</p>
                                <MultiDropDown
                                    options={mechanicsList}
                                    value={mechanics}
                                    setValue={setMechanics}
                                />
                            </div>
                            <div className="vstack mylbmar">
                                <p className="header">Categories</p>
                                <MultiDropDown
                                    options={categoriesList}
                                    value={categories}
                                    setValue={setCategories}
                                />
                            </div>
                        </div>
                        <div className="hstack bmar">
                            <button
                                className="ghostbutton mybutton rmar"
                                onClick={filter}
                            >
                                Filter
                            </button>
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
