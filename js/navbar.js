let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
  sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');
      

      
      if (id && top >= offset && top < offset + height) {
          navLinks.forEach((links) => {
              links.classList.remove('active');
          });
          // Check if the element exists before accessing classList
          let activeLink = document.querySelector('header nav a[href*=' + id + ']');
          if (activeLink) {
              activeLink.classList.add('active');
          }
      }
  });
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        const offset = 96; // Adjust this value to set the desired offset
        const elementPosition = targetElement.offsetTop - offset;
  
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    });
  });




window.onresize = function(event) {
    
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  };
  
  var canvas = document.querySelector('canvas');
  
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  
  var context = canvas.getContext('2d');
  
  var colorArray = [
      '#F047FE',
      '#6153B7',
      '#E6DC6A',
      '#C2C5DB'
  ]
  
  function Circle(x,y,dx,dy,radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  
      this.draw = function () {
          context.beginPath();
          context.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
          context.fillStyle  = this.color;
          context.fill();
      }
  
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
      }
  }
  
  var circleArray = [];
  
  for (var i = 0; i < 50; i++) {
    var radius = Math.random() * 2 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 1.5; 
    var dy = (Math.random() - 0.5) * 1.5; 
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
  
  
  function animate() {
  
      requestAnimationFrame(animate);
      context.clearRect(0,0,innerWidth,innerHeight);
  
      for (var i = 0; i < circleArray.length; i++){
          circleArray[i].move();
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

// Trigger scroll check on page load
handleScroll();


function sendEmail() {
    var name = document.querySelector('input[type="text"]').value;
    var email = document.querySelector('input[type="email"]').value;
    var message = document.querySelector('textarea').value;

    var body = "Name: " + name + "\nEmail: " + email + "\n\n" + message;

    fetch('https://formspree.io/f/mgvwbvra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    });

    alert("Thank you for contacting me. I'll get back to you as soon as possible.");
    location.reload()

    
    return false;
}
