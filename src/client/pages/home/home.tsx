import React from 'react'
import Header from "../../component/header/header";

const Home = () => {
    return (
        <div className="home">
            <Header/>
            <div className="hero-section">
                <h1>Prueba Técnica Mercado Libre</h1>
                <p>Jefrey Sánchez.</p>
                <p>Encuentra lo que necesitas utilizando el buscador para comenzar.</p>
            </div>
        </div>
    );
};

export default Home;

