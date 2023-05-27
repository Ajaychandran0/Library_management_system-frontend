import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ListAllBooks from "./ListAllBooks";

const ListBooksByCategory = () => {
  const { category } = useParams();

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{
          m: 2,
          mt: 8,
          fontSize: 28,
          color: theme => theme.palette.primary.main,
        }}
      >
        {category}
      </Typography>

      <ListAllBooks filter={{ category }} />
    </Container>
  );
};

export default ListBooksByCategory;
