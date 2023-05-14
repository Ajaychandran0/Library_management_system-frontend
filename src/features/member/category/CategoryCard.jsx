import { Typography, Grid, Tooltip, Box } from "@mui/material";

import { style } from "./styles";
import PropTypes from "prop-types";

const CategoryCard = ({ category }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={style.categoryCard}>
      <Tooltip title={category.description}>
        <Box height="11rem" sx={style.catImageBox}>
          <img
            src={category.imageUrl}
            alt="Category Image"
            style={style.categoryImage}
            height="11rem"
          />
        </Box>
      </Tooltip>
      <Tooltip title={category.name}>
        <Typography variant="h6" sx={style.categoryTitle}>
          {category.name}
        </Typography>
      </Tooltip>
    </Grid>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.object,
};

export default CategoryCard;
