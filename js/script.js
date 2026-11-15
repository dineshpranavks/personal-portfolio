/**
 * Dinesh Pranav K S - Personal Portfolio Website Script
 * Fully client-side interactive logics
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Define Projects Database for Modal Display
  const PROJECTS_DATABASE = {
    project1: {
      title: "LittleLink",
      category: "Frontend",
      tag: "Frontend",
      img: "assets/project1.png",
      date: "2024",
      desc: "LittleLink is a lightweight, self-hosted link-in-bio page builder — a clean and minimal alternative to Linktree. It lets you aggregate all your social media profiles, websites, and links into one beautiful, shareable page that you fully own and control.",
      features: [
        "Single-page link aggregator with clean, minimal design aesthetic.",
        "Fully self-hosted — no third-party dependency or vendor lock-in.",
        "Easily customizable with simple HTML/CSS — no framework overhead.",
        "Responsive layout that works seamlessly across all screen sizes."
      ],
      skills: ["HTML5", "CSS3", "JavaScript"],
      liveLink: "https://github.com/dineshpranavks/LittleLink",
      codeLink: "https://github.com/dineshpranavks/LittleLink"
    },
    project2: {
      title: "Movie Ticket Booking System",
      category: "Full-Stack",
      tag: "Fullstack",
      img: "assets/project2.png",
      date: "2024",
      desc: "A full-featured movie ticket booking system built in Java with a rich GUI. The app allows users to browse movies, select showtimes, pick seats on an interactive seat map, and complete bookings — all backed by a MySQL database for persistent storage and booking management.",
      features: [
        "Interactive seat selection map with real-time availability updates.",
        "Movie browsing with show scheduling and time slot management.",
        "Complete booking workflow with confirmation and ticket generation.",
        "MySQL-backed persistent storage for movies, shows, and bookings."
      ],
      skills: ["Java", "Java Swing", "MySQL", "JDBC"],
      liveLink: "https://github.com/dineshpranavks/Movie_Ticket_booking_System",
      codeLink: "https://github.com/dineshpranavks/Movie_Ticket_booking_System"
    },
    project3: {
      title: "ProMe — Portfolio Generator",
      category: "Full-Stack",
      tag: "Fullstack",
      img: "assets/project3.png",
      date: "2024",
      desc: "ProMe is a dynamic developer portfolio generator that empowers users to build and deploy a professional portfolio site without writing code. Users can customize themes, add project showcases, skills, and social links — all stored and served through a full-stack architecture.",
      features: [
        "No-code portfolio builder with live preview and multiple themes.",
        "Dynamic sections for projects, skills, experience, and contact info.",
        "Full-stack architecture with React frontend and Node.js/MongoDB backend.",
        "Shareable public portfolio URL for each user profile."
      ],
      skills: ["React", "Node.js", "MongoDB", "Express", "CSS3"],
      liveLink: "https://github.com/dineshpranavks/ProMe",
      codeLink: "https://github.com/dineshpranavks/ProMe"
    },
    project4: {
      title: "Project Management App",
      category: "Full-Stack",
      tag: "Fullstack",
      img: "assets/project4.png",
      date: "2024",
      desc: "A collaborative project management web application built with Spring Boot and React. It features Kanban-style task boards, team member assignments, deadline tracking, and progress dashboards — designed to help development teams plan and execute projects efficiently.",
      features: [
        "Kanban-style task boards with drag-and-drop task management.",
        "Team member assignment and role-based access control.",
        "Deadline tracking with status indicators and progress dashboards.",
        "RESTful Spring Boot backend with MySQL for robust data persistence."
      ],
      skills: ["Spring Boot", "React", "MySQL", "REST API", "Java"],
      liveLink: "https://github.com/dineshpranavks/project_management",
      codeLink: "https://github.com/dineshpranavks/project_management"
    }
  };

  /* ==========================================================================
     THEME SWITCHING (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Initialize theme from LocalStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
    htmlElement.classList.remove('dark');
    htmlElement.classList.add('light');
  } else {
    htmlElement.classList.add('dark');
    htmlElement.classList.remove('light');
  }

  // Toggle Action
  themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      htmlElement.classList.remove('light');
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  /* ==========================================================================
     MOBILE DRAWER MENU
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileMenu = () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileNavDrawer.classList.toggle('open');
    mobileNavDrawer.setAttribute('aria-hidden', isExpanded);
    
    // Lock scrolling on main page when drawer is open
    document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
  };

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  mobileDrawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close menu and drawer on link selection
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileNavDrawer.classList.remove('open');
      mobileNavDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    });
  });

  // Handle resizing window: close drawer if desktop dimensions reached
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileNavDrawer.classList.contains('open')) {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileNavDrawer.classList.remove('open');
      mobileNavDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    }
  });

  /* ==========================================================================
     STYLING HEADER ON SCROLL
     ========================================================================== */
  const mainHeader = document.getElementById('main-header');

  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Trigger initial state check

  /* ==========================================================================
     DYNAMIC TYPING EFFECT (HERO)
     ========================================================================== */
  const typewriterText = document.getElementById('typewriter');
  if (typewriterText) {
    const words = JSON.parse(typewriterText.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        // Remove character
        typewriterText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Speed up when deleting
      } else {
        // Add character
        typewriterText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      // Handle full word typing completion
      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400; // Pause before starting next word
      }

      setTimeout(type, typingSpeed);
    };

    // Kick off typing loop
    setTimeout(type, 1000);
  }

  /* ==========================================================================
     VIEWPORT OBSERVER FOR ANIMATIONS & NAVIGATION ACTIVE STATE
     ========================================================================== */
  const scrollElements = document.querySelectorAll('.animate-on-scroll');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  // Animation Observer
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        animObserver.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
  });

  scrollElements.forEach(el => animObserver.observe(el));

  // Navigation Active Section Tracker
  const navSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    root: null,
    threshold: 0.45,
    rootMargin: "-10% 0px -30% 0px"
  });

  sections.forEach(sec => navSectionObserver.observe(sec));

  /* ==========================================================================
     PROJECT GALLERY CATEGORY FILTER
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button states
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        // Use smooth scaling animations during transition
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // Match timing with transition speeds
        }
      });
    });
  });

  /* ==========================================================================
     PROJECT DETAILS MODAL DIALOG SYSTEM
     ========================================================================== */
  const projectModal = document.getElementById('project-modal');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtn = document.getElementById('modal-close');
  
  // Elements inside Modal to render
  const modalImg = document.getElementById('modal-project-img');
  const modalTag = document.getElementById('modal-project-tag');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalFeatures = document.getElementById('modal-project-features');
  const modalSkills = document.getElementById('modal-project-skills');
  const modalDate = document.getElementById('modal-project-date');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalCodeLink = document.getElementById('modal-code-link');

  const openProjectModal = (projectId) => {
    const data = PROJECTS_DATABASE[projectId];
    if (!data) return;

    // Fill Modal Information
    modalImg.src = data.img;
    modalImg.alt = `${data.title} Screen Capture`;
    modalTag.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.innerHTML = `<p>${data.desc}</p>`;
    modalDate.textContent = data.date;

    // Features Bullets
    modalFeatures.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      modalFeatures.appendChild(li);
    });

    // Tech Tags
    modalSkills.innerHTML = '';
    data.skills.forEach(skill => {
      const span = document.createElement('span');
      span.textContent = skill;
      modalSkills.appendChild(span);
    });

    // Buttons
    modalLiveLink.href = data.liveLink;
    modalCodeLink.href = data.codeLink;

    // Open Modal display classes
    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
    
    // Focus Close Button for accessibility
    setTimeout(() => closeModalBtn.focus(), 100);
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto'; // Enable scrolling
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = e.target.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  closeModalBtn.addEventListener('click', closeProjectModal);

  // Close when clicking overlay backdrop
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     CONTACT FORM REAL-TIME VALIDATION & SIMULATED SUBMISSION
     ========================================================================== */
  const contactForm = document.getElementById('portfolio-contact-form');
  const formSuccessBox = document.getElementById('form-success-box');
  const resetFormBtn = document.getElementById('reset-form-btn');
  const submitBtn = document.getElementById('form-submit-btn');
  const submitText = submitBtn.querySelector('span');
  const submitIcon = submitBtn.querySelector('.icon-send');
  const submitSpinner = submitBtn.querySelector('.form-spinner');

  const fields = {
    name: {
      input: document.getElementById('contact-name'),
      error: document.getElementById('name-error'),
      validate: (val) => val.trim().length > 0
    },
    email: {
      input: document.getElementById('contact-email'),
      error: document.getElementById('email-error'),
      validate: (val) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(val.trim());
      }
    },
    subject: {
      input: document.getElementById('contact-subject'),
      error: document.getElementById('subject-error'),
      validate: (val) => val.trim().length > 0
    },
    message: {
      input: document.getElementById('contact-message'),
      error: document.getElementById('message-error'),
      validate: (val) => val.trim().length > 0
    }
  };

  // Real-time input listener: remove validation errors if correct
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    field.input.addEventListener('input', () => {
      if (field.validate(field.input.value)) {
        field.input.parentElement.classList.remove('invalid');
      }
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    // Validate all fields
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      const isValid = field.validate(field.input.value);
      if (!isValid) {
        field.input.parentElement.classList.add('invalid');
        isFormValid = false;
      } else {
        field.input.parentElement.classList.remove('invalid');
      }
    });

    if (isFormValid) {
      // Simulate form submission process
      submitBtn.disabled = true;
      submitText.textContent = "Sending Message...";
      submitIcon.classList.add('hidden');
      submitSpinner.classList.remove('hidden');

      setTimeout(() => {
        // Transition to Success box display
        contactForm.classList.add('hidden');
        formSuccessBox.classList.remove('hidden');

        // Reset submit button state
        submitBtn.disabled = false;
        submitText.textContent = "Submit Message";
        submitIcon.classList.remove('hidden');
        submitSpinner.classList.add('hidden');

        contactForm.reset();
      }, 1600); // Simulated delay
    }
  });

  // Success Reset Action
  resetFormBtn.addEventListener('click', () => {
    formSuccessBox.classList.add('hidden');
    contactForm.classList.remove('hidden');
  });

  /* ==========================================================================
     BACK TO TOP & FOOTER
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.pointerEvents = 'auto';
      backToTopBtn.style.transform = 'translateY(0)';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.pointerEvents = 'none';
      backToTopBtn.style.transform = 'translateY(15px)';
    }
  });

  // Setup transition styling for back to top button init
  backToTopBtn.style.opacity = '0';
  backToTopBtn.style.pointerEvents = 'none';
  backToTopBtn.style.transform = 'translateY(15px)';
  backToTopBtn.style.transition = 'var(--transition-smooth)';

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
