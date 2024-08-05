import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router-dom";
import SEO from "../../utility/SEO";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* metadata */}
      <SEO title="View All Projects" description="List of all projects" name="Vivekanand Education Society's Institute of Technology, Chembur" type="website" />

      <StyledTableRow>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <Link className="underline" to={row.id}>{row.title}</Link>
        </StyledTableCell>
        <StyledTableCell>{row.domain}</StyledTableCell>
        <StyledTableCell>{row.mentor}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Team
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Member</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {row.team.length > 0 && row.team.map((teamRow, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {teamRow.userName}
                      </StyledTableCell>
                      <StyledTableCell>{teamRow.email}</StyledTableCell> 
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    team: PropTypes.arrayOf(
      PropTypes.shape({
        userName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      })
    ),
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    mentor: PropTypes.string.isRequired,
  }).isRequired,
};

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/v1/projects");
      const data = await res.json();
      const filteredProjects = data.projects.map((project) => ({
        id: project._id,
        title: project.title,
        domain: project.domain,
        mentor: project.mentors.length > 0 ? project.mentors[0].name : "",
        team: project.team,
      }));
      setProjects([...filteredProjects]);
    };
    fetchProjects();
  }, []);

  return (
    <div className="w-[85%] mx-auto mt-10">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell />
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Domain</StyledTableCell>
              <StyledTableCell>Mentor</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {projects.length > 0 &&
              projects.map((row, index) => <Row key={index} row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Projects;
