import { Box, Button } from "@mui/material";

import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getMembers, reset } from "./memberSlice";
import TableColumns, { membersTableStyles } from "./TableColums";
import TableSkleton from "../../../components/common/TableSkleton/TableSkleton";

const ListMembers = () => {
  const { members, totalMembers, isLoading } = useSelector(
    state => state.members
  );

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  let x = paginationModel.page * paginationModel.pageSize;
  const row = members.map(member => {
    x += 1;
    return { ...member, sNo: x };
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = memberData => {
    navigate("/admin/members/edit", { state: { memberData } });
  };

  const handlePagination = paginationModel => {
    setPaginationModel(paginationModel);
    dispatch(getMembers(paginationModel));
  };

  useEffect(() => {
    dispatch(getMembers(paginationModel));

    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="add">
          <Button variant="outlined" sx={{ m: 3 }}>
            Add Members
          </Button>
        </Link>
        <SearchBar placeholder="Search a member..." searchBarWidth="30rem" />
      </Box>
      {isLoading ? (
        <TableSkleton />
      ) : (
        <MemoizedDataTable
          rowCount={totalMembers}
          rows={row}
          columns={TableColumns(handleEdit)}
          loading={isLoading}
          getRowId={row => row._id}
          paginationModel={paginationModel}
          handlePagination={handlePagination}
          sx={{
            ...membersTableStyles,
            height: () => (members.length === 0 ? "400px" : "auto"),
          }}
        />
      )}
    </>
  );
};

const MemoizedDataTable = React.memo(DataTable);
export default ListMembers;
