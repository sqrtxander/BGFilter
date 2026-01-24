type game = {
    bgg_id: number;
    name: string;
    thumbnail: string;
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

type selectOption = {
    value: string;
    label: string;
};

type playTime = {
    min: number;
    max: number;
};

type playerCount = {
    min: number;
    max: number;
};

type filterState = {
    playerCount: playerCount;
    playTime: playTime;
    mechanics: selectOption[];
    categories: selectOption[];
    query: string;
};

export {
    type game,
    type selectOption,
    type playTime,
    type playerCount,
    type filterState,
};
