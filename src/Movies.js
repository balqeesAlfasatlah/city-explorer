import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export class Movies extends Component {
    render() {
        return (
            <div>
                {console.log(this.props)}
                {this.props.show &&
                this.props.movieData.map(country => {
       
                    return (
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={country.image_url} />
                    <Card.Body>
                        <Card.Title>
                            {country.title} | {country.released_on}   | Popularity : {country.popularity}
                        </Card.Title>
                        <Card.Text>
                            {country.average_votes} | {country.total_votes}
                        </Card.Text>
                    </Card.Body>

                </Card>)
            })}
            </div>
        )
    }
}

export default Movies;
