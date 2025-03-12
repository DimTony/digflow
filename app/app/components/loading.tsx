import React from "react";

const Loading = () => {
  return (
    <div style={styles.container}>
      <img
        style={styles.spinner}
        src="/icons/Access_logo_cut.svg"
        alt="Loading"
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#ffffff",
  },
  spinner: {
    width: "4.25rem",
    height: "4.25rem",
    border: "0.5rem solid transparent",
    animation: "spinX 2s linear infinite",
  },
};

if (typeof window !== "undefined") {
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(
    `
    @keyframes spinX {
      from {
        transform: rotateX(0deg);
      }
      to {
        transform: rotateX(360deg);
      }
    }
  `,
    styleSheet.cssRules.length
  );
}

export default Loading;
