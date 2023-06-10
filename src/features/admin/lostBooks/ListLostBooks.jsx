import { Box, Typography } from "@mui/material";
import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import TableSkeleton from "../../../components/common/TableSkleton/TableSkleton";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllLostBooks } from "./lostBookSlice";

import TableColumns from "./TableColumns";
import lostBooksTableStyles from "./tableStyles";

const ListLostBooks = () => {
  const { lostBooks, totalLostBooks, lostLoading } = useSelector(
    state => state.lostBooks
  );

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const dispatch = useDispatch();

  const handlePagination = paginationModel => {
    setPaginationModel(paginationModel);
    dispatch(getAllLostBooks(paginationModel));
  };

  useEffect(() => {
    dispatch(getAllLostBooks(paginationModel));
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItem: "center",
          my: 3,
        }}
      >
        <Typography variant="h5">LOST BOOKS</Typography>
        <SearchBar placeholder="Search lost books..." searchBarWidth="30rem" />
      </Box>

      {lostLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          rowCount={totalLostBooks}
          rows={lostBooks}
          columns={TableColumns()}
          loading={lostLoading}
          getRowId={row => row._id}
          paginationModel={paginationModel}
          handlePagination={handlePagination}
          sx={{
            ...lostBooksTableStyles,
            height: () => (totalLostBooks === 0 ? "400px" : "auto"),
          }}
        />
      )}
    </>
  );
};

export default ListLostBooks;
