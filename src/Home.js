import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import ReactLoading from "react-loading";

function Home() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchColor();
  }, []);

  const fetchColor = async () => {
    try {
      setLoading(true);
      const response = await axios
        .get("https://backend-search-color-gbjx.vercel.app/post/search/")
        .then(setLoading(false));
      setSearch(response.data.colors);
      console.log(response.data.colors);
      setNotFound(false);
    } catch (e) {
      console.log(e);
    }
  };

  const searchHandle = async (e) => {
    if (e === "") {
      fetchColor();
    }
    try {
      setLoading(true);
      const searchResult = await axios
        .get(`https://backend-search-color-gbjx.vercel.app/post/search/${e}`)
        .then(setLoading(false));
      setSearch(searchResult.data.colors);
      setNotFound(false);
      if (searchResult.data.colors.length === 0) {
        setNotFound(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <input
          style={{
            width: "50%",
            marginTop: "2rem",
            height: "2rem",
            fontSize: "1.5rem",
            borderWidth: "3px",
            borderRadius: "5px",
          }}
          type="search"
          onChange={(e) => {
            searchHandle(e.target.value);
          }}
          placeholder="Search Color"
        />
      </div>
      {loading && (
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ReactLoading
            type={"spin"}
            color={"red"}
            height={"10%"}
            width={"10%"}
          />
        </div>
      )}

      {search && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {search &&
            search.map((e) => <Post value={e.color} color={e.value} />)}
        </div>
      )}
      {notFound && <h1>Not Found</h1>}
    </div>
  );
}

export default Home;
