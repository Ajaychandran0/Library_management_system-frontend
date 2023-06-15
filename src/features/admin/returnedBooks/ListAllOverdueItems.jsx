import { Box, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllOverdueItems } from "./returnedBookSlice";

import TableSkeleton from "../../../components/common/TableSkleton/TableSkleton";
import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import overdueItemsTableStyles from "./tableStyles";
import TableColumns from "./TableColumns";

const ListAllOverdueItems = () => {
  const {
    overdueItems,
    totalOverdueItems,
    issueLoading,
    handlePagination,
    paginationModel,
  } = useOverdueItemsList();

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
        <Typography variant="h5">OVERDUE ITEMS</Typography>
        <SearchBar
          placeholder="Search a book or a member"
          searchBarWidth="30rem"
        />
      </Box>

      {issueLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          rowCount={totalOverdueItems}
          rows={overdueItems}
          columns={TableColumns()}
          loading={issueLoading}
          getRowId={row => row._id}
          paginationModel={paginationModel}
          handlePagination={handlePagination}
          sx={{
            ...overdueItemsTableStyles,
            height: () => (totalOverdueItems === 0 ? "400px" : "auto"),
          }}
        />
      )}
    </>
  );
};

const useOverdueItemsList = () => {
  const dispatch = useDispatch();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { overdueItems, totalOverdueItems, issueLoading } = useSelector(
    state => state.returnedBooks
  );

  const handlePagination = paginationModel => {
    setPaginationModel(paginationModel);
  };

  useEffect(() => {
    dispatch(getAllOverdueItems(paginationModel));
  }, [paginationModel]);

  return {
    overdueItems,
    totalOverdueItems,
    issueLoading,
    handlePagination,
    paginationModel,
  };
};

export default ListAllOverdueItems;
