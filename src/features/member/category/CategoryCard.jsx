import { Typography, Grid, Tooltip, Box } from "@mui/material";
import { style } from "./styles";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleCategoryClick = category => {
    navigate(`${category}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={style.categoryCard}>
      <Tooltip title={category.description}>
        <Box
          height="11rem"
          sx={style.catImageBox}
          onClick={() => {
            handleCategoryClick(category.name);
          }}
        >
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
