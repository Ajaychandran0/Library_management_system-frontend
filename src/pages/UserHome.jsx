import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import image from "../assets/images/library.jpg";

const UserHome = () => {
  const navigate = useNavigate();
  const { member } = useSelector(state => state.auth);

  useEffect(() => {
    if (!member) {
      navigate("/login");
    }
  }, [member, navigate]);
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
