import Immutable from 'immutable'
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { BaseTextInput } from './text-input'


export default class Autocompleted extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemHighlighted: props.itemHighlighted
    }

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentDidMount() {
    this.handleDocumentClick = ev => {
      if (ev.target !== this.mainDivRef && ev.target !== this.searchValueRef.inputRef) {
        this.props.onClose()
      }
    }
    this.documentListener = document.addEventListener('click', this.handleDocumentClick)

    this.handleKeyboard = ev => {
      if (!this.props.isOpen) {
        if (ev.type === 'keydown' && (ev.code === 'ArrowUp' || ev.code === 'ArrowDown')) {
          ev.preventDefault()
          this.props.onOpen()
        }
        return
      }

      if (ev.type === 'keydown' && ev.code === 'Tab') {
        this.props.onClose()
        return
      }

      if (ev.type === 'keypress' && ev.code === 'Enter' && this.state.itemHighlighted != null) {
        ev.preventDefault()
        this.handleListClick(this.props.searchResults.get(this.state.itemHighlighted))
        return
      }

      if (ev.type === 'keydown' && ev.code === 'Escape') {
        ev.preventDefault()
        this.props.onClose()
        return
      }

      if (ev.type === 'keydown') {
        if (ev.code === 'ArrowUp') {
          if (!this.props.searchResults.size) {
            return
          }

          ev.preventDefault()

          let itemHighlighted = this.state.itemHighlighted

          if (itemHighlighted == null) {
            itemHighlighted = this.props.searchResults.size -1
          } else {
            itemHighlighted--

            if (itemHighlighted < 0) {
              itemHighlighted = this.props.searchResults.size -1
            }
          }

          this.setState({ itemHighlighted: itemHighlighted })
        } else if (ev.code === 'ArrowDown') {
          if (!this.props.searchResults.size) {
            return
          }

          ev.preventDefault()

          let itemHighlighted = this.state.itemHighlighted

          if (itemHighlighted == null) {
            itemHighlighted = 0
          } else {
            itemHighlighted++

            if (itemHighlighted >= this.props.searchResults.size) {
              itemHighlighted = 0
            }
          }

          this.setState({ itemHighlighted: itemHighlighted })
        }
      }
    }

    this.documentListener = document.addEventListener('keypress', this.handleKeyboard)
    this.documentListener = document.addEventListener('keydown', this.handleKeyboard)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
    document.removeEventListener('keypress', this.handleKeyboard)
    document.removeEventListener('keydown', this.handleKeyboard)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResults !== this.props.searchResults) {
      this.setState({ itemHighlighted: nextProps.itemHighlighted })
    }
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      // this.searchValueRef.focus()
    }
  }

  handleListClick(val) {
    this.props.onSelect(val)
    this.props.onClose()
  }

  render() {
    let searchResultsElements = this.props.searchResults.map((val, index) =>
      <li key={index}
          className={(val.get('className') || '') + (this.state.itemHighlighted === index ? ' focus' : '')}
          onClick={() => this.handleListClick(val)}>{val.get('label')}</li>)

    return (
      <div ref={el => this.mainDivRef = el}
           className={this.props.className + ' autocompleted' + (this.props.isOpen ? ' open active' : '')}>
        {this.props.children}
        <ul className={'autocomplete' + (!this.props.desktopSearch ? ' no-desktop-search' : '')}>
          <li>
            <BaseTextInput ref={(component) => this.searchValueRef = component}
                           value={this.props.searchValue}
                           placeholder={this.props.searchPlaceholder}
                           onUpdate={val => this.props.onSearchUpdate(val)} />
          </li>
          {searchResultsElements}
        </ul>
      </div>
    )
  }
}

Autocompleted.defaultProps = {
  isOpen: true,
  itemHighlighted: null,
  searchValue: '',
  searchPlaceholder: '',
  searchResults: new Immutable.List(),
  className: '',
  desktopSearch: false
}

Autocompleted.propTypes = {
  isOpen: React.PropTypes.bool,
  itemHighlighted: React.PropTypes.number,
  searchValue: React.PropTypes.string,
  searchPlaceholder: React.PropTypes.string,
  searchResults: React.PropTypes.instanceOf(Immutable.List),
  className: React.PropTypes.string,
  desktopSearch: React.PropTypes.bool,
  onOpen: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onSearchUpdate: React.PropTypes.func.isRequired
}
