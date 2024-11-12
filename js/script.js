document.addEventListener('DOMContentLoaded', async function() {
    const text1 = "Welcome to My Portfolio";
    const text2 = "You can get to know a bit about me, and some projects I've worked on.";
    
    const typingSpeed = 37; // Adjust the typing speed (milliseconds)

    function typeEffect(element, text, speed) {
        return new Promise((resolve) => {
            let index = 0;

            function type() {
                if (index < text.length) {
                    element.innerHTML += text.charAt(index);
                    index++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }

            type();
        });
    }

    const text1Element = document.getElementById("text1");
    const text2Element = document.getElementById("text2");

    await typeEffect(text1Element, text1, typingSpeed);
    await new Promise(resolve => setTimeout(resolve, 400)); // 1-second delay
    await typeEffect(text2Element, text2, typingSpeed);

    // Image fade-in
    const images = document.querySelectorAll('.image-container img');
    images.forEach((img, index) => {
        setTimeout(() => {
            img.classList.add('fade-in'); // Add fade-in class to each image with a delay
        }, index * 250); // Stagger the fade-in (500ms between each image)
    });
});
