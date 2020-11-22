import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }
    renderActions() {
        return (
            <Fragment>
                <button onClick={() => this.props.deleteStream(this.props.match.params.id)}
                    className="ui negative button">Delete</button>
                <button onClick={() => history.goBack()} className="ui button">Cancel</button>
            </Fragment>
        )
    }
    renderContent() {
        if (!this.props.stream) {
            return "Loading..."
        }
        return `Are you sure you want to delete the stream with title: "${this.props.stream.title}"`
    }

    render() {
        return (
            <Modal
                onDismiss={() => history.goBack()}
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)
