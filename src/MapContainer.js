import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import escapeRegExp from 'escape-string-regexp'


class MapContainer extends Component {

  state = {
    places: [
      {
        name: 'Clark Planetarium',
        position: {lat: 40.766965, lng: -111.902901},
      },
      {
        name: 'Vivint Smart Home Arena',
        position: {lat: 40.768279, lng: -111.901112},
      },
      {
        name: 'Red Iguana',
        position: {lat: 40.771896, lng: -111.912514},
      },
      {
        name: 'Liberty Park',
        position: {lat: 40.744719, lng: -111.875414},
      },
      {
        name: 'Trolley Square',
        position: {lat: 40.757014, lng: -111.872223},
      }
    ],
    query : ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render() {
    let searchedPlaces
    const places = this.state.places
    const query = this.state.query

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      searchedPlaces = places.filter((places) => match.test(places.name))
    } else {
      searchedPlaces = this.state.places
    }

    return (
      <div className="container">
        <div className="search-container">
          <input
              className='search-places'
              type='text'
              placeholder='Click To Search Places'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
        </div>

        <div className="map-container">
        <Map google={this.props.google}
             zoom={14}
            initialCenter={{lat: 40.758839,
                            lng: -111.888028}}
          >
            {searchedPlaces.map((place, index) => (
              <Marker
                key={index}
                title={place.name}
                name={place.name}
                position={place.position}
              />

            ))}

          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
              </div>
          </InfoWindow>

        </Map>
      </div>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCqWyAR87G3Rjq8n9WEYzsMsM7MePoN5o4')
})(MapContainer)
