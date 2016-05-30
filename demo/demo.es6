import Immutable from 'immutable'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import { TextInput,
         TagsInput,
         ModifiersInput,
         SearchableSelectInput,
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
            <li onClick={() => this.toggleMenu()}><Link to="text-input">Text Input</Link></li>
            <li onClick={() => this.toggleMenu()}><Link to="tags-input">Tags Input</Link></li>
            <li onClick={() => this.toggleMenu()}><Link to="modifiers-input">Modifiers Input</Link></li>
            <li onClick={() => this.toggleMenu()}><Link to="select-input">Select Input</Link></li>
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


class StatefulAutocompletedTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedValue: new Immutable.Map({ label: '', value: null }),
      searchResults: new Immutable.List()
    }
  }

  select(val) {
    if (val.get('value') != null) {
      this.setState({ selectedValue: val, searchValue: '', isOpen: false })
    }
  }

  search(val) {
    val = val.toLowerCase()
    let results = this.props.data.filter((item) => item.get('name').toLowerCase().indexOf(val) !== -1)

    if (!results.size) {
      this.setState({ isOpen: false, searchResults: Immutable.fromJS([ { label: '** no matches **', value: null } ]) })
    } else {
      this.setState({ isOpen: true, searchResults: results.map(item => Immutable.Map({ label: item.get('name'), value: item.get('id') })) })
    }
  }

  render() {
    return (
      <TextInput {...utils.makePropsSubset(this.props, [ 'label', 'placeholder', 'helpText' ])}
                 value={this.state.selectedValue.get('label')}
                 onUpdate={val => this.search(val)}
                 autocomplete={new Immutable.Map({
                   isOpen: this.state.isOpen,
                   searchResults: this.state.searchResults,
                   onOpen: () => this.setState({ isOpen: true }),
                   onClose: () => this.setState({ isOpen: false }),
                   onSelect: (val) => this.select(val),
                   onSearchUpdate: (val) => this.search(val)
                 })} />
    )
  }
}


