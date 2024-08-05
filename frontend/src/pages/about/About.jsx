import React from "react";
import SEO from "../../utility/SEO";

const About = () => {
  const teachers = [
      {
          name: "Dr. Vijayalakshmi Pandit",
          photoURL: "https://vesit.ves.ac.in/storage/faculty/vijayalaxmi.jpeg",
          position: "Vice Principal & Department HOD"
      },
      {
          name: "Dr. Anjali Shrikant Yeole",
          photoURL: "https://vesit.ves.ac.in/storage/faculty/anjali_mam.jpg" ,
          position: "Department Deputy HOD"
      },
      {
          name: "Mrs. Sangeeta Oswal",
          photoURL: "https://vesit.ves.ac.in/storage/faculty/1587730043Sangeeta%20Oswal.jpg" ,
          position: "Assistant Professor"
      },
      {
          name: "Mr. Ajinkya Valanjoo",
          photoURL: "https://vesit.ves.ac.in/storage/faculty/1585259817Ajinkya%20V.jpg",
          position: "Assistant Professor" 
      },
      {
          name: "Mr. Amit Singh",
          photoURL: "https://vesit.ves.ac.in/storage/faculty/1586847238amitsingh.jpg",
          position: "Assistant Professor"
      },
  ]
  return (
    <section>
      {/* metadata */}
      <SEO title="About Us" description="Know more about us" name="Vivekanand Education Society's Institute of Technology, Chembur" type="website" />
      
      <div className="flex flex-col gap-20 p-5 md:p-10">
      <div className="flex flex-col gap-1">
      <h1 className="text-3xl md:text-5xl font-bold">Vivekanand Education Society's Institute of Technology, Chembur</h1>
      <h2 className="text-xl bg-yellow-400 w-fit italic mt-5 mb-5">Department of AI and Data Science</h2>
      <p className="text-gray-600 ">
        This website is built to showcase the final year projects of the BE
        students from the Department of AI and Data Science at VESIT. It serves
        as a platform to highlight the innovative and diverse projects
        undertaken by our students, offering valuable insights and inspiration
        to junior students on how to approach and execute their own final year
        projects. By sharing detailed project descriptions, methodologies, and
        outcomes, we aim to foster a culture of learning and creativity within
        the department.
      </p>
      </div>
      <div>
        <h1 className="text-3xl md:text-5xl font-bold">Our Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5">
          {teachers.map((teacher, index) => (
            <div
              className="flex flex-col items-center gap-5 shadow-lg p-5 rounded-lg"
              key={teacher.name}
            >
              <img
                src={teacher.photoURL}
                alt={teacher.name}
                className="w-40 h-40 rounded-full"
                loading="lazy"
              />
              <div>
              <h1 className="text-lg font-semibold">{teacher.name}</h1>
              <p className="text-gray-600">{teacher.position}</p>
              </div>
            </div>
          ))}
      </div>
      </div>
    </div>
    </section>
  );
};

export default About;
