import React from 'react';

import MapView from 'react-native-maps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class MapLayout extends React.Component {
  static PropTypes = {
    'region': React.PropTypes.object,
    'annotations': React.PropTypes.array,
    'markers': React.PropTypes.array,
    'all': React.PropTypes.bool,
    'feed': React.PropTypes.bool,
  };

  render() {
    let {region, annotations, markers, all, feed,} = this.props;

    // If we're not parsing any props but all = true; (used in routes file)
    if (all) {
      region = {
        longitude: feed.posts[0].longitude,
        latitude: feed.posts[0].latitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      }
      markers = feed.posts.map ( (post) => {
        return {
          longitude: post.longitude,
          latitude: post.latitude,
          title: post.user.name,
          description: post.description,
        }
      });

    }

    return (

      <MapView
          style={{flex: 1,}}
          initialRegion={region}
      >
       {markers.map( (marker, i) => (
          <MapView.Marker
            coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
            title={marker.title}
            description={marker.description}
            onSelect={ (coord) => {console.log (coord, "Pressed on pin")}}
            key={i}
          />
        ))}
      </MapView>
    )
  }

}

// Redux stuff below (all of this will be parsed down to feedcomponent):
function mapStateToProps(state) {
  const { feed, } = state;

  return {
    feed,
  }
}

export default connect(
  mapStateToProps,
  null,
)(MapLayout);
