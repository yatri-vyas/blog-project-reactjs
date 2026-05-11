const Loader = () => {
  return (
    <div style={{
      textAlign: "center",
      marginTop: "80px"
    }}>
      <div style={{
        width: "50px",
        height: "50px",
        border: "6px solid #f3f3f3",
        borderTop: "6px solid #3498db",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        margin: "0 auto"
      }} />
      <p style={{ marginTop: "16px", color: "#555" }}>Loading...</p>

      {/* CSS animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;