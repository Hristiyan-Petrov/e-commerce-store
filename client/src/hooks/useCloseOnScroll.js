import { useEffect } from "react";

export function useCloseOnScroll(open, toggle) {
    useEffect(() => {
        if (!open) return;

        const handleScroll = toggle;
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [open, toggle]);
};