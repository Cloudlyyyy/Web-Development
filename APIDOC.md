# CS132 Animal Shelter API Documentation
**Author** Cloudly Ceen 
**Last Updated** 10/19/24

The Animal Shelter API provides functionality to retrieve and post data for a small animal shelter.

Clients can retrieve information for current animals that are available for adoption and filter out 
animals based on the size and breed. Functionality is also given to submit a message to the admin 
to help put up a new animal for adoption. 

Summary of endpoints:
* GET /animals
* GET /animals/:category
* POST /contact
* POST /addAnimal

In this API, all error responses are returned as plain text. Any 500 errors represent a server-side 
issue and include a generic error message. Any 400 error represent an invalid request by a client,
and are documented appropriately for any parameterized endpoint. 

## *GET /animals*
**Returned Data Format**: JSON 

**Description:**
Returns a JSON collection of animals available for adoption for our animal shelter.

**Parameters**
N/A

**Example Request:** `GET /animals`

**Example Response:** 
```json
{
    "animals": {
        "Dogs": [
            {
                "name": "Max",
                "id": "dog",
                "breed": "Labrador Retriever",
                "size": "L",
                "age": "5",
                "image": "max.jpeg"
            },
            {
                "name": "Bella",
                "id": "dog",
                "breed": "French Bulldog",
                "size": "M",
                "age": "3",
                "image": "bella.jpeg"
            },
            {
                "name": "Charlie",
                "id": "dog",
                "breed": "Dachshund",
                "size": "S",
                "age": "7",
                "image": "charlie.jpeg"
            }
        ],
        "Cats": [
            {
                "name": "Luna",
                "id": "cat",
                "breed": "Maine Coon",
                "size": "L",
                "age": "4",
                "image": "luna.jpeg"
            },
            {
                "name": "Simba",
                "id": "cat",
                "breed": "Bengal",
                "size": "M",
                "age": "2",
                "image": "simba.jpeg"
            },
            {
                "name": "Chloe",
                "id": "cat",
                "breed": "Siamese",
                "size": "M",
                "age": "5",
                "image": "chloe.jpeg"
            }

        ]
    }
}
```

## *GET /animals/:category*
**Returned Data Format**: JSON 

**Description:**
Returns JSON data with animals based on the given category (not case-sensitive).

**Supported parameters**
* /:category (required)
* Category name for animals to search for.

**Example Request:** `/animals/dogs` or `animals/Dogs`

**Example Response:**
```json
[
    "max",
    "bella",
    "charlie",
]
```

**Error Handling:**
* 400: Invalid request if given a category that does not currently exist at animal shelter.

**Example Request:** `/animals/birds`

**Example Response:** 
```Category bird not found.```

## *POST /contact*
**Returned Data Format**: Plain Text

**Description:**
Sends information to the animal shelter for a "contact us" endpoint, including name, email, and 
message. Returns a response about whether their message was successfully sent and recieved or
provide more detail about an erroneous request. 

**Supported Parameters**
* POST body parameters:
    * `name` (required) - name of customer
    * `message` (required) - message 
    * `email` (required) - email of customer

**Example Request:** `/contact`
* POST body parameters:
    * `name='Cloudly'`
    * `message='Cloudly says hi'`
    * `email='cceen@caltech.edu'`

**Example Response:**
```Your message was successfully sent and we will send a response as soon as possible.```

**Error Handling**
* 400: Invalid request missing any of the parameters.

**Example Request:** `/contact`
* POST body parameters:
    * `name='Cloudly'`
    * `message='Cloudly says hi'`

**Example Response:**
```Missing required POST parameters for /contact: email.```

## *POST /addAnimal*
**Returned Data Format**: JSON

**Description:**
Creates a JSON with all the information with the new animal for adoption.

**Supported Parameters**
* POST body parameters:
    * `name` (required) - name of new animal 
    * `id` (required) - type of animal
    * `breed` (required) - breed of new animal 
    * `size` (required) - size of new animal 
    * `age` (required) - age of new animal 
    * `image` (required) - image of new animal

**Example Request:** `/addAnimal`
* POST body parameters:
    * `name='Rocky'`
    * `id=dog`
    * `breed='German Shepherd'`
    * `size='L'`
    * `age='1'`
    * `image='rocky.jpeg'`

**Example Response:**
```Your message was successfully sent and we will create a new profile for the new animal soon!```

**Error Handling**
* 400: Invalid request missing any of the parameters.

**Example Request:** `/addAnimal`
* POST body parameters:
    * `name='Buddy'`
    * `id='dog'`
    * `breed='Beagle'`
    * `size='L'`
    * `image='buddy.jpeg'`

**Example Response:**
```Missing required POST parameters for /addAnimal age.```

