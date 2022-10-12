const app = require('./app');
require('./env');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is listening on PORT: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
