import { Box, Button } from "@mui/material";

import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getMembers, reset } from "./memberSlice";
import TableColumns, { membersTableStyles } from "./TableColums";
import TableSkleton from "../../../components/common/TableSkleton/TableSkleton";

const ListMembers = () => {
  const { members, isLoading } = useSelector(state => state.members);
  let x = 0;
  const row = members.map(member => {
    x += 1;
    return { ...member, sNo: x };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());

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
        <DataTable
          rows={row}
          columns={TableColumns()}
          loading={isLoading}
          getRowId={row => row._id}
          sx={{
            ...membersTableStyles,
            height: () => (members.length === 0 ? "400px" : "auto"),
          }}
        />
      )}
    </>
  );
};

export default ListMembers;
