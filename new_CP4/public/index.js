(function() {
    "use strict";
    const ANIMAL_URL = '/animals';

    function init() {
        id("dogs-btn").addEventListener("click", function() {
            fetchAnimal("dogs-btn");
        });
        
        id("cats-btn").addEventListener("click", function() {
            fetchAnimal("cats-btn");
        });
    }

    async function getImageUrl(params, animalData) {
        try {
            const response = await fetch('/imgs/' + params + '_' + animalData.name.toLowerCase() + '.jpeg');;
            const fullUrl = response.url; 
            const finalUrl = new URL(fullUrl).pathname.substring(1); 
            console.log("1" + finalUrl);
            return finalUrl;
        } catch (error) {
            console.error('There was a problem with the fetch:', error);
        }
    }

    async function fetchAnimal(animalId) {
        const buttonid = id(animalId);
        const params = String(buttonid.id).split('-')[0];
        try {
            const resp = await fetch(ANIMAL_URL + '/'+ params);
            const allanimalData = await resp.json();

            const animalcontainer = document.getElementById(params + 'grid'); 
            animalcontainer.innerHTML = '';

            allanimalData.forEach(animalData => {
                const animalDiv = gen('div');

                const imageurl = getImageUrl(params, animalData);
                console.log("2" + imageurl);

                animalDiv.innerHTML = ` 
                <img src="imgs/dog_max.jpeg" alt="${animalData.name}">
                <h3>${animalData.name}</h3>
                <p>${animalData.breed}</p>
                <p>Size: ${animalData.size}</p>
                <p>Age: ${animalData.age}</p>`;
                animalcontainer.appendChild(animalDiv);
            });
        } catch (err) {
            console.error(err);
        }
    }
    
    init();
})();
