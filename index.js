const express = require('express');

const app = express();
const port = 8000;

app.set('view engine', 'hbs'); // view engine is set to handlebars

app.use('/assets', express.static(__dirname + '/assets')); // static files are served from the assets folder
app.use(express.urlencoded({ extended: false }));

let dataProject = [
    {
        id: 1,
        projectname: 'Aplikasi Rental PS',
        duration: '23 hari',
        description: 'Aplikasi ini menggunakan ReactJS dan Firebase untuk mengelola data rental PS',
        technologies: ['react', 'android'],
        imageupload: '../assets/img/projek1.jpg'
    }
];

let isLogin = true;

app.get('/', (req, res) => {
    let data = dataProject.map((item) => {
        return {
            ...item,
            isLogin
        }
    });

    res.render('index', { isLogin, data });
    console.log(dataProject);
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

function dhm(t) {
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / 60000);
    if (m === 60) {
        h++;
        m = 0;
    }
    if (h === 24) {
        d++;
        h = 0;
    }

    return d;
}

app.post('/add-project', (req, res) => {
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let duration = dhm(new Date(enddate) - new Date(startdate));
    duration = Math.floor(duration / 30) <= 0 ? duration + ' hari' : duration % 30 == 0 ? Math.floor(duration / 30) + ' bulan ' : Math.floor(duration / 30) + ' bulan ' + duration % 30 + ' hari';

    let project = {
        id: dataProject.length + 1,
        projectname: req.body.projectname,
        duration,
        description: req.body.description,
        technologies: req.body.technologies,
        imageupload: '../assets/img/projek1.jpg',
    };
    dataProject.push(project);
    res.redirect('/');
});

app.get('/deleteproject/:id', (req, res) => {
    let id = req.params.id;
    dataProject = dataProject.filter((item) => {
        return item.id != id;
    })
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

