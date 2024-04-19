import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from '../pages/Menu';

export default function Layout() {
    return (
        <>
            <Menu />
            <main>
                <Outlet />
            </main>
        </>
    );
}