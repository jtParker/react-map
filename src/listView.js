import React, {Component} from 'react'

class ListView extends Component {

  state = {
    listData: {}
  }

  placeClick = (place) => {
    this.props.animateMarker(place)
  }

  render() {
    const searchedPlaces = this.props.places
    return(

    <div className="listView-cont">
      <ul>
        {searchedPlaces.map((place, index) => (
          <li key={index} onClick={() => this.placeClick(place.name)}>
            <h3>{place.name}</h3>
            { this.props.dataLoaded ?
              <ul>
                <li><em>Wiki: </em>{place.data.extract}</li>
                <li></li>
              </ul>
            : null }
              <ul>
                <li></li>
              </ul>
          </li>
        ))}
      </ul>

    </div>
    )
  }

}

export default ListView
