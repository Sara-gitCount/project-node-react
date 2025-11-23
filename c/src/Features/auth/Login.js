
 import React, { useEffect, useState } from "react"
 import { useLoginMutation } from "./authApiSlice"
 import { setToken } from "./authSlice"
 import { useDispatch } from "react-redux"
 import { useNavigate } from "react-router-dom"
 import { Divider } from 'primereact/divider';
 import { InputText } from 'primereact/inputtext';
 import { Button } from 'primereact/button';
 import "primereact/resources/themes/lara-light-cyan/theme.css";
 import { Password } from "primereact/password"
 import { jwtDecode } from "jwt-decode"
 import { useLazyGetBasketQuery } from "../basket/basketApiSlice"
 import { useCreateBasketMutation } from "../basket/basketApiSlice"

const Login = () => {

    const [value1, setValue] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [getBack] = useLazyGetBasketQuery()
    const [createBasket] = useCreateBasketMutation()
    const [loginFunc, { isError, error, isSuccess, isLoading, data }] = useLoginMutation()
    const [formData, setFormData] = useState({ phon: "", password: "" })

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            const decodedUser = jwtDecode(data.accessToken)
            handlebasket(decodedUser._id)
            navigate("/Mproducts")
        }
    }, [isSuccess])

    const handlebasket = async (_idUser) => {
        const result = await getBack(_idUser)
        if (!result?.data) {
            const created = await createBasket({ _idUser })
            localStorage.setItem("_idBasket", created.data.message)
        } else {
            localStorage.setItem("_idBasket", result.data._id)
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id || "password"]: value })
    }

    const handleChangePassword = (e) => {
        setValue(e.target.value)
        handleChange(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginFunc(formData)
    }

    return (
        <div className="flex justify-content-center align-items-center min-h-screen bg-gray-100">
            <div 
                className="surface-card p-6 shadow-3 border-round w-full sm:w-24rem" 
                style={{ 
                    backgroundColor: '#f0f4f8', 
                    borderRadius: '12px', 
                    border: '1px solid #cbd5e1', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }}
            >
                <h2 className="text-center mb-5">Welcome Back</h2>
                {isError && <h4 className="text-red-500 text-center mb-4">Error: {error?.data?.message || "Login failed"}</h4>}

                <form onSubmit={handleSubmit} className="flex flex-column gap-4">
                    <div>
                        <label htmlFor="phon" className="block mb-2">Phone</label>
                        <InputText
                            id="phon"
                            type="text"
                            className="w-full"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <Password
                            id="password"
                            value={value1}
                            onChange={handleChangePassword}
                            toggleMask
                            className="w-full"
                        />
                    </div>
                    <Button label={isLoading ? "Logging In..." : "Login"} icon="pi pi-sign-in" className="w-full mt-4" />
                </form>
            </div>
        </div>
    )
}

export default Login;
