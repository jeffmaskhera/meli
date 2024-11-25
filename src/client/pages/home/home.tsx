import React  from 'react'
import Header from "../../component/header/header";


const Home = () => {

    return (
        <div className="home">
            <Header/>
        </div>
    );
};


Home.defaultProps = {
    items: {}
};

export default Home;

