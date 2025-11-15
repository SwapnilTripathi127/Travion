import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  // Filter based on rating
  useEffect(() => {
    const filtered = places.filter(
      (place) => Number(place.rating) > rating
    );
    setFilteredPlaces(filtered);
  }, [rating, places]);

  // Fetch places when bounds or type changes
  useEffect(() => {
    if (bounds?.sw && bounds?.ne) {
      setIsLoading(true);

      console.log("Fetching data for:", type);
      console.log("Bounds:", bounds);

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          console.log(`${type.toUpperCase()} API data:`, data);

          // Filter out empty or invalid places
          setPlaces(
            data?.filter(
              (place) => place.name && place.num_reviews > 0
            )
          );

          setFilteredPlaces([]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching places:", err);
          setIsLoading(false);
        });
    }
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />

      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={
              filteredPlaces.length ? filteredPlaces : places
            }
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={
              filteredPlaces.length ? filteredPlaces : places
            }
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;


