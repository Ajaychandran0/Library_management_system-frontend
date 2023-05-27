import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "./categorySlice";

import { Typography, Grid, Container } from "@mui/material";
import CategoryCard from "./CategoryCard";
import { style } from "./styles";

const ListAllCategories = () => {
  const { categories } = useSelector(state => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" sx={style.heading}>
        ALL CATEGORIES
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {categories.map(category => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </Grid>
    </Container>
  );
};

export default ListAllCategories;
