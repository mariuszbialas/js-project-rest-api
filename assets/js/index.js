'use strict';

import dom from './dom.js';
import ajax from './ajax.js';
import content from './content.js';

// KONSTANTEN / VARIABLEN
export const elements = {};

// FUNKTIONEN
const domMapping = () => {
  elements.calendar = dom.sel('.calendar');
  elements.form = dom.sel('.form');
};

const fetchData = () => {
    ajax.fetchData('months').then(content.renderSelect);
    ajax.fetchData('years').then(content.renderSelect);
};

const appendEventlisteners = () => {};

const init = () => {
  domMapping();
  appendEventlisteners();
  fetchData();
  
};

// INIT
document.addEventListener('DOMContentLoaded', init);
