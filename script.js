// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Typing effect
  const typedTextElement = document.getElementById("typed-text")
  const textToType = "Building full-stack web applications with React, Node.js, Express, and MongoDB."
  let i = 0
  const typingSpeed = 50 // milliseconds

  function typeText() {
    if (i < textToType.length) {
      typedTextElement.textContent += textToType.charAt(i)
      i++
      setTimeout(typeText, typingSpeed)
    }
  }

  // Start typing effect
  setTimeout(typeText, 1000)

  // Toggle navigation menu for mobile
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Close mobile menu when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Toggle dark/light theme
  const themeToggle = document.querySelector(".theme-toggle")

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme")

    // Toggle icon
    const icon = themeToggle.querySelector("i")
    if (document.body.classList.contains("dark-theme")) {
      icon.classList.remove("fa-moon")
      icon.classList.add("fa-sun")
    } else {
      icon.classList.remove("fa-sun")
      icon.classList.add("fa-moon")
    }
  })

  // Toggle bio extended text
  const bioToggle = document.querySelector(".bio-toggle")
  const bioExtended = document.querySelector(".bio-extended")

  bioToggle.addEventListener("click", () => {
    bioExtended.style.display = bioExtended.style.display === "block" ? "none" : "block"
    bioToggle.textContent = bioExtended.style.display === "block" ? "Read Less" : "Read More"
  })

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      const filter = button.getAttribute("data-filter")

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Project modal
  const modal = document.getElementById("project-modal")
  const modalContent = document.getElementById("modal-content")
  const closeModal = document.querySelector(".close-modal")
  const detailButtons = document.querySelectorAll(".details-btn")

  // Project details data
  const projectDetails = {
    bookstore: {
      title: "Bookstore MERN App",
      description:
        "A full-stack bookstore application with features for browsing, searching, and purchasing books. The application includes user authentication, shopping cart functionality, and an admin panel for managing inventory.",
      features: [
        "User authentication and authorization",
        "Book browsing and searching",
        "Shopping cart and checkout process",
        "Admin panel for inventory management",
        "Responsive design for all devices",
      ],
      technologies: [
        "React for frontend UI",
        "Redux for state management",
        "Node.js and Express for backend API",
        "MongoDB for database",
        "JWT for authentication",
        "CSS/SCSS for styling",
      ],
      challenges:
        "One of the main challenges was implementing a real-time inventory system that updates across all connected clients. This was solved by using Socket.io for real-time communication between the server and clients.",
      images: ["https://via.placeholder.com/800x500", "https://via.placeholder.com/800x500"],
    },
  }

  // Open modal with project details
  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const projectId = button.getAttribute("data-project")
      const project = projectDetails[projectId]

      if (project) {
        let imagesHTML = ""
        project.images.forEach((image) => {
          imagesHTML += `<img src="${image}" alt="${project.title}" class="modal-img">`
        })

        let featuresHTML = "<ul>"
        project.features.forEach((feature) => {
          featuresHTML += `<li>${feature}</li>`
        })
        featuresHTML += "</ul>"

        let technologiesHTML = "<ul>"
        project.technologies.forEach((tech) => {
          technologiesHTML += `<li>${tech}</li>`
        })
        technologiesHTML += "</ul>"

        modalContent.innerHTML = `
                    <h2>${project.title}</h2>
                    <div class="modal-images">${imagesHTML}</div>
                    <div class="modal-description">
                        <h3>Description</h3>
                        <p>${project.description}</p>
                        
                        <h3>Features</h3>
                        ${featuresHTML}
                        
                        <h3>Technologies Used</h3>
                        ${technologiesHTML}
                        
                        <h3>Challenges & Solutions</h3>
                        <p>${project.challenges}</p>
                    </div>
                `

        modal.style.display = "block"
        document.body.style.overflow = "hidden" // Prevent scrolling
      }
    })
  })

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
    document.body.style.overflow = "auto" // Enable scrolling
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto" // Enable scrolling
    }
  })

  // Form validation
  const contactForm = document.getElementById("contact-form")
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const messageInput = document.getElementById("message")
  const nameError = document.getElementById("name-error")
  const emailError = document.getElementById("email-error")
  const messageError = document.getElementById("message-error")
  const formSuccess = document.getElementById("form-success")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let isValid = true

    // Reset error messages
    nameError.style.display = "none"
    emailError.style.display = "none"
    messageError.style.display = "none"

    // Validate name
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Name is required"
      nameError.style.display = "block"
      isValid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailInput.value)) {
      emailError.textContent = "Please enter a valid email address"
      emailError.style.display = "block"
      isValid = false
    }

    // Validate message
    if (messageInput.value.trim() === "") {
      messageError.textContent = "Message is required"
      messageError.style.display = "block"
      isValid = false
    } else if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters"
      messageError.style.display = "block"
      isValid = false
    }

    // If form is valid, show success message
    if (isValid) {
      contactForm.style.display = "none"
      formSuccess.style.display = "block"

      // Reset form after 5 seconds
      setTimeout(() => {
        contactForm.reset()
        contactForm.style.display = "block"
        formSuccess.style.display = "none"
      }, 5000)
    }
  })

  // Navbar active link on scroll
  const sections = document.querySelectorAll("section")
  const navLinksScroll = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    navLinksScroll.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })
  })

  // Smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
})
