import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import useStyles from "./styles";

const Header = ({ setCoordinates }) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        
        <Typography variant="h5" className={classes.title}>
          Travion
        </Typography>

        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            The World, Simplified
          </Typography>

          {/* ---------- AUTOCOMPLETE FIXED WRAPPER ---------- */}
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              {/* REAL INPUT ELEMENT PASSED TO GOOGLE PLACES */}
              <InputBase
                inputRef={(ref) => {
                  if (ref && autocomplete) {
                    // Attach real input element to Google Autocomplete
                    autocomplete.gm_accessors_?.input?.set(ref);
                  }
                }}
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
