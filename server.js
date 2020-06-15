const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 8080;

const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

db.sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => {
        console.log(`LISTENING ON: ${PORT}`);
    })
})