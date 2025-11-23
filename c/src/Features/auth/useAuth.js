import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const useAuth=()=>{
    const token=useSelector((state)=>state.auth.token)
    if(!token)
        return [{}]

    const obj=jwtDecode(token)
    const {role, firstName, mail, lastName}=obj

    return [obj]

}

export default useAuth;