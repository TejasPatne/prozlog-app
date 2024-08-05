import * as React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalSpinner from "../../../utility/GlobalSpinner";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

const ProjectGrid = () => {
  const columns = [
    { field: "title", headerName: "Title", width: 400 },
    { field: "domain", headerName: "Domain", width: 200 },
    { field: "mentor", headerName: "Mentor", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 100 },
    {
      field: "view",
      headerName: "View",
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Link to={`/projects/${params.row.id}`}>
          <VisibilityIcon fontSize="small" color="primary" />
        </Link>
      ),
    },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/v1/projects");
      const data = await res.json();
      const filteredProjects = data.projects.map((project) => ({
        id: project._id,
        title: project.title,
        domain: project.domain,
        mentor: project.mentors.length > 0 ? project.mentors[0].name : "",
        createdAt: new Date(project.createdAt).toLocaleDateString("en-IN"),
      }));
      setRows([...filteredProjects]);
    };
    fetchProjects();
  }, []);

  return (
    !rows.length > 0? 
    <GlobalSpinner />:
    <div style={{ height: 400, width: "90%", margin: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={
          {
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 250 },
            },
          }
        }
      />
    </div>
  );
};

export default ProjectGrid;
