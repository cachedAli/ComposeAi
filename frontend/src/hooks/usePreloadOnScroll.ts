import { useEffect, useState, type RefObject } from "react";

export const usePreloadOnScroll = (ref: RefObject<HTMLElement | null>, preloadCallback: () => void) => {
    const [isPreloaded, setIsPreloaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isPreloaded) {
                preloadCallback();
                setIsPreloaded(true);
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current)
        }
    }, [ref, isPreloaded, preloadCallback])

    return isPreloaded;
}
