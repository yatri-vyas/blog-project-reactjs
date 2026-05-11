
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      textAlign: "center",
      marginTop: "100px"
    }}>
      <h1 style={{ fontSize: "60px" }}>❌</h1>
      <h2>Access Denied</h2>
      <p style={{ color: "#777" }}>
        You are not authorized to view this page.
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 24px",
          background: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}>
        Go to Home
      </button>
    </div>
  );
};

export default Unauthorized;