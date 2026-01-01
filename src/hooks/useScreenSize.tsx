import { useState, useEffect } from "react";

type screenSize = "xs" | "s" | "m" | "l" | "xl" | "2xl" | "";
function useScreenSize() {
    const [screenSize, setScreenSize] = useState<screenSize>("");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setScreenSize("xs");
            } else if (window.innerWidth >= 640 && window.innerWidth < 768) {
                setScreenSize("s");
            } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                setScreenSize("m");
            } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
                setScreenSize("l");
            } else if (window.innerWidth >= 1280 && window.innerWidth < 1536) {
                setScreenSize("xl");
            } else if (window.innerWidth >= 1536) {
                setScreenSize("2xl");
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screenSize;
}

export default useScreenSize;
