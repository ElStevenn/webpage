<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Pau Mateu</title>
  <meta name="author" content="Pau Mateu"/>
  <meta name="description" content="Personal site for Pau Mateu, showcasing DevOps expertise, backend services, and more." />
  <meta name="keywords" content="DevOps, Backend, Cloud, Microservices, Security, Privacy, Tech" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Open Graph (for social sharing) -->
  <meta property="og:title" content="Pau Mateu - DevOps & Entrepreneur " />
  <meta property="og:description" content="Explore my projects, background, and ways to get in touch or support my work." />
  <meta property="og:type" content="website" />
  <!-- Font Awesome for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-…(omitted)…" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <style>
    /* ------------------------------
       COLOR & TYPOGRAPHY 
    ------------------------------ */
    :root {
      --bg-color: #0D1117;     
      --text-color: #C9D1D9; 
      --primary-color: #58A6FF; /* Accent (teal/bluish) */
      --secondary-color: #F78166;/* Example secondary (salmon/orange) */
      --card-bg: #161B22;        /* Slightly lighter than background */
      --highlight-color: #ffd883;/* Bright accent for hovers or highlights */
      --font-body: 'Open Sans', sans-serif;
      --font-heading: 'Montserrat', sans-serif;
      --transition-speed: 0.3s;
      --skill-dark-blue: #0b1f44;
    }
    body {
      margin: 0;
      font-family: var(--font-body);
      background: var(--bg-color);
      color: var(--text-color);
      line-height: 1.6;
      overflow-x: hidden;
    }
    h1, h2, h3, h4 {
      font-family: var(--font-heading);
      margin-top: 0;
      margin-bottom: 10px;
    }
    a {
      color: var(--primary-color);
      text-decoration: none;
      transition: color var(--transition-speed);
    }
    a:hover {
      color: var(--highlight-color);
    }

    /* ------------------------------
       LOADER
    ------------------------------ */
    #loader {
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: var(--bg-color);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 9999;
    }
    #loader p {
      margin: 0;
      font-size: 1.2rem;
    }

    /* ------------------------------
       HEADER & NAVIGATION
    ------------------------------ */
    header {
      position: relative;
      top: 0;
      background: #0B0E13;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      height: 60px;
      z-index: 999;
      border-bottom: 1px solid var(--card-bg);
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo i {
      color: var(--primary-color);
      font-size: 1.5rem;
    }
    .logo span {
      font-weight: 700;
      font-size: 1.2rem;
      color: var(--primary-color);
    }
    .tagline {
      font-size: 0.8rem;
      color: var(--text-color);
      margin-left: 10px;
    }
    nav ul {
      list-style: none;
      display: flex;
      gap: 1.5rem;
      margin: 0;
      padding: 0;
    }
    nav li {
      display: inline-block;
    }
    nav a {
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 0.9rem;
    }
    .cta-header {
      background: var(--secondary-color);
      color: #fff;
      padding: 8px 15px;
      border-radius: 4px;
      transition: background var(--transition-speed);
    }
    .cta-header:hover {
      background: var(--highlight-color);
      color: #000;
      transition: 0.3s;
    }
    .social-icons {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      gap: 10px;
      z-index: 1000;
    }
    .social-icons a {
      color: var(--text-color);
      font-size: 1.2rem;
      transition: color var(--transition-speed);
    }
    .social-icons a:hover {
      color: var(--primary-color);
    }
    .x-logo {
      font-size: 1.2rem;
      color: var(--text-color);
      transition: color var(--transition-speed);
    }
    .x-logo:hover {
      color: var(--primary-color);
    }



    /* Hamburger (for mobile) */
    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      cursor: pointer;
    }
    .hamburger div {
      width: 25px;
      height: 3px;
      background: var(--text-color);
      transition: all var(--transition-speed);
    }
    .hamburger.open div:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    .hamburger.open div:nth-child(2) {
      opacity: 0;
    }
    .hamburger.open div:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }

    /* Responsive Navigation (mobile) */
    @media (max-width: 768px) {
      nav ul {
        position: fixed;
        top: 60px;
        right: -100%;
        flex-direction: column;
        gap: 1rem;
        width: 200px;
        background: #0B0E13;
        transition: right var(--transition-speed);
        padding: 20px;
        height: calc(100vh - 60px);
      }
      nav ul.show {
        right: 0;
      }
      .hamburger {
        display: flex;
      }
      .social-icons {
        display: none;
      }
    }

     /* ------------------------------
     HERO SECTION + STARFIELD
    ------------------------------ */
    .hero {
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      background: linear-gradient(135deg, #0D1117 0%, #161B22 100%);
      text-align: center;
      transition: transform 0.3s ease; /* Smooth transition for tilt */
    }

    /* the canvas sits behind everything */
    #starfield {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 0 !important;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: -10px; left: -10px; right: -10px; bottom: -10px;
      background: linear-gradient(135deg, #58A6FF, #F78166);
      opacity: 0;
      z-index: -1 !important;
      transition: opacity 0.3s ease;
      filter: blur(15px);
    }


  /* custom cursor on hover */
  .hero:hover,
  .hero:hover * {
    /* use a same‑origin or CORS‑enabled URL, or embed as data URI */
    cursor: url('/home/mrpau/Desktop/Secret_Project/Webpage/src/images/cursor.png') 16 16, auto;
  }


    .hero:hover::before {
      opacity: 0.7;
    }

    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      animation: fadeInDown 1s ease-out;
    }
    .hero p {
      max-width: 600px;
      margin-bottom: 20px;
      font-size: 1.1rem;
      animation: fadeInUp 1s ease-out;
    }

    .hero .cta-btn {
      background: var(--primary-color);
      color: #fff;
      padding: 15px 30px;
      border: none;
      font-size: 1rem;
      cursor: pointer;
      transition: background var(--transition-speed), transform var(--transition-speed);
      border-radius: 4px;
      margin: 10px;
    }
    .hero .cta-btn:hover {
      background: var(--highlight-color);
      transform: scale(1.05);
    }
    .hero .secondary-cta {
      background: transparent;
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
    }
    .hero .secondary-cta:hover {
      background: var(--primary-color);
      color: #fff;
    }

    .scroll-cue {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2rem;
      color: var(--text-color);
      animation: bounce 2s infinite;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50%     { transform: translateY(-10px); }
    }

    .personal-touch {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
      font-size: 1rem;
      color: var(--secondary-color);
    }
    .personal-touch i {
      font-size: 1.2rem;
    }

    /* ------------------------------
       KEYFRAMES
    ------------------------------ */
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ------------------------------
       MAIN CONTENT (unchanged)
    ------------------------------ */
    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    section {
      margin-bottom: 60px;
    }
    section h2 {
      font-size: 1.8rem;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--card-bg);
      padding-bottom: 5px;
    }
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .skill-card {
      position: relative;
      background: var(--card-bg);
      padding: 20px;
      border-radius: 6px;
      transition: transform var(--transition-speed);
    }
    .skill-card:hover {
      transform: translateY(-5px);
    }

    .skill-title {
      font-weight: 700;
      margin-bottom: 10px;
    }
    .progress-bar-container {
      background: var(--skill-dark-blue);
      border-radius: 4px;
      overflow: hidden;
      height: 8px;
      margin-top: 5px;
    }
    .progress-bar {
      height: 8px;
      background: var(--primary-color);
      width: var(--progress, 0);
      transition: width 1s ease;
    }

    .docker-card,
    .python-card,
    .cicd-card,
    .security-card {
      position: relative;
      overflow: hidden;
      background: var(--card-bg);
    }


    .docker-card > *,
    .python-card > *,
    .cicd-card > *,
    .security-card > * {
      position: relative;
      z-index: 1;
    }

    .docker-card::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200%;
      height: 200%;
      background: url("https://static-00.iconduck.com/assets.00/docker-icon-2048x1470-vi98kasx.png")
                  no-repeat center/contain;
      opacity: 0.08;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 0;
      filter:
        invert(1)
        sepia(1)
        saturate(10000%)
        hue-rotate(190deg)
        brightness(0.4);
    }

    .python-card::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 195%;
      height: 180%;
      background: url("https://static-00.iconduck.com/assets.00/python-icon-2025x2048-66evuk74.png")
                  no-repeat center/contain;
      opacity: 0.08;
      pointer-events: none;
      z-index: 0;
      /* rotate it 45° around its center */
      transform: translate(-50%, -50%) rotate(-50deg);
      transform-origin: center center;
      /* tint to match your theme */
      filter:
        invert(1)
        sepia(1)
        saturate(10000%)
        hue-rotate(200deg)
        brightness(0.4);
    }

    .cicd-card::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200%;
      height: 200%;
      background: url("https://cdn4.iconfinder.com/data/icons/cloud-native-security/101/CICD-512.png")
                  no-repeat center/contain;
      opacity: 0.08;
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -49%) rotate(30deg);
      transform-origin: center center;
      filter:
        invert(1)
        sepia(1)
        saturate(10000%)
        hue-rotate(190deg)
        brightness(0.4);
    }

    .security-card::before {
      content: "";
      position: absolute;
      top: 64%;
      left: 51%;
      width: 200%;
      height: 134%;
      background: url("https://cdn-icons-png.flaticon.com/512/95/95454.png")
                  no-repeat center/contain;
      opacity: 0.08;
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%) rotate(0deg);
      transform-origin: center center;
      filter:
        invert(1)
        sepia(1)
        saturate(10000%)
        hue-rotate(180deg)
        brightness(0.4);
    }

    .skill-card:hover .progress-bar {
      width: var(--progress);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* 3 columns */
      grid-template-rows: repeat(2, auto); /* 2 rows */
      gap: 20px;
      perspective: 1000px;
    }

    .project-card {
      background: var(--card-bg);
      padding: 20px;
      border-radius: 6px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-5px) rotateX(5deg);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .project-card.highlight-gold {
      border: 2px solid gold;
    }

    .project-card.highlight-gold h3 {
      color: gold;
    }

    .project-card.highlight-gold:hover {
      box-shadow: 0 0 15px gold;
    }

    .project-card i {
      display: block;
      margin: 0 auto 10px;
      text-align: center;
      color: var(--primary-color);
    }

    .project-card h3 {
      position: relative;
    }

    .badge {
      position: absolute;
      top: -10px;
      right: -10px;
      background: gold;
      color: #000;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
    }

    .project-card ul {
      list-style: none;
      padding: 0;
      margin: 10px 0;
    }

    .project-card li {
      margin-bottom: 5px;
      position: relative;
      padding-left: 20px;
    }

    .project-card li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--primary-color);
    }

    .learn-more {
      display: inline-block;
      background: var(--primary-color);
      color: #fff;
      padding: 10px 20px;
      border-radius: 4px;
      transition: background var(--transition-speed);
      text-align: center;
      margin-top: 10px;
    }

    .learn-more:hover {
      background: var(--highlight-color);
    }

    .projects-cta {
      text-align: center;
      margin-top: 40px;
    }

    .projects-cta p {
      margin-bottom: 20px;
    }

    .projects-cta .cta-btn {
      padding: 15px 30px;
      font-size: 1.1rem;
    }
    .accordion {
      background: var(--card-bg);
      border-radius: 5px;
    }
    .accordion-item {
      border-bottom: 1px solid #2A2F3B;
    }
    .accordion-item:last-child {
      border-bottom: none;
    }
    .accordion-question {
      cursor: pointer;
      padding: 15px;
      font-weight: 600;
      position: relative;
    }
    .accordion-question:hover {
      background: #22272E;
    }
    .accordion-answer {
      display: none;
      padding: 0 15px 15px 15px;
      line-height: 1.4;
    }
    .support-contact {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    @media (max-width: 768px) {
      .support-contact {
        grid-template-columns: 1fr;
      }
    }
    .contact-table, .support-table {
      width: 100%;
      border-collapse: collapse;
    }
    .contact-table th, .contact-table td, .support-table th, .support-table td {
      border: 1px solid #2A2F3B;
      padding: 8px;
      text-align: left;
    }
    .contact-table th {
      background: #22272E;
    }
    .support-table th {
      background: #22272E;
    }
    footer {
      background: #0B0E13;
      padding: 20px;
      text-align: center;
      color: var(--text-color);
      border-top: 1px solid var(--card-bg);
    }
    .footer-socials {
      margin-bottom: 10px;
    }
    .footer-socials a {
      margin: 0 10px;
    }
    [data-scroll] {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s, transform 0.6s;
      will-change: opacity, transform;
    }
    [data-scroll].visible {
      opacity: 1;
      transform: translateY(0);
    }
    /* -------------------------------
       MODAL
    ------------------------------- */

    .modal-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 10000;
    }
    .modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    /* modal window */
    .modal {
      background: var(--card-bg);
      color: var(--text-color);
      padding: 2rem;
      border-radius: 0.5rem;
      max-width: 400px;
      width: 90%;
      position: relative;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      transform: scale(0.9);
      transition: transform 0.3s ease;
    }
    .modal-overlay.open .modal {
      transform: scale(1);
    }

    /* close button */
    .close-modal {
      position: absolute;
      top: 0.5rem; right: 0.5rem;
      background: transparent;
      border: none;
      font-size: 1.5rem;
      color: var(--text-color);
      cursor: pointer;
    }

    /* form styling */
    #contact-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }
    #contact-form label {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
    }
    #contact-form input,
    #contact-form textarea {
      margin-top: 0.25rem;
      padding: 0.5rem;
      border: 1px solid #444;
      border-radius: 0.25rem;
      background: #0B0E13;
      color: #fff;
      transition: border-color var(--transition-speed);
    }
    #contact-form input:focus,
    #contact-form textarea:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    #contact-form .cta-btn {
      align-self: flex-end;
      margin-top: 0.5rem;
    }


  </style>
