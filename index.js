// Import stylesheets
import './style.css';
import * as _ from 'lodash';

// Write Javascript code!
const appDiv = document.getElementById('app');

const person = {
  name: 'clarence',
  gender: 'M',
  score: 0,
  address: {
    city: 'mangalore'
  }
};

function ViewBinder(intitialState, parentDom) {
  let _this = this;
  _this.model = intitialState;
  const bindables = {};

  _this.setState = function(obj) {
    function recursive(o, nk) {
      Object.entries(obj).forEach(keyValuePair => {
        const [key, value] = keyValuePair;
        _this.model[key] = value;
        if (typeof value === 'Object') {
          let nestedKey = key;

           vs else {
            recursive(o, nk);
          }

          // Object.entries(o).forEach(item=>{

          //   const [k,v]=item;

          // if (bindables[key]) {

          // });
        }
        if (typeof value === 'Object') {
          recursive(value, nestedKey);
        }
      });
    }
  };

  Array.from(parentDom.querySelectorAll('[data-bind]')).forEach(el => {
    const bindKey = el.getAttribute('data-bind');
    const value = _.get(_this.model, bindKey);
    if (typeof value !== 'undefined') {
      el.innerText = value;
      bindables[bindKey] = el;
    }
  });
}

const view = new ViewBinder(person, appDiv);

document.getElementById('increament-btn').addEventListener('click', function() {
  let score = view.model.score + 1;
  view.setState({ score, address: { city: 'Bangalore' } });
});
