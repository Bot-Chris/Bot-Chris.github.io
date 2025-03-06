/**
 * Portfolio Main JavaScript
 * Author: Chris Hampton
 */

/**
 * Initialize AOS (Animate On Scroll)
 */
function initAOS() {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}

/**
 * Dark Mode functionality
 */
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const moonIcon = '<i class="bi bi-moon-fill"></i>';
  const sunIcon = '<i class="bi bi-sun-fill"></i>';
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = sunIcon;
  } else {
    darkModeToggle.innerHTML = moonIcon;
  }
  
  // Toggle dark mode on button click
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      darkModeToggle.innerHTML = sunIcon;
    } else {
      localStorage.setItem('theme', 'light');
      darkModeToggle.innerHTML = moonIcon;
    }
  });
}

/**
 * Typing effect for hero section
 */
function initTypingEffect() {
  const typedTextElement = document.getElementById('typed-text');
  const textArray = ["Software Developer", "Full Stack Engineer", "Problem Solver", "Code Enthusiast"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length;
      typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(type, typingSpeed);
  }
  
  setTimeout(type, 1000); // Start typing after 1 second
}

/**
 * Animate skill progress bars
 */
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    const width = bar.getAttribute('aria-valuenow') + '%';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/**
 * Contact form submission
 */
function initContactForm() {
  const form = document.querySelector('.php-email-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      const name = form.querySelector('#name').value;
      const email = form.querySelector('#email').value;
      const subject = form.querySelector('#subject').value;
      const message = form.querySelector('#message').value;
      
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Here you would normally send the form data to a server
      // For now, we'll just simulate a successful submission
      
      alert('Thank you for your message. It has been sent.');
      form.reset();
    });
  }
}

/**
 * Initialize all functions when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  initAOS();
  initDarkMode();
  initTypingEffect();
  initProgressBars();
  initSmoothScrolling();
  initContactForm();
  initNavigation();
});

/**
 * Handle navigation menu behavior
 */
function initNavigation() {
  // Select header element
  const header = document.querySelector('#header');
  
  // Add header-scrolled class on scroll
  const toggleHeaderClass = () => {
    if (window.scrollY > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };
  
  // Add scroll event listener
  window.addEventListener('scroll', toggleHeaderClass);
  
  // Check initial state
  toggleHeaderClass();
  
  // Mobile navigation toggle
  const navbarLinks = document.querySelectorAll('.nav-link');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navbar = document.querySelector('#navbar');
  
  // Toggle mobile menu
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      navbar.classList.toggle('navbar-mobile');
      mobileNavToggle.classList.toggle('bi-list');
      mobileNavToggle.classList.toggle('bi-x');
    });
  }
  
  // Close mobile menu when clicking a nav link
  navbarLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        mobileNavToggle.classList.toggle('bi-list');
        mobileNavToggle.classList.toggle('bi-x');
      }
      
      // Update active link
      navbarLinks.forEach(navLink => navLink.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Update active link on scroll
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    
    navbarLinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      
      const section = document.querySelector(navbarlink.hash);
      if (!section) return;
      
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  
  window.addEventListener('scroll', navbarlinksActive);
  window.addEventListener('load', navbarlinksActive);
}
