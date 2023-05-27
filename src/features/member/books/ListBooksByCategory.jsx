import { Box, Typography } from "@mui/material";
// import { useParams } from "react-router-dom";
import ListAllBooks from "./ListAllBooks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { reset } from "./bookSlice";

const ListBooksByCategory = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => dispatch(reset());
  // }, []);

  // const params = useParams();
  return (
    <Box>
      <Typography>Category</Typography>
      <ListAllBooks />
    </Box>
  );
};

export default ListBooksByCategory;
