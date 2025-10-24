document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Menu Tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            menuTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const category = tab.getAttribute('data-category');
            menuContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === category) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial and activate corresponding dot
        testimonials[index].style.display = 'block';
        dots[index].classList.add('active');
    }

    // Initialize testimonial slider
    showTestimonial(currentTestimonial);

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Reservation Form Validation
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        let isValid = true;
        const requiredFields = bookingForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (isValid) {
            // ✅ Send to Web3Forms
            const formData = new FormData(bookingForm);

            fetch("https://api.web3forms.com/submit", {   // hardcoded API endpoint
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    bookingForm.innerHTML = `
                        <div class="reservation-success">
                            <i class="fas fa-check-circle" style="font-size: 3rem; color: green; margin-bottom: 1rem;"></i>
                            <h3>Reservation Successful!</h3>
                            <p>Thank you for your reservation. A confirmation email has been sent to you.</p>
                        </div>
                    `;
                } else {
                    alert("❌ Something went wrong: " + data.message);
                }
            })
            .catch(err => {
                alert("⚠️ Error: " + err.message);
            });
        }
    });
}



    // Scroll Animation for Elements
    const scrollElements = document.querySelectorAll('.section-title, .about-content, .menu-item, .gallery-item, .testimonial, .contact-content');

    function elementInView(el) {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= window.innerHeight * 0.8;
    }

    function displayScrollElement(element) {
        element.classList.add('scrolled');
    }

    function hideScrollElement(element) {
        element.classList.remove('scrolled');
    }

    function handleScrollAnimation() {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initialize scroll animation
    handleScrollAnimation();

    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Add CSS for animations that are controlled by JavaScript
    const style = document.createElement('style');
    style.textContent = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .burger.toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .burger.toggle .line2 {
            opacity: 0;
        }
        
        .burger.toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .section-title, .about-content, .menu-item, .gallery-item, .testimonial, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section-title.scrolled, .about-content.scrolled, .menu-item.scrolled, .gallery-item.scrolled, .testimonial.scrolled, .contact-content.scrolled {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});