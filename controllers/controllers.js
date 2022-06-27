const { dhm } = require('./function');

let dataProject = [
];

let isLogin = true;

const index = (req, res) => {
    let data = dataProject.map((item) => {
        return {
            ...item,
            isLogin
        }
    });

    data.forEach((item) => {
        if (typeof (item.technologies) == 'string') {
            item.technologies = [item.technologies];
        }
    });

    res.render('index', { isLogin, data });
}

const projectDetail = (req, res) => {
    let id = req.params.id;

    let projectDetail = dataProject.find((item) => {
        return item.id == id;
    })

    if (typeof (projectDetail.technologies) == 'string') {
        projectDetail.technologies = [projectDetail.technologies];
    }

    res.render('project-detail', { projectDetail });
}

const contact = (req, res) => {
    res.render('contact', { isLogin });
}

const addProject = (req, res) => {
    res.render('add-project');
}

const editProject = (req, res) => {
    let id = req.params.id;
    let project = dataProject.find((item) => {
        return item.id == id;
    });

    project.technologies = project.technologies.toString();
    res.render('edit-project', { project });
}

const postAddProject = (req, res) => {
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let duration = dhm(new Date(enddate) - new Date(startdate));
    duration = Math.floor(duration / 30) <= 0 ? duration + ' hari' : duration % 30 == 0 ? Math.floor(duration / 30) + ' bulan ' : Math.floor(duration / 30) + ' bulan ' + duration % 30 + ' hari';

    let imageRandom = ['projek1.jpg', 'projek2.jpg', 'projek3.jpg'];
    let imageupload = imageRandom[Math.floor(Math.random() * (2 - 0) + 0)];

    let project = {
        id: dataProject.length + 1,
        name: req.body.name,
        startdate,
        enddate,
        duration,
        description: req.body.description,
        technologies: req.body.technologies,
        imageupload,
    };

    dataProject.push(project);
    res.redirect('/');
}

const postEditProject = (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;
    let duration = dhm(new Date(enddate) - new Date(startdate));
    duration = Math.floor(duration / 30) <= 0 ? duration + ' hari' : duration % 30 == 0 ? Math.floor(duration / 30) + ' bulan ' : Math.floor(duration / 30) + ' bulan ' + duration % 30 + ' hari';
    let technologies = req.body.technologies;

    let imageRandom = ['projek1.jpg', 'projek2.jpg', 'projek3.jpg'];
    let imageupload = imageRandom[Math.floor(Math.random() * (2 - 0) + 0)];

    dataProject.forEach((item) => {
        if (item.id == id) {
            item.name = name;
            item.startdate = startdate;
            item.enddate = enddate;
            item.description = description;
            item.duration = duration;
            item.technologies = technologies;
            item.imageupload = imageupload;
        }
    });

    res.redirect('/');
}

const deleteProject = (req, res) => {
    let id = req.params.id;

    dataProject = dataProject.filter((item) => {
        return item.id != id;
    });

    res.redirect('/');
}

module.exports = { index, projectDetail, contact, addProject, editProject, deleteProject, postAddProject, postEditProject };