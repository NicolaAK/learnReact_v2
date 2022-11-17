import React from 'react'
import { Navigate, Route, Routes, } from "react-router-dom";
import About from '../../Pages/About';
import PostIdPage from '../../Pages/PostIdPage';
import Posts from '../../Pages/Posts';
import Error from '../../Pages/Posts';

function AppRouter() {
    return (
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:id" element={<PostIdPage />} />
            <Route path="/error" element={<Error />} />
            <Route path="/*" element={<Navigate to="/error" replace />} />
        </Routes>
    )
}

export default AppRouter