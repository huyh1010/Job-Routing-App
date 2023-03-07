import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function BasicChips({ job }) {
  const jobSkills = job.skills;
  return (
    <Stack direction="row" spacing={1} mt={1}>
      {jobSkills.slice(0, 4).map((skill) => (
        <Chip
          label={skill}
          size="small"
          sx={{
            fontSize: "8px",
            bgcolor: "secondary.main",
            color: "text1.primary",
          }}
        />
      ))}
    </Stack>
  );
}
