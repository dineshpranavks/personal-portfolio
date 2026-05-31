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
      title: "ThiraCloud Orchestration Platform",
      category: "Cloud & DevOps",
      tag: "DevOps/Cloud",
      img: "assets/project1.png",
      date: "Jan 2024 - Mar 2024",
      desc: "ThiraCloud is a web-based dashboard engineered to provide visual metrics and pipeline control for containerized deployments. By orchestrating communication with Kubernetes clusters, it bridges the gap between infrastructure administrators and web developers who want instantaneous build logs, node resources overview, and container scaling control.",
      features: [
        "Interactive metrics charts showing CPU and Memory utility per Kubernetes Pod.",
        "Secure OAuth2 integrations for multi-tenant developer permissions.",
        "One-click pod scaling and restart mechanism connected via backend WebSockets.",
        "Automated deployment notifications using Discord webhook integrations."
      ],
      skills: ["Docker", "Kubernetes", "Next.js", "Chart.js", "Express", "JWT"],
      liveLink: "https://github.com/dineshpranavks/thira-cloud-demo", // Mock links
      codeLink: "https://github.com/dineshpranavks/thira-cloud-demo"
    },
    project2: {
      title: "NexStore Headless E-commerce",
      category: "Full-Stack",
      tag: "Fullstack",
      img: "assets/project2.png",
      date: "Oct 2023 - Dec 2023",
      desc: "NexStore is a highly optimized e-commerce software solution designed to guarantee less than 1.5 seconds page load times. Built with a headless architecture, it features clean product searching, dynamic filtering, multi-tier checkout procedures, and administrative interfaces for product updates and stock audits.",
      features: [
        "Server-side rendered product listings using Next.js App Router for optimal SEO.",
        "Stripe checkout integration with secure webhooks validation.",
        "Full dashboard admin panel supporting inventory counting and charts.",
        "Optimized image delivery using modern Next/Image caching hooks."
      ],
      skills: ["React", "Next.js", "Stripe API", "PostgreSQL", "Prisma ORM", "TailwindCSS"],
      liveLink: "https://github.com/dineshpranavks/nexstore-ecommerce",
      codeLink: "https://github.com/dineshpranavks/nexstore-ecommerce"
    },
    project3: {
      title: "TaskFlow Real-Time Workspace",
      category: "Full-Stack",
      tag: "Fullstack",
      img: "assets/project3.png",
      date: "Jul 2023 - Sep 2023",
      desc: "TaskFlow is a multi-user collaborative workspace application similar to Trello. It provides instant state synchronization across clients using low-latency WebSockets. Team members can move task cards, converse in chat panels, and receive instant activity feeds on project status updates.",
      features: [
        "Dynamic drag-and-drop workspace UI powered by React Beautiful DnD.",
        "Real-time event sync with WebSockets and Redis pub/sub messaging channels.",
        "Instant text messaging panel attached per board workspace.",
        "User presence trackers showing active online/offline members."
      ],
      skills: ["React.js", "WebSockets", "Node.js", "Redis", "MongoDB", "CSS Grid"],
      liveLink: "https://github.com/dineshpranavks/taskflow-collab",
      codeLink: "https://github.com/dineshpranavks/taskflow-collab"
    },
    project4: {
      title: "DevPulse Developer Dashboard",
      category: "Frontend UI",
      tag: "Frontend",
      img: "assets/project4.png",
      date: "Apr 2023 - Jun 2023",
      desc: "DevPulse aggregates Git commit history, pull request status, and active deployment cycles into a clean centralized monitoring console. It features responsive, high-performance vector visualizations built using D3.js and responsive CSS styling, supporting high density metrics rendering for desktop layouts.",
      features: [
        "Interactive heatmaps of team commit frequencies using SVG D3 components.",
        "API hooks communicating directly with Github REST services.",
        "Fluid entrance layouts and animations with Framer Motion equivalents.",
        "Comprehensive accessibility testing maintaining contrast levels."
      ],
      skills: ["React.js", "D3.js", "GitHub API", "CSS variables", "Framer Motion"],
      liveLink: "https://github.com/dineshpranavks/devpulse-dashboard",
      codeLink: "https://github.com/dineshpranavks/devpulse-dashboard"
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
