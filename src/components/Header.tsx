import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Logo from "../../resources/logo.png";
import InputAutoComplete from "./InputAutoComplete";

type HeaderProps = {
  handleOnSelectLocation: (
    coordonnate?: google.maps.LatLngLiteral,
    zoom?: number
  ) => Promise<void>;
  setSearch: (search: boolean) => void;
};

export default function Header({ handleOnSelectLocation }: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="header"
      display={"flex"}
      flexDirection={isMobile ? "column" : "row"}
      padding={4}
      alignItems={"center"}
      gap={1}
      sx={{
        background: theme.palette.primary.main,
      }}
    >
      <img src={Logo} alt={"logo"} width={"140px"}></img>
      <Box width={isMobile ? "100%" : "50%"}>
        <InputAutoComplete onChange={handleOnSelectLocation} />
      </Box>
    </Box>
  );
}
