import { Box, Button } from "@mui/material";

import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getMembers, reset } from "./memberSlice";
import { columns, membersTableStyles } from "./TableColums";

const ListMembers = () => {
  const { members, isLoading, isError, message } = useSelector(
    state => state.members
  );
  let x = 0;
  const row = members.map(member => {
    x += 1;
    return { ...member, id: x };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

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
      <DataTable
        rows={row}
        columns={columns}
        loading={isLoading}
        sx={{
          ...membersTableStyles,
          height: () => (members.length === 0 ? "400px" : "auto"),
        }}
      />
    </>
  );
};

export default ListMembers;
