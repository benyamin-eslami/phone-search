import { useState, useCallback, useEffect, memo } from "react";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Loading from "./Loading";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const ProductImages = ({ phoneName, onGetCloseState, isClose }) => {
  const [imageLists, setimageLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getProductImages = useCallback(async () => {
    setIsLoading(true);
    const api = `https://dummyjson.com/products/search?q=${phoneName}`;
    const resp = await axios.get(api);
    const dataArray = resp.data.products;
    dataArray.forEach((obj) => {
      setimageLists(obj.images);
    });

    setIsLoading(false);
  }, [phoneName]);
  useEffect(() => {
    getProductImages();
  }, [getProductImages]);

  const closeHandler = (e) => {
    onGetCloseState(true);
  };

  return (
    <>
      {!isClose && !isLoading && imageLists.length !== 0 && (
        <Box
          sx={{
            my: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={(e) => {
              closeHandler(e);
            }}
            variant="contained"
            color="error"
          >
            close
          </Button>
          <ImageList
            sx={{
              width: 500,
              height: 450,
              my: 10,
              mx: 10,
              display: "flex",
              justifyContent: "center",
            }}
            cols={3}
            rowHeight={164}
          >
            {imageLists.map((src) => (
              <ImageListItem key={src}>
                <img src={`${src}`} loading="lazy" alt={phoneName} />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default memo(ProductImages);
