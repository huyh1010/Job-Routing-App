import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import BasicChips from "./SkillsList";
import { Link, useLocation } from "react-router-dom";

export default function JobCard({ job }) {
  let location = useLocation();

  // const handleOpen = (id) => {
  //   if (auth.user) return navigate(`/job/${id}`);
  //   if (!auth.user) return navigate("/login");
  // };

  return (
    <Card
      sx={{
        width: "100%",
        minWidth: "275px",
        maxWidth: "375px",
        height: "270px",
        margin: "auto",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 16, color: "text.primary", fontWeight: "bold" }}
          gutterBottom
          variant="h3"
        >
          {job.title}
        </Typography>
        <Divider />
        <BasicChips job={job} />
        <Typography
          variant="body2"
          sx={{
            fontSize: 14,
            textOverflow: "ellipsis",
            overflow: "hidden",
            height: "100px",
          }}
          mt={1}
        >
          {`${job.description} ...`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          size="small"
          sx={{
            margin: "auto",
            bgcolor: "#1976d2",
            "&:hover": { backgroundColor: "#1976d2" },
          }}
          to={`job/${job.id}`}
          // onClick={() => handleOpen(job.id)}
          state={{ backgroundLocation: location }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
