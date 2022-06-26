const express = require('express');
const { index, projectDetail, contact, addProject, editProject, deleteProject, postAddProject, postEditProject } = require('./controllers/controllers');

const app = express();
const port = 8000;

app.set('view engine', 'hbs'); // view engine is set to handlebars

app.use('/assets', express.static(__dirname + '/assets')); // static files are served from the assets folder
app.use(express.urlencoded({ extended: false }));

app.get('/', index);

app.get('/project-detail/:id', projectDetail);

app.get('/contact', contact);

app.get('/add-project', addProject);

app.get('/delete-project/:id', deleteProject);

app.get('/edit-project/:id', editProject);

app.post('/add-project', postAddProject);

app.post('/edit-project/:id', postEditProject);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

