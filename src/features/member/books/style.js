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
};
