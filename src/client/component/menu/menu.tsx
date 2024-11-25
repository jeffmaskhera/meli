import React, {useState} from 'react'
import {MENU_LIST_DATA} from "./data";


const Menu = () => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    const actionMenu=(e: any)=> {
        const value = e
        console.log("action to", value)
    }

    const settingHamb=()=> {
        setIsOpenMenu(!isOpenMenu)
    }


    return (
        <div className="menu">
            <div className="hamburger" onClick={settingHamb}>
                <div/>
            </div>
            <div className={`menu__container ${isOpenMenu && 'active-container'}`}>
                <div className="close" onClick={settingHamb}/>
                <ul className="menu_ul">
                    {
                        MENU_LIST_DATA.map((item)=> {
                            return (
                                <li className="menu_li" key={item.id} onClick={(e)=>actionMenu(item.name)}>{item.name}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default Menu;

