"use strict";

const express = require("express");

const SERVER_ERROR = "Something went wrong on the server, please try again later.";
const CLIENT_ERROR = "Something went wrong with the input, please double check your input.";
const SERVER_ERR_CODE = 500;
const CLIENT_ERR_CODE = 400;
const DEFAULT_IMAGE = "animal.jpeg";
const DEBUG = true;


const multer = require("multer");
const fs = require("fs/promises");
const cors = require("cors");
const globby = require("globby");
const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(multer().none());
app.use(cors());

/**
 * GET request for a user to get all the animals at the animal shelter. If it doesn't recieve a
 * request, it will throw a server error.
 */
app.get("/animals", async(req, res) => {
  try {
    const result = await fs.readFile("animals.json", "utf8");
    const animalData = JSON.parse(result);
    res.send(animalData);
  } catch (err) {
    res.status(CLIENT_ERR_CODE); 
    err.message = CLIENT_ERROR;  
  }
});

/**
 * GET request for a user to get a specific category of animals. If it doesn't recieve a request, it 
 * will throw a server error. If the user inputs a category not in animals.json, it will throw an 
 * error about an unknown category.
 */
app.get('/animals/:category', async(req, res, next) => {
  try {
    const result = await fs.readFile("animals.json", "utf8");
    const animalData = JSON.parse(result);
    let category = req.params.category.toLowerCase();

    if (animalData.animals[category]) {
      res.json(animalData.animals[category]);
    } else {
      res.status(CLIENT_ERR_CODE);
      next(Error("Unknown category. Please double check your input."));
    }
  } catch (err) {
    res.status(SERVER_ERR_CODE); 
    next(Error(SERVER_ERROR));
  }
});

/** used from CAFE API */
app.get("/images", async (req, res, next) => {
  try {
    let imageNames = await globby("public/imgs/*.jpeg");
    let result = imageNames.join("\n");
    res.type('text');
    res.send(result);
  } catch (err) { 
    res.status(SERVER_ERR_CODE);
    err.message = SERVER_ERROR;
    next(err);
  }
});

/**
 * POST request for a user to add a new animal for adoption. Recieves the profile and creates a JSON 
 * object and appends to the animals.json. If it doesn't recieve the request, it will throw a server
 * error. If any parameters are null, it will throw an error that at least one parameter is missing. 
 * If it can't append to file, it will throw an error saying that there was an error when appending to 
 * the file.
 */

app.post("/addAnimal", async(req, res, next) => {
  try {
    let name = req.body.name;
    let id = req.body.id;
    let breed = req.body.breed;
    let size = req.body.size;
    let age = req.body.age; 
    let image = req.body.image;

    if (!image) {
      image = DEFAULT_IMAGE;
    }

    if (name && id && breed && size && age) {
      let result = {
        "name" : name,
        "id" : id,
        "breed": breed,
        "size": size,
        "age": age,
        "image": DEFAULT_IMAGE
      };

      let category = id.toLowerCase() + 's';

      const originalData = await fs.readFile("animals.json", "utf8");
      const animalData = JSON.parse(originalData);

      animalData.animals[category].push(result);

      let contents = await fs.writeFile("animals.json", JSON.stringify(animalData, null, 2), (err) => {
        if (err) {
          console.error('Error appending to file:');
        } else {
          res.send(contents);
          console.error('JSON file was created successfully!');
        }
      })
      res.status(200).send("Profile received successfully!")
    } else { 
      res.status(CLIENT_ERR_CODE);
      next(Error("Required POST parameters for /addAnimal: animals, name, breed, size, age, image."));
    }
  } catch (err) {
    res.status(SERVER_ERR_CODE);
    err.message = SERVER_ERROR;
    next(err);
  }
});

 
/**
 * POST request for a user to send a message to the admin. Recieves the information and parses it and
 * adds to the file. If it doesn't parses the information, throws a server error. If any parameters are 
 * empty, throws a error that a parameter is missing. If it can't read the file, throws an error that
 * the file couldn't be read. If it can't add new messages to the file, it will throw an error saying 
 * that there was an error when appending to the file.
 */
app.post("/contact", async(req, res, next) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;

    if (name && email && message) {
      let userMessage = {
        "name" : name,
        "email" : email,
        "message" : message
      }

      let allMessages = [];

      try {
        const messages = await fs.readFile("messages.json", "utf8");
  
        if (messages.trim().length > 0) {
          allMessages = JSON.parse(messages);
        }
      
        allMessages.push(userMessage);
        let contents = await fs.writeFile("messages.json", JSON.stringify(allMessages, null, 2), (err) => {
          if (err) {
            console.error('Error appending to file:');
          } else {
            res.send(contents);
            console.error('JSON file was created successfully!');
          }
        })
        res.status(200).send("Message received successfully!")

      } catch (err) {
        res.status(SERVER_ERR_CODE); 
        next(Error("Could not read file."));
      }
    } else { 
      res.status(CLIENT_ERR_CODE);
      next(Error("Required POST parameters for /contact: name, email, message."));
    }
  } catch (err) {
    res.status(SERVER_ERR_CODE);
    err.message = SERVER_ERROR;
    next(err);
  }
});


/** granted permission by hovik to use from CAFE API */

/**
 * Example of error-handling middleware to cleanly handle different types of errors.
 * Any function that calls next with an Error object will hit this error-handling
 * middleware since it's defined with app.use at the end of the middleware stack.
 */
function errorHandler(err, req, res, next) {
    if (DEBUG) {
      console.error(err);
    }
    // All error responses are plain/text in the Cafe API.
    res.type("text");
    res.send(err.message);
  }
  
// Add errorHandling to end of middleware stack
// See Express Middleware Error-handling documentation for 
// more useful details
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});