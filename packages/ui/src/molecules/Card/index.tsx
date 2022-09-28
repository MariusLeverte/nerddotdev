import React from "react";

interface Props {
  children: React.ReactNode;
}

const Card = ({ children }: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
      {children}
    </div>
  );
};

export default Card;
