import React, { Component, createRef } from 'react'
import flv from 'flv.js'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'

class StreamShow extends Component {
    constructor(props) {
        super(props)
        this.videoRef = createRef();
    }
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
        // this.buildPlayer()
    }
    componentDidUpdate() {
        this.buildPlayer()
    }
    componentWillUnmount() {
        this.player.destroy()
    }
    buildPlayer() {
        if (this.player || !this.props.stream) {
            return
        }
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current)
        this.player.load()
    }
    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        const { title, description } = this.props.stream
        return (
            <div>
                <video ref={this.videoRef} volume={0.5} style={{ width: "100%" }} controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}


export default connect(mapStateToProps, { fetchStream })(StreamShow)
