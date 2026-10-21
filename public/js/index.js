const themeToggle = document.querySelector(".theme-toggle");

const currentTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", currentTheme);

themeToggle?.addEventListener("click", () => {
    const activeTheme = document.body.getAttribute("data-theme");
    const newTheme = activeTheme === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});


document.addEventListener("DOMContentLoaded", () => {
    // Navigate to the projects page when the 'works' button is clicked
    document.getElementById("works")?.addEventListener("click", () => {
        window.location.href = "project.html"; 
    });
    
    // Navigate to the contact page when the 'connect' button is clicked
    document.getElementById("connect")?.addEventListener("click", () => {
        window.location.href = "contact.html";
    });

    // Open GitHub profile in a new tab using a safe querySelector
    document.querySelector(".github")?.addEventListener("click", () => {
        window.open("https://github.com", "_blank");
    });
    
    // Open LinkedIn profile in a new tab
    document.querySelector(".linkedin")?.addEventListener("click", () => {
        window.open("https://linkedin.com", "_blank");
    });

    // Open X (Twitter) profile in a new tab
    document.querySelector(".social-row .X")?.addEventListener("click", () => {
        window.open("https://x.com/VaibhavAdanxu", "_blank", "noopener,noreferrer");
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Select the contact form element from the page
    const contactForm = document.querySelector(".contact-form") || document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevent the default form submission page reload

            // Extract values from the form input fields safely using optional chaining
            const name = document.getElementById("name")?.value || document.querySelector("input[placeholder='John Doe']")?.value;
            const email = document.getElementById("email")?.value || document.querySelector("input[placeholder='john@example.com']")?.value;
            const subject = document.getElementById("subject")?.value || document.querySelector("select")?.value;
            const message = document.getElementById("message")?.value || document.querySelector("textarea")?.value;

            try {
                // Send the collected form data to the custom Node.js local backend
                const response = await fetch('https://my-portfolio-ic2b.onrender.com/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, subject, message })
                });

                // Parse the response data stream as a JSON object
                const result = await response.json(); 

                if (response.ok && result.success) {
                    alert("🎉 Thank you! Your message has been received.");
                    contactForm.reset(); // Clear the form fields after successful submission
                } else {
                    // Display the specific error message provided by the backend, or a fallback warning
                    alert("❌ OOPS! " + (result.message || "Please check your backend configuration."));
                }
            } catch (error) {
                console.error("Error:", error);
                alert("❌ Unable to connect to the backend server. Did you start the server in your terminal?");
            }
        });
    }
});
