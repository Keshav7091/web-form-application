document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm");
    const errorMessages = document.getElementById("errorMessages");


    form.addEventListener("submit", function (event) {
        event.preventDefault(); 
  
        errorMessages.innerHTML = "";
        let errors = [];

        const firstName = document.getElementById("first_name").value.trim();
        if (firstName === "" || !/^[a-zA-Z]+$/.test(firstName) || firstName.length > 50) {
            errors.push("First Name is required and must contain only letters.");
        }  

        const email = document.getElementById("email").value.trim();
        if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
            errors.push("A valid email is required.");
        }

        const phone = document.getElementById("phone").value.trim();
        if (phone !== "" && !/^[0-9]{10}$/.test(phone)) {
            errors.push("Phone number must be exactly 10 digits.");
        }

        const password = document.getElementById("password").value.trim();
        if (password === "" || password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
            errors.push("Password must be at least 6 characters long and contain A-Z, a-z, 0-9, and special characters.");
        }

        const repassword = document.getElementById("repassword").value.trim();
        if (repassword !== password) {
            errors.push("Passwords do not match.");
        }

        const dob = document.getElementById("dob").value;
        if (dob !== "" && !Date.parse(dob)) {
            errors.push("Invalid date of birth.");
        }

        const city = document.getElementById("city").value.trim();
        if (city !== "" && !/^[a-zA-Z\s]+$/.test(city)) {
            errors.push("City must contain only letters.");
        }

        const state = document.getElementById("state").value.trim();
        if (state !== "" && !/^[a-zA-Z\s]+$/.test(state)) {
            errors.push("State must contain only letters.");
        }

        if (errors.length > 0) {
            
            errorMessages.style.display = "block"; 
            errorMessages.innerHTML = "<ul>" + errors.map(e => "<li>" + e + "</li>").join("") + "</ul>";

        } else {
            errorMessages.style.display = "none";
            form.submit(); 
        }
          
    });
});
