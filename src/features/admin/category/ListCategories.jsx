import { Box, Button } from "@mui/material";
import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { getAllCategories, reset } from "./categorySlice";
import TableColumns, { categoryTableStyles } from "./TableColums";
import TableSkleton from "../../../components/common/TableSkleton/TableSkleton";

const ListCategories = () => {
  const { categories, isLoading } = useSelector(state => state.categories);

  let x = 0;
  const row = categories.map(category => {
    x += 1;
    return { ...category, sNo: x };
  });

  const dispatch = useDispatch();

  useEffect(() => {
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
      {isLoading ? (
        <TableSkleton />
      ) : (
        <DataTable
          rows={row}
          columns={TableColumns()}
          loading={isLoading}
          getRowId={row => row._id}
          sx={{
            ...categoryTableStyles,
            height: () => (categories.length === 0 ? "400px" : "auto"),
          }}
        />
      )}
    </>
  );
};

export default ListCategories;
