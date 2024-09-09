document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    let isValid = true;
  
    // Validate email
    if (!email) {
      document.getElementById("emailError").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("emailError").classList.add("hidden");
    }
  
    // Validate password
    if (!password) {
      document.getElementById("passwordError").classList.remove("hidden");
      isValid = false;
    } else {
      document.getElementById("passwordError").classList.add("hidden");
    }
  
    // Retrieve saved credentials from localStorage
    const registeredEmail = localStorage.getItem("registeredEmail");
    const registeredPassword = localStorage.getItem("registeredPassword");
  
    // Check if email and password match the registration details
    if (isValid) {
      if (email === registeredEmail && password === registeredPassword) {
        alert("Login successful!");
        // Redirect to index page
        window.location.href = "./index.html";
      } else {
        alert("Email or password is incorrect!");
      }
    }
  });
  
  