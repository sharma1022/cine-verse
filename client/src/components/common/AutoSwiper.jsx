import { Box } from "@mui/material";
import { Swiper } from "swiper/react";
import { useState, useEffect } from "react";
import { Navigation, Keyboard } from "swiper/modules";

const AutoSwiper = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20.5%",
          },
        },
      }}
    >
      <Swiper
        slidesPerView="auto"
        grabCursor={true}
        style={{
          width: "100%",
          height: "max-content",
          "--swiper-theme-color": "#ff0000",
        }}
        navigation={!isMobile}
        loop={true}
        keyboard={true}
        spaceBetween={20}
        modules={[Navigation, Keyboard]}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;
