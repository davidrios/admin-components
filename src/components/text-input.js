import React from 'react'

export default class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: props.hasError,
      value: props.value,
      updateTimeout: null
    }
  }

  handleChange(ev) {
    if (this.state.updateTimeout != null) {
      clearTimeout(this.state.updateTimeout)
    }

    let newState = { value: ev.target.value, updateTimeout: null }

    if (this.props.updateDelay == 0) {
      this.setState(newState)

      if (this.props.onUpdate != null) {
        this.props.onUpdate(newState.value)
      }

      return
    }

    if (this.props.onUpdate != null) {
      newState.updateTimeout = setTimeout(() => this.props.onUpdate(newState.value), this.props.updateDelay)
    }

    this.setState(newState)
  }

  componentWillUnmount() {
    if (this.state.updateTimeout != null) {
      clearTimeout(this.state.updateTimeout)
    }
  }

  render() {
    return (
      <div className={this.props.className + (this.state.hasError ? ' has-danger' : '')}>
        <label htmlFor={this.props.inputId}>{this.props.label}</label>
        <input id={this.props.inputId} type="text" value={this.state.value} placeholder={this.props.placeholder} onChange={ev => this.handleChange(ev)} />
        {this.props.errorText.length ? <small>{this.props.errorText}</small> : null}
        {this.props.helpText.length ? <small>{this.props.helpText}</small> : null}
      </div>
    )
  }
}

TextInput.defaultProps = {
  value: '',
  className: '',
  helpText: '',
  errorText: '',
  hasError: false,
  updateDelay: 200
}

TextInput.propTypes = {
  className: React.PropTypes.string,
  hasError: React.PropTypes.bool,
  inputId: React.PropTypes.string,
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  errorText: React.PropTypes.string,
  helpText: React.PropTypes.string,
  onUpdate: React.PropTypes.func,
  updateDelay: React.PropTypes.number
}
