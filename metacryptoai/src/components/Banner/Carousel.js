import { makeStyles } from "tss-react/mui";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles((theme) => ({
  carousel: {
    paddingBottom: "88px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      height: "40%",
      marginTop: "48px",
    },
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    background: "#a5a5a540",
    backdropFilter: "blur(13px)",
    padding: "10px",
    borderRadius: "6px",
    width: "250px",
    height: "180px",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "165px",
      height: "174px",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  // const user = useContext(Crypto);

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    console.log("You are in the fetchTrendingCoins");
    console.log(data);
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  console.log(trending);

  const classes = useStyles();

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: 600,
            }}
          >
            {profit > 0 ? "+" : " "}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <>
      <div className={classes.carousel}>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
      </div>
    </>
  );
};

export default Carousel;