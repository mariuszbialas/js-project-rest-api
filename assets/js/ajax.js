'use strict';

const ajax = {
  url: 'http://localhost:3000/api',

  async fetchData(query='') {
    try {
      const response = await fetch(`${this.url}/${query}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Fehler bei Data lesen');
    }
  },
};

export default ajax;
