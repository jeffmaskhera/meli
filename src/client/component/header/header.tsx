import React  from 'react'
import Finder from "../../component/finder/finder";
import Menu from "../menu/menu";
import SideMenu from "../side-menu/side-menu";


const Header = () => {

    return (
        <div className="header">
            <Finder/>
            <Menu/>
            <SideMenu/>
        </div>
    );
};

export default Header;

