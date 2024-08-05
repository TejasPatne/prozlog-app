import { useState } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signup = async (inputs) => {
        const verifiedInputs = verifyInputs(inputs);
        if(!verifiedInputs) return;

        setLoading(true);

        try {
            const res = await fetch("/api/v1/auth/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
              })
              const data = await res.json();
              
              if(data.success === true){                
                toast.success(data.message);
                navigate("/signin");

              } else {
                toast.error(data.message);
              }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, signup};

};

const verifyInputs = ({ userName, fullName, email, password, confirmPassword }) => {
    if(!userName.trim() || userName.length < 4 || userName.length > 15){
        toast.error("Username must be at least 4 characters long and less than 15 characters");
        return false;
      }

    if(!fullName.trim() || !email.trim() || !password.trim()){
        toast.error("All fields are required");
        return false;
    }

    if(password.trim().length < 8){
        toast.error("Password must contain at least 8 characters");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Password does not match");
        return false;
    }

    return true;
}