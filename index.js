const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.set('port', process.env.PORT || 4000);

app.use(require('./routes'));

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});