let lateEntry = false;  // Variable to track if it's a late entry

document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get form values
  const studentName = document.getElementById("studentName").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const age = document.getElementById("age").value.trim();
  const studentClass = document.getElementById("classOfStudent").value;
  const email = document.getElementById("email").value.trim();
  const school = document.getElementById("school").value.trim();
  const registrationDate = new Date(document.getElementById("registrationDate").value);
  const principal = document.getElementById("principal").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const password = document.getElementById("password").value.trim();

  let isValid = true;

  // Validation for each field
  if (!studentName) {
    isValid = false;
    document.getElementById("nameError").classList.remove("hidden");
  } else {
    document.getElementById("nameError").classList.add("hidden");
  }

  if (!gender) {
    isValid = false;
    document.getElementById("genderError").classList.remove("hidden");
  } else {
    document.getElementById("genderError").classList.add("hidden");
  }

  if (!age) {
    isValid = false;
    document.getElementById("ageError").classList.remove("hidden");
  } else {
    document.getElementById("ageError").classList.add("hidden");
  }

  if (!studentClass) {
    isValid = false;
    document.getElementById("classError").classList.remove("hidden");
  } else {
    document.getElementById("classError").classList.add("hidden");
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    isValid = false;
    document.getElementById("emailError").classList.remove("hidden");
  } else {
    document.getElementById("emailError").classList.add("hidden");
  }

  if (!school) {
    isValid = false;
    document.getElementById("schoolError").classList.remove("hidden");
  } else {
    document.getElementById("schoolError").classList.add("hidden");
  }

  if (!registrationDate || registrationDate === "Invalid Date") {
    isValid = false;
    document.getElementById("dateError").classList.remove("hidden");
  } else {
    document.getElementById("dateError").classList.add("hidden");
  }

  if (!principal) {
    isValid = false;
    document.getElementById("principalError").classList.remove("hidden");
  } else {
    document.getElementById("principalError").classList.add("hidden");
  }

  const phonePattern = /^\d{11}$/;
  if (!phoneNumber.match(phonePattern)) {
    isValid = false;
    document.getElementById("phoneError").classList.remove("hidden");
  } else {
    document.getElementById("phoneError").classList.add("hidden");
  }

  if (!password) {
    isValid = false;
    document.getElementById("passwordError").classList.remove("hidden");
  } else {
    document.getElementById("passwordError").classList.add("hidden");
  }

  // Handle late entry
  const validStart = new Date('2024-09-09');
  const validEnd = new Date('2024-09-22');
  const lateEnd = new Date('2024-09-30');

  if (registrationDate > validEnd && registrationDate <= lateEnd) {
    lateEntry = true;
    document.getElementById("lateEntryModal").classList.remove("hidden"); // Show modal
  } else {
    lateEntry = false;
  }

  // If form is valid and the registration is within the valid time frame
  if (isValid && registrationDate <= lateEnd && !lateEntry) {
    saveDataAndSubmit(email, password); // Save email & password if not late entry
  }
});

// Close modal and trigger success message if late entry
document.getElementById("closeModal").addEventListener("click", function() {
  document.getElementById("lateEntryModal").classList.add("hidden");

  if (lateEntry) {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    saveDataAndSubmit(email, password);  // Save email & password after closing modal for late entry
  }
});

// Save email & password to localStorage and show success message
function saveDataAndSubmit(email, password) {
  localStorage.setItem("registeredEmail", email);
  localStorage.setItem("registeredPassword", password);

  showSuccessAlert(); // Direct success message
}

// Show success alert and reset form
function showSuccessAlert() {
  alert("Registration successful!");
  document.getElementById("registrationForm").reset();
}


  
  