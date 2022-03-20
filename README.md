# Social-Friends-Media-Api
 <img src="https://img.shields.io/badge/License-MIT License-blue">

## Description

This is a skeletone api for a social media app/website. With this api you are able to create users, add and remove friends, creates "thoughts" and add reactions to other users "thoughts".

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Contributing](#contributing)
* [Questions](#questions)


## Installation

clone this repository and run ```npm install``` or run ```yarn``` to install the required dependencies. If you would like to host this on a server other than your localhost modify the ```.env.sample``` provided. Mongodb must be isntalled on your system to use this locally.


## Usage

After installing the required dependencies and setting up the ```.env``` file if needed, run ```npm start``` to start the server. The avalible routes and the required parameters will be listed below.


You can follow the demo testing the routes using insomnia [HERE](https://drive.google.com/file/d/1qcGV881WokviHPtT3yy87Yp8UjBeuVKx/view)

To make testing in insomnia easier environmental variables were used.


```js
//Enviromental Varaibles for insomnia:

{
	"userId": "Response=> Body Attribute", //Request: Get all users, filter: $[(@.length-1)]._id  
	"friendId": "Response=> Body Attribute", //Request: Get all users, filter: $[(@.length-2)]._id
	"thoughtId": "Response=> Body Attribute", //Request: Get all Thoughts, filter: $[(@.length-1)]._id
	"reactionId": "Response=> Body Attribute", //Request: Get all Thoughts, filter: $[(@.length-1)].reactions[(@.length-1)].reactionId
	"newUser": {
		"username": "exampleUsername",
		"email": "exampleEmail@exampleEmail.com"
	},
	"updateUser": {
		"username": "updatedUsername",
		"email": "updatedEmail@updatedEmail.com"
	}
}

```



The following are the routes that are available in the api

* Get all Users 
```
curl --request GET \
  --url http://localhost:3001/api/users
```
* New User
```
curl --request POST \
  --url http://localhost:3001/api/users \
  --header 'Content-Type: application/json' \
  --data '{
	"username":"exampleUsername",
	"email":"exampleEmail@exampleEmail.com"
}'
```
* Get User By ID
```
curl --request GET \
  --url http://localhost:3001/api/users/:userId
```
* Update User by ID
```
curl --request PUT \
  --url http://localhost:3001/api/users/:userId \
  --header 'Content-Type: application/json' \
  --data '{
	"username":"updatedUsername",
	"email":"updatedEmail@updatedEmail.com"
}'
```
* Delete User by ID
```
curl --request DELETE \
  --url http://localhost:3001/api/users/:userId
```
* Add new Friend to User
```
curl --request POST \
  --url http://localhost:3001/api/users/:userId/friends/:friendId
```
* Delete Friend from User
```
curl --request DELETE \
  --url http://localhost:3001/api/users/:userId/friends/:friendId
```
* Get All Thoughts
```
curl --request GET \
  --url http://localhost:3001/api/thoughts
```
* Create new Thought
```
curl --request POST \
  --url http://localhost:3001/api/thoughts \
  --header 'Content-Type: application/json' \
  --data '{
	"thoughtText": "This is some example Text",
	"username":"exampleUsername"
}'
```
* Get Thought by ID
```
curl --request GET \
  --url http://localhost:3001/api/thoughts/:thoughtId
```
* Update Thought by ID
```
curl --request PUT \
  --url http://localhost:3001/api/thoughts/:thoughtId \
  --header 'Content-Type: application/json' \
  --data '{
	"thoughtText": "REPLACED TEXT"
}'
```
* Delete Thought by ID
```
curl --request DELETE \
  --url http://localhost:3001/api/thoughts/:thoughtId
```
* Create new Reaction
```
curl --request POST \
  --url http://localhost:3001/api/thoughts/:thoughtId/reactions \
  --header 'Content-Type: application/json' \
  --data '{
	"reactionBody":"This is an example reaction",
	"username":"exampleUsername"
}'
```
* Delete Reaction by ID
```
curl --request DELETE \
  --url http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
```

## Credits

Node, dotenv, express, mongoose, morgan, nodemon

## License


MIT License

Copyright (c) 2022 undefined

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.




## Contributing

If you would like to contribute to this repo please fork the repository and just submit a pull request explaining what features you would like to add and why it would benifit from these features.



## Questions

Find me on github here: [here](http://github.com/MoonRyc)

If you have any additional question feel free to email me at [rycmoon@gmail.com](mailto:rycmoon@gmail.com)
