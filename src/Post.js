import React from "react";

function Post(props) {
  const { value, color } = props;
  return (
    <>
      <div
        style={{
          backgroundColor: `${color}`,
          width: "50rem",
          color: "white",
          borderColor: "white",
          borderWidth: "2px",
          height: "5rem",
          padding: "1rem",
          borderRadius: "30px",
          margin: "1rem 1rem",
        }}
      >
        <h1>{value}</h1>
      </div>
    </>
  );
}

export default Post;
