export const styles = {
  appBar: {
    backgroundColor: theme => theme.palette.primary.main,
  },

  bookButton: {
    display: "flex",
    justifyContent: "center",
    mb: 2,
  },
  bookCard: {
    maxWidth: 345,
    margin: "1rem",
    boxShadow: 2,
  },
  bookTitle: {
    fontSize: ".9rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    height: "2.5rem",
  },
  bookAuthor: {
    color: theme => theme.palette.text.secondary,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  bookPrice: {
    fontWeight: "bold",
  },
  root: {
    padding: theme => theme.spacing(4),
    pt: 6,
  },
  cardMedia: {
    display: "block",
    p: 4,
    width: "50%",
    height: "50vh",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme => theme.spacing(1),
  },
  price: {
    marginRight: theme => theme.spacing(1),
  },
  wishlistButton: {
    marginBottom: theme => theme.spacing(2),
  },
  requestButton: {
    marginRight: theme => theme.spacing(1),
  },
};
