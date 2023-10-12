import React from "react";
import Loading from "./Loading";

const LoadingLayout = ({ children, loading }) => {
  return (
      loading ? <Loading /> : children
  );
};

export default LoadingLayout;
