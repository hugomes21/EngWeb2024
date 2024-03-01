const axios = require('axios');

axios.get('https://localhost:3001/alunos/a100')
    .then(response => {
        data = response.data;
        console.log(JSON.stringify(data));
    }).catch(error => {
        console.log(error);
    });

