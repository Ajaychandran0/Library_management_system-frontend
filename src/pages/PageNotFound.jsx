const PageNotFound = () => {
  const styles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "82px",
  };
  return (
    <div style={styles}>
      <h1>404 ERROR !</h1>
      <h2>Page Not Found</h2>
    </div>
  );
};

export default PageNotFound;
