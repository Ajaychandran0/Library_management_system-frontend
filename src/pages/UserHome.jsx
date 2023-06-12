import { Container, Box } from "@mui/material";
import { userHomeStyles as styles } from "./styles";
import ListAllBooks from "../features/member/books/ListAllBooks";
import { useState } from "react";
import TitleAndSearch from "../components/common/TitleAndSearch/TitleAndSearch";

const UserHome = () => {
  const [searchValue, setSearchValue] = useState("");
  const onSearch = search => {
    setSearchValue(search);
  };
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
        <TitleAndSearch
          title="ALL BOOKS"
          placeholder="Search by Title, Author or ISBN"
          onSearch={onSearch}
          searchValue={searchValue}
        />
        <ListAllBooks searchValue={searchValue} />
      </Container>
    </Box>
  );
};

export default UserHome;
