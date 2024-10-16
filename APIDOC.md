# Team USA Basketball Merch API Documentation

* My Team USA Basketball Merch API will have data on the different merch for all the players 
completing at the Paris Olympics (jerseys for all the players and hats/accessories for the NBA
teams each player currently plays for) *

## Get All Trees
**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Requests all available merch for user purchase

**Supported Parameters** N/A

**Example Request:** GET/teamusabasketballmerch

**Example Response:**

```json
[
    {
        "id": 1,
        "name": "Steph Curry Jersey",
        "img": "imgs/warriors-steph-jersey.jpeg",
        "price": 119.99,
    },
    {
        "id": 2,
        "name": "Golden State Warriors Hat",
        "img": "imgs/warriors-hat.jpeg",
        "price": 33.99,
    },
    {
        "id": 3,
        "name": "Golden State Warriors - Tumbler",
        "img": "imgs/warriors-merch.jpeg",
        "price": 18.99,
    }
]
```

**Error Handling:**
500 (Internal Server Error) - error when reading files, display "Internal Server Error, please try
again later"

## Get Tree By Experience Level
**Request Format:** GET

**Returned Data Format**: JSON

**Description:** Requests merch from a specific NBA team 

**Supported Parameters** 
* experience (required)
  * The experience level of the customer

**Example Request:** GET/teamusabasketallmerch/lakers

**Example Response:**

```json
[
    {
        "id": 19,
        "name": "LeBron James Jersey",
        "img": "imgs/lakers-lebron-jersey.jpeg",
        "price": 119.99,
    },
    {
        "id": 20,
        "name": "Los Angeles Lakers Hat",
        "img": "imgs/lakers-hat.jpeg",
        "price": 19.99,
    },
    {
        "id": 21,
        "name": "Los Angeles Lakers - Socks", 
        "img": "imgs/lakers-merch.jpeg",
        "price": 29.99,
    }
]
```

**Error Handling:**
500 (Internal Server Error) - error when reading files,display "Internal Server Error, please try
again later"

## Get Tree by Category
**Request Format:** GET

**Returned Data Format**: JSON

**Description:** Requests a specific kind of merch

**Supported Parameters**
* catagory (required)
    * the catagory of the tree


**Example Request:** GET/teamusabasketballmerch/jersey

**Example Response:**

```json
[
    {
        "id": 1,
        "name": "Steph Curry Jersey",
        "img": "imgs/warriors-steph-jersey.jpeg",
        "price": 119.99,
    },
    {
        "id": 4,
        "name": "Bam Adebayo Jersey",
        "img": "imgs/heat-bam-jersey.jpeg",
        "price": 119.99,
    },
    {
        "id": 4,
        "name": "Kevin Durant Jersey",
        "img": "imgs/suns-durant-jersey.jpeg",
        "price": 119.99,
    }
]
```

**Error Handling:**
500 (Internal Server Error) - error when reading files, display "Internal Server Error, please try
again later"

## Get Tree by id
**Request Format:** GET

**Returned Data Format**: JSON

**Description:** Request merch by id

**Supported Parameters**
* id (required)
    * the id of the tree

**Example Request:** GET/teamusabasketballmerch/1

**Example Response:**

```json
[
    {
        "id": 1,
        "name": "Steph Curry Jersey",
        "img": "imgs/warriors-steph-jersey.jpeg",
        "price": 119.99,
    }
]
```

**Error Handling:**
500 (Internal Server Error) - error when reading files, display "Internal Server Error, please try
 gain later"

## Post a Question
**Request Format:** POST

**Returned Data Format**: JSON

**Description:** Post any questions to the FAQ 

**Supported Parameters**
* question (required)
    * question that the customer wants to ask
* email (required)
    * email of the customer

**Example Request:** POST/question

**Example Response:**

```json
You have successfully submitted your question. We will send a response to the email you have
inputted as soon as possible.
```

**Error Handling:**
400 (Bad Request Error) - no question was entered, displays "You did not submit a question"

500 (Internal Server Error) - error when submitting question, displays "There was an error 
submitting your question. Please try submitting your question again."