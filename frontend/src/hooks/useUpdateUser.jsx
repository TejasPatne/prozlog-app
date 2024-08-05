import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const useUpdateUser = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const updateUser = async (inputs) => {
        const user = {
            ...authUser,
            ...inputs
        };
        
        if(!authUser && !user.password) {
            toast.error("Please login to continue");
            navigate("/signin");
            return;
        }
        
        const verifiedInputs = verifyInputs(user);
        if(!verifiedInputs) return;
        
        setLoading(true);
        try {
            const res = await fetch(`/api/v1/users/update/${authUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const data = await res.json();
            if(data.success === true) {
                toast.success(data.message);
                setAuthUser(data.user);
            } else {
                toast.error(data.message);
            }   
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateUser };
};

const verifyInputs = (inputs) => {
    if(Object.entries(inputs).length === 0){
        toast.error("No field was provided for update");
        return false;
    }

    if(inputs.userName && (inputs.userName.trim().length < 4 || inputs.userName.trim().length > 15)){
        toast.error("Username must be between 4 and 15 characters long");
        return false;
    }

    if(inputs.password && (inputs.password.length < 8)){
        toast.error("Password must be at least 8 characters long");
        return false;    
    }
    
    if(inputs.password && (inputs.password !== inputs.confirmPassword)){
        toast.error("Passwords do not match");
        return false;
    }

    return true; 
}