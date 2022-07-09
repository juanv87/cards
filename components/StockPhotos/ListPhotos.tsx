import React, { useEffect, useState } from "react";
import PhotoExample from "./PhotoExample";
import { createApi } from "unsplash-js";

interface Props {
  titleValue?: string;
}

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: "5sAgC_3Los38lzmsqle3d2FAzLRFG8yPU-sdBscGA90",
});

const ListPhotos = ({ titleValue }: Props) => {
  const [data, setPhotosResponse] = useState(null);
  useEffect(() => {
    api.search
      .getPhotos({ query: titleValue, orientation: "landscape", perPage: 3 })
      .then((result) => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [titleValue]);
  {
    console.log(data);
  }
  return (
    <>
      {/* <PhotoExample photo={data?.response.results[0]} /> */}
      <ul className="flex justify-around">
        {data?.response.results.map((photo) => (
          <li key={photo.id} className="li">
            <PhotoExample photo={photo} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListPhotos;
