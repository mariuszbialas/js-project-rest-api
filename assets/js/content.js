'use strict';

import { elements } from './index.js';
import dom from './dom.js';

const content = {
  handleClick(e, data) {
    e.preventDefault();
    if (data['Januar']) {
      const select = dom.sel('#month');
      const value = select.options[select.selectedIndex].value;
      this.showMonth({ month: value, ...data[value] });
    } else {
      const select = dom.sel('#year');
      const value = select.options[select.selectedIndex].value;
      this.showYear({ year: value, ...data[value] });
    }
  },

  renderSelect(data) {
    const name = data['Januar'] ? 'month' : 'year';

    const container = dom.create({ parent: elements.form });
    const form = dom.create({
      parent: container,
      type: 'form',
      attr: { id: data['Januar'] ? 'formMonthSelect' : 'formYearSelect' },
    });
    dom.create({
      parent: form,
      type: 'label',
      content: name + ': ',
      attr: { for: name },
    });
    const select = dom.create({
      parent: form,
      type: 'select',
      attr: {
        name: name,
        id: name,
      },
    });
    Object.keys(data).forEach((key) => {
      dom.create({
        parent: select,
        type: 'option',
        content: key == 'maerz' ? 'märz' : key,
        attr: { value: key },
      });
    });
    dom.create({
      parent: form,
      type: 'button',
      content: 'show data',
      attr: { type: 'submit' },
      listeners: { click: (event) => content.handleClick(event, data) },
    });
  },

  showMonth(data) {
    elements.calendar.innerHTML = '';
    const container = dom.create({ parent: elements.calendar });

    Object.entries(data).forEach((item, index) => {
      if (index === 0) {
        dom.create({
          parent: container,
          type: 'h3',
          content: item[0] + ': ' + item[1],
        });
      } else {
        const div = dom.create({ parent: container, classes: ['container'] });
        dom.create({
          parent: div,
          type: 'p',
          content: item[0] + ': ',
          attr: { id: item[0] },
        });

        item[1].forEach((el, index) => {
          if (item[1].length !== 0) {
            const box = dom.create({ parent: div });
            dom.create({
              parent: box,
              type: 'label',
              content: 'Name: ',
              attr: { for: `name-${index}-${item[0]}` },
            });
            dom.create({
              parent: box,
              type: 'input',
              attr: { value: el.name, id: `name-${index}-${item[0]}` },
            });
            dom.create({
              parent: box,
              type: 'label',
              content: 'Date: ',
              attr: { for: `date-${index}-${item[0]}` },
            });
            dom.create({
              parent: box,
              type: 'input',
              attr: { value: el.date, id: `date-${index}-${item[0]}` },
            });
            dom.create({
              parent: box,
              type: 'button',
              content: 'update',
              listeners: {
                click: () =>
                  (dom.sel(`#info-${index}-${item[0]}`).innerText =
                    'es wurde nicht geändert!'),
              },
            });
            dom.create({
              parent: box,
              type: 'span',
              attr: { id: `info-${index}-${item[0]}` },
              classes: ['info'],
            });
          }
        });
        dom.create({
          parent: div,
          type: 'button',
          content: 'add new',
        });
      }
    });
  },

  showYear(data) {
    elements.calendar.innerHTML = '';
    const container = dom.create({ parent: elements.calendar });
    const year = Object.entries(data);

    dom.create({
      parent: container,
      type: 'h3',
      content: year[year.length - 1][0] + ': ' + year[year.length - 1][1],
    });

    const div = dom.create({ parent: container, classes: ['container'] });
    Object.entries(data).forEach((item, index) => {
      const data = item[1];
      if ( data.name ) {
        const box = dom.create({ parent: div });
        dom.create({
          parent: box,
          type: 'label',
          content: 'Name: ',
          attr: { for: `name-${index}-${data.month}-${data.date}` },
        });
        dom.create({
          parent: box,
          type: 'input',
          attr: {
            value: data.name,
            id: `name-${index}-${data.month}-${data.date}`,
          },
        });
        dom.create({
          parent: box,
          type: 'label',
          content: 'Month: ',
          attr: { for: `month-${index}-${data.month}-${data.date}` },
        });
        dom.create({
          parent: box,
          type: 'input',
          attr: {
            value: data.month,
            id: `month-${index}-${data.month}-${data.date}`,
          },
        });
        dom.create({
          parent: box,
          type: 'label',
          content: 'Date: ',
          attr: { for: `date-${index}-${data.month}-${data.date}` },
        });
        dom.create({
          parent: box,
          type: 'input',
          attr: {
            value: data.date,
            id: `date-${index}-${data.month}-${data.date}`,
          },
        });
        dom.create({
          parent: box,
          type: 'button',
          content: 'update',
          listeners: {
            click: () =>
              (dom.sel(`#info-${index}-${data.month}-${data.date}`).innerText =
                'es wurde nicht geändert!'),
          },
        });
        dom.create({
          parent: box,
          type: 'span',
          attr: { id: `info-${index}-${data.month}-${data.date}` },
          classes: ['info'],
        });
      }
    });
  },
};

export default content;
