import { Box, Button } from "@mui/material";
import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { getAllCategories, reset } from "./categorySlice";
import { columns, categoryTableStyles } from "./TableColums";

const ListCategories = () => {
  const { categories, isLoading, isError, message } = useSelector(
    state => state.categories
  );

  let x = 0;
  const row = categories.map(category => {
    x += 1;
    return { ...category, id: x };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAllCategories());

    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="add">
          <Button variant="outlined" sx={{ m: 3 }}>
            Add New Category
          </Button>
        </Link>
        <SearchBar placeholder="Search a category..." searchBarWidth="30rem" />
      </Box>
      <DataTable
        rows={row}
        columns={columns}
        loading={isLoading}
        sx={{
          ...categoryTableStyles,
          height: () => (categories.length === 0 ? "400px" : "auto"),
          mt: 5,
        }}
      />
    </>
  );
};

export default ListCategories;
