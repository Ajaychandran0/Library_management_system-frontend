import { Box, Button } from "@mui/material";

import DataTable from "../../../components/common/DataTable/DataTable";
import SearchBar from "../../../components/common/SearchBar/SearchBar";

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getMembers, reset, notSuccess } from "./memberSlice";

const columns = [
  { field: "id", headerName: "No.", width: 60 },
  { field: "name", headerName: "Name", width: 180 },
  { field: "collegeId", headerName: "College ID", width: 185 },
  { field: "email", headerName: "E-mail", width: 210 },
  { field: "phone", headerName: "Phone No.", width: 190 },
  { field: "department", headerName: "Department", width: 190 },
];

const userTableStyles = {
  height: "auto",
  backgroundColor: theme => theme.palette.grey[200],
};

const ListMembers = () => {
  const { members, isSuccess, isError, message } = useSelector(
    state => state.members
  );

  let x = 0;
  const row = members.map(member => {
    x += 1;
    return { ...member, id: x };
  });

  const { admin } = useSelector(state => state.admin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
    }
    if (isError) {
      console.log(message);
    }
    dispatch(getMembers());
    if (isSuccess) {
      console.log("again stupid idea");
      dispatch(notSuccess);
    }

    return () => {
      dispatch(reset());
    };
  }, [admin, navigate]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="add-member">
          <Button variant="outlined" sx={{ m: 3 }}>
            Add Members
          </Button>
        </Link>
        <SearchBar placeholder="Search a member..." searchBarWidth="30rem" />
      </Box>
      <DataTable
        rows={row}
        columns={columns}
        loading={!members.length}
        sx={{
          ...userTableStyles,
          height: () => (members.length === 0 ? "400px" : "auto"),
        }}
      />
    </>
  );
};

export default ListMembers;
