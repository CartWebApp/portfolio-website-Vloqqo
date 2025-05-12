document.addEventListener("DOMContentLoaded", () => {
    const listItems = document.querySelectorAll("ul li");
    let dynamicParagraph = document.createElement("p");
    dynamicParagraph.classList.add("dynamic-text");
    document.body.appendChild(dynamicParagraph);

    const observer = new IntersectionObserver((entries) => {
        let activeEntry = null;

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                activeEntry = entry.target;

                // Add the "scrolled-in" class when the item enters the viewport
                entry.target.classList.add("scrolled-in");

                // Update the dynamic paragraph with the text from the data-text attribute
                const text = entry.target.getAttribute("data-text") || "No additional information available.";
                dynamicParagraph.textContent = text;

                // Reset the animation by removing and re-adding the class
                dynamicParagraph.style.animation = "none"; // Reset animation
                void dynamicParagraph.offsetWidth; // Trigger reflow to restart animation
                dynamicParagraph.style.animation = "1s slide-right 1 normal"; // Reapply animation

                // Position the dynamic paragraph on the same line as the li
                const rect = entry.target.getBoundingClientRect();
                dynamicParagraph.style.position = "absolute";
                dynamicParagraph.style.top = `${rect.top + window.scrollY -80}px`; // Align vertically
                dynamicParagraph.style.left = `40vw`; // Place it to the right of the li

                // Make the dynamic paragraph visible
                dynamicParagraph.classList.add("visible");
            } else {
                // Remove the "scrolled-in" class when the item exits the viewport
                entry.target.classList.remove("scrolled-in");
                // Hide the dynamic paragraph when the item is out of view
                if (entry.target === activeEntry) {
                    dynamicParagraph.classList.remove("visible");
                    activeEntry = null;
                }
            }
        });
    }, {
        threshold: 0.5, // Trigger when 50% of the element is visible
    });

    // Observe each list item
    listItems.forEach((item) => observer.observe(item));
});