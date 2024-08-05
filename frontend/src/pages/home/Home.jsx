import React from "react";
import ProjectsGrid from "./components/ProjectsGrid";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import seniors1 from "/seniors/seniors1.webp";
import seniors2 from "/seniors/seniors2.webp";
import seniors3 from "/seniors/seniors3.webp";
import seniors4 from "/seniors/seniors4.webp";
import seniors5 from "/seniors/seniors5.webp";
import seniors6 from "/seniors/seniors6.webp";
import { Link } from "react-router-dom";
import SEO from "../../utility/SEO";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
  const { authUser } = useAuthContext();
  const itemData = [
    {
      img: seniors1,
      title: "ATS competition",
    },
    {
      img: seniors2,
      title: "Hackathon",
    },
    {
      img: seniors3,
      title: "Trophy",
    },
    {
      img: seniors6,
      title: "Entire Class",
    },
    {
      img: seniors4,
      title: "Blackbook",
    },
    {
      img: seniors5,
      title: "Presentation",
    },
    {
      img: seniors3,
      title: "Sink",
    },
  ];
  return (
    <section>
      {/* metadata */}
      <SEO title="Home" description="Know more about us" name="Vivekanand Education Society's Institute of Technology, Chembur" type="website" />

      <div className="flex flex-col gap-10">
      <div className="flex flex-col justify-center items-center gap-10 px-5 py-10 md:p-20 home-poster md:flex-row">

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl md:text-5xl">
            Know How Your Seniors Did Their Final Year Project
          </h1>
          <p className="text-gray-500">
            This is intiative project by VESIT, Department of AI and Data
            Science. We aim to help students get their final year projects done.{" "}
          </p>
          <Link to={authUser? "/projects/new": "/signin"} className="mt-5 bg-gray-700 w-40 hover:opacity-90 border text-white py-2 px-4 rounded-md">
            Add Your Project
          </Link>
        </div>

        <div>
          <Box sx={{ width: 400, height: 250, overflowY: "clip", overflowX: "clip" }}>
            <ImageList variant="masonry" cols={3} gap={8}>
              {itemData.map((item) => (
                <ImageListItem key={item.title}>
                  <img
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </div>
      </div>

      <ProjectsGrid />
    </div>
    </section>
  );
};

export default Home;
