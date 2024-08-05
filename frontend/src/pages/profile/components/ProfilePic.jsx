import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import { useAuthContext } from "../../../context/AuthContext";
import profile from "../../../assets/profile.webp"
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ProfilePic = ({avatar, setAvatar}) => {
  const { authUser, setAuthUser } = useAuthContext();

  const [profilePic, setProfilePic] = useState(avatar?.url || profile);
  const [isNewProfilePic, setIsNewProfilePic] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const { id } = useParams();

  // Safety check to prevent unauthorized access to other user's profile
  const visitingOtherProfile = authUser?._id !== id;

  const handleChange = (e) => {
    setIsNewProfilePic(true);
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsNewProfilePic(false);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", ref.current.files[0]);
      const res = await fetch("/api/v1/users/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if(data.success === true) {
        // local storage
        localStorage.setItem("dp-user", JSON.stringify(data.user));

        // set auth user context
        setAuthUser(data.user);

        toast.success("Profile picture updated successfully");
      }
      else {
        toast.error(data.message);
        setProfilePic(profilePic || profile);
        setIsNewProfilePic(false);
        ref.current.value = null;
    }
} catch (error) {
    toast.error("Something went wrong! Please try again later");
    setProfilePic(profilePic || profile);
    setIsNewProfilePic(false);
    ref.current.value = null;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setProfilePic(avatar?.url || profile);
  }, [avatar]);

  return (
    <div>
      <img
        src={profilePic}
        alt="profile"
        className="w-40 h-40 rounded-full border-2 border-gray-300 object-cover"
      />
      <input
        hidden
        type="file"
        ref={ref}
        onChange={handleChange}
        accept="image/*"
        name="profilePic"
        id="profilePic"
      />
      <Grid
        item
        onClick={(e) => ref.current.click(e)}
        className={` ${visitingOtherProfile ? "hidden" : ""} h-8 w-8 text-center relative -top-8 -right-28 bg-gray-200 inline-block border-gray-500 border rounded-full cursor-pointer hover:opacity-75 hover:border-transparent`}
      >
        <EditIcon fontSize="small" />
      </Grid>
      <div className={`${isNewProfilePic && !visitingOtherProfile ? "" : "hidden"} flex justify-center align-center`}>
        <button onClick={handleSubmit} className="bg-gray-200 px-4 py-1 rounded-md -mt-5">save</button>
        <p>{loading ? "processing..." : ""}</p>
      </div>
    </div>
  );
};

export default ProfilePic;
