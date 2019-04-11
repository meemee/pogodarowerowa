import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import useTimeout from "../../hooks/useTimeout";
import { useMappedState, useDispatch } from "redux-react-hook";
import { fetchCity, resetCity } from "../../actions";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import Navigation from "@material-ui/icons/Navigation";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: "#ffffff",
    borderColor: "#ffffff"
  },
  dense: {
    marginTop: 16
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  progress: {
    width: "20px!important",
    height: "20px!important"
  },
  icon: {
    fontSize: "12px!important",
    lineHeight: "1.2!important"
  }
});

const mapState = state => ({
  loadedCities: state.loadedCities
});

function CitySearch({ classes }) {
  const [name, setName] = useState("");
  const [selectedLat, setSelectedLat] = useState();
  const [selectedLng, setSelectedLng] = useState();

  const { start, clear } = useTimeout(() => {
    clear();
    fetchCityDetails();
    console.log("fetch");
  }, 2000);

  const [isOpen, setIsOpen] = useState(false);
  // const [isSelected] = useState(true);
  const { loadedCities } = useMappedState(mapState);
  const { isFetching } = loadedCities;
  const dispatch = useDispatch();
  const fetchCityDetails = useCallback(() => dispatch(fetchCity(name)), [name]);
  const resetLoadedCities = () => dispatch(resetCity());

  const _handleSubmit = event => {
    event.preventDefault();
    fetchCityDetails();
  };

  const _handleChange = event => {
    setName(event.target.value);
  };

  const _selectCity = city => {
    setSelectedLat(city.geometry.lat);
    setSelectedLng(city.geometry.lng);
    setName(city.formatted);
    resetLoadedCities();
  };

  useEffect(
    () => {
      if (loadedCities.city && loadedCities.city.length > 0) setIsOpen(true);
      else setIsOpen(false);
    },
    [loadedCities]
  );

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={_handleSubmit}
    >
      <TextField
        id="city-search"
        label="Podaj swój adres"
        className={classes.textField}
        value={name}
        onChange={_handleChange}
        margin="normal"
        variant="outlined"
        fullWidth
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {isFetching ? (
                <CircularProgress className={classes.progress} />
              ) : (
                <Navigation />
              )}
            </InputAdornment>
          )
        }}
      />
      {isOpen && name !== "" && (
        <Paper
          className={classes.paper}
          style={{
            marginLeft: "8px",
            marginRight: "8px",
            width: "100%",
            marginTop: "-8px"
          }}
        >
          {loadedCities.city &&
            loadedCities.city.map(city => {
              return (
                <MenuItem
                  key={city.annotations.geohash}
                  selected
                  component="div"
                  style={
                    {
                      // fontWeight: isSelected ? 500 : 400
                    }
                  }
                  onClick={() => _selectCity(city)}
                >
                  {city.formatted}
                </MenuItem>
              );
            })}
        </Paper>
      )}
      {selectedLat && (
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia className={classes.media} image="" title="Twój adres" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography component="p">
                <Icon className={classes.icon} color="primary">
                  navigation
                </Icon>{" "}
                Lat: {selectedLat}, Lng: {selectedLng}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      )}
    </form>
  );
}

CitySearch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CitySearch);
