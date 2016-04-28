'use strict';

var TextInput = window['admin-components'].TextInput;

ReactDOM.render(
  React.createElement(TextInput, {
    label: 'input1',
    placeholder: 'input1',
    helpText: 'input1 help text'
  }),
  document.getElementById('textinput1'));
