import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");





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
  return (
    <div className="container">




      <h1>Hello! Welcome to LibreGainz</h1>
      <p>
        LiberGainz is a highly customizable workout app designed to be simple yet flexable. <br></br>

      
      </p>








    </div>
  );
};

export default Home;
