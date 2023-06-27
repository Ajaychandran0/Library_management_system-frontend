import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

const LoadingPage = () => {
  return (
    <Box sx={styles.root}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;
