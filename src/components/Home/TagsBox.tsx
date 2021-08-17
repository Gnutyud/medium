import React, { useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, CardContent, CardHeader, Chip } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTags, tagsAsync } from "../../app/reducers/tagSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 330,
    maxWidth: 350,
  },
  container: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "20px",
    width: "100%",
    minHeight: "300px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  tag: {
    marginRight: "10px",
  },
}));

const TagsBox = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const tagsFetchFromApi = useAppSelector(selectTags);

  // fetch tags
  useEffect(() => {
    dispatch(tagsAsync());
  }, [dispatch]);

  // limit tags list
  const tagsList = tagsFetchFromApi.slice(0, 21);

  return (
    <Box className={classes.container}>
      <Card className={classes.root}>
        <CardHeader title="Popular Tags" />
        <CardContent>
          {tagsList.map((tag) => {
            return <Chip className={classes.tag} key={nanoid()} label={tag} />;
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TagsBox;
