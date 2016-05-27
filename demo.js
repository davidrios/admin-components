'use strict';

var TextInput = window['admin-components'].TextInput;
var TagsInput = window['admin-components'].TagsInput;

ReactDOM.render(
  React.createElement(TextInput, {
    inputId: 'textinput1field',
    label: 'input1',
    placeholder: 'input1',
    helpText: 'input1 help text',
    onUpdate: function(val) {
      console.log(val)
    }
  }),
  document.getElementById('textinput1'));

ReactDOM.render(
  React.createElement(TextInput, {
    inputId: 'textinput2field',
    label: 'input2',
    placeholder: 'input2',
    helpText: 'validated only numbers',
    validator: function(value) { return value.match(/^\d*$/); }
  }),
  document.getElementById('textinput2'));

ReactDOM.render(
  React.createElement(TagsInput, {
    label: 'tags input 1',
    inputPlaceholder: 'tag name',
    value: ['abc', 'bcd'],
    allowDuplicates: true
  }),
  document.getElementById('tagsinput1'));
