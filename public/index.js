(function() {
    "use strict";
    const ANIMAL_URL = '/animals/';
    const IMG_PATH = '/imgs/';

    function init() {
        id("dogs-btn").addEventListener("click", function() {
            fetchAnimal("dogs-btn");
        });
        
        id("cats-btn").addEventListener("click", function() {
            fetchAnimal("cats-btn");
        });
    }

    async function getImageUrl(animalData) {
        return IMG_PATH + animalData.image; 
    }

    async function fetchAnimal(animalId) {
        const buttonid = id(animalId);
        const params = buttonid.id.split('-')[0];
        try {
            const resp = await fetch(ANIMAL_URL + params);
            console.log(resp);
            const allanimalData = await resp.json();

            const animalcontainer = document.getElementById(params + 'grid'); 
            animalcontainer.innerHTML = '';

            for (const animalData of allanimalData) { 
                const animalDiv = document.createElement('div');
                const imageurl = await getImageUrl(animalData); 
                animalDiv.innerHTML = ` 
                <img src="${imageurl}" alt="${animalData.name}">
                <h3>${animalData.name}</h3>
                <p>${animalData.breed}</p>
                <p>Size: ${animalData.size}</p>
                <p>Age: ${animalData.age}</p>`;
                animalcontainer.appendChild(animalDiv);
            }
        } catch (err) {
            console.error(err);
        }
    } 
    init();
})();
