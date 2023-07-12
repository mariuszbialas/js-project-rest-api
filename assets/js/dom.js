'use strict';

const dom = {

  sel(el) {
    return document.querySelector(el);
  },

  selAll(el) {
    return [...(document.querySelectorAll(sel))];
  },

  create({
    content = '',
    type = 'div',
    parent = false,
    classes = [],
    attr = {},
    listeners = {},
    styles = {},
    amEnde = true,
  } = {}) {
    let neu = document.createElement(type);
    if (content) neu.innerHTML = content;
    if (classes.length) neu.className = classes.join(' ');

    Object.entries(attr).forEach((el) => neu.setAttribute(...el));
    Object.entries(listeners).forEach((el) => neu.addEventListener(...el));
    Object.entries(styles).forEach((style) => (neu.style[style[0]] = style[1]));

    if (parent) {
      if (!amEnde) parent.prepend(neu);
      else parent.append(neu);
    }

    return neu;
  },
};

export default dom;
