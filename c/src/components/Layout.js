import { Outlet } from "react-router-dom"
import Navigation from "./Navigation"
import "primereact/resources/themes/lara-light-cyan/theme.css";

const Layout=()=>{
    return(
        <>
        <Navigation></Navigation>
        <Outlet></Outlet>
        </>
    )
}

export default Layout