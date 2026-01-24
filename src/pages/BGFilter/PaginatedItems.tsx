import Game from "@/components/BGFilter/Game";
import PageTurner from "@/components/BGFilter/PageTurner";
import type { game } from "@/types/BGFilter";
import { useState } from "react";

function PaginatedItems({ items }: { items: game[] }) {
    const [page, setPage] = useState(0);
    const perPage = 20;
    const incPage = () =>
        setPage((p) => ((p + 1) * 20 >= items.length ? p : p + 1));
    const decPage = () => setPage((p) => (p <= 0 ? p : p - 1));
    return (
        <>
            <PageTurner
                increment={incPage}
                decrement={decPage}
                page={page}
                qty={items.length}
            />
            <div className="vstack hcenter wide">
                {items
                    .slice(page * perPage, (page + 1) * perPage)
                    .map((it, i) => (
                        <Game key={i} data={it} />
                    ))}
            </div>
            {items.length > 0 && (
                <PageTurner
                    increment={incPage}
                    decrement={decPage}
                    page={page}
                    qty={items.length}
                />
            )}
        </>
    );
}

export default PaginatedItems;
