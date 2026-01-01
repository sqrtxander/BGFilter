import { useScreenSize } from "@/hooks";
import "./BGFilter.css";
import { FaChessPawn, FaClock } from "react-icons/fa";
import { useState } from "react";

type game = {
    bgg_id: number;
    name: string;
    min_players: number;
    max_players: number;
    min_age: number;
    min_playtime: number;
    max_playtime: number;
    year_published: number;
    avg_rating: number;
    geek_rating: number;
    mechanics: string[];
    categories: string[];
};

function Game({ data }: { data: game }) {
    const [expanded, setExpanded] = useState(false);
    const size = useScreenSize();

    const thumb = <img src="https://placehold.co/600x400" className="thumb" />;

    const title = <p className="title">{data.name}</p>;

    const players_time = (
        <div className="mystack players_time">
            <p className="stat">
                <FaChessPawn /> {data.min_players}
                {data.min_players !== data.max_players && ` \u2013 ${data.max_players}`}
            </p>
            <p className="stat">
                <FaClock /> {data.min_playtime}
                {data.min_playtime !== data.max_playtime && ` \u2013 ${data.max_playtime} `}
                min
            </p>
        </div>
    );

    const content = (
        <div className="mystack">
            <div className="vstack statlist">
                <p className="heading">Mechanics</p>
                <ul>
                    {data.mechanics.map((m, i) => (
                        <li key={i} className="statitem">
                            {m}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="vstack statlist">
                <p className="heading">Categories</p>
                <ul>
                    {data.categories.map((c, i) => (
                        <li key={i} className="statitem">
                            {c}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    if (["xs", "s"].includes(size)) {
        return (
            <div
                className={`gamebox vstack ${expanded ? "open" : "closed"}`}
                onClick={() => setExpanded(!expanded)}
            >
                <div className="hstack">
                    {thumb}
                    <div className="vstack">
                        {title}
                        {players_time}
                    </div>
                </div>
                {expanded && content}
            </div>
        );
    }

    return (
        <div
            className={`gamebox ${expanded ? "open" : "closed"}`}
            onClick={() => setExpanded(!expanded)}
        >
            <div className="hstack">
                {thumb}
                <div className="vstack">
                    {title}
                    {players_time}
                    {expanded && content}
                </div>
            </div>
        </div>
    );
}

export { Game, type game };
