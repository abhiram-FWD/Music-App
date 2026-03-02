import React from "react";

const SearchBar = ({ setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search songs..."
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        padding: "8px",
        width: "100%",
        borderRadius: "6px",
      }}
    />
  );
};

export default SearchBar;
