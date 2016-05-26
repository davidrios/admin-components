import React from 'react'

export default class BaseTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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

      if (this.props.onUpdateInstant != null) {
        this.props.onUpdateInstant(newState.value)
      }

      return
    }

    if (this.props.onUpdate != null) {
      newState.updateTimeout = setTimeout(() => this.props.onUpdate(newState.value), this.props.updateDelay)
    }

    this.setState(newState)

    if (this.props.onUpdateInstant != null) {
      this.props.onUpdateInstant(newState.value)
    }
  }

  componentWillUnmount() {
    if (this.state.updateTimeout != null) {
      clearTimeout(this.state.updateTimeout)
    }
  }

  render() {
    return (
      <input id={this.props.inputId} type="text" value={this.state.value} placeholder={this.props.placeholder} onChange={ev => this.handleChange(ev)} />
    )
  }
}

BaseTextInput.defaultProps = {
  value: '',
  updateDelay: 200
}

BaseTextInput.propTypes = {
  inputId: React.PropTypes.string,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  onUpdate: React.PropTypes.func,
  onUpdateInstant: React.PropTypes.func,
  updateDelay: React.PropTypes.number
}
