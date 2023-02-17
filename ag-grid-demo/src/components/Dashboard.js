import React from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const usenavigate2 = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('accessToken') === null) {
            usenavigate2('/')
        }
    }, []);

    return (
        <div>Welcome</div>
    );
}

export default Dashboard;