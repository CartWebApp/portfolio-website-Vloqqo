document.addEventListener("DOMContentLoaded", () => {
    const listItems = document.querySelectorAll("ul li");
    let dynamicDiv = document.createElement("p");
    dynamicDiv.classList.add("dynamic-text");
    document.body.appendChild(dynamicDiv);

    const observer = new IntersectionObserver(async (entries) => {
        let activeEntry = null;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                activeEntry = entry.target;
                // Add the "scrolled-in" class when the item enters the viewport
                entry.target.classList.add("scrolled-in");
                let scrolledIn = document.getElementsByClassName("scrolled-in")[0];
                console.log(scrolledIn);
                function something() {
                // Update the dynamic div with the text from the data-text attribute
                const text = entry.target.getAttribute("data-text") || "No additional information available.";
                dynamicDiv.textContent = text;

                // Position the dynamic div on the same line as the li
                const rect = entry.target.getBoundingClientRect();
                dynamicDiv.style.position = "absolute";
                dynamicDiv.style.top = `${rect.top + window.scrollY - 80}px`; // Align vertically
                dynamicDiv.style.left = `40vw`; // Place it to the right of the li
                };
                scrolledIn.addEventListener("animationend", something());
                

                // Make the dynamic div visible
                dynamicDiv.classList.add("visible");
            } else {
                // Remove the "scrolled-in" class when the item exits the viewport
                entry.target.classList.remove("scrolled-in");

                // Hide the dynamic div when the item is out of view
                if (entry.target === activeEntry) {
                    dynamicDiv.classList.remove("visible");
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