</head>

<body>
  <!-- LOADER -->
  <div id="loader">
    <p>Initializing...</p>
    <p id="loaderText"></p>
  </div>

  <!-- HEADER / NAV -->
  <header>
    <div class="logo">
      <i class="fas fa-cogs"></i>
      <span>PM</span>
      <span class="tagline">DevOps & Entrepreneur </span>
    </div>
    <div class="social-icons">
      <a href="https://github.com/ElStevenn" target="_blank" aria-label="GitHub">
        <i class="fab fa-github"></i>
      </a>
      <a href="https://x.com/ElStevenn" target="_blank" aria-label="X (formerly Twitter)" class="x-logo">
        𝕏
      </a>
      <a href="mailto:paumat17@gmail.com" aria-label="Email">
        <i class="fas fa-envelope"></i>
      </a>
    </div>
    
    <div class="hamburger" id="hamburger">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <nav>
      <ul id="navList">
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#support">Support</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#" id="open-contact-nav" class="cta-header">Contact Me</a></li>

      </ul>
    </nav>
  </header>

  <!-- contact modal -->
  <div
    id="contact-modal"
    class="modal-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="contact-modal-title"
    aria-describedby="contact-modal-desc"
  >
    <div class="modal">
      <button
        type="button"
        class="close-modal"
        aria-label="Close contact form"
      >&times;</button>

      <h2 id="contact-modal-title">Contact Me</h2>
      <p id="contact-modal-desc" class="sr-only">
        Fill out this form to send me a message.
      </p>

      <form id="contact-form">
        <label>
          Your Name
          <input type="text" name="name" required />
        </label>
        <label>
          Your Email
          <input type="email" name="email" required />
        </label>
        <label>
          Message
          <textarea name="message" rows="4" required></textarea>
        </label>
        <button type="submit" class="cta-btn">Send</button>
      </form>
    </div>
  </div>



  <!-- HERO SECTION -->
  <section class="hero" id="hero" data-tilt>
    <canvas id="starfield"></canvas>
  
    <h1>Hi, I’m Pau</h1>
    <p>I build secure and scalable infrastructure solutions.</p>
    <div>
      <button class="cta-btn" onclick="document.querySelector('#projects').scrollIntoView({behavior: 'smooth'})">
        Explore My Projects
      </button>
      <button id="open-contact" class="cta-btn secondary-cta">
        Contact Me
      </button>
    </div>
    <div class="personal-touch">
      <i class="fas fa-chess"></i> Chess Enthusiast
    </div>
    <div class="scroll-cue"><i class="fas fa-chevron-down"></i></div>
  </section>
  

  <!-- MAIN CONTENT (unchanged) -->
  <main>
    <section id="about" data-scroll>
      <h2>About Me</h2>
      <p>I'm a DevOps Engineer &amp; Entrepreneur with experience in cloud computing, microservices, and a passion for privacy.</p>
    
      <div class="about-grid">
        <!-- Docker & Kubernetes -->
        <div class="skill-card docker-card">
          <div class="skill-title">Docker &amp; Kubernetes</div>
          <p>Container orchestration, microservices, scaling.</p>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width:85%"></div>
          </div>
        </div>
    
        <!-- Python -->
        <div class="skill-card python-card">
          <div class="skill-title">Python</div>
          <p>Data processing, scripting, automation.</p>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width:80%"></div>
          </div>
        </div>
    
        <!-- CI/CD Pipelines -->
        <div class="skill-card cicd-card">
          <div class="skill-title">CI/CD Pipelines</div>
          <p>Jenkins, GitLab CI, automated testing.</p>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width:75%"></div>
          </div>
        </div>
    
        <!-- Security & Privacy -->
        <div class="skill-card security-card">
          <div class="skill-title">Security &amp; Privacy</div>
          <p>PGP encryption, secure deployments, robust infra.</p>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width:90%"></div>
          </div>
        </div>

    </section>
    
    
    

    <section id="projects" data-scroll>
      <h2>My Projects & Services</h2>
      <div class="projects-grid">
        <!-- Row 1 -->
        <div class="project-card">
          <i class="fas fa-envelope fa-3x"></i>
          <h3>Email Automation</h3>
          <p>Streamline your company’s email workflow and never miss an important message.</p>
          <ul>
            <li>Automatically categorize and prioritize incoming mail</li>
            <li>Trigger custom responses based on rules</li>
            <li>Integrate with your existing email provider</li>
          </ul>
          <a href="/" class="learn-more">Learn More</a>
        </div>
        <div class="project-card">
          <i class="fas fa-calendar-alt fa-3x"></i>
          <h3>Task Scheduler</h3>
          <p>Automate your day-to-day operations with precision and ease.</p>
          <ul>
            <li>Schedule and automate repetitive tasks</li>
            <li>Integrate with microservices and APIs</li>
            <li>Monitor task execution and receive alerts</li>
          </ul>
          <a href="#contact" class="learn-more">Learn More</a>
        </div>
        <div class="project-card">
          <i class="fas fa-robot fa-3x"></i>
          <h3>Custom Chatbot</h3>
          <p>Enhance customer engagement with a personalized AI assistant.</p>
          <ul>
            <li>Provide 24/7 customer support</li>
            <li>Personalize responses based on user data</li>
            <li>Integrate with your website or app</li>
          </ul>
          <a href="#contact" class="learn-more">Learn More</a>
        </div>
        <!-- Row 2: Modified -->
        <div class="project-card highlight-gold">
          <i class="fas fa-balance-scale fa-3x"></i>
          <h3>Plan Your Inheritance <span class="badge">Most Valuable</span></h3>
          <p>Get peace of mind by planning your estate, ensuring your loved ones are cared for according to your wishes.</p>
          <ul>
            <li>Define beneficiaries and asset allocations</li>
            <li>Set up trusts and legal safeguards</li>
            <li>Generate clear, legally binding documents</li>
          </ul>
          <a href="#contact" class="learn-more">Learn More</a>
        </div>
        <div class="project-card">
          <i class="fas fa-shield-alt fa-3x"></i>
          <h3>SkyShield Server</h3>
          <p>Secure, high-availability server solution for mission-critical operations.</p>
          <ul>
            <li>High-availability and fault-tolerant architecture</li>
            <li>Advanced monitoring and real-time analytics</li>
            <li>Secure data storage and transmission</li>
          </ul>
          <a href="#contact" class="learn-more">Learn More</a>
        </div>
        <div class="project-card">
          <i class="fas fa-cloud fa-3x"></i>
          <h3>Nexus Cloud Server</h3>
          <p>Scalable cloud server solution for dynamic and growing businesses.</p>
          <ul>
            <li>Auto-scaling infrastructure for peak performance</li>
            <li>Real-time data analytics and reporting</li>
            <li>Seamless integration with existing systems</li>
          </ul>
          <a href="#contact" class="learn-more">Learn More</a>
        </div>
      </div>
      <div class="projects-cta">
        <p>Interested in one of these services? <b>Contact Me</b> to discuss your project or request a demo.</p>
        <a href="#contact" class="cta-btn">Get in Touch</a>
      </div>
    </section>

    <section id="contact" data-scroll>
      <h2>Q&A</h2>
      <div class="accordion">
        <div class="accordion-item">
          <div class="accordion-question">Q: How many skills do you have?</div>
          <div class="accordion-answer">
            I have a wide range of skills, from server management and database administration to Python and JavaScript programming.
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-question">Q: Who is your inspiration?</div>
          <div class="accordion-answer">
            I am inspired by innovators who challenge the status quo and strive to make technology accessible and efficient.
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-question">Q: Why do you prioritize security and privacy?</div>
          <div class="accordion-answer">
            "If you think privacy is unimportant because you have nothing to hide, you might as well say free speech is unimportant because you have nothing useful to say."
            <br><strong>- Edward Snowden</strong>
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-question">Q: What is your opinion about cryptocurrency?</div>
          <div class="accordion-answer">
            Cryptocurrency is an exciting development in the financial world. I appreciate its potential for decentralization.
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-question">Q: Do you have my IP now?</div>
          <div class="accordion-answer">
            I respect your privacy and do not track or store IP addresses unnecessarily. Feel free to use TOR or any privacy tools.
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-question">Q: Social media is gone?</div>
          <div class="accordion-answer">
            Social media is the cigarette of the 21st century. I believe in meaningful interactions and have chosen to minimize my presence there.
          </div>
        </div>
      </div>
    </section>

    <section data-scroll>
      <h2>Public PGP Key</h2>
      <details>
        <summary>Click to view my PGP key</summary>
        <pre style="background:#222; padding:10px; border-radius:4px; overflow:auto; max-width:100%;">
