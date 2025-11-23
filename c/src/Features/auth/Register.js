
import { useRegisterMutation } from "./authApiSlice";
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";
import { useCreateBasketMutation } from "../basket/basketApiSlice";
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";

const Register = () => {
    const [createBasket] = useCreateBasketMutation();
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", password: "", address: "", mail: "", phon: ""
    });
    const [registerFunc, { isError, isLoading }] = useRegisterMutation();
    const toast = useRef(null);

  const show = () => {
    if (formData.firstName.trim() === "") {
        if (toast.current) {
            toast.current.show({
                severity: 'warn',
                summary: 'שדה חסר',
                detail: 'אנא מלאי את השדה: שם פרטי.',
                life: 3000
            });
        }
        return false;
    }

    if (formData.lastName.trim() === "") {
        if (toast.current) {
            toast.current.show({
                severity: 'warn',
                summary: 'שדה חסר',
                detail: 'אנא מלאי את השדה: שם משפחה.',
                life: 3000
            });
        }
        return false;
    }

    if (formData.password.trim() === "") {
        if (toast.current) {
            toast.current.show({
                severity: 'warn',
                summary: 'שדה חסר',
                detail: 'אנא מלאי את השדה: סיסמה.',
                life: 3000
            });
        }
        return false;
    }

    if (formData.phon.trim() === "") {
        if (toast.current) {
            toast.current.show({
                severity: 'warn',
                summary: 'שדה חסר',
                detail: 'אנא מלאי את השדה: טלפון.',
                life: 3000
            });
        }
        return false;
    }

    return true;
};

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id || "password"]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!show()) return;
        registerFunc(formData);
        navigate("/login");
    };

    const handleChangePassword = (e) => {
        setValue(e.target.value);
        handleChange(e);
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen bg-gray-100">
            <Toast ref={toast} position="top-center" />
            <div
                className="surface-card p-5 shadow-3 border-round w-full sm:w-30rem"
                style={{
                    backgroundColor: '#f0f4f8',   
                    borderRadius: '12px',              
                    border: '1px solid #cbd5e1',        
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }}
            >
                <h2 className="text-center mb-4">Register</h2>
                {isError && <h4 className="text-red-500 text-center mb-3">Something failed. Please try again.</h4>}

                <form onSubmit={handleSubmit} className="flex flex-column gap-3">
                    <div>
                        <label htmlFor="firstName" className="block mb-1">First Name</label>
                        <InputText id="firstName" className="w-full" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block mb-1">Last Name</label>
                        <InputText id="lastName" className="w-full" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <Password id="password" value={value} onChange={handleChangePassword} className="w-full" toggleMask />
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-1">Address</label>
                        <InputText id="address" className="w-full" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="phon" className="block mb-1">Phone</label>
                        <InputText id="phon" className="w-full" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="mail" className="block mb-1">Email</label>
                        <InputText id="mail" type="email" className="w-full" onChange={handleChange} />
                    </div>
                    <Button label="Sign Up" icon="pi pi-user" className="w-full mt-3" />
                </form>
            </div>
        </div>
    );
};

export default Register;
