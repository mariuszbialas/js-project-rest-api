import express  from 'express';
const apiRouter = express();


apiRouter.get('/api', (req, res) => {
    db.list()
      .then((res) => {
        if (!res.includes(dbName)) {
          db.create(dbName);
          console.log('Databas created successfully');
        } else {
          console.log('Databse connecion');
        }
      })
      .catch(console.warn);
  
      // db.get('calendar').then(data=> res.json(data));
  
      db.use(dbName)
          .list({include_docs: true})
          .then(res => res.rows.map(row => row.doc))
          .then(data => res.json(data));
      
  });

 export default apiRouter;