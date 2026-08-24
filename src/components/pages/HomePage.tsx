// src/pages/HomePage.tsx
import React from 'react'
import Header from "../layout/Header.tsx";
import MainHome from "../layout/mainHome/MainHome.tsx";

const HomePage: React.FC = () => {
    return (
    <div>
        <Header></Header>
        <MainHome></MainHome>
    </div>
    )
}

export default HomePage