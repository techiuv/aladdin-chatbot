import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "../components/shared/ProgressBar";

const PageNotFound = () => {
  return (
    <>
      <ProgressBar />

      <div className="flex items-center justify-center min-h-screen bg-dark">
        <div className="text-center px-6 py-12 md:px-12">
          <h1 className="text-5xl font-bold text-white mb-4">404</h1>
          <p className="text-2xl text-gray-400 mb-6">Page Not Found</p>
          <p className="text-lg text-gray-500 mb-8">
            Sorry, the page you are looking for does not exist. You might have
            mistyped the address or the page may have moved.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
