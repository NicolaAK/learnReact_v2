import React, { useContext } from 'react'
import { Navigate, Route, Routes, } from "react-router-dom";
import { AuthCotext } from '../../context';
import { privateRoutes, publicRoutes } from '../../router';

function AppRouter() {
    const isAuth = useContext(AuthCotext)

    return (
        isAuth
            ? <Routes>
                {privateRoutes.map(rout =>
                    <Route element={rout.element} path={rout.path} key={rout.path} />)}
                <Route path="/*" element={<Navigate to="/posts" replace />} />
            </Routes>
            : <Routes>
                {publicRoutes.map(rout =>
                    <Route element={rout.element} path={rout.path} key={rout.path} />)}
                <Route path="/*" element={<Navigate to="/login" replace />} />
            </Routes>
    )
}

export default AppRouter