import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import BaseFormInput from './base'
import { makePropsSubset } from '../utils'


export class BaseTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      updateTimeout: null
    }

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentWillUnmount() {
    if (this.state.updateTimeout != null) {
      clearTimeout(this.state.updateTimeout)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
  }

  changeValue(val) {
    if (this.state.updateTimeout != null) {
      clearTimeout(this.state.updateTimeout)
    }

    let newState = { value: val, updateTimeout: null }

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

  focus() {
    this.inputRef.focus()
  }

  handleInputFocus(ev) {
    if (this.props.onFocus != null) {
      this.props.onFocus(ev)
    }
  }

  handleInputBlur(ev) {
    if (this.props.onBlur != null) {
      this.props.onBlur(ev)
    }
  }

  render() {
    return (
      <input ref={el => this.inputRef = el}
             type="text"
             value={this.state.value}
             placeholder={this.props.placeholder}
             onChange={ev => this.changeValue(ev.target.value)}
             onFocus={ev => this.handleInputFocus(ev)}
             onBlur={ev => this.handleInputBlur(ev)} />
    )
  }
}

BaseTextInput.defaultProps = {
  value: '',
  updateDelay: 200
}

BaseTextInput.propTypes = {
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  updateDelay: React.PropTypes.number,
  onUpdate: React.PropTypes.func,
  onUpdateInstant: React.PropTypes.func
}


export default class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <BaseFormInput {...makePropsSubset(this.props, BaseFormInput.propTypes)}>
        <BaseTextInput {...makePropsSubset(this.props, [ 'value', 'placeholder', 'updateDelay', 'onUpdate' ])} />
      </BaseFormInput>
    )
  }
}
