import Immutable from 'immutable'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import { TextInput,
         TagsInput,
         ModifiersInput,
         utils } from 'admin-components'


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


class StatefulTagsInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.value || new Immutable.List() }
  }

  addTag(val) {
    this.setState({ value: this.state.value.push(val) })
  }

  removeTag(val) {
    this.setState({ value: this.state.value.delete(val) })
  }

  render() {
    return (
      <TagsInput {...utils.makePropsSubset(this.props, [ 'label', 'value', 'inputPlaceholder', 'allowDuplicates', 'helpText' ])}
                 value={this.state.value}
                 onAddTag={val => this.addTag(val)}
                 onRemoveTag={val => this.removeTag(val)} />
    )
  }
}


class DemoTagsInput extends React.Component {
  render() {
    return (
      <BaseFormDemo title="Tags Input">
        <StatefulTagsInput label="tags input 1" inputPlaceholder="tag name" value={new Immutable.List([ 'abc', 'bcd' ])} allowDuplicates={true} />
        <StatefulTagsInput label="tags input 2" inputPlaceholder="new tag" helpText="no duplicates" allowDuplicates={false} />
      </BaseFormDemo>
    )
  }
}

class StatefulModifiersInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: this.props.value || new Immutable.List() }
  }

  addModifier() {
    this.setState({ value: this.state.value.push(Immutable.fromJS({ name: '', tags: [] })) })
  }

  removeModifier(idx) {
    this.setState({ value: this.state.value.delete(idx) })
  }

  updateName(idx, val) {
    this.setState({ value: this.state.value.updateIn([ idx ], obj => obj.set('name', val)) })
  }

  addTag(idx, val) {
    this.setState({ value: this.state.value.updateIn([ idx, 'tags' ], list => list.push(val)) })
  }

  removeTag(idx, val) {
    this.setState({ value: this.state.value.updateIn([ idx, 'tags' ], list => list.delete(val)) })
  }

  render() {
    return (
      <ModifiersInput {...utils.makePropsSubset(this.props, [ 'label', 'value', 'namePlaceholder', 'valuePlaceholder', 'allowTagDuplicates', 'helpText' ])}
                      value={this.state.value}
                      onClickAdd={() => this.addModifier()}
                      onClickRemove={(idx) => this.removeModifier(idx)}
                      onNameUpdate={(val, idx) => this.updateName(val, idx)}
                      onAddTag={(val, idx) => this.addTag(val, idx)}
                      onRemoveTag={(val, idx) => this.removeTag(val, idx)} />
    )
  }
}


class DemoModifiersInput extends React.Component {
  render() {
    return (
      <BaseFormDemo title="Modifiers Input">
        <StatefulModifiersInput value={Immutable.fromJS([ { name: 'lol', tags: [ 'a', 'b', 'c' ] } ])}
                                label="modifiers input 1"
                                namePlaceholder="name"
                                valuePlaceholder="value"
                                helpText="no tag duplicates" />

        <StatefulModifiersInput label="modifiers input 2"
                                namePlaceholder="name2"
                                valuePlaceholder="value2"
                                allowTagDuplicates={true}
                                helpText="allow tag duplicates" />
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