-----BEGIN PGP PUBLIC KEY BLOCK-----
[... Your PGP Key ...]
-----END PGP PUBLIC KEY BLOCK-----
        </pre>
      </details>
    </section>

    <section data-scroll>
      <h2>1337 Friends</h2>
      <p>
        <a href="https://github.com/rreal-dev">Raúl</a> | 
        <a href="https://www.instagram.com/tonirss_/">Toni Rams</a> | 
        <a href="https://venroy.moe/">Venroy</a> |
        <a href="https://x.com/FilipNoSkill">Filip</a>
      </p>
      <p>Requirements to join my 1337 friends list:</p>
      <ul>
        <li>1. Positive and supportive</li>
        <li>2. Shared interests</li>
        <li>3. Just be my friend :3</li>
      </ul>
    </section>
  </main>

  <!-- FOOTER -->
  <footer>
    <div class="footer-socials">
      <a href="https://github.com/ElStevenn">GitHub</a> |
      <a href="mailto:paumat17@gmail.com">Email</a>
    </div>
    <p>© 2025 Pau Mateu. All rights reserved.</p>
    <p><small>Built with security and privacy in mind.</small></p>
  </footer>

 <!-- JAVASCRIPT -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
    const openBtns = [
      document.getElementById('open-contact'),
      document.getElementById('open-contact-nav')
    ].filter(Boolean);
    const modal      = document.getElementById('contact-modal');
    const closeBtn   = modal.querySelector('.close-modal');
    const focusableSelector = 'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])';

    let lastFocus = null;
    const focusableEls = () => Array.from(modal.querySelectorAll(focusableSelector))
      .filter(el => !el.disabled && el.offsetParent !== null);

    function openModal() {
      lastFocus = document.activeElement;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      // focus first form control
      focusableEls()[0].focus();
    }

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      lastFocus && lastFocus.focus();
    }

    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      const els = focusableEls();
      if (!els.length) return;

      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    // wire up open buttons
    openBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        openModal();
      });
    });

    // close handlers
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', e => {
      if (modal.classList.contains('open')) {
        if (e.key === 'Escape') closeModal();
        else trapFocus(e);
      }
    });

    // optional: AJAX form submission
    document.getElementById('contact-form').addEventListener('submit', e => {
      e.preventDefault();
      // TODO: send via fetch()/XHR
      alert('Thanks for reaching out!');
      closeModal();
      e.target.reset();
    });
  });


  
  // LOADER
  const loader = document.getElementById('loader');
  const loaderText = document.getElementById('loaderText');
  const messages = ["Loading modules...", "Setting up environment...", "Access granted."];
  let msgIndex = 0;
  function runLoaderMessages() {
    if (msgIndex < messages.length) {
      loaderText.textContent = messages[msgIndex];
      msgIndex++;
      setTimeout(runLoaderMessages, 700);
    } else {
      loader.style.display = 'none';
      document.body.style.overflow = 'auto';
      revealOnScroll();
    }
  }
  window.onload = () => {
    document.body.style.overflow = 'hidden';
    runLoaderMessages();
  };

  // MOBILE NAV
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('navList');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navList.classList.toggle('show');
  });

  // ACCORDION
  const questions = document.querySelectorAll('.accordion-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
  });

  // SCROLL REVEAL
  const revealElements = document.querySelectorAll('[data-scroll]');
  function revealOnScroll() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);

  // PROGRESS BAR ANIMATION
  const progressBars = document.querySelectorAll('.progress-bar');
  function fillBars() {
    progressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.transition = 'width 1.5s ease';
        bar.style.width = width;
      }, 600);
    });
  }
  window.addEventListener('load', fillBars);

  // 3D TILT EFFECT FOR HERO
  const hero = document.querySelector('.hero');
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 50;
    const rotateY = (centerX - x) / 50;
    hero.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  hero.addEventListener('mouseleave', () => {
    hero.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });

  // STARFIELD EFFECT
  (function() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const numStars = 150;
    const stars = [];

    function Star() {
      this.reset();
    }
    Star.prototype.reset = function() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 1.2 + 0.2;
      this.speed = Math.random() * 0.5 + 0.2;
      this.alpha = Math.random() * 0.5 + 0.3;
    };
    Star.prototype.update = function() {
      this.y -= this.speed;
      if (this.y < 0) {
        this.y = h;
        this.x = Math.random() * w;
      }
    };
    Star.prototype.draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
      ctx.fill();
    };

    function initStars() {
      for (let i = 0; i < numStars; i++) stars.push(new Star());
    }
    function animateStars() {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => { s.update(); s.draw(); });
      requestAnimationFrame(animateStars);
    }
    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });
    initStars();
    animateStars();
  })();

  // PARTICLE TRAIL ON MOUSE HOVER
  (function() {
    const hero = document.querySelector('.hero');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let w, h;
    const particles = [];

    function resize() {
      w = canvas.width = hero.clientWidth;
      h = canvas.height = hero.clientHeight;
      canvas.style.position = 'absolute';
      canvas.style.top = 0;
      canvas.style.left = 0;
      canvas.style.zIndex = '-1';
    }

    hero.appendChild(canvas);
    resize();
    window.addEventListener('resize', resize);

    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.size = Math.random() * 3 + 1;
      this.life = 60;
    }
    Particle.prototype.update = function() {
      this.x += this.vx;
      this.y += this.vy;
      this.life--;
    };
    Particle.prototype.draw = function() {
      ctx.globalAlpha = this.life / 60;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = '#58A6FF';
      ctx.fill();
    };

    function emit(x, y) {
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(x, y));
      }
    }

    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      emit(e.clientX - rect.left, e.clientY - rect.top);
    });
  })();
</script>

<!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}

</script>
<!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script>
<!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script>
<!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script>
</body>
</html>