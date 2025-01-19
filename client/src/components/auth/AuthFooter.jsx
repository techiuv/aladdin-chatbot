import React from "react";
import { Link } from "react-router-dom";

const AuthFooter = ({ text, route, routeTo }) => {
  return (
    <div>
      <p className="md:-lg sm:text-[1rem] text-sm text-textlight">
        {text}
        <Link to={`/auth/${route}`} className="text-white underline">
          {routeTo}
        </Link>
      </p>
    </div>
  );
};

export default AuthFooter;
