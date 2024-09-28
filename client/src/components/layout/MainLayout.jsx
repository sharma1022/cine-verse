import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

const MainLayout = () => {
  return (
    <>
      {/* Global Loading */}
      <GlobalLoading />
      {/* Login Modal */}
      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Navbar />
        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>
      {/* footer */}
      <Footer />
    </>
  );
};

export default MainLayout;
