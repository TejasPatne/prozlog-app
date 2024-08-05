import React, { useEffect, useState } from "react";
import { Spinner } from "../../assets/Loading";
import { useAuthContext } from "../../context/AuthContext";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useParams } from "react-router-dom";
import { useGetProfile } from "../../hooks/useGetProfile";
import ProfilePic from "./components/ProfilePic";
import SEO from "../../utility/SEO";
import GlobalSpinner from "../../utility/GlobalSpinner";

const Profile = () => {
  const { authUser } = useAuthContext();
  const { profile } = useGetProfile();
  const [user, setUser] = useState({
    userName: profile?.userName || "",
    fullName: profile?.fullName || "",
    email: profile?.email || "",
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState(null);

  const { loading, updateUser } = useUpdateUser();
  const { id } = useParams();

  // Safety check to prevent unauthorized access to other user's profile
  const visitingOtherProfile = authUser?._id !== id;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser(user);
    setUser({
      ...user,
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    setUser({
      ...user,
      userName: profile?.userName || "",
      fullName: profile?.fullName || "",
      email: profile?.email || "",
    });

    setAvatar(profile?.avatar);
  }, [profile, avatar]);

  return (
    !profile? 
    <GlobalSpinner />:
    <section>
      {/* metadata */}
      <SEO title={profile?.userName} description={profile?.fullName} name="Vivekanand Education Society's Institute of Technology, Chembur" type="website" />
      
      <div className="min-h-screen mt-10 flex flex-col gap-2 justify-center items-center mx-auto w-[85%] md:w-[25%]">
      <h1 className="text-center font-bold text-3xl mb-5">
        {visitingOtherProfile
          ? `Profile`
          : `Welcome👋 ${profile?.userName}`}
      </h1>
      <div>
        <ProfilePic avatar={avatar} setAvatar={setAvatar} />
      </div>
      <div className="flex flex-col gap-3 rounded-md w-full">
        <input
          onChange={handleChange}
          value={user?.userName}
          className="p-2 rounded-md border-2"
          name="userName"
          type="text"
          disabled={visitingOtherProfile}
          placeholder="Enter Username"
        />
        <input
          onChange={handleChange}
          value={user?.fullName}
          className="p-2 rounded-md border-2"
          name="fullName"
          type="text"
          disabled={visitingOtherProfile}
          placeholder="Enter Full Name"
        />
        <input
          onChange={handleChange}
          value={user?.email}
          className="p-2 rounded-md border-2"
          name="email"
          type="email"
          disabled
          placeholder="Enter VES Email ID"
        />
        <input
          onChange={handleChange}
          value={user?.password}
          className="p-2 rounded-md border-2"
          name="password"
          type="password"
          hidden={visitingOtherProfile}
          placeholder="Enter New Password"
        />
        <input
          onChange={handleChange}
          value={user?.confirmPassword}
          className="p-2 rounded-md border-2"
          name="confirmPassword"
          hidden={visitingOtherProfile}
          type="password"
          placeholder="Confirm Password"
        />
        <div>
          <button
            hidden={visitingOtherProfile}
            disabled={loading}
            onClick={handleSubmit}
            className="p-2 rounded-md bg-gray-700 text-white w-full hover:opacity-90 disabled:opacity-75"
          >
            {loading ? <Spinner /> : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Profile;
