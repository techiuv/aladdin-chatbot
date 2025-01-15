import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "Aladdin - ChatBot",
  description = "this is a default description",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      {/* <meta description=/> */}
    </Helmet>
  );
};

export default Title;
