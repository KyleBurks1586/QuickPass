const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");
const scoreDisplay = document.getElementById("score");

const generateButton = document.getElementById("generateButton");
const generatedPassword = document.getElementById("generatedPassword");
const generatedText = document.getElementById("generatedText");
const copyButton = document.getElementById("copyButton");

const requirements = {
    length: document.getElementById("length"),
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    number: document.getElementById("number"),
    special: document.getElementById("special")
};


// Analyze password as the user types
passwordInput.addEventListener("input", function () {

    const password = passwordInput.value;

    const checks = {
        length: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    let score = 0;

    Object.keys(checks).forEach(function (requirement) {

        const element = requirements[requirement];
        const checkIcon = element.querySelector(".check");

        if (checks[requirement]) {
            score += 20;
            element.classList.add("met");
            checkIcon.textContent = "✓";
        } else {
            element.classList.remove("met");
            checkIcon.textContent = "○";
        }

    });

    scoreDisplay.textContent = score;
    strengthFill.style.width = score + "%";

    if (password.length === 0) {
        strengthText.textContent = "NOT RATED";
    } else if (score <= 20) {
        strengthText.textContent = "VERY WEAK";
    } else if (score <= 40) {
        strengthText.textContent = "WEAK";
    } else if (score <= 60) {
        strengthText.textContent = "MODERATE";
    } else if (score <= 80) {
        strengthText.textContent = "STRONG";
    } else {
        strengthText.textContent = "VERY STRONG";
    }

});


// Show or hide password
togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "HIDE";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "SHOW";
    }

});


// Generate a secure random password
generateButton.addEventListener("click", function () {

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-=";

    const allCharacters =
        uppercase +
        lowercase +
        numbers +
        special;

    let password = "";

    // Guarantee at least one character from each category
    password += randomCharacter(uppercase);
    password += randomCharacter(lowercase);
    password += randomCharacter(numbers);
    password += randomCharacter(special);

    // Generate remaining characters
    while (password.length < 18) {
        password += randomCharacter(allCharacters);
    }

    // Shuffle password
    password = password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    generatedText.textContent = password;
    generatedPassword.classList.remove("hidden");

});


// Copy generated password
copyButton.addEventListener("click", async function () {

    const password = generatedText.textContent;

    try {

        await navigator.clipboard.writeText(password);

        copyButton.textContent = "COPIED!";

        setTimeout(function () {
            copyButton.textContent = "COPY";
        }, 1500);

    } catch (error) {

        alert("Unable to copy password.");

    }

});


// Return a random character from a string
function randomCharacter(characterSet) {

    const randomIndex =
        Math.floor(Math.random() * characterSet.length);

    return characterSet[randomIndex];

}