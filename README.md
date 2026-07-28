# QuickPass — Password Security Analyzer & Generator

QuickPass is a browser-based cybersecurity application that analyzes password characteristics in real time, identifies potentially weak password patterns, and generates cryptographically secure random passwords.

The application was designed as a cybersecurity and software development portfolio project with an emphasis on password security, privacy, secure random generation, and client-side application development.

## Live Application

QuickPass is deployed using GitHub Pages.

**Try QuickPass:** [Launch the Live Application](https://kyleburks1586.github.io/QuickPass/)


## Key Features

- Real-time password strength analysis
- 0–100 security scoring system
- Password length analysis
- Uppercase and lowercase character detection
- Number and special-character detection
- Common-password detection
- Detection of predictable keyboard, alphabet, and number sequences
- Detection of repeated characters
- Penalties for passwords composed only of letters or numbers
- Dynamic security recommendations
- Visual password-strength indicator
- Show/hide password functionality
- Secure random password generator
- One-click password copying
- Responsive interface for desktop and mobile devices
- Local browser-based password analysis

## Security-Focused Design

QuickPass evaluates more than basic password complexity requirements.

The scoring algorithm considers password length, character diversity, common passwords, predictable sequences, repeated characters, and other characteristics that can make passwords easier to guess.

Rather than treating every password that contains uppercase letters, lowercase letters, numbers, and symbols as equally secure, QuickPass applies additional scoring and penalties based on password composition.

## Secure Password Generation

QuickPass uses the browser's Web Crypto API through `crypto.getRandomValues()` to obtain cryptographically secure random values.

Generated passwords are shuffled using a Fisher-Yates shuffle backed by cryptographically secure randomness rather than relying on `Math.random()`.

This provides a stronger approach to password generation than standard pseudo-random JavaScript generation.

## Privacy & Security

Password analysis occurs locally within the user's browser.

Passwords entered into QuickPass are not intentionally transmitted to a server, saved to a database, or stored by the application.

Common-password and pattern detection are also performed locally.

Users should still avoid entering real passwords into unfamiliar password-testing applications.

## Technologies

- HTML5
- CSS3
- JavaScript
- Web Crypto API
- Git
- GitHub
- GitHub Pages

## How It Works

When a password is entered, QuickPass evaluates multiple characteristics and calculates a security score from 0–100.

The application examines:

- Password length
- Uppercase characters
- Lowercase characters
- Numbers
- Special characters
- Character-type diversity
- Known/common passwords
- Predictable sequences
- Repeated characters
- Letter-only and number-only passwords

Based on the resulting score, the password is classified as:

- Very Weak
- Weak
- Moderate
- Strong
- Very Strong

QuickPass then provides security feedback explaining areas that may improve the password.

## Running the Project Locally

Clone the repository:

git clone https://github.com/KyleBurks1586/QuickPass.git

Open the project directory and launch `index.html` in a modern web browser.

No server, database, or external dependencies are required.

## Future Improvements

Potential future enhancements include:

- Entropy estimation
- Larger common-password datasets
- Detection of additional password patterns
- Customizable password-generator options
- Passphrase generation
- Expanded accessibility support
- Automated JavaScript testing
- Additional security recommendations

## Project Purpose

QuickPass demonstrates practical experience with front-end development and security-focused software design, including JavaScript programming, password-analysis logic, cryptographically secure random generation, privacy-conscious application design, Git version control, and web deployment.

## Disclaimer

QuickPass is an educational cybersecurity tool. Its security score is an estimate based on implemented password characteristics and should not be interpreted as a guarantee that a password cannot be compromised.

Password security also depends on factors such as password uniqueness, credential exposure, authentication controls, and how credentials are stored by the service using them.