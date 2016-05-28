import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import { TextInput,
         TagsInput,
         ModifiersInput } from 'admin-components'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false
    }
  }

  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu })
  }

  render() {
    return (
      <div className="app-root">
        <nav className={(this.state.showMenu ? 'show' : '')}>
          <a className="fa fa-angle-left hidden-lg-up pull-right" onClick={() => this.toggleMenu()}></a>
          <h2>Menu</h2>
          <ul>
            <li><Link to="text-input">Text Input</Link></li>
            <li><Link to="tags-input">Tags Input</Link></li>
            <li><Link to="modifiers-input">Modifiers Input</Link></li>
          </ul>
        </nav>

        <header>
          <a className="fa fa-bars hidden-lg-up" onClick={() => this.toggleMenu()}></a>
        </header>

        {this.props.children}
      </div>
    )
  }
}


class BaseFormDemo extends React.Component {
  render() {
    return (
      <section>
        <h1>{this.props.title}</h1>
        <form className="single">
          {this.props.children}
        </form>
      </section>
    )
  }
}


class DemoTextInput extends React.Component {
  render() {
    return (
      <BaseFormDemo title="Text Input">
        <TextInput label="input1" placeholder="input1" helpText="input 1 help text" />
        <TextInput label="input2" placeholder="input2" helpText="text input 2" />
      </BaseFormDemo>
    )
  }
}


class DemoTagsInput extends React.Component {
  render() {
    return (
      <BaseFormDemo title="Tags Input">
        <TagsInput label="tags input 1" inputPlaceholder="tag name" value={[ 'abc', 'bcd' ]} allowDuplicates={true} />
      </BaseFormDemo>
    )
  }
}


class DemoModifiersInput extends React.Component {
  render() {
    let value = [
      { name: 'lol', tags: [ 'a', 'b', 'c' ] }
    ]

    return (
      <BaseFormDemo title="Modifiers Input">
        <ModifiersInput label="modifiers input 1" namePlaceholder="name" valuePlaceholder="value" value={value} />
      </BaseFormDemo>
    )
  }
}


render((
  <Router>
    <Route path="/" component={App}>
      <Route path="text-input" component={DemoTextInput}/>
      <Route path="tags-input" component={DemoTagsInput}/>
      <Route path="modifiers-input" component={DemoModifiersInput}/>
    </Route>
  </Router>
), document.getElementById('app-container'))
