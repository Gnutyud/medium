import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, CardContent, CardHeader, Chip } from "@material-ui/core";

const useStyles = makeStyles({
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
  },
  tag: {
    marginRight: "10px",
  },
});

const TagsBox = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Card className={classes.root}>
        <CardHeader title="Popular Tags" />
        <CardContent>
          <Chip className={classes.tag} label="Basic" />
          <Chip className={classes.tag} label="Basic" />
          <Chip className={classes.tag} label="Basic" />
          <Chip className={classes.tag} label="Basic" />
          <Chip className={classes.tag} label="Basic" />
          <Chip className={classes.tag} label="Basic" />
          <Chip className={classes.tag} label="Basic" />
        </CardContent>
      </Card>
    </Box>
  );
};

export default TagsBox;
