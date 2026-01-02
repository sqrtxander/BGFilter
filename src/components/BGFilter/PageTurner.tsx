import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function PageTurner({
    increment,
    decrement,
    page,
    qty,
}: {
    increment: () => void;
    decrement: () => void;
    page: number;
    qty: number;
}) {
    return (
        <div className="hstack pageTurner">
            <button onClick={decrement} className="ghostbutton dec rmar">
                <FaChevronLeft />
            </button>
            <p className="infotxt">
                Page {page + 1} of {Math.ceil(qty / 20)}. Showing entries{" "}
                {page * 20 + 1} &ndash; {Math.min((page + 1) * 20, qty)} of{" "}
                {qty}
            </p>
            <button onClick={increment} className="ghostbutton inc lmar">
                <FaChevronRight />
            </button>
        </div>
    );
}

export default PageTurner;
