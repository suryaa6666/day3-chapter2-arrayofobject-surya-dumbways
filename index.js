const express = require('express');

const app = express();
const port = 8000;

app.set('view engine', 'hbs'); // view engine is set to handlebars

app.use('/assets', express.static(__dirname + '/assets')); // static files are served from the assets folder
app.use(express.urlencoded({ extended: false }));

let isLogin = true;

app.get('/', (req, res) => {
    res.render('index', { isLogin });
});

app.get('/contact', (req, res) => {
    res.render('contact', { isLogin });
});

app.get('/project-detail/:id', (req, res) => {
    let id = req.params.id;

    res.render('project-detail', {
        projectDetail: {
            id,
            name: 'Project membuat aplikasi rental PS',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
            molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
            numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
            optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
            obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
            recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
            minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
            quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
            fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
            consequuntur! Commodi minima excepturi repudiandae velit hic maxime
            doloremque. Quaerat provident commodi consectetur veniam similique ad 
            earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
            fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
            suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
            modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
            totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
            quasi aliquam eligendi, placeat qui corporis!`,
            image: '../assets/img/projek1.jpeg',
            duration: '1 month',
        }
    });
});

app.get('/add-project', (req, res) => {
    res.render('add-project');
});

app.post('/add-project', (req, res) => {
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

