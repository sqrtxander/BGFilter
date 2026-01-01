import "./Header.css";
import { FiSun, FiMoon } from "react-icons/fi";
import { IconContext } from "react-icons";

type headerProps = {
    theme: string;
    switchTheme: () => void;
};
function Header({ theme, switchTheme }: headerProps) {
    return (
        <div className="headerbar">
            <a href="https://boardgamegeek.com" className="headertitle">
                <div className="bggBackground">
                    <img src="/powered-by-bgg-rgb.svg" className="fit"/>
                </div>
            </a>
            <button className="themeswitcher" onClick={switchTheme}>
                <IconContext.Provider
                    value={{ color: "var(--bg)", className: "icon" }}
                >
                    {theme === "dark" ? <FiSun /> : <FiMoon />}
                </IconContext.Provider>
            </button>
        </div>
    );
}

export default Header;
