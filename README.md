# System Integration Final: Azure Language Understanding
SI Final Project documentation

API can be used to easily authenticate users if any. The project is used to leverage the Microsoft Cognitive Services APIs and allow developers to use the power of artificial intelligence to create apps that can more effectively understand and interpret the needs of users. I am using the language understanding intelligence service to build API which can accept a POST request and run the submitted content through a third party API before sending back the response. The server is hosted on AWS EC2.

LUIS: Language Understanding Intelligence Service is a machine learning based service that enables you to build natural language processing into your applications. It does this by applying custom machine learning intelligence to a user's conversational natural language text in order to predict overall meaning and extract any relevant information. The LUIS application consists of a custom domain specific model. This is the brain of our application and is composed of three key things: Intents, Utterances and Entities.

text in order to predict overall meaning and extract any relevant information.

## Table of content
* [Get Started](#get-started)
    * [Login](#login)
    * [Sign Up](#sign-up)
    * [Corporate Job Search/Apply API](#corporate-job-search-apply-api)
    * [Emotion Detection](#emotion-detection-API)
* [Database Schema](#database-schema)
* [References](#references)

## Get Started
User-Authentication-API can be used to login, signup user. The other APIs are used to get response on basis of entered utterances with the help of Azure LUIS.

> In the examples on this page, you would replace [TOKEN] with the token returned by this API after user SignUp/Login.

### Login 

> http://52.45.142.77:80/languageUnderstanding/login

* Method - POST 

* Request Payload - 
 
 ```  
 {
     "email" : "joey@gmail.com",
     "password" : "123456"
 }
```
   
* Response Payload- 
    
```
 {
    "status": 200,
    "id": "5dcd443345f9d61daf65ff9b",
    "token":"[TOKEN]",
    "name": "Joey Tribbiani",
    "email": "joey@gmail.com"
 } 
```

* Status codes -
   * 200 - success
   * 400 - Invalid email/password
   
* Messages - 

```
   {
    "status": 400,
    "message": "Email does not exist, please register!"
   }
```

### Sign Up

> http://52.45.142.77:80/languageUnderstanding/signUp

* Method - POST

* Request Payload(Header) -

```
“token” :[TOKEN]
```

* Request Payload(Body) -
```
{
    "firstName" : "Barney",
    "lastName" : "Stinson",
    "gender" : "Male",
    "contactNo" : "1234567890",
    "email" : "barney@gmail.com",
    "password" : "123456"
}
```

* Response Payload- 
```
{
    "status": 200,
    "token": [TOKEN],
    "userId": "5dd0d3ca7a75547086b267e1",
    "name": "Barney Stinson",
    "email": "barney@gmail.com",
    "contactNo": "1234567890"
}
```

* Status codes - 
   * 200 - success
   * 400 - Access denied.. Token not provided
   * 401 - Invalid token

* Messages - 
```
{
    "status": 400,
    "message": "Email already exist.Try to Login.."
}
```

### Corporate Job Search/Apply API

> http://52.45.142.77:80/languageUnderstanding/corporate

* Method - POST

* Request Payload(Header) - (This portion nof code is being commented to allow easy testing)

```
“token” :[TOKEN]
```

* Request Payload(Body) -
```
{
    "query" : "apply for job 1d 7939838"
}
```

* Response Payload- 
```
{
    "query": "apply for job 1d 7939838",
    "topScoringIntent": {
        "intent": "ApplyForJob",
        "score": 0.8019631
    },
    "intents": [
        {
            "intent": "ApplyForJob",
            "score": 0.8019631
        },
        {
            "intent": "GetJobInfo",
            "score": 0.0360143
        },
        {
            "intent": "None",
            "score": 0.0246254988
        }
    ],
    "entities": []
}
```

* Status codes - 
   * 200 - success
   * 400 - Access denied.. Token not provided
   * 401 - Invalid token

### Emotion Detection API (Uses Sentiment Analysis)

> http://52.45.142.77:80/languageUnderstanding/emotion

* Method - POST

* Request Payload(Header) - (This portion nof code is being commented to allow easy testing)

```
“token” :[TOKEN]
```

* Request Payload(Body) -
```
{
	"query":"I am disappointed"
}
```

* Response Payload- 
```
{
    "query": "I am disappointed",
    "topScoringIntent": {
        "intent": "Sad",
        "score": 0.705604553
    },
    "intents": [
        {
            "intent": "Sad",
            "score": 0.705604553
        },
        {
            "intent": "Happy",
            "score": 0.122456409
        },
        {
            "intent": "None",
            "score": 0.0121761682
        },
        {
            "intent": "Angry",
            "score": 0.003067639
        }
    ],
    "entities": [],
    "sentimentAnalysis": {
        "label": "negative",
        "score": 0.00372463465
    }
}
```

* Status codes - 
   * 200 - success
   * 400 - Access denied.. Token not provided
   * 401 - Invalid token
   
## Database Schema

MongoDB Atlas Database 

* User Schema

```
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        max : 255
    },
    password : {
        type : String,
        min : 6,
        required : true
    },
    gender: {
        type :String,
        required : true
    },
    contactNo: {
        type:String,
        min : 10,
        max : 10,
        required: true
    }
});
```

## References

- [JWT](https://jwt.io)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com)
- [@hapi/joi](https://www.npmjs.com/package/@hapi/joi)
- Udemy
- Microsoft Azure Documentation
