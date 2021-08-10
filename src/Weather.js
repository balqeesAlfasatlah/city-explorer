import React, { Component } from 'react'

 class Weather extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.cityDate}</h3>
                <h3>{this.props.description}</h3>
            </div>
        )
    }
}

export default Weather
