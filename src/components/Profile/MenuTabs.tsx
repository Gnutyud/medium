import React from "react";
import { Tab, Tabs, Paper, Box } from "@material-ui/core";

interface Props {
  tab1: string;
  tab2: string;
}
export default function MenuTabs(props: Props) {
  const [value, setValue] = React.useState(2);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box width="100%">
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example">
        <Tab label={props.tab1} />
        <Tab label={props.tab2} />
      </Tabs>
    </Box>
  );
}
