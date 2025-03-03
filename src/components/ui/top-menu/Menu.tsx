'use client';

import { useUIStore } from '@/store';

export const Menu = () => {

    const openSideMenu = useUIStore(state => state.openSidebar);

    return (
        <>
            <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" onClick={openSideMenu}>
                Menu
            </button>
        </>
    )
}