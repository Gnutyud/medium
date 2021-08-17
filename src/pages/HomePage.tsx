import React from "react";
import { Grid } from "@material-ui/core";
import Articles from "../components/Home/Articles";
import TagsBox from "../components/Home/TagsBox";

const Home = () => {
  return (
    <h1>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={9}>
          <Articles />
        </Grid>
        <Grid item xs={12} lg={3}>
          <TagsBox />
        </Grid>
      </Grid>
    </h1>
  );
};
export default Home;
