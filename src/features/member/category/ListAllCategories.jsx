import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, reset } from "./categorySlice";

import { Typography, Grid, Box } from "@mui/material";
import CategoryCard from "./CategoryCard";

const ListAllCategories = () => {
  const { categories, isError, message } = useSelector(
    state => state.categories
  );

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
    <Box sx={{ overflowX: "hidden", m: 5 }}>
      <Typography variant="h4" sx={{ color: "#162051", mt: 3 }}>
        All Categories
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {categories.map(category => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </Grid>
    </Box>
  );
};

export default ListAllCategories;
