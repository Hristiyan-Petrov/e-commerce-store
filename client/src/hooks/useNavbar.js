import { useEffect, useState } from "react";

export function useNavbar() {
    const [activeMenu, setActiveMenu] = useState(null);
    const toggleMenu = (menuId) => {
        setActiveMenu(prevMenu => prevMenu === menuId ? null : menuId);
    };

    const isMenuOpen = (menuId) => activeMenu === menuId;

    // ESC key closes active menu
    useEffect(() => {
        const handleEscape = e => {
            if (e.key === 'Escape' && activeMenu) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape)
    }, [activeMenu]);

    // Custom event for mini cart opening
    useEffect(() => {
        const handler = () => toggleMenu('miniCart');
        window.addEventListener('openMiniCart', handler);
        return () => window.removeEventListener('openMiniCart', handler);
    }, [toggleMenu]);

    return {
        activeMenu,
        toggleMenu,
        isMenuOpen
    }
};