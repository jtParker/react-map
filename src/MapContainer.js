import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import ListView from './listView.js'
import escapeRegExp from 'escape-string-regexp'
import burger from './burger.png'

class MapContainer extends Component {

  state = {
      places: [
        {
          name: 'Clark Planetarium',
          position: {lat: 40.766965, lng: -111.902901},
          data: {}
        },
        {
          name: 'Vivint Smart Home Arena',
          position: {lat: 40.768279, lng: -111.901112},
          data: {}
        },
        {
          name: 'Hogle Zoo',
          position: {lat: 40.7502, lng: -111.8141},
          data: {}
        },
        {
          name: 'Liberty Park',
          position: {lat: 40.744719, lng: -111.875414},
          data: {}
        },
        {
          name: 'Trolley Square',
          position: {lat: 40.757014, lng: -111.872223},
          data: {}
        }
      ],
      query : '',
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      listMarker:'',
      loaded: false,
      isOpen: false
    }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  getClarkData = () => {
    let url = 'https://en.wikipedia.org/api/rest_v1/page/summary/Clark_Planetarium'
    fetch(url).then(results => {
      return results.json()
    }).then(data => {
      let wikiResults = data
      let copiedPlaces = JSON.parse(JSON.stringify(this.state.places))
      copiedPlaces[0].data = wikiResults
      this.setState({
        places: copiedPlaces
      })
    }).catch(err => {
      console.log(err)
    })
  }

  getVivintData = () => {
    let url = 'https://en.wikipedia.org/api/rest_v1/page/summary/Vivint_Smart_Home_Arena'
    fetch(url).then(results => {
      return results.json()
    }).then(data => {
      let wikiResults = data
      let copiedPlaces = JSON.parse(JSON.stringify(this.state.places))
      copiedPlaces[1].data = wikiResults
      this.setState({
        places: copiedPlaces
      })
    }).catch(err => {
      console.log(err)
    })
  }

  getZooData = () => {
    let url = 'https://en.wikipedia.org/api/rest_v1/page/summary/Hogle_Zoo'
    fetch(url).then(results => {
      return results.json()
    }).then(data => {
      let wikiResults = data
      let copiedPlaces = JSON.parse(JSON.stringify(this.state.places))
      copiedPlaces[2].data = wikiResults
      this.setState({
        places: copiedPlaces
      })
    }).catch(err => {
      console.log(err)
    })
  }

  getLibertyData = () => {
    let url = 'https://en.wikipedia.org/api/rest_v1/page/summary/Liberty_Park_(Salt_Lake_City)'
    fetch(url).then(results => {
      return results.json()
    }).then(data => {
      let wikiResults = data
      let copiedPlaces = JSON.parse(JSON.stringify(this.state.places))
      copiedPlaces[3].data = wikiResults
      this.setState({
        places: copiedPlaces
      })
    }).catch(err => {
      console.log(err)
    })
  }

  getTrolleyData = () => {
    let url = 'https://en.wikipedia.org/api/rest_v1/page/summary/Trolley_Square'
    fetch(url).then(results => {
      return results.json()
    }).then(data => {
      let wikiResults = data
      let copiedPlaces = JSON.parse(JSON.stringify(this.state.places))
      copiedPlaces[4].data = wikiResults
      this.setState({
        places: copiedPlaces
      })
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    Promise.all([
      this.getClarkData(),
      this.getVivintData(),
      this.getZooData(),
      this.getLibertyData(),
      this.getTrolleyData()
    ]).then(() => {
        this.setState({
          loaded: true
        })
      }
    )
  }

  animateMarker = (place) => {
    this.setState({
      listMarker: place
    })
  }

  resetState = () => {
    this.setState({state: this.state})
  }

  onMarkerClick = (props, marker, e) => {
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
      loaded: false
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
    const listMarker = this.state.listMarker

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      searchedPlaces = places.filter((places) => match.test(places.name))
    } else {
      searchedPlaces = this.state.places
    }

    return (
      <div className="container">
        <div className="search-container">
        <img className="burger-menu" onClick={this.openMenu} src={burger} alt="hamburger menu"/>
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
              { this.state.isOpen ? <ListView places={searchedPlaces} data={this.state.data} dataLoaded={this.state.loaded} animateMarker={this.animateMarker}></ListView> : null }
            </div>

            <div className="map-container" >
            <Map google={this.props.google}
                 zoom={12}
                 onClick={this.onMapClicked}
                initialCenter={{lat: 40.758839,
                                lng: -111.888028}}
              >
                {searchedPlaces.map((place, index) => (

                  <Marker
                    animation={place.name === listMarker ? this.props.google.maps.Animation.DROP : null}
                    key={index}
                    title={place.name}
                    name={place.name}
                    position={place.position}
                    fsq={place.fsqId}
                    data={place.data}
                    onClick={this.onMarkerClick}
                  />

                ))}
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  >
                    <div className="info-window">
                      <h2>{this.state.selectedPlace.name}</h2>
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
