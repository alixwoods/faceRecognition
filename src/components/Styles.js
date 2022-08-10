import { makeStyles } from "@material-ui/core/styles";
const useStylee = makeStyles({
  header: {
    width: "60%",
    backgroundColor: "#fff",
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerChild: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  root: {
    height: "100%",

    "& .carousel .control-arrow, .carousel.carousel-slider .control-arrow": {
      opacity: 1,
      backgroundColor: "#0000ff00",
      margin: "0px 25px",

      "&:hover": {
        transform: "scale(1.5)",
      },
    },

    "& .carousel .thumbs": {
      padding: 0,
    },
    "& .thumbs-wrapper .control-arrow": {
      display: "none",
    },
  },
  image: {
    width: "200px",
    height: "200px",
    transition: "all .5s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  snack: {
    "& .MuiSnackbarContent-root": {
      backgroundColor: "red",
      display: "flex",
      justifyContent: "center",
      fontSize: 18,
    },
  },
  imgPro: {
    width: "350px",
    height: "auto",
    transition: "all .5s",
    "&:hover": {
      transform: "scale(1.4)",
    },
  },
  imgSmall: {
    width: "100px",
    margin: "15px",
  },
  myoverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  root: {
    width: "100%",
    "& .carousel .control-arrow, .carousel.carousel-slider .control-arrow": {
      opacity: 1,
      backgroundColor: "#0000ff00",
      margin: "0px 25px",

      "&:hover": {
        transform: "scale(1.5)",
      },
    },

    "& .carousel .thumbs": {
      padding: 0,
    },
    "& .thumbs-wrapper .control-arrow": {
      display: "none",
    },
    "& .carousel .control-prev.control-arrow:before": {
      borderRight: "8px solid gray",
    },
    "& .carousel .control-next.control-arrow:before": {
      borderLeft: "8px solid gray",
    },
    '& .carousel .slider-wrapper': {
      width: "50%",
      height: "400px"
    },
    '& .MuiPaginationItem-root':{
      fontFamily:"Dirooz-FD",
    },
    '& .slider-wrapper': {
      height: "60hv !important"
    }
  },
});

export default useStylee;
