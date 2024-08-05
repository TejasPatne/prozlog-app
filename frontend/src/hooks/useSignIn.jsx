import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignIn = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setAuthUser} = useAuthContext();

    const signin = async (inputs) => {
        const verifiedInputs = verifyInputs(inputs);
        if(!verifiedInputs) return;

        setLoading(true);

        try {
            const res = await fetch("/api/v1/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
              })
              
              const data = await res.json();
              
              if(data.success === true){
                // local storage
                localStorage.setItem("dp-user", JSON.stringify(data.user));
                
                // set auth user context
                setAuthUser(data.user);
                
                toast.success(data.message);
                navigate("/");

              } else {
                toast.error(data.message);
              }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, signin};
};

const verifyInputs = ({ email, password }) => {

    if(!email.trim()){
        toast.error("Email is required");
        return false;
    }

    if(!password.trim() || password.length < 4){
        toast.error("Please enter valid password");
        return false;
    }

    return true;
}