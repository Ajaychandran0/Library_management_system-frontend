const PageNotFound = () => {
  const styles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "8rem",
    marginTop: "14rem",
    width: "80%",
    heigth: "100%",
  };
  return (
    <div style={styles}>
      <h1>404 ERROR !</h1>
      <h2>Page Not Found</h2>
    </div>
  );
};

export default PageNotFound;
