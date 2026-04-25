const html = document.documentElement;

const greeting = document.getElementById("greeting");
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.querySelector(".theme-icon");

const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("projectSearch");
const sortProjects = document.getElementById("sortProjects");
const projectCardsContainer = document.getElementById("projectCards");
const noProjectsMessage = document.getElementById("noProjectsMessage");

const detailButtons = document.querySelectorAll(".details-btn");
const projectModal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalType = document.getElementById("modalType");
const modalTools = document.getElementById("modalTools");
const modalFeatures = document.getElementById("modalFeatures");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const sessionTimer = document.getElementById("sessionTimer");

const adviceText = document.getElementById("adviceText");
const adviceIdTag = document.getElementById("adviceIdTag");
const adviceError = document.getElementById("adviceError");
const loadAdviceBtn = document.getElementById("loadAdviceBtn");

const visitorNameInput = document.getElementById("visitorName");
const saveVisitorBtn = document.getElementById("saveVisitorBtn");
const visitorNameError = document.getElementById("visitorNameError");
const welcomeMessage = document.getElementById("welcomeMessage");

const topBtn = document.getElementById("topBtn");

const state = {
    filter: "all",
    search: "",
    sort: "default",
    theme: localStorage.getItem("theme") || "light",
    sessionSeconds: 0
};

function updateGreeting() {
    const hour = new Date().getHours();
    let message = "Welcome";

    if (hour < 12) {
        message = "Good morning";
    } else if (hour < 18) {
        message = "Good afternoon";
    } else {
        message = "Good evening";
    }

    greeting.textContent = `${message} — thanks for visiting my portfolio.`;
}

function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    state.theme = theme;

    if (themeIcon) {
        themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
}

themeBtn.addEventListener("click", () => {
    const newTheme = state.theme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
});

function startSessionTimer() {
    setInterval(() => {
        state.sessionSeconds++;
        sessionTimer.textContent = `Time on site: ${state.sessionSeconds}s`;
    }, 1000);
}

function getCards() {
    return Array.from(projectCardsContainer.querySelectorAll(".card"));
}

function sortCards(cards) {
    const copied = [...cards];

    if (state.sort === "az") {
        copied.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
    } else if (state.sort === "za") {
        copied.sort((a, b) => b.dataset.title.localeCompare(a.dataset.title));
    }

    return copied;
}

function updateProjects() {
    const cards = getCards();
    const searchValue = state.search.toLowerCase().trim();
    let visibleCount = 0;

    const sortedCards = sortCards(cards);
    sortedCards.forEach(card => projectCardsContainer.appendChild(card));

    sortedCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.dataset.title.toLowerCase();

        const matchesFilter = state.filter === "all" || category === state.filter;
        const matchesSearch = title.includes(searchValue);

        if (matchesFilter && matchesSearch) {
            card.classList.remove("hidden");
            visibleCount++;
        } else {
            card.classList.add("hidden");
        }
    });

    noProjectsMessage.style.display = visibleCount === 0 ? "block" : "none";
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        state.filter = button.dataset.filter;
        updateProjects();
    });
});

searchInput.addEventListener("input", event => {
    state.search = event.target.value;
    updateProjects();
});

sortProjects.addEventListener("change", event => {
    state.sort = event.target.value;
    updateProjects();
});

function openModal(button) {
    modalTitle.textContent = button.dataset.title;
    modalDescription.textContent = button.dataset.description;
    modalType.textContent = button.dataset.type;
    modalTools.textContent = button.dataset.tools;
    modalFeatures.textContent = button.dataset.features;

    projectModal.classList.add("show");
}

detailButtons.forEach(button => {
    button.addEventListener("click", () => openModal(button));
});

closeModal.addEventListener("click", () => {
    projectModal.classList.remove("show");
});

window.addEventListener("click", event => {
    if (event.target === projectModal) {
        projectModal.classList.remove("show");
    }
});

async function loadDeveloperAdvice() {
    adviceError.className = "form-feedback";
    adviceError.textContent = "";

    adviceText.textContent = "Loading advice...";
    adviceText.classList.add("loading");
    adviceIdTag.textContent = "Advice API";

    try {
        const response = await fetch("https://api.adviceslip.com/advice");

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();

        adviceText.textContent = `"${data.slip.advice}"`;
        adviceIdTag.textContent = `Advice #${data.slip.id}`;
    } catch (error) {
        adviceText.textContent = "Unable to load advice. Please check your connection.";
        adviceIdTag.textContent = "Try again";
        adviceError.textContent = "Advice API is currently unavailable.";
        adviceError.classList.add("error");
    } finally {
        adviceText.classList.remove("loading");
    }
}

loadAdviceBtn.addEventListener("click", loadDeveloperAdvice);

function setFieldError(input, errorElement, message) {
    input.classList.add("input-error");
    errorElement.textContent = message;
}

function clearFieldError(input, errorElement) {
    input.classList.remove("input-error");
    errorElement.textContent = "";
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
    let isValid = true;

    clearFieldError(nameInput, nameError);
    clearFieldError(emailInput, emailError);
    clearFieldError(messageInput, messageError);

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    if (nameValue.length < 3) {
        setFieldError(nameInput, nameError, "Name must be at least 3 characters.");
        isValid = false;
    }

    if (!isValidEmail(emailValue)) {
        setFieldError(emailInput, emailError, "Please enter a valid email address.");
        isValid = false;
    }

    if (messageValue.length < 10) {
        setFieldError(messageInput, messageError, "Message must be at least 10 characters.");
        isValid = false;
    }

    return isValid;
}

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    formMessage.className = "form-feedback";
    formMessage.textContent = "";

    if (!validateForm()) {
        formMessage.textContent = "Please fix the highlighted fields.";
        formMessage.classList.add("error");
        return;
    }

    formMessage.textContent = "Message sent successfully. Thank you!";
    formMessage.classList.add("success");
    contactForm.reset();
});

window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function showSections() {
    document.querySelectorAll(".reveal").forEach(section => {
        section.classList.add("visible");
    });
}

function updateWelcomeMessage() {
    const savedName = localStorage.getItem("visitorName");

    if (savedName && welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${savedName}!`;
    }
}

function saveVisitorName() {
    const name = visitorNameInput.value.trim();

    visitorNameError.textContent = "";

    if (name.length < 2) {
        visitorNameError.textContent = "Enter at least 2 characters.";
        return;
    }

    localStorage.setItem("visitorName", name);

    updateWelcomeMessage();
}

if (saveVisitorBtn) {
    saveVisitorBtn.addEventListener("click", saveVisitorName);
}

applyTheme(state.theme);
updateGreeting();
startSessionTimer();
updateProjects();
loadDeveloperAdvice();
showSections();
updateWelcomeMessage();