import image from "../../../assets/images/images.jpeg";

export const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme => theme.palette.primary.main,
  },
  banner: {
    height: "25rem",
    background: `url(${image})`,
    backgroundSize: "cover",
    position: "100% 15%",

    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    color: theme => theme.palette.primary.contrastText,
    fontSize: "3rem",
  },
  bookCard: {
    maxWidth: 345,
    margin: "2rem",
  },
  bookTitle: {
    fontSize: "1rem",
  },
  bookAuthor: {
    color: theme => theme.palette.text.secondary,
  },
  bookPrice: {
    fontWeight: "bold",
  },
};
