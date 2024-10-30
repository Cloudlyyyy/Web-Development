(function() {
    "use strict";

    let clicked = false;

    function init() {
        const submitButton = qs("#main-view button"); 
        submitButton.addEventListener("click", submitQuestion);
        console.log(submitButton);
    }

    async function submitQuestion() {
        const name = qs("#name").value; 
        const email = qs("#email").value; 
        const message = qs("#message").value;
    
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });
    
            if (response.ok) {
                qs("#main-view").classList.toggle("hidden");
                qs("#done-view").classList.toggle("hidden");
            } else {
                console.log(error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        init(); 
    });
})();