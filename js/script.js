const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');


window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');  // Assuming sections have the tags <section>
    const navLinks = document.querySelectorAll('nav a');

    let currentSection = '';

    // Loop through each section and check which one is in the viewport
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;  // Adjust for the header offset
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Remove active class from all links and set it for the visible section's link
    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const offset = 48;
        const elementPosition = targetElement.offsetTop - offset;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth',
        });

        // Remove active class from all links and add to the clicked one
        document.querySelectorAll('nav a').forEach((link) => link.classList.remove('active'));
        anchor.classList.add('active');
    });
});

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const context = canvas.getContext('2d');

const colorArray = ['#F047FE', '#6153B7', '#E6DC6A', '#C2C5DB'];


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];


    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    };

    this.move = function () {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };
}

const circleArray = [];

for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 2 + 1;
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 1.5;
    const dy = (Math.random() - 0.5) * 1.5;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);

    for (const circle of circleArray) {
        circle.move();
    }
}

animate();


// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll events
function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => {
        if (isInViewport(el)) {
            el.classList.add('visible');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);



function sendEmail() {
    const name = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const message = document.querySelector('textarea').value;

    fetch('https://formspree.io/f/mgvwbvra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            message,
        }),
    })

    .then(data => {
        console.log('Success:', data);
        alert("Thank you for contacting me. I'll get back to you as soon as possible.");
        location.reload();
    })

      

    
    return false;
}

var descriptions = [
    "an aspiring backend developer..",
    "an aspiring web developer..",
    "an aspiring software developer..",
];
var i = 0;
var timeout = 2000;

function typeDescription() {
    const elem = document.getElementById("description");
    const text = descriptions[i];
    let j = 0;
    const interval = setInterval(function() {
        elem.innerHTML = text.slice(0, j);
        j++;
        if (j >= text.length) {
            clearInterval(interval);
            setTimeout(function() {
                i = (i + 1) % descriptions.length;
                typeDescription();
            }, timeout);
        }
    }, 50);
}
typeDescription();


