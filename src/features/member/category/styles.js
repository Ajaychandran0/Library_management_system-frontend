export const style = {
  heading: {
    fontSize: 28,
    mt: 3,
    color: theme => theme.palette.primary.main,
  },
  categoryCard: {
    p: 2,
  },
  categoryImage: {
    width: "100%",
    height: "11rem",
    objectFit: "cover",
    borderRadius: theme => theme.shape.borderRadius,
  },
  categoryTitle: {
    fontWeight: theme => theme.typography.fontWeightBold,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "18rem",
    mt: 1,
  },
  catImageBox: {
    backgroundColor: "#dddddd",
  },
};
