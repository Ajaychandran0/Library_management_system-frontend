import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, reset } from "./categorySlice";

import { Typography, Grid, Box } from "@mui/material";
import CategoryCard from "./CategoryCard";
import { style } from "./styles";

const ListAllCategories = () => {
  const { categories } = useSelector(state => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());

    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <Box sx={{ overflowX: "hidden", m: 5 }}>
      <Typography variant="h4" sx={style.heading}>
        ALL CATEGORIES
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
