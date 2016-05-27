import React from 'react'
import BaseFormInput from './base'
import { BaseTagsInput } from './tags-input'
import { BaseTextInput } from './text-input'
import { makePropsSubset } from '../utils'


export class BaseModifiersInputItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: false }
  }

  handleChildFocus() {
    this.setState({ active: true })
  }

  handleChildBlur() {
    this.setState({ active: false })
  }

  handleChildUpdate(component, value) {
    let newValue = {}

    if (component === 'name') {
      newValue = {
        name: value,
        tags: this.tagsInputRef.state.value.slice()
      }
    }
    else if (component === 'tags') {
      newValue = {
        name: this.nameInputRef.state.value,
        tags: value
      }
    }

    if (this.props.onUpdate != null) {
      this.props.onUpdate(newValue)
    }
  }

  handleClickRemove(ev) {
    if (this.props.onClickRemove != null) {
      this.props.onClickRemove(ev)
    }
  }

  render() {
    return (
      <li className={(this.state.active ? ' active' : '')}>
        <BaseTextInput ref={component => this.nameInputRef = component}
                       value={this.props.value.name}
                       placeholder={this.props.namePlaceholder}
                       onFocus={ev => this.handleChildFocus(ev)}
                       onBlur={ev => this.handleChildBlur(ev)}
                       onUpdate={(val) => this.handleChildUpdate('name', val)} />

        {this.props.canBeRemoved ? <i className="fa fa-close" onClick={ev => this.handleClickRemove(ev)}></i> : null}

        <BaseTagsInput ref={component => this.tagsInputRef = component}
                       value={this.props.value.tags}
                       inputPlaceholder={this.props.valuePlaceholder}
                       onFocus={ev => this.handleChildFocus(ev)}
                       onBlur={ev => this.handleChildBlur(ev)}
                       onUpdate={(val) => this.handleChildUpdate('tags', val)} />
      </li>
    )
  }
}

BaseModifiersInputItem.defaultProps = {
  value: {},
  namePlaceholder: '',
  valuePlaceholder: '',
  canBeRemoved: true
}

BaseModifiersInputItem.propTypes = {
  value: React.PropTypes.shape({
    name: React.PropTypes.any,
    tags: React.PropTypes.any
  }),
  namePlaceholder: React.PropTypes.string,
  valuePlaceholder: React.PropTypes.string,
  canBeRemoved: React.PropTypes.bool,
  onUpdate: React.PropTypes.func
}


export class BaseModifiersInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { modifierCount: props.value.length }
  }

  handleNewClick(ev) {
    ev.preventDefault()
    this.setState({ modifierCount: this.state.modifierCount + 1 })
  }

  handleClickRemove(index) {
    console.log(index)
  }

  render() {
    const range = Array.from(new Array(this.state.modifierCount), (x, i) => i)
    let modifiers = range.map(index =>
      <BaseModifiersInputItem {...makePropsSubset(this.props, [ 'namePlaceholder', 'valuePlaceholder' ])}
                              key={index}
                              value={this.props.value[index]}
                              onClickRemove={() => this.handleClickRemove(index)} />)

    return (
      <ul className="modifiers-input">
        <li><button onClick={ev => this.handleNewClick(ev)}>New</button></li>
        {modifiers}
      </ul>
    )
  }
}

BaseModifiersInput.defaultProps = {
  value: []
}

BaseModifiersInput.propTypes = {
  value: React.PropTypes.array,
  onUpdate: React.PropTypes.func
}


export default class ModifiersInput extends React.Component {
  render() {
    return (
      <BaseFormInput {...makePropsSubset(this.props, BaseFormInput.propTypes)}>
        <BaseModifiersInput {...makePropsSubset(this.props, [ 'value', 'namePlaceholder', 'valuePlaceholder' ])} />
      </BaseFormInput>
    )
  }
}
