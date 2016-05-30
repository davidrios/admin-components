import Immutable from 'immutable'
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import BaseFormInput from './base'
import { makePropsSubset } from '../utils'


function getTextWidth(text, font) {
  let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'))
  let context = canvas.getContext('2d')
  context.font = font
  let metrics = context.measureText(text)
  return metrics.width
}


export class BaseTagsInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { inputValue: props.inputValue }

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentDidMount() {
    this.updateEditingSize('')
  }

  addTag(val) {
    if (!this.props.allowDuplicates && this.props.value.indexOf(val) != -1) {
      this.setState({ inputValue: '' })
      this.updateEditingSize('')
      return
    }

    this.setState({ inputValue: '' })
    this.updateEditingSize('')
    this.props.onAddTag(val)
  }

  updateEditingSize(text) {
    if (text.length == 0) {
      text = this.props.inputPlaceholder
    }

    let style = window.getComputedStyle(this.inputRef)
    let textSize = getTextWidth(text, [ style.fontWeight, style.fontSize, style.fontFamily ].join(' '))
    this.inputRef.style.width = textSize + parseInt(style.paddingLeft) + parseInt(style.paddingRight) + 10 + 'px'
  }

  changeInputValue(val) {
    this.updateEditingSize(val)
    this.setState({ inputValue: val })
  }

  focus() {
    this.inputRef.focus()
  }

  handleComponentClick() {
    this.focus()
  }

  handleInputKeyPress(ev) {
    if ((ev.type === 'keypress' && (ev.key === 'Enter')) ||
        (ev.key === 'Tab' && ev.target.value.length > 0)) {
      ev.preventDefault()
      this.addTag(ev.target.value)
    }
    else if (ev.key === 'Backspace' && !ev.target.value) {
      this.props.onRemoveTag(-1)
    }
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
    let tagsElements = this.props.value.map((val, index) => <li key={index}>{val}<i className="fa fa-close" onClick={() => this.props.onRemoveTag(index)}></i></li>)

    return (
      <ul className={this.props.className + ' tags-input nospaces'}
          onClick={() => this.handleComponentClick()}>
        {tagsElements}
        <li><input type="text"
                   ref={el => this.inputRef = el}
                   value={this.state.inputValue}
                   placeholder={this.props.inputPlaceholder}
                   onChange={ev => this.changeInputValue(ev.target.value)}
                   onKeyPress={ev => this.handleInputKeyPress(ev)}
                   onKeyDown={ev => this.handleInputKeyPress(ev)}
                   onFocus={ev => this.handleInputFocus(ev)}
                   onBlur={ev => this.handleInputBlur(ev)} /></li>
      </ul>
    )
  }
}

BaseTagsInput.defaultProps = {
  value: new Immutable.List(),
  inputValue: '',
  inputPlaceholder: '',
  className: '',
  allowDuplicates: false
}

BaseTagsInput.propTypes = {
  value: React.PropTypes.instanceOf(Immutable.List),
  inputValue: React.PropTypes.string,
  inputPlaceholder: React.PropTypes.string,
  allowDuplicates: React.PropTypes.bool,
  className: React.PropTypes.string,
  onAddTag: React.PropTypes.func.isRequired,
  onRemoveTag: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func
}


export default class TagsInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: false }

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleTagsInputFocus() {
    this.setState({ active: true })
  }

  handleTagsInputBlur() {
    this.setState({ active: false })
  }

  render() {
    return (
      <BaseFormInput {...makePropsSubset(this.props, BaseFormInput.propTypes)}>
        <BaseTagsInput {...makePropsSubset(this.props, BaseTagsInput.propTypes, [ 'className', 'onFocus', 'onBlur' ])}
                       className={this.props.className + (this.state.active ? ' active' : '')}
                       onFocus={ev => this.handleTagsInputFocus(ev)}
                       onBlur={ev => this.handleTagsInputBlur(ev)} />
      </BaseFormInput>
    )
  }
}

TagsInput.defaultProps = {
  className: ''
}
