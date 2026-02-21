const jsonServer = require('json-server');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'UTF-8'));
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3001;

// Задержка 1200ms
server.use((req, res, next) => {
  setTimeout(next, 1200);
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// POST /orders - добавляем pickupPoint объект
server.post('/orders', (req, res, next) => {
  const db = router.db;
  const { pickupPointId, ...rest } = req.body;
  
  if (pickupPointId) {
    const point = db.get('pickupPoints').find({ id: pickupPointId }).value();
    if (point) {
      req.body = {
        ...rest,
        id: crypto.randomUUID(),
        pickupPoint: { id: point.id, title: point.title }
      };
    }
  }
  
  next();
});

server.use(router);

server.listen(PORT, () => {
  console.log(`🚀 JSON Server running at http://localhost:${PORT}`);
  console.log(`
Endpoints:
  GET  /pickupPoints    - All pickup points
  GET  /dates/:id       - Dates for pickup point
  GET  /orders          - All orders
  POST /orders          - Create order
  `);
});
