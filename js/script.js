const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = {
  nameInput: document.querySelector('input[type="text"]'),
  emailInput: document.querySelector('input[type="email"]'),
  messageInput: document.querySelector('textarea'),
};
const descriptionElement = document.getElementById("description");

const config = {
  scrollOffset: 100,
  scrollToOffset: 48,
  typingSpeed: 50,
  typingPause: 2000,
  formspreeUrl: 'https://formspree.io/f/mgvwbvra',
  descriptions: [
    "a backend developer..",
    "a web developer..",
    "a software developer..",
  ],
};

function highlightActiveSection() {
  let currentSection = '';
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - config.scrollOffset;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${currentSection}`);
  });
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      
      const targetId = anchor.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const elementPosition = targetElement.offsetTop - config.scrollToOffset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        });
        
        // Update active state
        navLinks.forEach((link) => link.classList.remove('active'));
        anchor.classList.add('active');
      }
    });
  });
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function animateElementsInView() {
  document.querySelectorAll('.fade-in').forEach((el) => {
    if (isInViewport(el)) {
      el.classList.add('visible');
    }
  });
}

function sendEmail() {
  const formData = {
    name: contactForm.nameInput.value,
    email: contactForm.emailInput.value,
    message: contactForm.messageInput.value,
  };

  fetch(config.formspreeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (response.ok) {
      alert("Thank you for contacting me. I'll get back to you as soon as possible.");
      contactForm.nameInput.value = '';
      contactForm.emailInput.value = '';
      contactForm.messageInput.value = '';
    } else {
      alert("There was a problem sending your message. Please try again.");
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("There was a problem sending your message. Please try again.");
  });
  
  return false;
}

function typeDescription() {
  let currentIndex = 0;
  
  function typeNextDescription(index) {
    const text = config.descriptions[index];
    let charIndex = 0;
    
    descriptionElement.innerHTML = '';
    
    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        descriptionElement.innerHTML = text.slice(0, charIndex + 1);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          const nextIndex = (index + 1) % config.descriptions.length;
          typeNextDescription(nextIndex);
        }, config.typingPause);
      }
    }, config.typingSpeed);
  }
  
  typeNextDescription(currentIndex);
}

function init() {
  window.addEventListener('scroll', () => {
    highlightActiveSection();
    animateElementsInView();
  });
  
  setupSmoothScrolling();
  typeDescription();
  
  highlightActiveSection();
  animateElementsInView();
}

document.addEventListener('DOMContentLoaded', init);