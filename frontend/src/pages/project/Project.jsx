import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Team from "./components/Team";
import Mentors from "./components/Mentors";
import SEO from "../../utility/SEO";
import { useAuthContext } from "../../context/AuthContext";
import EditIcon from '@mui/icons-material/Edit';

const Project = () => {
  const [project, setProject] = useState({
    title: "",
    domain: "",
    description: "",
    video: "ha",
    github: "",
    mentors: [],
    team: [],
    createdBy: null,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/v1/projects/${id}`);
        const data = await res.json();
        if(data.success === true){
          setProject(data.project);
        }
        else{
          navigate("/projects");
        }
      } catch (error) {
        
      }
    };
    fetchData();
  }, [id, project.title]);

  return (
    <section>
      {/* metadata */}
      <SEO title={project.title} description={project.description} name="Vivekanand Education Society's Institute of Technology, Chembur" type="website" />

      <div className="flex flex-col text-left w-[85%] mt-10 mx-auto">
      <h1 className="text-3xl w-full font-bold mb-5">{project.title}</h1>
      <h2>{project.domain} </h2>
      <div>
        {
          project?.createdBy?._id === authUser?._id ?
          <Link to={`/projects/${project._id}/update`} className="bg-yellow-500 text-white text-sm font-semibold px-2 py-1 my-2 rounded-md cursor-pointer"><EditIcon fontSize="small" /> Edit</Link> : 
          <h3 className="italic text-gray-500">by {project?.createdBy?.userName ?? "Anonymous" }</h3>
        }
      </div>
      {/* <div className="grid md:grid-cols-4 place-content-between my-5 gap-5">
        <div className="flex flex-col col-span-3">
            <p className="text-gray-500">{project.description}</p>
            <a href={project.video} className="text-yellow-500 underline underline-offset-4 italic cursor-pointer">Demo</a>
            <a href={project.github} className="text-yellow-500 underline underline-offset-4 italic cursor-pointer">Code</a>
        </div>
        <div className="col-span-1">
            <Mentors mentors={project.mentors} />
            <Team team={project.team} />
        </div>
      </div> */}
      <div className="flex flex-col md:flex-row my-5 gap-5">
        <div className="flex flex-col flex-1">
            <p className="text-gray-500">{project.description}</p>
            <a target="_blank" href={project.video} className="text-yellow-500 underline underline-offset-4 italic cursor-pointer">Demo</a>
            <a target="_blank" href={project.github} className="text-yellow-500 underline underline-offset-4 italic cursor-pointer">Code</a>
        </div>
        <div className="flex-grow-0 col-span-1">
            <Mentors mentors={project.mentors} />
            <Team team={project.team} />
        </div>
      </div>
    </div>
    </section>
  );
};

export default Project;
