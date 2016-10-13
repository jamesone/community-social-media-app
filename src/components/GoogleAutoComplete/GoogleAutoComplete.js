var {GooglePlacesAutocomplete,} = require('react-native-google-places-autocomplete');
import React, {PropTypes,} from 'react';


var AutoCompleteComponent = React.createClass({
  PropTypes: {
    _onAutoCompleteChange: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string,
  },

  render() {

    return (
      <GooglePlacesAutocomplete
        placeholder='Enter the location'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          // console.log(details);
          const location = {
            address: data.description,
            longitude: details.geometry.location.lng,
            latitude: details.geometry.location.lat,
            suburb: details.vicinity,
            mapsUrl: details.mapsUrl
          };
          this.props._onAutoCompleteChange(location)
          // this.onChange(location);
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyD7uW5yOgL5TiB9OAVR1q1ixuGpX94BIo0',
          language: 'en', // language of the results
          types: ['cities', 'street_address', 'locality'], // default: 'geocode'
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}

        // TODO ADD THIS IN -> You must change some setting somewhere
        // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        // currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: ['food',],
        }}


        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      />
    );
  }
});

export default AutoCompleteComponent;
