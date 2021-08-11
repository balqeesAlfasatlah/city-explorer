// import React, { Component } from 'react'

//  class Weather extends Component {
//     render() {
//         return (
//             <div>
//                 <h3>{this.props.cityDate}</h3>
//                 <h3>{this.props.description}</h3>
//             </div>
//         )
//     }
// }

// export default Weather


import react from 'react';

class Weather extends react.Component {
  render() {
    return (
      <div>
        {this.props.weatherStatus.map(element => {
          return (
            <>
              <br />
              <h2>{element.date}</h2>
              <h2>{element.description}</h2>
            </>
          )
        })}

      </div>
    )
  }
}
export default Weather;