'use strict';

import dom from './dom.js';
import ajax from './ajax.js';
import content from './content.js';

// KONSTANTEN / VARIABLEN
export const elements = {};

// FUNKTIONEN
const domMapping = () => {
  elements.calendar = dom.sel('.calendar');
  elements.form = dom.sel('#formFetchData');
};

const fetchData = () => {
    ajax.fetchData('juni').then(content.showMonth);
    ajax.fetchData('2023').then(content.showYear);
    ajax.fetchData().then(content.renderSelect);

};

const appendEventlisteners = () => {};

const init = () => {
  domMapping();
  appendEventlisteners();
  fetchData();
  
};

// INIT
document.addEventListener('DOMContentLoaded', init);
