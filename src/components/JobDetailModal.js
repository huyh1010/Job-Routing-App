import React, { useState } from "react";
import { Box } from "@mui/material";
import { Modal } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { Stack } from "@mui/material";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import apiService from "../app/apiService";

export default function JobDetailModal() {
  const { id } = useParams();
  const [job, setJob] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [id]);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        bgcolor={"white"}
        sx={{
          width: "600px",
          height: "300px",
          textAlign: "center",
          border: "2px solid",
          bgcolor: "modal.default",
        }}
        p={1}
      >
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          sx={{ fontWeight: "bold" }}
        >
          {job?.title}
        </Typography>
        <Divider />
        <Typography
          id="modal-modal-description"
          sx={{
            mt: 2,
            textOverflow: "ellipsis",
            overflow: "hidden",
            fontSize: "15px",
            marginBottom: "10px",
          }}
        >
          {job.description && job.description.slice(0, 150)}
        </Typography>
        <Typography variant="p" sx={{ fontWeight: "bold" }}>
          Skills
        </Typography>
        <Stack direction="row" spacing={1} mt={1} justifyContent={"center"}>
          {job.skills &&
            job.skills.slice(0, 4).map((skill) => (
              <Chip
                label={skill}
                size="medium"
                sx={{
                  fontSize: "8px",
                  bgcolor: "secondary.main",
                  color: "text1.primary",
                }}
              />
            ))}
        </Stack>
        <Typography
          sx={{ display: "block", fontWeight: "bold" }}
          variant="p"
          mt={2}
          mb={2}
        >{`City: ${job.city}`}</Typography>
      </Box>
    </Modal>
  );
}
