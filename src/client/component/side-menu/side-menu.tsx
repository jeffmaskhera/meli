import React, {useState} from 'react'
import {SIDE_MENU_DATA} from "./data";


const SideMenu = () => {
    const [existingNotification, setExistingNotification] = useState<boolean>(true);

    const actionMenu=(e: any)=> {
        const value = e
        console.log("action to", value)
    }


    return (
        <div className="side-menu">
            <div className="side-menu__container">
                {
                    SIDE_MENU_DATA.map((item)=> {
                        return (
                            <div key={item.id}>
                                {item.icon ?
                                    <>
                                        {
                                            item.name === 'Notificaciones' ?
                                                <div className="side-menu__notification" >
                                                    {
                                                        existingNotification && <div className="side-menu__notification__bullet"/>
                                                    }
                                                    <i className={item.icon} onClick={(e)=>actionMenu(item.name)}/>
                                                </div>
                                                :
                                                <i className={item.icon} onClick={(e)=>actionMenu(item.name)}/>
                                        }
                                    </>
                                    :
                                    <p onClick={(e)=>actionMenu(item.name)}>{item.name}</p>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default SideMenu;

