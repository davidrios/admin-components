import React from 'react'

import BaseTextInput from './base-text-input'

export default class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: props.hasError
    }
  }

  handleUpdateInstant(val) {
    if (this.props.validator != null) {
      this.setState({ hasError: !this.props.validator(val) })
    }
  }

  render() {
    return (
      <div className={this.props.className + (this.state.hasError ? ' has-danger' : '')}>
        <label htmlFor={this.props.inputId}>{this.props.label}</label>
        <BaseTextInput inputId={this.props.inputId} value={this.props.value} placeholder={this.props.placeholder} updateDelay={this.props.updateDelay}
                       onUpdate={this.props.onUpdate} onUpdateInstant={val => this.handleUpdateInstant(val)} />
        {this.props.errorText.length ? <small>{this.props.errorText}</small> : null}
        {this.props.helpText.length ? <small>{this.props.helpText}</small> : null}
      </div>
    )
  }
}

TextInput.defaultProps = {
  className: '',
  helpText: '',
  errorText: '',
  hasError: false
}

TextInput.propTypes = {
  className: React.PropTypes.string,
  hasError: React.PropTypes.bool,
  inputId: React.PropTypes.string,
  label: React.PropTypes.string,
  errorText: React.PropTypes.string,
  helpText: React.PropTypes.string,
  validator: React.PropTypes.func
}
