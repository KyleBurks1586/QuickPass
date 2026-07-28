const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");
const scoreDisplay = document.getElementById("score");
const securityAnalysis = document.getElementById("securityAnalysis");

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

// Small local list used only for obvious/common-password detection.
// No password entered by the user is transmitted anywhere.
const commonPasswords = [
    "password",
    "password1",
    "password123",
    "123456",
    "12345678",
    "123456789",
    "qwerty",
    "qwerty123",
    "abc123",
    "letmein",
    "welcome",
    "admin",
    "iloveyou",
    "monkey",
    "dragon"
];

passwordInput.addEventListener("input", analyzePassword);

function analyzePassword() {
    const password = passwordInput.value;

    const checks = {
        length: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    updateRequirements(checks);

    if (password.length === 0) {
        updateScore(0, "NOT RATED");
        securityAnalysis.innerHTML =
        "<p>Enter a password to view security analysis.</p>";
    return;
}

    let score = 0;

    // Length is heavily weighted because longer passwords
    // generally provide substantially more resistance to guessing.
    if (password.length >= 8) score += 10;
    if (password.length >= 12) score += 15;
    if (password.length >= 16) score += 15;
    if (password.length >= 20) score += 10;

    // Character diversity
    if (checks.lowercase) score += 10;
    if (checks.uppercase) score += 10;
    if (checks.number) score += 10;
    if (checks.special) score += 10;

    // Reward multiple character classes being used together.
    const characterTypes = [
        checks.lowercase,
        checks.uppercase,
        checks.number,
        checks.special
    ].filter(Boolean).length;

    if (characterTypes >= 3) score += 5;
    if (characterTypes === 4) score += 5;

    const lowerPassword = password.toLowerCase();

    // Major penalty for known/common passwords.
    if (commonPasswords.includes(lowerPassword)) {
        score -= 60;
    }

    // Penalize obvious words commonly used inside passwords.
    const obviousWords = [
        "password",
        "qwerty",
        "admin",
        "welcome",
        "letmein"
    ];

    if (obviousWords.some(word => lowerPassword.includes(word))) {
        score -= 25;
    }

    // Penalize common keyboard/alphabet/number sequences.
    const sequences = [
        "1234",
        "2345",
        "3456",
        "4567",
        "5678",
        "6789",
        "abcd",
        "bcde",
        "cdef",
        "qwerty",
        "asdf"
    ];

    if (sequences.some(sequence => lowerPassword.includes(sequence))) {
        score -= 20;
    }

    // Penalize the same character repeated 3+ times.
    if (/(.)\1\1/i.test(password)) {
        score -= 15;
    }

    // Penalize passwords made only of letters or only of numbers.
    if (/^[A-Za-z]+$/.test(password)) {
        score -= 10;
    }

    if (/^[0-9]+$/.test(password)) {
        score -= 20;
    }

    score = Math.max(0, Math.min(100, score));



    let rating;

    if (score < 30) {
        rating = "VERY WEAK";
    } else if (score < 50) {
        rating = "WEAK";
    } else if (score < 70) {
        rating = "MODERATE";
    } else if (score < 90) {
        rating = "STRONG";
    } else {
        rating = "VERY STRONG";
    }

    updateScore(score, rating);
    updateSecurityAnalysis(password, score, rating);
}

function updateRequirements(checks) {
    Object.keys(checks).forEach(function (requirement) {
        const element = requirements[requirement];
        const checkIcon = element.querySelector(".check");

        if (checks[requirement]) {
            element.classList.add("met");
            checkIcon.textContent = "✓";
        } else {
            element.classList.remove("met");
            checkIcon.textContent = "○";
        }
    });
}

function updateScore(score, rating) {
    scoreDisplay.textContent = score;
    strengthFill.style.width = score + "%";
    strengthText.textContent = rating;
}


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


// Generate a random password
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

    password += randomCharacter(uppercase);
    password += randomCharacter(lowercase);
    password += randomCharacter(numbers);
    password += randomCharacter(special);

    while (password.length < 20) {
        password += randomCharacter(allCharacters);
    }

    password = shuffleString(password);

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


function randomCharacter(characterSet) {
    const randomIndex = secureRandomIndex(characterSet.length);
    return characterSet[randomIndex];
}


// Use the browser's cryptographic random-number generator.
function secureRandomIndex(max) {
    const randomValues = new Uint32Array(1);
    window.crypto.getRandomValues(randomValues);

    return randomValues[0] % max;
}


// Fisher-Yates shuffle using cryptographically secure randomness.
function shuffleString(value) {
    const characters = value.split("");

    for (let i = characters.length - 1; i > 0; i--) {
        const j = secureRandomIndex(i + 1);

        [characters[i], characters[j]] =
            [characters[j], characters[i]];
    }

    return characters.join("");
}

function updateSecurityAnalysis(password, score, rating) {
    const analysis = [];

    // Check password length
    if (password.length < 12) {
        analysis.push("Increase the password to at least 12 characters.");
    } else if (password.length >= 16) {
        analysis.push("Good password length.");
    }

    // Check character variety
    if (!/[A-Z]/.test(password)) {
        analysis.push("Add an uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
        analysis.push("Add a lowercase letter.");
    }

    if (!/[0-9]/.test(password)) {
        analysis.push("Add a number.");
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        analysis.push("Add a special character.");
    }

    // Overall assessment
    if (score >= 90) {
        analysis.push("Excellent resistance to common password attacks.");
    } else if (score >= 70) {
        analysis.push("Strong password, but additional complexity may improve it.");
    } else if (score >= 50) {
        analysis.push("Moderate password. Consider increasing length and complexity.");
    } else {
        analysis.push("This password may be vulnerable to guessing or dictionary attacks.");
    }

    securityAnalysis.innerHTML = `
        <p><strong>${rating} — ${score}/100</strong></p>
        <ul>
            ${analysis.map(item => `<li>${item}</li>`).join("")}
        </ul>
    `;
}