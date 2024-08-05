import React from "react";

const Mentors = ({ mentors }) => {
  return (
    <div>
      <h2 className="text-xl">Mentors: </h2>
      <ul className="grid grid-rows-2 grid-cols-2 text-gray-500">
        {mentors &&
          mentors.map((mentor) => (
            <div className="w-full" key={mentor._id}>
                <li className="leading-5">{mentor.name}</li>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default Mentors;
