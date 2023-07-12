'use strict';

import { elements } from './index.js';
import dom from './dom.js';

const content = {

  renderSelect(data){

    // console.log(data);
    const year = Object.keys(data).filter((key, index) => index < 3);
    const month = Object.keys(data).filter((key, index) => index > 4);
    // console.log(month);

    const containerYear = dom.create({parent: elements.form});
    dom.create({
        parent: containerYear,
        type: 'label',
        content: 'Jahr: ',
        attr: {'for': 'year'}
    });
    const formYear = dom.create({
        parent: containerYear,
        type: 'select',
        attr: {'name': 'year', 'id': 'year'}
    });
    year.forEach(key => {
        dom.create({
            parent: formYear,
            type: 'option',
            content: key,
            attr: {'value': key}
        });
    })

    const containerMonth = dom.create({parent: elements.form});
    dom.create({
        parent: containerMonth,
        type: 'label',
        content: 'Monat: ',
        attr: {'for': 'month'}
    });
    const formMonth = dom.create({
        parent: containerMonth,
        type: 'select',
        attr: {'name': 'month', 'id': 'month'}
    });
    month.forEach(key => {
        dom.create({
            parent: formMonth,
            type: 'option',
            content: key,
            attr: {'value': key}
        });
    })
  },
  showMonth(data) {
    const container = dom.create({ parent: elements.calendar });

    Object.entries(data).forEach((item) => {
      dom.create({
        parent: container,
        type: 'h4',
        content: item[0],
      });

      const info = dom.create({ parent: container });

      item[1].forEach((el) => {

        dom.create({
          parent: info,
          type: 'p',
          content: el,
        });
      });
    });
  },
  showYear(data) {
    const container = dom.create({ parent: elements.calendar });

    Object.entries(data).forEach((item) => {

      dom.create({
        parent: container,
        type: 'h4',
        content: item[1].name,
      });
    });
  },
};

export default content;
