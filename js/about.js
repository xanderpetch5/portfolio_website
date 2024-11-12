// interactivity.js

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animations
    const scrollElements = document.querySelectorAll('section, h2, h3, p, ul');
  
    const elementInView = (el, offset = 0) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) - offset
      );
    };
  
    const displayScrollElement = (el) => {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    };
  
    const hideScrollElement = (el) => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    };
  
    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 50)) {
          displayScrollElement(el);
        } else {
          // Optional: Uncomment the next line if you want elements to hide when scrolling up
          // hideScrollElement(el);
        }
      });
    };
  
    // Initialize elements' styles
    scrollElements.forEach((el) => {
      hideScrollElement(el);
    });
  
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Trigger animation on page load
  
    // Back-to-Top Button
    const toTopBtn = document.createElement('button');
    toTopBtn.textContent = '▲';
    Object.assign(toTopBtn.style, {
      position: 'fixed',
      bottom: '40px',
      right: '40px',
      padding: '15px',
      fontSize: '18px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: '#ffffff',
      color: '#000',
      cursor: 'pointer',
      opacity: '0',
      transition: 'opacity 0.3s ease',
      zIndex: '1000',
    });
    document.body.appendChild(toTopBtn);
  
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        toTopBtn.style.opacity = '1';
      } else {
        toTopBtn.style.opacity = '0';
      }
    });
  
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  