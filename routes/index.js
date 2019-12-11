var express = require('express');
var router = express.Router();
/*
const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');
*/

const requestpromise = require('request-promise');
const querystring = require('querystring');

const dotenv = require('dotenv');
dotenv.config();

router.post('/corporate', async (req,res)=>{

  try {
    //if any user is added, we can use JWT token to add provide session validation
    //const token = jwt.sign({_id : user._id}, process.env.TOKEN_KEY);
    //console.log("token " + token);
    //res.header('token', token);

    //send utterance as a body in my API
    const utterance = req.body.query;

    // Pass an utterance to the sample LUIS app
    const responseData = await getPrediction(utterance);

    res.send(responseData);
  }

  catch(err){
    res.status(400).send({
      status : res.statusCode,
      message : err
    });
  }
});


router.post('/emotion', async (req,res)=>{

  try {
    //if any user is added, we can use JWT token to add provide session validation
    //const token = jwt.sign({_id : user._id}, process.env.TOKEN_KEY);
    //console.log("token " + token);
    //res.header('token', token);

    //send utterance as a body in my API
    const utterance = req.body.query;

    // Pass an utterance to the sample LUIS app
    const responseData = await getEmoPrediction(utterance);

    res.send(responseData);
  }

  catch(err){
    res.status(400).send({
      status : res.statusCode,
      message : err
    });
  }
});

getEmoPrediction =  async (utterance) => {

  const emoEndpointKey = process.env.EMO_ENDPOINT_KEY;
  const emoEndpoint =  process.env.ENDPOINT;
  const emoAppId =  process.env.EMO_APP_ID;

  // Create query string
  const queryParams = {
    "verbose":  true,
    "timezoneOffset":0,
    "q": utterance,
    "subscription-key": emoEndpointKey
  };

  const URI = `https://${emoEndpoint}/luis/v2.0/apps/${emoAppId}?${querystring.stringify(queryParams)}`;

  // HTTP Request
  const response = await requestpromise(URI);

  return JSON.parse(response);
};

getPrediction = async (utterance) => {

  const endpointKey = process.env.ENDPOINT_KEY;
  const endpoint =  process.env.ENDPOINT;
  const appId =  process.env.APP_ID;

  // Create query string
  const queryParams = {
    "verbose":  true,
    "timezoneOffset":0,
    "q": utterance,
    "subscription-key": endpointKey
  };

  const URI = `https://${endpoint}/luis/v2.0/apps/${appId}?${querystring.stringify(queryParams)}`;

  // HTTP Request
  const response = await requestpromise(URI);

  return JSON.parse(response);
};

module.exports = router;
