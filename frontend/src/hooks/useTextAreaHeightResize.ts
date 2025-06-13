import { useEffect, type RefObject } from 'react'

export const useTextAreaHeightResize = (ref: RefObject<HTMLTextAreaElement | null>, value: string,shouldResize?: boolean) => {
    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height =
                ref.current.scrollHeight + "px";
        }
    }, [value, shouldResize]);
}
