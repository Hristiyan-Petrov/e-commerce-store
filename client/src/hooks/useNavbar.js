import { useState } from "react";

export function useNavbar() {
    const [activeMenu, setActiveMenu] = useState(null);
    const toggleMenu = (menuId) => {
        console.log(menuId);
        setActiveMenu(prevMenu => prevMenu === menuId ? null : menuId);
    };

    const isMenuOpen = (menuId) => activeMenu === menuId;

    return {
        activeMenu,
        toggleMenu,
        isMenuOpen
    }
};