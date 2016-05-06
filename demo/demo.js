'use strict';

var TextInput = window['admin-components'].TextInput;

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
