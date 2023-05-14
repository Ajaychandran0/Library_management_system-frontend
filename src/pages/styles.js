import image from "../assets/images/images.jpeg";

export const userHomeStyles = {
  pageTitle: {
    m: 2,
    mt: 5,
    fontSize: 28,
    color: theme => theme.palette.primary.main,
  },
  root: {
    flexGrow: 1,
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
};
