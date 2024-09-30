import { Typography, useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      <span style={{ color: theme.palette.primary.main }}>Cine</span>Verse
    </Typography>
  );
};

export default Logo;
