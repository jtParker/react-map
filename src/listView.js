import React, {Component} from 'react'

class ListView extends Component {

  state = {
    listData: {}
  }

  placeClick = (place) => {
    const id = place.fsqId
    this.props.getData(id)
  }


  render() {
    const searchedPlaces = this.props.places
    const squareData = this.props.fsqData
    return(

    <div className="listView-cont">
      <ul>
        {searchedPlaces.map((place, index) => (
          <li key={index} onClick={(e) => {this.placeClick(place)}}>
            <h3>{place.name}</h3>
            { this.props.dataLoaded ?
              <ul>
                <li>{squareData.venue.contact.formattedPhone}</li>
                <li>{squareData.venue.contact.formattedPhone}</li>
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
