import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <h1>Hello! Welcome to LibreGainz</h1>

      {/* Render the image */}
      <img 
        src="/gainzTux.jpg" 
        alt="Gainz Tux" 
        style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }} 
      />


      <p>
        <li>LibreGainz is a highly customizable workout app designed to be simple yet flexible. <br /></li>
        <li>In the future, users will be able to create their own workout forms.</li>
      </p>

    </div>



  );
};

export default Home;
