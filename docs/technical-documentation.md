# Technical Documentation

## Overview
This project is a client-side portfolio web application that demonstrates modern front-end development techniques, including API integration, dynamic user interaction, and state management.

The application is built using HTML, CSS, and JavaScript, with all functionality handled on the client side and no backend dependencies.

---

## Architecture
The application follows a simple and structured architecture:

- **HTML** → defines the layout and structure of the website
- **CSS** → handles styling, theming, and responsive design
- **JavaScript** → manages logic, interactivity, and dynamic updates

No external frameworks or libraries are used, ensuring the project remains lightweight and easy to maintain.

---

## API Integration
The application integrates the **Advice Slip API** to display developer advice dynamically.

JavaScript `fetch()` is used to send a request to the API endpoint. The response is returned in JSON format and displayed in the interface. Error handling is implemented to display a user-friendly message if the API request fails.

---

## Complex Logic
The application includes several features that demonstrate advanced front-end logic:

- Filtering projects by category
- Searching projects by name
- Sorting projects alphabetically (A–Z, Z–A)
- Modal system for displaying project details
- Form validation with multiple conditions
- Session timer that updates in real time

These features require combining multiple conditions and updating the DOM dynamically based on user interaction.

---

## State Management
The application uses `localStorage` to store user preferences and data, including:

- Theme selection (light/dark mode)
- Visitor name for personalized greeting

This ensures that user preferences persist even after refreshing the page.

---

## Performance
Performance is optimized by:

- Keeping the application lightweight (no external libraries)
- Minimizing unnecessary DOM updates
- Organizing JavaScript into reusable functions
- Using efficient event handling
- Avoiding redundant or unused code

---

## User Experience Improvements
To enhance usability, the application includes:

- Clear navigation between sections
- Real-time feedback for user actions
- Form validation messages for incorrect inputs
- Dynamic content updates (projects and API data)
- Persistent user preferences using localStorage
- Scroll-to-top button for easier navigation

These improvements provide a smoother and more interactive user experience.

---

## Deployment
The application is deployed using **GitHub Pages**, making it publicly accessible through a live URL.

This allows the project to be easily shared, tested, and evaluated without requiring local setup.