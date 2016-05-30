import Immutable from 'immutable'
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import BaseFormInput from './base'
import { BaseTagsInput } from './tags-input'
import { BaseTextInput } from './text-input'
import { makePropsSubset } from '../utils'


export class BaseModifiersInputItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: false }

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleChildFocus() {
    this.setState({ active: true })
  }

  handleChildBlur() {
    this.setState({ active: false })
  }

  render() {
    return (
      <li className={(this.state.active ? ' active' : '')}>
        <BaseTextInput value={this.props.value.get('name')}
                       placeholder={this.props.namePlaceholder}
                       onFocus={ev => this.handleChildFocus(ev)}
                       onBlur={ev => this.handleChildBlur(ev)}
                       onUpdate={(val) => this.props.onNameUpdate(val)} />

        {this.props.canBeRemoved ? <i className="fa fa-close" onClick={ev => this.props.onClickRemove(ev)}></i> : null}

        <BaseTagsInput {...makePropsSubset(this.props, [ 'onAddTag', 'onRemoveTag', 'allowDuplicates' ])}
                       value={this.props.value.get('tags')}
                       inputPlaceholder={this.props.valuePlaceholder}
                       onFocus={ev => this.handleChildFocus(ev)}
                       onBlur={ev => this.handleChildBlur(ev)} />
      </li>
    )
  }
}

BaseModifiersInputItem.defaultProps = {
  value: new Immutable.Map(),
  namePlaceholder: '',
  valuePlaceholder: '',
  canBeRemoved: true
}

BaseModifiersInputItem.propTypes = {
  value: React.PropTypes.instanceOf(Immutable.Map),
  namePlaceholder: BaseTextInput.propTypes.placeholder,
  valuePlaceholder: BaseTagsInput.propTypes.inputPlaceholder,
  canBeRemoved: React.PropTypes.bool,
  onNameUpdate: React.PropTypes.func.isRequired,
  onClickRemove: React.PropTypes.func.isRequired
}


export class BaseModifiersInput extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleClickAdd(ev) {
    ev.preventDefault()
    this.props.onClickAdd(ev)
  }

  render() {
    let modifiers = this.props.value.map((value, index) =>
      <BaseModifiersInputItem {...makePropsSubset(this.props, [ 'namePlaceholder', 'valuePlaceholder' ])}
                              key={index}
                              value={value}
                              allowDuplicates={this.props.allowTagDuplicates}
                              onNameUpdate={(val) => this.props.onNameUpdate(index, val)}
                              onAddTag={(val) => this.props.onAddTag(index, val)}
                              onRemoveTag={(val) => this.props.onRemoveTag(index, val)}
                              onClickRemove={() => this.props.onClickRemove(index)} />)

    return (
      <ul className="modifiers-input">
        <li><button onClick={ev => this.handleClickAdd(ev)}>New</button></li>
        {modifiers}
      </ul>
    )
  }
}

BaseModifiersInput.defaultProps = {
  value: new Immutable.List(),
  allowTagDuplicates: false
}

BaseModifiersInput.propTypes = {
  value: React.PropTypes.instanceOf(Immutable.List),
  allowTagDuplicates: React.PropTypes.bool,
  onNameUpdate: React.PropTypes.func.isRequired,
  onAddTag: React.PropTypes.func.isRequired,
  onRemoveTag: React.PropTypes.func.isRequired,
  onClickAdd: React.PropTypes.func.isRequired,
  onClickRemove: React.PropTypes.func.isRequired
}


export default class ModifiersInput extends React.Component {
  render() {
    return (
      <BaseFormInput {...makePropsSubset(this.props, BaseFormInput.propTypes)}>
        <BaseModifiersInput {...makePropsSubset(this.props, BaseModifiersInput.propTypes)} />
      </BaseFormInput>
    )
  }
}
