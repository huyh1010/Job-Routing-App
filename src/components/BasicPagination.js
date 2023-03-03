import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({ totalPage, handleNextPage }) {
  return (
    <Stack spacing={2} mt={2} alignItems={"center"}>
      <Pagination
        count={totalPage}
        color="button"
        onChange={(e, page) => handleNextPage(page)}
      />
    </Stack>
  );
}
