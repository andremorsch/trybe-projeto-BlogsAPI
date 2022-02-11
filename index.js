const express = require('express');
const usersController = require('./controllers/users');
const loginController = require('./controllers/login');
const categoriesController = require('./controllers/categorie');
const blogsPostsController = require('./controllers/BlogsPosts');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user', usersController.create);

app.post('/login', loginController.create);

app.get('/user', usersController.selectAllUsers);

app.get('/user/:id', usersController.selectById);

app.post('/categories', categoriesController.create);

app.get('/categories', categoriesController.selectAllCategories);

app.post('/post', blogsPostsController.create);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
