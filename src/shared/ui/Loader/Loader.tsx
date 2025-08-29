import React from "react";
import "./Loader.scss";

interface LoaderProps {
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ color = "#333333" }) => {
  return (
    <div className={`loader`}>
      <div className="loader__spinner" style={{ borderColor: color }} />
    </div>
  );
};
