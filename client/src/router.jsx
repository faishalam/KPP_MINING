import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPages from "./pages/LoginPages";
import RegisterPages from "./pages/RegisterPages";
import HomePages from "./pages/HomePages";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPages />,
        loader: () => localStorage.getItem('access_token') && redirect('/')
    },
    {
        path: "/register",
        element: <RegisterPages />,
        loader: () => localStorage.getItem('access_token') && redirect('/')
    },
    {
        path: "/",
        element: <HomePages type={"all"} />,
        loader: () => !localStorage.getItem('access_token') && redirect('/login')
    },
    {
        path: "/:filter",
        element: <HomePages type={"department"} />,
        loader: () => !localStorage.getItem('access_token') && redirect('/login')
    },
    {
        path: "/your-asset",
        element: <HomePages type={'byUser'} />,
        loader: () => !localStorage.getItem('access_token') && redirect('/login')
    },

]);

export default router;
