import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import apiService from "../app/apiService";
import BasicPagination from "../components/BasicPagination";
import { Container, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import SearchAppBar from "../components/SearchAppBar";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [jobsInfo, setJobsInfo] = useState([]);
  const pageSize = 5;
  const totalPage = Math.round(jobsInfo.length / pageSize);
  const [jobList, setJobList] = useState(jobsInfo.slice(0, pageSize));
  let [searchParams, setSearchParams] = useSearchParams();

  const handleNextPage = (page) => {
    const nextPage = pageSize * page;
    const lastPage = pageSize * page - pageSize;
    const newJoblist = jobsInfo.slice(lastPage, nextPage);
    setJobList([...newJoblist]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("/jobs?_limit=14 ");
        setJobsInfo(response.data);
        setJobList(response.data);
        console.log();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <SearchAppBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <Container>
        <Grid container spacing={2} mt={2} wrap={"wrap"}>
          {jobList
            .filter((job) => {
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let title = job.title.toLowerCase();

              return title.startsWith(filter.toLowerCase());
            })
            .slice(0, pageSize)
            .map((job) => (
              <Grid
                item
                key={job.id}
                xs={12}
                md={6}
                lg={4}
                alignItems={"center"}
              >
                <JobCard job={job} />
              </Grid>
            ))}
        </Grid>
      </Container>
      <BasicPagination handleNextPage={handleNextPage} totalPage={totalPage} />
      <Outlet />
    </div>
  );
}

export default HomePage;
