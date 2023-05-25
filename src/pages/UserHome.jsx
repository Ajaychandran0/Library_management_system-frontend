import { Typography, Container, Box } from "@mui/material";
import { userHomeStyles as styles } from "./styles";
import ListAllBooks from "../features/member/books/ListAllBooks";

const UserHome = () => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.banner}>
        <Box sx={{ width: "60%" }} />
        <Box sx={{ mr: 6 }}>
          <h4>Digital BookStore</h4>
          <p style={{ fontSize: "1.5rem" }}>
            Discover a new chapter in reading with us
          </p>
        </Box>
      </Box>

      <Container maxWidth="lg">
        <Typography variant="h4" sx={styles.pageTitle}>
          ALL BOOKS
        </Typography>
        <ListAllBooks />
      </Container>
    </Box>
  );
};

export default UserHome;
