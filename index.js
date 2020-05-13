const express = require("express");
const app = express();
const port = 5000;

app.set('views', './views');
app.set('view engine', 'pug');

const users = [
    { id: 1, name: "quý" },
    { id: 2, name: "rum" },
    { id: 3, name: "Abc" },
]
app.get('/', (req, res) => {
    res.render("index")
});
app.get('/users', (req, res) => {
    res.render('users/index', { users })
})
app.get('/users/search', (req, res) => {
    const q = req.query.q.toLowerCase();
    matchSearch = users.filter((x) => x.name.toLowerCase().indexOf(q) !== -1);
    res.render('users/index', { users: matchSearch })
});

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.get('/users/create', (req, res) => {
    res.render('users/create')
})
app.post('/create', (req, res) => {
    const id = Math.max(...users.map(x => x.id));
    users.push({ id, name: req.body.name });
    res.redirect('/users')
})
app.listen(port, () => {
    console.log("sever start at port " + port);
})