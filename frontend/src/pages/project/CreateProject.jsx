import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SEO from '../../utility/SEO';

const CreateProject = () => {
  const [project, setProject] = useState({
    title: "",
    domain: "",
    description: "",
    video: "",
    github: "",
    mentors: [],
    team: []
  });
  const mentorRef = useRef(null);
  const teamMemberRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if(e.target.name !== "mentors" && e.target.name !== "team") {
        setProject({
            ...project,
            [e.target.name]: e.target.value
          })
    }
  }

  const handleAdd = (e) => {
    if(e.target.name === "mentors") {
        if(mentorRef.current.value.trim() === "") {
            toast.error("Mentor name cannot be empty");
            return;
        }
        if(project.mentors.some(mentor => mentor.name === mentorRef.current.value)) {
            toast.error("Already Added");
            return;
        }
        setProject({
            ...project,
            mentors: [...project.mentors, { name: mentorRef.current.value }]
        })
    }
    else if(e.target.name === "team") {
        if(teamMemberRef.current.value.trim() === "") {
            toast.error("Team member name cannot be empty");
            return;
        }
        if(project.team.includes(teamMemberRef.current.value)) {
            toast.error("Already Added");
            return;
        }
        setProject({
            ...project,
            team: [...project.team, teamMemberRef.current.value]
        })
    }
  }

  const handleDelete = (e, index) => {
    if(e.target.name === "member"){
        setProject({
            ...project,
            team: project.team.filter((_, i) => i !== index)
        })
    }
    else if(e.target.name === "mentor"){
        setProject({
            ...project, 
            mentors: project.mentors.filter((_, i) => i !== index)
        })
    }
    else {
        toast.error("Something went wrong");
    }
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!project.title.trim()) {
        toast.error("Project title cannot be empty");
        return;
    }
    if(!project.domain.trim()) {
        toast.error("Project domain cannot be empty");
        return;
    }
    if(!project.description.trim()) {
        toast.error("Project description cannot be empty");
        return;
    }
    if(project.mentors.length === 0 || project.mentors.length > 2) {
        toast.error("Please add at least one and at most two mentor");
        return;
    }
    if(project.team.length === 0) {
        toast.error("Please add at least yourself as a team member");
        return;
    }
    
    try {
        const res = await fetch("/api/v1/projects/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        const data = await res.json();
        if(data.success === true) {
            toast.success(data.message);
            setProject({
                title: "",
                domain: "",
                description: "",
                video: "",
                github: "",
                mentors: [],
                team: []
            });
            navigate(`/projects/${data.project._id}`);
        }
        else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
  }

  return (
    <section>
        {/* meta data */}
        <SEO title="Create New Project" description="Create New Project" />

        <div className='h-screen flex flex-col gap-2 justify-center items-center'>
        <div className='flex flex-col gap-2 w-[85%] md:w-[50%] md:flex-row mx-auto'>
            <div className='flex flex-col gap-3 rounded-md w-full'>
                <input onChange={handleChange} className='p-2 rounded-md border-2' name='title' type="text" placeholder='Enter Title' />
                <input onChange={handleChange} className='p-2 rounded-md border-2' name='domain' type="text" placeholder='Enter Domain' />
                <textarea onChange={handleChange} className='p-2 rounded-md border-2' name='description' placeholder='Describe Your Project' />
                <input onChange={handleChange} className='p-2 rounded-md border-2' name='video' type="text" placeholder='Enter Demo Video URL' />
                <input onChange={handleChange} className='p-2 rounded-md border-2' name='github' type="text" placeholder='Enter GitHub URL' />
            </div>
            <div className='flex flex-col gap-3 rounded-md w-full'>
                <div className='flex gap-2'>
                    <input ref={mentorRef} className='p-2 rounded-md border-2 w-full' type="text" placeholder='Enter Mentor Name' />
                    <button type='button' onClick={handleAdd} name='mentors' className='p-2 rounded-md bg-gray-700 text-white hover:opacity-90 disabled:opacity-75'>Add</button>
                </div>
                {
                    project.mentors.map((mentor, index) => (
                        <div key={mentor.name} className='flex gap-2 items-center px-2'>
                            <button onClick={(e) => handleDelete(e, index)} name='mentor' type='button' className='p-1 rounded-md text-xs bg-red-700 text-white hover:opacity-90 disabled:opacity-75'>Delete</button>
                            <p className='text-sm leading-3'>{mentor.name}</p>
                        </div>
                    ))
                }
                <div className='flex gap-2'>
                    <input ref={teamMemberRef} className='p-2 rounded-md border-2 w-full' type="email" placeholder='Enter Team Member Email' />
                    <button type='button' onClick={handleAdd} name='team' className='p-2 rounded-md bg-gray-700 text-white hover:opacity-90 disabled:opacity-75'>Add</button>
                </div>
                {
                    project.team.map((member, index) => (
                        <div key={member} className='flex gap-2 items-center px-2'>
                            <button onClick={(e) => handleDelete(e, index)} name='member' type='button' className='p-1 rounded-md text-xs bg-red-700 text-white hover:opacity-90 disabled:opacity-75'>Delete</button>
                            <p className='text-sm leading-3'>{member}</p>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='text-center align-center w-[85%] mt-5 md:w-[25%]'>
            <button onClick={handleSubmit} className='p-2 rounded-md bg-gray-700 text-white w-full hover:opacity-90 disabled:opacity-75'>Submit</button>
        </div>
    </div>
    </section>
  )
}

export default CreateProject