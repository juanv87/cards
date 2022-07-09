import Image from "next/image";
import React from "react";
type Photo = {
  id: number;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
};
const PhotoExample: React.FC<{ photo: Photo }> = ({ photo }) => {
  const { user, urls } = photo;

  return (
    <>
      <img width="100" alt={user.name} className="img" src={urls.regular} />
      {/* <a
        rel="noopener noreferrer"
        className="credit"
        target="_blank"
        href={`https://unsplash.com/@${user.username}`}
      >
        {user.name}
      </a> */}
    </>
  );
};

export default PhotoExample;
