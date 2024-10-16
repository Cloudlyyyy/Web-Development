(function() {
    "use strict";

    let clicked = false;

    function init() {
        const submitButton = qs("#main-view button"); 
        submitButton.addEventListener("click", submitQuestion);
        console.log(submitButton);
    }

    function submitQuestion() {
        if (qs("#message").value === "" && !clicked) {
            const p = document.createElement("p");
            p.textContent = "Please enter a message";
            qs("#main-view").insertBefore(p, qs("#submit-button"));
            clicked = true;
        } else if (qs("#message").value !== "") {
            qs("#main-view").classList.toggle("hidden");
            qs("#done-view").classList.toggle("hidden");
        }
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        init(); 
    });


})();