// app/loading.js

export default function Loading() {
  return (
    <div style={styles.container}>
      <span className="loader"></span>
      <p>Loading...</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    flexDirection: "column",
  },
  spinner: {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #E65800",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    animation: "spin 2s linear infinite",
  },
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
  ".loader": {
    width: "48px",
    height: "48px",
    border: "5px solid #FFF",
    "border-bottom-color": "transparent",
    "border-radius": "50%",
    display: "inline-block",
    "box-sizing": "border-box",
    animation: "rotation 1s linear infinite",
  },

  "@keyframes rotation": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
};
