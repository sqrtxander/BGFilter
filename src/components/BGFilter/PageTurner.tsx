function PageTurner({ increment, decrement, page, qty }: {
    increment: () => void,
    decrement: () => void,
    page: number,
    qty: number
}) {
    return <div className="hstack pageTurner">
        <button onClick={decrement} className="ghostbutton dec rmar">&lt;</button>
        <p className="infotxt">Page {page + 1} of {Math.ceil(qty / 20)}. Showing entries {page * 20} &ndash; {Math.min(page * 20 + 19, qty)} of {qty}</p>
        <button onClick={increment} className="ghostbutton inc lmar">&gt;</button>
    </div>
}

export default PageTurner
