import { Typography, Grid, Tooltip, Box } from "@mui/material";
import { getBooks, reset } from "../books/bookSlice";

import { style } from "./styles";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { basicSnackbar } from "../../../components/common/BasicSnackbar/BasicSnackbar";

const CategoryCard = ({ category }) => {
  const dispatch = useDispatch();
  const handleCategoryClick = category => {
    dispatch(getBooks(category));
  };

  const { isSuccess, isError, message } = useSelector(state => state.books);

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess && message) {
      navigate("/categories/category");
    }
    if (isError) {
      basicSnackbar({ message, severity: "error" });
    }
    return () => reset();
  }, [isSuccess, isError, message]);
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
