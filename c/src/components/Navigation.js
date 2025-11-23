import { NavLink, useNavigate } from "react-router-dom"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Menubar } from 'primereact/menubar';
import useAuth from "../Features/auth/useAuth";
import { useSelector } from "react-redux";

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { TabMenu } from 'primereact/tabmenu';

const Navigation=()=>{
    
    const [{role, firstName}]=useAuth()
    const s=`hellow ${firstName}`
    const { isUserLoggedIN } = useSelector(state => state.auth)

    const navigate=useNavigate()
    const handleTabChange = (e) => {
        setActiveIndex(e.index);
        navigate(items[e.index].to); 
    };

    const [activeIndex, setActiveIndex] = useState(3);
    const items = [
                 { label: 'Home page', icon: 'pi pi-home', to:"/" },
                 { label: 'Products', icon: 'pi pi-list',to:"/Mproducts" },
 !isUserLoggedIN&&{ label: 'login', icon: 'pi pi-inbox', to:"/login" },
 !isUserLoggedIN&&{ label: 'register', icon: 'pi pi-inbox', to:"/register"},
  isUserLoggedIN&&{ label: 'basket', icon: 'pi pi-inbox', to:"/basket" },
  isUserLoggedIN&&{ label: 'logout', icon: 'pi pi-sign-out', to:"/logout" }
    ];

    return (
        <div className="card">
            <Button onClick={() => setActiveIndex(0)} className="p-button-outlined mb-5" label={s}/>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={handleTabChange} /> 
        </div>
    )
}

export default Navigation