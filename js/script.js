const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');


window.addEventListener('scroll', function() {

    let currentSection = '';

    // Loop through each section and check which one is in the viewport
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;  // Adjust for the header offset
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Remove active class from all links
    navLinks.forEach((link) => link.classList.remove('active'));

    // Add active class to the visible section's link
    navLinks.forEach((link) => {
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

        // Remove active class from all links
        navLinks.forEach((link) => link.classList.remove('active'));

        // Add active class to the clicked link
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

// Adjust the Circle constructor to work with pixelated blocks
function Pixel(x, y, dx, dy, size) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size; // Size of the "pixel"
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        // Use fillRect to simulate a pixelated effect
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
    };

    this.move = function () {
        // Bounce off the walls like before
        if (this.x + this.size > innerWidth || this.x < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.size > innerHeight || this.y < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };
}

const pixelArray = [];

for (let i = 0; i < 50; i++) {
    const size = Math.random() * 5 + 5; // Set pixel size
    const x = Math.random() * (innerWidth - size * 2) + size;
    const y = Math.random() * (innerHeight - size * 2) + size;
    const dx = (Math.random() - 0.5) * 1.5;
    const dy = (Math.random() - 0.5) * 1.5;
    pixelArray.push(new Pixel(x, y, dx, dy, size));
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);

    for (const pixel of pixelArray) {
        pixel.move();
    }
}

animate();


function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => {
        if (isInViewport(el)) {
            el.classList.add('visible');
        }
    });
}


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
    "a backend developer..",
    "a web developer..",
    "a software developer..",
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


