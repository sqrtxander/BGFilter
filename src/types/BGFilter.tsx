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

export { type game, type selectOption, type playTime, type playerCount };
