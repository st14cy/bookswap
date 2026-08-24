// src/pages/HomePage.tsx
import React from 'react'
import Header from "../layout/Header.tsx";
import MainHome from "../layout/mainHome/MainHome.tsx";
import Footer from "../layout/Footer.tsx";

const HomePage: React.FC = () => {
    return (
    <div>
        <Header></Header>
        <MainHome></MainHome>
        <Footer></Footer>
    </div>
    )
}

export default HomePage