import React from "react";
import { Link } from "react-router-dom";

const Team = ({ team }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl mb-5">Team: </h2>
      <ul className="grid lg:grid-cols-2 gap-3 text-gray-500">
        {team.map((member) => (
          <li key={member._id} className="flex md:justify-start items-center gap-2">
            <div className="">
              <img className="w-14 h-14 rounded-full" src={member.avatar.url} alt="profile" />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold">{member.userName}</p>
              <Link className="text-sm text-yellow-500" to={`/profile/${member._id}`}>View Profile</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Team;
