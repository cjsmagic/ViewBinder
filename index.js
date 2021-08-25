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
    city: 'mangalore',
    internal: {
      score: 1
    }
  }
};

function ViewBinder(intitialState, parentDom) {
  let _this = this;
  _this.model = intitialState;
  const bindables = {};

  _this.setState = function(obj) {
    function findAndBind(o, nk) {
      Object.entries(o).forEach(keyValuePair => {
        const [key, value] = keyValuePair;
        const nestedKey = nk ? `${nk}.${key}` : key;

        if (typeof _this.model[key] !== 'undefined') {
          _this.model[key] = value;
        }

        if (typeof value === 'object') {
          findAndBind(value, nestedKey);
        } else if (typeof bindables[nestedKey] !== 'undefined') {
          bindables[nestedKey].innerText = value;
        }
      });
    }
    findAndBind(obj);
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
  const { model, setState } = view;
  const score = model.score + 1;
  setState({
    score,
    address: {
      city: 'Bangalore',
      internal: {
        score
      }
    }
  });
});
