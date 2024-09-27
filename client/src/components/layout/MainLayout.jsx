import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      {/* Global Loading */}
      {/* Login Modal */}
      <Box display="flex" minHeight="100vh">
        {/* header */}
        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>
      {/* footer */}
    </>
  );
};

export default MainLayout;
