import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyles();

  // ✅ Run after render, not during render
  useEffect(() => {
    if (selected && refProp?.current) {
      refProp.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected, refProp]);

  return (
    <Card ref={refProp} elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place?.photo?.images?.large?.url ||
          "https://wallpaperaccess.com/full/3014609.jpg"
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>

        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>

        {place?.rating && (
          <Box display="flex" justifyContent="space-between" my={2}>
            <Rating value={Number(place.rating)} readOnly />
            <Typography component="legend">
              {place.num_reviews} review
              {place.num_reviews > 1 && "s"}
            </Typography>
          </Box>
        )}

        {place?.awards?.map((award, i) => (
          <Box
            key={i}
            my={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}

        {place?.cuisine?.map(({ name }) => (
          <Chip
            key={name}
            size="small"
            label={name}
            className={classes.chip}
          />
        ))}

        {place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> {place.address}
          </Typography>
        )}

        {place?.phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}

        <CardActions>
          {place?.web_url && (
            <Button
              size="small"
              color="primary"
              onClick={() =>
                window.open(place.web_url, "_blank")
              }
            >
              Trip Advisor
            </Button>
          )}
          {place?.website && (
            <Button
              size="small"
              color="primary"
              onClick={() =>
                window.open(place.website, "_blank")
              }
            >
              Website
            </Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;

