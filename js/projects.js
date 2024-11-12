// interactivity.js

document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
  
    const observerOptions = {
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver(observerCallback, observerOptions);
  
    projectItems.forEach((item) => {
      item.style.opacity = 0;
      observer.observe(item);
    });
  
    function observerCallback(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = 'opacity 0.6s ease-out';
          entry.target.style.opacity = 1;
          observer.unobserve(entry.target);
        }
      });
    }
  });
  