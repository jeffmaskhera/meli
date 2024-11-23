import React  from 'react'
import Finder from "../../component/finder/finder";


const Home = () => {

    return (
        <div className="home">
            <Finder/>
        </div>
    );
};


Home.defaultProps = {
    items: {}
};

export default Home;

