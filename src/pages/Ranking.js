import React, { Component } from 'react';
import Axios from 'axios';

class Ranking extends Component {
    state = {
        ranking: []
    }

    async componentDidMount() {
        const response = await Axios.get('http://localhost:3333/posts')
        this.setState({ ranking: response.data });
    }


    render() {
        return (
            <div>
                {this.state.ranking.map(ranking => (
                    <div key={ranking._id}>
                        <p>{ranking.author}</p>
                        <p>{ranking.points}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Ranking;