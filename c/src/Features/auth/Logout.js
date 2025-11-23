import apiSlice from "../../App/apiSlice"
import { useSelector, useDispatch } from "react-redux"
import { removeToken } from "./authSlice"
import { NavLink, useNavigate } from "react-router-dom"
import React from 'react';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';

const Logout = () => {
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/")
        localStorage.removeItem("_idBasket")
    }

    const goBack = () => {
        navigate(-1)
    }

    return (
        <>
            <div className="card flex justify-content-center">
              
                <ButtonGroup>
                      <br></br>
                <br></br>
                  <br></br>
                <br></br>
                    <Button label="log out" onClick={handleLogout} icon="pi pi-check" />
                    <Button label="stay loged in" onClick={goBack} icon="pi pi-times" />
                </ButtonGroup>
            </div>
        </>
    )
}
export default Logout