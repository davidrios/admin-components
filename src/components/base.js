import React from 'react'

export default class BaseFormInput extends React.Component {
  handleComponentClick() {
    if (this.childRef.focus != null) {
      this.childRef.focus()
    }
  }

  render() {
    let child = React.cloneElement(this.props.children, { ref: component => this.childRef = component })

    return (
      <div className={this.props.className + (this.props.hasError ? ' has-danger' : '')}>
        <label onClick={() => this.handleComponentClick()}>{this.props.label}</label>
        {child}
        {this.props.errorText.length ? <small>{this.props.errorText}</small> : null}
        {this.props.helpText.length ? <small>{this.props.helpText}</small> : null}
      </div>
    )
  }
}

BaseFormInput.defaultProps = {
  className: '',
  helpText: '',
  errorText: '',
  hasError: false
}

BaseFormInput.propTypes = {
  label: React.PropTypes.string,
  errorText: React.PropTypes.string,
  helpText: React.PropTypes.string,
  className: React.PropTypes.string,
  hasError: React.PropTypes.bool,
  children: React.PropTypes.element.isRequired
}
