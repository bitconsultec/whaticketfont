import React, { useContext } from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../context/Auth/AuthContext.js";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    flex: 1,
    padding: theme.spacing(2),
    height: `100dvh`,
  },
  mainContainerHorizontal: {
    height: "calc(100% - 48px)",
    flex: 1,
    padding: theme.spacing(2),
  },
  contentWrapper: {
    height: "100%",
    overflowY: "hidden",
    display: "flex",
    flexDirection: "column",
  },
}));

const MainContainer = ({ children }) => {
  const classes = useStyles();
  const { isHorizontal } = useContext(AuthContext);
  return (
    <Container
      className={
        isHorizontal ? classes.mainContainerHorizontal : classes.mainContainer
      }
    >
      <div className={classes.contentWrapper}>{children}</div>
    </Container>
  );
};

export default MainContainer;
