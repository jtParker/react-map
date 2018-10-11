import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {

  render() {
    return (
      <Map google={this.props.google}
          initialCenter={{lat: 40.758839,
                          lng: -111.888028}}
          zoom={14}>


        <Marker onClick={this.onMarkerClick}
                name={'Current location'}
                />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              {/* <h1>{this.state.selectedPlace.name}</h1> */}
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCqWyAR87G3Rjq8n9WEYzsMsM7MePoN5o4')
})(MapContainer)
