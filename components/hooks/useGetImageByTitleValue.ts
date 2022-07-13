import React, { useEffect, useState } from "react";
import { createApi } from "unsplash-js";

const useGetImageByTitleValue = (titleValue = "cat") => {
  const [image, setImage] = useState({});

  const api = createApi({
    accessKey: "5sAgC_3Los38lzmsqle3d2FAzLRFG8yPU-sdBscGA90",
  });

  useEffect(() => {
    api.search
      .getPhotos({
        query: titleValue,
        orientation: "portrait",
        perPage: 1,
      })
      .then((result) => {
        setImage(
          result.response !== undefined
            ? result.response.results[0].urls.regular
            : {}
        );
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);

  return image;
};

export default useGetImageByTitleValue;
