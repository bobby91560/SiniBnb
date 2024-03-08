import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";

import { Place } from "@/types";

type CardPlaceProps = {
  value: Place;
  size?: "small" | "medium";
};
export default function CardPlace({ value, size = "medium" }: CardPlaceProps) {
  const theme = useTheme();
  return (
    <Box sx={{ maxWidth: size === "small" ? 275 : "initial" }}>
      <Card
        sx={{
          padding: 1,
          borderRadius: 3,
          boxShadow: "none",
          background: theme.palette.background.default,
        }}
      >
        <CardMedia
          sx={{
            height: 200,
            borderRadius: 2,
          }}
          image={`https://source.unsplash.com/random/?appartment,house&${value.id}`}
          title={value.name}
        />
        <CardContent
          sx={{
            marginBottom: "auto",
          }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h6" component={"div"} fontWeight={"bold"}>
                {value.name}
              </Typography>
              <Box
                component={"div"}
                fontWeight={"bold"}
                alignItems={"center"}
                justifyContent={"center"}
                display={"flex"}
              >
                <StarIcon
                  fontSize={"small"}
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                />

                <span color={"primary"}>{value.review_score}</span>
              </Box>
            </Box>
            <Box
              display={"flex"}
              gap={1}
              alignItems={"center"}
              flexWrap={"nowrap"}
            >
              <LocationOnIcon color="primary" />
              <Typography fontSize={"small"}>{value.address}</Typography>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={1}
            >
              <Typography
                component={"div"}
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="body1"
              >
                <AccessTimeIcon />
                {value.host_response_rate}%
              </Typography>
              <Typography fontSize={"small"}>
                Flexibilité : {value.extension_flexibility}%
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
