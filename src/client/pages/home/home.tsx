import React, {useEffect} from 'react'
import Header from "../../component/header/header";
import {clearCache} from "../../cache/local-storage";

const Home = () => {

    useEffect(()=> {
        clearCache();
    }, [])

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

