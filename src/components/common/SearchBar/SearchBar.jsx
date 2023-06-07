import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";

const SearchBar = ({ placeholder, onSearch, searchBarWidth }) => {
  const [search, setSearch] = useState("");

  const onChange = e => {
    setSearch(e.target.value);
    if (!e.target.value) onSearch();
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(search);
  };
  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        border: 0.1,
        borderColor: theme => theme.palette.primary.main,
        height: "2.5rem",
      }}
    >
      <Input
        placeholder={placeholder}
        onChange={onChange}
        sx={{
          width: searchBarWidth,
          color: "rgba(0, 0, 0, 0.85)",
          pl: 2,
        }}
        disableUnderline
      />
      <IconButton
        type="submit"
        sx={{
          backgroundColor: theme => theme.palette.primary.main,
          color: "white",
          borderRadius: 0,
          "&:hover": {
            backgroundColor: theme => theme.palette.primary.light,
          },
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  searchBarWidth: PropTypes.string,
};

export default SearchBar;
