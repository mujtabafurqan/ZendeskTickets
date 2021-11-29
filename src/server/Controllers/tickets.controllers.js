const axios = require('axios');
const { base64encode} = require('nodejs-base64');
const config = require('dotenv').config();

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + base64encode(`${process.env.ZENDESK_EMAIL}:${process.env.ZENDESK_PASSWORD}`),
  };

const createMany = (req, res) => {
    const tickets  = req.body;
   
      axios.post(`https://${process.env.ZENDESK_URL}/api/v2/tickets/create_many`, tickets, {
          headers: headers
        })
        .then((response) => {
            console.log(response.data);
            res.send(response.data).status(201);
        })
        .catch((error) => {
            console.log("error while calling Zendesk API", error);
            res.status(error.response.status).send(error.response.statusText);
        }); 
}

const list = (req, res) => {
    axios.get(`https://${process.env.ZENDESK_URL}/api/v2/tickets?page[size]=25`, {
        headers: headers
    })
    .then((response) => {
        res.send(response.data).status(200);
    })
    .catch((error) => {
        console.log("error while calling Zendesk API", error);
        res.status(error.response.status).send(error.response.statusText);
    });
}

const count = (req, res) => {
    axios.get(`https://${process.env.ZENDESK_URL}/api/v2/tickets/count`, {
        headers: headers
    })
    .then((response) => {
        res.status(200).send(response.data.count);
    })
    .catch((error) => {
        console.log("error while calling Zendesk API", error);
        res.status(error.response.status).send(error.response.statusText);
    });
}

const getNext = (req, res) => {
    axios.get(req.query.link, {
        headers: headers
    })
    .then((response) => {
        res.status(200).send(response.data);
    })
    .catch((error) => {
        console.log("error while calling Zendesk API", error);
        res.status(error.response.status).send(error.response.statusText);
    });
}

const getPrevious = (req, res) => {
    axios.get(req.query.link, {
        headers: headers
    })
    .then((response) => {
        res.status(200).send(response.data);
    })
    .catch((error) => {
        console.log("error while calling Zendesk API", error);
        res.status(error.response.status).send(error.response.statusText);
    });
}
module.exports = {
    createMany,
    list,
    count,
    getNext,
    getPrevious
}