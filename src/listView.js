import React, {Component} from 'react'

class ListView extends Component {

  state = {
    listData: {}
  }

  placeClick = (place) => {
  }


  render() {
    debugger
    const searchedPlaces = this.props.places
    return(

    <div className="listView-cont">
      <ul>
        {searchedPlaces.map((place, index) => (
          <li key={index} onClick={(e) => {this.placeClick(place)}}>
            <h3>{place.name}</h3>
            { this.props.dataLoaded ?
              <ul>
                <li>place.data.pages</li>
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
