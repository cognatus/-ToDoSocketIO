# -ToDoSocketIO
I have no imagination to descriptions, so in short words, this is a basic MEAN(A of AngularJS) todo list with Socket.io.

Requeriments
=======
-Node.js 4.2.6

-NPM 3.5.2

-MongoDB 3.4.5

-Have this repo cloned


Instalation
===========
In the shell, enter to the repo and install dependencies:

```bash
$ npm install
```

Run MongoDB as you want having the default port, for example:

```bash
$ mongod
or in a specific path 
$ mongod --dbpath <path>
```

Run project
===========
```bash
$ DEBUG=ToDoSocketIO:* npm start
```

Open it in port 3000

Possible issues
===========
Perhaps when you move an element, this may send and error of mongoose, if that is the case, then do the next:

-Stop the project

-Delete the database

-Open index.js of the mongoose-auto-increment repo, go to the line 44 and change unique for false

-Run the project again
