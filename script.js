// =========================================================
// FORMATEUR TOOLKIT
// Main JavaScript
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // Animation simple au défilement
    const cards = document.querySelectorAll(".tool-card");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    cards.forEach((card) => {
        observer.observe(card);
    });


    // Message temporaire lorsqu'un outil est encore indisponible
    const toolLinks = document.querySelectorAll(".tool-link");

    toolLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            const originalText = link.textContent;

            link.textContent = "🚧 Outil en préparation...";

            setTimeout(() => {
                link.textContent = originalText;
            }, 2000);

        });

    });


    // Année automatique dans le footer
    const footer = document.querySelector(".footer");

    if (footer) {

        const currentYear = new Date().getFullYear();

        const yearElement = document.createElement("small");

        yearElement.textContent = `© ${currentYear} Formateur Toolkit`;

        yearElement.style.display = "block";
        yearElement.style.marginTop = "10px";
        yearElement.style.color = "#9ca3af";

        footer.querySelector(".footer-content > div:first-child")
            ?.appendChild(yearElement);
    }

});