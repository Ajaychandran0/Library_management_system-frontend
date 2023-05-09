import image from "../assets/images/library.jpg";

const UserHome = () => {
  return (
    <div>
      <p> User Home</p>
      <p style={{ marginLeft: "550px" }}>Welcome to Horizon Library</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default UserHome;
