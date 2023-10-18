let express = require('express');
let app = express();

let qs = require('qs');

let projects = {
    "connectionsLab": [
        {
            "name": "Summit",
            "info": "A social media platform for hikers and mountain climbers"
        },
        {
            "name": "A True Fortune Cookie Story",
            "info": "A 2-sentence story of a procrastinating girl."
        },
        {
            "name": "'I Feel Like My Lamp Experiment': Visualization Edition",
            "info": "Experimental lamp to test how emotions are affected by colors of LED light. The visualization shows the data collected from the experiment."
        }
    ]
};

app.use('/', express.static('public'));

app.use('/about', express.static('public/about'));

app.get('/projectsdata/:projectname', (req, res) => {
    console.log(req.params.projectname);

    let user_projectname = req.params.projectname;
    let user_obj;
    for (let i = 0; i < projects.connectionsLab.length; i++) {
        if (user_projectname == projects.connectionsLab[i].name) {
            user_obj = projects.connectionsLab[i];
        };
    };
    console.log(user_obj);

    if (user_obj) {
        res.json(user_obj);
    } else {
        res.send("Info not present!");
    };
});

app.use('/projects/:projectname', express.static('public/projects/:projectname'));

// app.setting('query parser', (str) => {
//     return qs.parse(str);
// })

app.listen(3000, () => {
    console.log("app is listening at localhost:3000");
})
