export const styles = {
  root: {
    P: 4,
    m: 6,
    mt: 9,
  },
  card: {
    display: "flex",
    mb: 2,
    backgroundColor: theme => theme.palette.grey[100],
  },
  cardContent: {
    flex: "1 1 auto",
  },
  cardMedia: {
    flex: "0 0 auto",
    width: 100,
    height: 150,
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "3rem",
  },
};
