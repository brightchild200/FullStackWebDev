// import express from 'express';
// const app = express();

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.get('/about', (req, res) => {
//     res.send('About Page');
// });

// app.get('/home', (req, res) => {
//     res.send('My home page');
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// })

// serve runs on prot 3000 this Listen is a method that starts the server. It has 2 variables , first is port (location of the server) and 2nd is callback funtion that is triggered when the server is setup. So in callback funtion we will print (cosloe.log) that the server is runnning successfully on port 3000.
// app here is just a variable name, it can be anything. It is just a variable that holds the express function.

// app.get() is used to handle GET requests. It takes two parameters: the route (in this case, '/') and a callback function that defines what to do when a request is made to that route.
// how to check the location of the server ---- in the above bar of the browser type http://localhost:3000/ 
// what is localhost -- it is simply when we don't have a server on the internet and instead we want ot host our server locally , making our own computer the server or the backend of our website 
// what is a port -- it is a number that identifies a specific process or service on a server. It is like an address for the server to know which service to connect to. In this case, port 3000 is used for our Express.js application.

// to see which ports are open we can do this in the terminal
// netstat -ano | findstr "LISTENING"  this will show all the ports that are open and listening for requests.

// when we open tthe localhost , we get an error that is CANNOT GET / - it means it can't get the root route or say the home page or index page of the website.

// !!!!!!! HTTP REQUESTS !!!!!!!
// HTTP stands for HyperText Transfer Protocol. It is the protocol used for transferring data over the web. It defines how messages are formatted and transmitted, and how web servers and browsers should respond to various commands form one computer to another.
/* There are 5 main http protocols -
1. GET - it request a resource from the server
2. POST - it sends a new resource to the server
3. PUT - it updates/replaces a current resource with new data
4. DELETE - it removes a specified resource form the server. this request is from client side to server side. 
5. PATCH - it is also an update method just like PUT. It patchs up the data that is already present. 

for example , i have ordered a bicycle from amazon but it;s one wheel is broken . So either i can use PUT to replace the whole bicycle with a new one or i can use PATCH to just replace the broken wheel with a new one.

jabhi meine mere code mein kuch na kuch change karungi toh mujhe server wapas chalu karna padega .  so most of the developers do install nodemon package which automatically restarts the server whenever there is a change in the code.
so to install it : npm i -g nodemon then to run the server use nodemon index.js instead of node index.js
g is for install this package globally so that it can be used in any project on my lp.
/ this is a endpoint of the server which enables it to respond to the get request. 

!!!!!! POSTMAN !!!!!!!
to communicate with the server the client side uses HTTP requests. the clicent side sends some request and the server responds to it, sometimes with 404 error.
where 404 is standard HTTP response code that indicates that the requested resource could not be found on the server. It is a common error message. 
The response code in HTTP are of 5 categories :
100 - 199 are informational responses
200 - 299 are successful responses  
300 - 399 are redirection messages
400 - 499 are client error responses
500 - 599 are server error responses

we will be using common ones like 200 whichi means everything is fine and the request was successful, 404 which means the requested resource was not found, and 500 which means there was an internal server error.
cheatsheet for HTTP response codes - https://www.restapitutorial.com/httpstatuscodes.html
1. hold on 2.here you go 3.go away(changes the url) 4. you messed up(client error) 5. i messed up(server error)

What if you want to test the backend first without frontend - we have this tool called POSTMAN . it is free 
to test it i need to have an open port. lets create new code below

*/


import express from 'express';
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Home page</h1>");
});

app.post("/register", (req, res) => {
    res.sendStatus(201);
});

app.put("/user/riya", (req, res) => {
    res.sendStatus(200);
});

app.patch("/user/riya", (req, res) => {
    res.sendStatus(200);
});

app.delete("/user/riya", (req, res) => {
    res.sendStatus(200);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


/* !!!!! INTRODUCTION TO MIDDLEWARES 
Middlewares are like middlemens who pre-process the requests (specially when we know that the request is going to be handled by multiple aspects like GET, POST and all.)It can check if the user has that uthority to make specific requests , or for security purpose.  
A very famous middleware is "body parser" - it can look at the request bodies before the server side handlers actually access them. This is mainly used when we are having form data like login form 
this activity is in side form folder 
*/