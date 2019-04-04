import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { useMappedState, useDispatch } from "redux-react-hook";
import {fetchCity, resetCity} from "../../actions";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      color: '#ffffff',
      borderColor: '#ffffff'
    },
    dense: {
      marginTop: 16,
    },
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    }
  });

  const mapState = (state) => ({
    loadedCities: state.loadedCities
  });

  function CitySearch({classes}) {

    const [name, setName] = useState('');
    const [selectedLat, setSelectedLat] = useState();
    const [selectedLng, setSelectedLng] = useState();

    const [isOpen, setIsOpen] = useState(false);
    // const [isSelected] = useState(true);
    const { loadedCities } = useMappedState(mapState);
    const dispatch = useDispatch();
    const fetchCityDetails = useCallback(
        () => dispatch(fetchCity(name)),
      [name]
    );
    const resetLoadedCities = () => dispatch(resetCity());

    const _handleSubmit = event => {
        event.preventDefault();
        fetchCityDetails();
    };

    console.log(loadedCities);
  
    const _handleChange = event => {
        setName(event.target.value);
    };

    const _selectCity = city => {
        setSelectedLat(city.geometry.lat);
        setSelectedLng(city.geometry.lng);
        setName(city.formatted);
        resetLoadedCities();

    };

    useEffect(() => {
      if (loadedCities.city) setIsOpen(true);
      else setIsOpen(false);
    }, [loadedCities]);
  
    return (
      <form className={classes.container} noValidate autoComplete="off" onSubmit={_handleSubmit}>
          <TextField
            id="city-search"
            label="Podaj swój adres"
            className={classes.textField}
            value={name}
            onChange={_handleChange}
            margin="normal"
            variant="outlined"
            fullWidth={true}
            autoFocus
          />
          {isOpen && (
            <Paper 
              className={classes.paper}
              style={{marginLeft: '8px', marginRight: '8px', width: '100%', marginTop: '-8px'}}
              >
              {loadedCities.city && loadedCities.city.map(city => {
                return (
                  <MenuItem
                  key={city.annotations.geohash}
                  selected={true}
                  component="div"
                  style={{
                    // fontWeight: isSelected ? 500 : 400
                  }}
                  onClick={() => _selectCity(city)}
                  >
                    {city.formatted}
                  </MenuItem>
                )
              })}

            </Paper>
          )}
          {selectedLat && 
            <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image=""
                title="Twój adres"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
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
          }
      </form>
    );
  }
  
  CitySearch.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CitySearch);