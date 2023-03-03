import { Modal } from "@mui/material";
import LoginForm from "./LoginForm";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
    console.log("inside");
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
        width={"550px"}
        height={"370px"}
        textAlign={"center"}
        sx={{
          px: "20px",
          py: "20px",
          position: "relative",
          bgcolor: "white",
          border: "2px black solid",
        }}
      >
        <LoginForm />
      </Box>
    </Modal>
  );
}
