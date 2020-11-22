import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions'
import { Link } from 'react-router-dom'

class StreamList extends Component {
    componentDidMount() {
        this.props.fetchStreams()
    }
    renderControlButtons = (stream) => {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            )
        }
    }
    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderControlButtons(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content ">
                        <Link to={`/streams/${stream.id}`} className="ui medium header">
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            )
        })
    }
    renderCreateButton() {
        if (this.props.isSignedIn) {
            return <Link to="/streams/new" className="ui button teal right floated">Create Stream</Link>
        }
    }
    render() {
        return (
            <div>
                <h2>Stream list</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreateButton()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList)
