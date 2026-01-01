import "./App.css";
import useLocalStorage from "use-local-storage";
import Filter from "@/pages/BGFilter/Filter";
import { useScreenSize } from "@/hooks";
import Header from "@/components/Header/Header";
import { useEffect } from "react";

function App() {
    const defaultDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;

    const [theme, setTheme] = useLocalStorage(
        "color-theme",
        defaultDark ? "dark" : "light",
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const screenSize = useScreenSize();
    const switchTheme = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <div className={`app size-${screenSize}`}>
            <Header theme={theme} switchTheme={switchTheme} />
            <Filter />
        </div>
    );
}

export default App;
