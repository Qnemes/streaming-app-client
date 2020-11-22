import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues)
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter title: " />
                <Field name="description" component={this.renderInput} label="Enter description: " />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = formReceivedValues => {
    const errors = {}
    if (!formReceivedValues.title) {
        errors.title = "You must enter a title"
    }
    if (!formReceivedValues.description) {
        errors.description = "Please provide a description"
    }
    return errors
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm)