class DemoTextInput extends React.Component {
  render() {
    return (
      <BaseFormDemo title="Text Input">
        <TextInput label="input1" placeholder="input1" helpText="input 1 help text" />
        <TextInput label="input2" placeholder="input2" helpText="text input 2" />
        <StatefulAutocompletedTextInput label="input3"
                                        placeholder="input3"
                                        helpText="text input with autocompletion"
                                        data={SELECT_TEST_DATA} />
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

const SELECT_TEST_DATA = Immutable.fromJS([
  {
    'id': 0,
    'name': 'Barrett Dale'
  },
  {
    'id': 1,
    'name': 'Marta Sims'
  },
  {
    'id': 2,
    'name': 'Adrienne Alford'
  },
  {
    'id': 3,
    'name': 'Patrica Vang'
  },
  {
    'id': 4,
    'name': 'Odom Cabrera'
  },
  {
    'id': 5,
    'name': 'Davenport Russell'
  },
  {
    'id': 6,
    'name': 'Brittney Pittman'
  },
  {
    'id': 7,
    'name': 'Ashley Dennis'
  },
  {
    'id': 8,
    'name': 'Louella Vaughan'
  },
  {
    'id': 9,
    'name': 'Carol Burgess'
  },
  {
    'id': 10,
    'name': 'Paige House'
  },
  {
    'id': 11,
    'name': 'Rodriquez Tucker'
  },
  {
    'id': 12,
    'name': 'Puckett Leblanc'
  },
  {
    'id': 13,
    'name': 'Frank Roberts'
  },
  {
    'id': 14,
    'name': 'Leonard Blackburn'
  },
  {
    'id': 15,
    'name': 'Ashlee Beard'
  },
  {
    'id': 16,
    'name': 'Grace Randall'
  },
  {
    'id': 17,
    'name': 'Pat Zimmerman'
  },
  {
    'id': 18,
    'name': 'Lawanda Schmidt'
  },
  {
    'id': 19,
    'name': 'Garrett Shelton'
  },
  {
    'id': 20,
    'name': 'Duffy Walls'
  },
  {
    'id': 21,
    'name': 'Leona Schneider'
  },
  {
    'id': 22,
    'name': 'Wyatt Larsen'
  },
  {
    'id': 23,
    'name': 'Mcknight Hogan'
  },
  {
    'id': 24,
    'name': 'Peters Cherry'
  },
  {
    'id': 25,
    'name': 'Marcia Blair'
  },
  {
    'id': 26,
    'name': 'Lesa Morgan'
  },
  {
    'id': 27,
    'name': 'Jane Sharp'
  },
  {
    'id': 28,
    'name': 'Lana Parks'
  },
  {
    'id': 29,
    'name': 'Mindy Middleton'
  },
  {
    'id': 30,
    'name': 'Hazel Lee'
  },
  {
    'id': 31,
    'name': 'Rodgers Lopez'
  },
  {
    'id': 32,
    'name': 'Leanne Harrington'
  },
  {
    'id': 33,
    'name': 'Wilson Higgins'
  },
  {
    'id': 34,
    'name': 'Clemons Berg'
  },
  {
    'id': 35,
    'name': 'Barrera Carson'
  },
  {
    'id': 36,
    'name': 'Patrice Kaufman'
  },
  {
    'id': 37,
    'name': 'West Christensen'
  },
  {
    'id': 38,
    'name': 'Sheppard Downs'
  },
  {
    'id': 39,
    'name': 'Henry Gregory'
  },
  {
    'id': 40,
    'name': 'Darla Wise'
  },
  {
    'id': 41,
    'name': 'Mariana Wall'
  },
  {
    'id': 42,
    'name': 'Page Gibbs'
  },
  {
    'id': 43,
    'name': 'Cristina Miller'
  },
  {
    'id': 44,
    'name': 'Luella Owen'
  },
  {
    'id': 45,
    'name': 'Lenore Collier'
  },
  {
    'id': 46,
    'name': 'Wade Duffy'
  },
  {
    'id': 47,
    'name': 'Rice Nicholson'
  },
  {
    'id': 48,
    'name': 'Mccarty Bray'
  },
  {
    'id': 49,
    'name': 'Hilary Manning'
  }
])

class StatefulSearchableSelectInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedValue: this.props.value || new Immutable.Map({ label: '-- select a value --', value: null }),
      searchResults: this.props.value || new Immutable.List()
    }
  }

  select(val) {
    if (val.get('value') != null) {
      this.setState({ selectedValue: val, searchValue: '' })
    }
  }

  search(val) {
    val = val.toLowerCase()
    let results = this.props.data.filter((item) => item.get('name').toLowerCase().indexOf(val) !== -1)

    if (!results.size) {
      this.setState({ searchResults: Immutable.fromJS([ { label: '** no matches **', value: null } ]) })
    } else {
      this.setState({ searchResults: results.map(item => Immutable.Map({ label: item.get('name'), value: item.get('id') })) })
    }
  }

  render() {
    return (
      <SearchableSelectInput {...utils.makePropsSubset(this.props, [ 'label', 'searchPlaceholder', 'helpText' ])}
                             selectedValue={this.state.selectedValue}
                             searchResults={this.state.searchResults}
                             onSelect={(val) => this.select(val)}
                             onSearchUpdate={(val) => this.search(val)} />
    )
  }
}

class DemoSelectInput extends React.Component {
  render() {
    return (
      <BaseFormDemo title="Select Input">
        <StatefulSearchableSelectInput label="searchable select"
                                       searchPlaceholder="friend name"
                                       data={SELECT_TEST_DATA} />
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
      <Route path="select-input" component={DemoSelectInput}/>
    </Route>
  </Router>
), document.getElementById('app-container'))
