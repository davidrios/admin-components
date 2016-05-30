import Immutable from 'immutable'
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import BaseFormInput from './base'
import { BaseTextInput } from './text-input'
import { makePropsSubset } from '../utils'


export class BaseSearchableSelectInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: props.isOpen }

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentDidMount() {
    this.handleDocumentClick = ev => {
      if (ev.target !== this.mainDivRef && ev.target !== this.searchValueRef.inputRef) {
        this.setState({ isOpen: false })
      }
    }
    this.documentListener = document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      this.searchValueRef.focus()
    }
  }

  handleComponentClick(ev) {
    if (ev.target !== this.mainDivRef) {
      return
    }

    this.setState({ isOpen: !this.state.isOpen })
  }

  handleListClick(val) {
    this.props.onSelect(val)
    this.setState({ isOpen: false })
  }

  render() {
    let searchResultsElements = this.props.searchResults.map((val, index) =>
      <li key={index}
          className={val.get('className') || ''}
          onClick={() => this.handleListClick(val)}>{val.get('label')}</li>)

    return (
      <div ref={el => this.mainDivRef = el}
           className={this.props.className + ' searchable-select' + (this.state.isOpen ? ' open active' : '')}
           onClick={(ev) => this.handleComponentClick(ev)}>
        <span>{this.props.selectedValue.get('label')}</span>
        <ul>
          <li><BaseTextInput ref={(component) => this.searchValueRef = component}
                             value={this.state.searchValue}
                             placeholder={this.props.searchPlaceholder}
                             onUpdate={val => this.props.onSearchUpdate(val)} /></li>
          {searchResultsElements}
        </ul>
      </div>
    )
  }
}

BaseSearchableSelectInput.defaultProps = {
  isOpen: false,
  selectedValue: new Immutable.Map({ label: '', value: '' }),
  searchValue: '',
  searchPlaceholder: '',
  searchResults: new Immutable.List(),
  className: ''
}

BaseSearchableSelectInput.propTypes = {
  isOpen: React.PropTypes.bool,
  selectedValue: React.PropTypes.instanceOf(Immutable.Map),
  searchValue: React.PropTypes.string,
  searchPlaceholder: React.PropTypes.string,
  searchResults: React.PropTypes.instanceOf(Immutable.List),
  className: React.PropTypes.string,
  onSelect: React.PropTypes.func.isRequired,
  onSearchUpdate: React.PropTypes.func.isRequired
}


export default class SearchableSelectInput extends React.Component {
  render() {
    return (
      <BaseFormInput {...makePropsSubset(this.props, BaseFormInput.propTypes)}>
        <BaseSearchableSelectInput {...makePropsSubset(this.props, BaseSearchableSelectInput.propTypes)} />
      </BaseFormInput>
    )
  }
}
