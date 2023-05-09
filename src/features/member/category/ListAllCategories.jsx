import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, reset } from "./categorySlice";

import { Typography, Grid, Tooltip, Box } from "@mui/material";
import { style } from "./styles";
import PropTypes from "prop-types";

const CategoryCard = ({ category }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ m: 0, p: 0 }}>
      <Tooltip title={category.description}>
        <div>
          <img
            src={category.imageUrl}
            alt={category.name}
            style={style.categoryImage}
          />
          <Typography variant="h6" sx={style.categoryTitle}>
            {category.name}
          </Typography>
        </div>
      </Tooltip>
    </Grid>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.object,
};

const CategoriesPage = () => {
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
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <Typography variant="h4" sx={{ m: 2, mt: 5, color: "#162051" }}>
        All Categories
      </Typography>
      <Grid container spacing={2} sx={{ mt: 3, ml: 2 }}>
        {console.log(categories, "from return in list all categories")}
        {categories.map(category => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </Grid>
    </Box>
  );
};

export default CategoriesPage;
