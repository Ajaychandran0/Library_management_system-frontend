import { Typography, Container, Box } from "@mui/material";
import { userHomeStyles as styles } from "./styles";
import ListAllBooks from "../features/member/books/ListAllBooks";
import SearchBar from "../components/common/SearchBar/SearchBar";
import { useState } from "react";

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 5,
          }}
        >
          <Typography variant="h4" sx={styles.pageTitle}>
            ALL BOOKS
          </Typography>
          <SearchBar
            placeholder="Search by Title, Author or ISBN"
            searchBarWidth="30rem"
            onSearch={onSearch}
          />
        </Box>
        {searchValue ? (
          <Typography sx={{ m: 3 }}>
            showing results for{" "}
            <span style={{ fontWeight: "bold" }}>{`"${searchValue}"`}</span>
          </Typography>
        ) : (
          ""
        )}

        <ListAllBooks searchValue={searchValue} />
      </Container>
    </Box>
  );
};

export default UserHome;
