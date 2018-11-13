import React, {Component} from 'react'

class ListView extends Component {


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/> Send the clicked place to update the query <\~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\

  placeClick = (place) => {
    this.props.animateMarker(place)
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~/> Render the places! <\~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\

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
                <li><em>From wikipedia: </em>{place.data.extract}</li>
                <li></li>
              </ul>
            : null }
          </li>
        ))}
      </ul>
        {searchedPlaces.length < 5 ?
          <span className="see-all" onClick={() => this.placeClick('')}>See all locations</span>
        : null}
    </div>
    )
  }
}

export default ListView
