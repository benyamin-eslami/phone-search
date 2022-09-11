import { useEffect, useCallback, useState } from "react";
import ProductImages from "./ProductImages";
import axios from "axios";
import Card from "@mui/material/Card";
import Loading from "./Loading";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./Products.module.css";

const Products = ({ inputData }) => {
  const [phoneLists, setPhoneLists] = useState([]);
  const [isClose, setClose] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState("");
  const getProduct = useCallback(async () => {
    setIsLoading(true);
    const api = `https://dummyjson.com/products/search?q=${inputData}`;
    const resp = await axios.get(api);
    const dataArray = await resp.data.products;

    setPhoneLists(dataArray);
    // dataArray.forEach((dataObj) => {});
    setIsLoading(false);
  }, [inputData]);
  useEffect(() => {
    getProduct();
  }, [getProduct]);
  const cardClickHandler = (e, title) => {
    setClose(false);

    setIsClicked(true);
    setName(title);
  };

  const closeStateHandler = (value) => {
    setClose(value);
  };

  return (
    <>
      {!isLoading && phoneLists.length !== 0 && (
        <div className={styles.cardContainer}>
          {phoneLists.map((phone) => {
            return (
              <Card
                key={phone.id}
                onClick={(e) => {
                  cardClickHandler(e, phone.title);
                }}
                sx={{
                  minWidth: 275,
                  width: "100%",
                  background: `url(${phone.thumbnail})  no-repeat center top  `,
                  cursor: "pointer",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {phone.title}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {phone.description}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {phone.price} $
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      {isLoading && <Loading />}
      {phoneLists.length === 0 && <h1>Not Found</h1>}
      {isClicked && (
        <ProductImages
          isClose={isClose}
          onGetCloseState={closeStateHandler}
          phoneName={name}
        />
      )}
    </>
  );
};

export default Products;
