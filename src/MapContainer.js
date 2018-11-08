import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import ListView from './ListView'
import escapeRegExp from 'escape-string-regexp'
import poweredByFsq from './powered-by-foursquare-blue.png'
import burger from './burger.png'

class MapContainer extends Component {

  state = {
    places: [
      {
        name: 'Clark Planetarium',
        position: {lat: 40.766965, lng: -111.902901},
        fsqId: '4ad4f28ff964a52071fd20e3',
        fsqData: {}
      },
      {
        name: 'Vivint Smart Home Arena',
        position: {lat: 40.768279, lng: -111.901112},
        fsqId: '4b15506df964a5208db023e3',
        fsqData: {}
      },
      {
        name: 'Red Iguana',
        position: {lat: 40.771896, lng: -111.912514},
        fsqId: '4adf49fff964a5201f7921e3',
        fsqData: {}
      },
      {
        name: 'Liberty Park',
        position: {lat: 40.744719, lng: -111.875414},
        fsqId: '4ad4f28ff964a52064fd20e3',
        fsqData: {}
      },
      {
        name: 'Trolley Square',
        position: {lat: 40.757014, lng: -111.872223},
        fsqId: '4ad4f291f964a52027fe20e3',
        fsqData: {}
      }
    ],
    query : '',
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    fsqLoaded: false,
    isOpen: false
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  getData = (loc) => {
    console.log(loc)
    const id = loc
    let url = 'https://api.foursquare.com/v2/venues/' + id + '?client_secret=L53CQE4JEBEZ5MFFFS4R3ZQZ3RSHMBRLUF0CCAHI4OQN4ELB&client_id=J5ANJA3OTXFY4BC4ITIRPLYZJ4EVZKBT5S0FI0ESGPEQXFOI&v=20181023'
    fetch(url).then(results => {
      return results.json()
    }).then(data => {
      let fsqResults = data.response
      this.setState({
        fsqLoaded: true,
        fsqData: fsqResults
      })
    }).catch(err => {
      console.log(err)
    })
  }

  onMarkerClick = (props, marker, e) => {
      this.getData(props.fsq)
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow:true
      })
    }

  onMapClicked = (props) => {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      fsqLoaded: false
    })
  }

  openMenu = () => {
    if (!this.state.isOpen) {
      this.setState({isOpen: true})
    } else {
      this.setState({isOpen: false})
    }
  }

  render() {
    let searchedPlaces
    const places = this.state.places
    const query = this.state.query
    const squareData = this.state.fsqData
    const loaded = this.state.fsqLoaded

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      searchedPlaces = places.filter((places) => match.test(places.name))
    } else {
      searchedPlaces = this.state.places
    }

    return (
      <div className="container">
        <div className="search-container">
        <img className="burger-menu" onClick={this.openMenu} src={burger} alt="hambuger menu"/>
          <input
              className='search-places'
              type='text'
              placeholder='Search Places'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
        </div>
        <div className="inner-container">
            <div className="list-container">
              { this.state.isOpen ? <ListView places={searchedPlaces} fsqData={this.state.fsqData} dataLoaded={this.state.fsqLoaded} getData={this.getData}></ListView> : null }
            </div>

            <div className="map-container">
            <Map google={this.props.google}
                 zoom={14}
                 onClick={this.onMapClicked}
                initialCenter={{lat: 40.758839,
                                lng: -111.888028}}
              >
                {searchedPlaces.map((place, index) => (
                  <Marker
                    key={index}
                    title={place.name}
                    name={place.name}
                    position={place.position}
                    fsq={place.fsqId}
                    onClick={this.onMarkerClick}
                  />

                ))}
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  >
                    <div className="info-window">
                      <h1>{this.state.selectedPlace.name}</h1>
                      {loaded &&
                        <ul>
                          <li>{squareData.venue.contact.formattedPhone}</li>
                          <li style={{ color: '#' + squareData.venue.ratingColor}}>Rating: {squareData.venue.rating}</li>
                          <li><img className="fsq-logo" src={poweredByFsq} alt="Powered by Foursquare"/></li>
                        </ul>
                      }
                    </div>
                </InfoWindow>
            </Map>
          </div>
        </div>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCqWyAR87G3Rjq8n9WEYzsMsM7MePoN5o4')
})(MapContainer)
