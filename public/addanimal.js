(function() {
    "use strict";

    let clicked = false;

    function init() {
        const submitButton = qs("#main-view button"); 
        submitButton.addEventListener("click", addanimal);
    }

    async function addanimal() {

        let form = document.getElementById("input-form");
        let params = new FormData(form);

        try {
            const response = await fetch('/addAnimal', {
                method: 'POST',
                body: params
            });
            if (response.ok) {
                qs("#main-view").classList.toggle("hidden");
                qs("#done-view").classList.toggle("hidden");
            } else {
                console.error('We are having trouble uploading the animal profile');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        init(); 
    });
})();
