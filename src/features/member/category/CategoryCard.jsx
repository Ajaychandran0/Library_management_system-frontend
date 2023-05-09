import { Typography, Grid, Tooltip } from "@mui/material";

import { style } from "./styles";
import PropTypes from "prop-types";

const CategoryCard = ({ category }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
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

export default CategoryCard;
