import { Box, Button } from "@mui/material";
import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";

import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAllCategories, reset } from "./categorySlice";
import TableColumns, { categoryTableStyles } from "./TableColums";
import TableSkleton from "../../../components/common/TableSkleton/TableSkleton";

const ListCategories = () => {
  const { categories, totalCategories, isLoading } = useSelector(
    state => state.categories
  );

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  let x = paginationModel.page * paginationModel.pageSize;
  const row = categories.map(category => {
    x += 1;
    return { ...category, sNo: x };
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = catData => {
    navigate("/admin/categories/edit/", { state: { catData } });
  };

  const handlePagination = paginationModel => {
    setPaginationModel(paginationModel);
    dispatch(getAllCategories(paginationModel));
  };

  useEffect(() => {
    dispatch(getAllCategories(paginationModel));

    return () => dispatch(reset());
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
        <MemoizedDataTable
          rowCount={totalCategories}
          rows={row}
          columns={TableColumns(handleEdit)}
          loading={isLoading}
          getRowId={row => row._id}
          paginationModel={paginationModel}
          handlePagination={handlePagination}
          sx={{
            ...categoryTableStyles,
            height: "27.5rem",
          }}
        />
      )}
    </>
  );
};

const MemoizedDataTable = React.memo(DataTable);

export default ListCategories;
