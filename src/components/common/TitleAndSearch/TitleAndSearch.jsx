import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";

const TitleAndSearch = ({ title, onSearch, searchValue, placeholder }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 5,
        }}
      >
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <SearchBar
          placeholder={placeholder}
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
    </>
  );
};

TitleAndSearch.propTypes = {
  title: PropTypes.string,
  onSearch: PropTypes.func,
  searchValue: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TitleAndSearch;
