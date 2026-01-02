import { useScreenSize } from "@/hooks";
import { type game } from "@/types/BGFilter";
import "./BGFilter.css";
import {
    FaChevronDown,
    FaChevronUp,
    FaChessPawn,
    FaClock,
} from "react-icons/fa";
import { useState } from "react";

function Game({ data }: { data: game }) {
    const [expanded, setExpanded] = useState(false);
    const size = useScreenSize();

    const thumb = (
        <a
            className="bggLink"
            href={`https://boardgamegeek.com/boardgame/${data.bgg_id}`}
        >
            <img src="https://placehold.co/600x400" className="thumb" />
        </a>
    );

    const title = <p className="title">{data.name}</p>;

    const players_time = (
        <div className="mystack players_time">
            <p className="stat">
                <FaChessPawn /> {data.min_players}
                {data.min_players !== data.max_players &&
                    ` \u2013 ${data.max_players}`}
            </p>
            <p className="stat">
                <FaClock /> {data.min_playtime}
                {data.min_playtime !== data.max_playtime &&
                    ` \u2013 ${data.max_playtime} `}
                min
            </p>
        </div>
    );

    const expandButton = (
        <button
            className="ghostbutton noborder seemore"
            onClick={() => setExpanded(!expanded)}
        >
            {expanded ? (
                <FaChevronUp className="bigicon" />
            ) : (
                <FaChevronDown className="bigicon" />
            )}
        </button>
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
            <div className={`gamebox vstack ${expanded ? "open" : "closed"}`}>
                <div className="content">
                    <div className="hstack">
                        {thumb}
                        <div className="vstack">
                            {title}
                            {players_time}
                        </div>
                    </div>
                    {expanded && content}
                </div>
                {expandButton}
            </div>
        );
    }

    return (
        <div className={`gamebox ${expanded ? "open" : "closed"}`}>
            <div className="content hstack">
                {thumb}
                <div className="vstack">
                    {title}
                    {players_time}
                    {expanded && content}
                </div>
            </div>
            {expandButton}
        </div>
    );
}

export default Game;
