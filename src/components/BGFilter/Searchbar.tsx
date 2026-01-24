import "./BGFilter.css";

function Searchbar({
    query,
    setQuery,
}: {
    query: string;
    setQuery: (value: string | ((val: string) => string)) => void;
}) {
    return (
        <input
            className="searchbar"
            type="text"
            value={query}
            inputMode="text"
            onChange={(n) => setQuery(n.target.value)}
        />
    );
}

export default Searchbar;
