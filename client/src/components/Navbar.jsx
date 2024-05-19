import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Art-Catalog</h1>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#f0f0f0",
    padding: "10px",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default Navbar;
