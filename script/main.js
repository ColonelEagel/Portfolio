/* Initialize AOS library */

AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});



// Function to animate progress bars
function animateProgressBars()
{
    // Get all the progress bars
    const progressBars = document.querySelectorAll(".progress-bar");

    // Loop through the progress bars
    progressBars.forEach((progressBar) =>
    {
        // Get the value of the data attribute
        const value = progressBar.getAttribute("data-value");
        // Set the width of the progress bar
        progressBar.style.width = value + "%";
    });
}

// Function to check if element is in viewport
function isInViewport(element)
{
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to animate skills section when in viewport
function animateSkillsSection()
{
    // Get the skills section
    const skillsSection = document.querySelector("#skills");

    // Check if skills section is in viewport
    if (isInViewport(skillsSection))
    {
        // Animate progress bars
        animateProgressBars();
        // Remove event listener
        window.removeEventListener("scroll", animateSkillsSection);
    }
}

// Add event listener to animate skills section when in viewport
window.addEventListener("scroll", animateSkillsSection);
