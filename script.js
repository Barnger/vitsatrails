// ==============================
// Vitsatrail JavaScript
// ==============================

// ---------- Mobile Navigation Toggle ----------
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
  });
}

// ---------- Auto Update Year in Footer ----------
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ---------- Book Now Buttons ----------
document.querySelectorAll('.btn').forEach(button => {
  if (button.textContent.toLowerCase().includes('book')) {
    button.addEventListener('click', e => {
      const destinationName =
        button.dataset.destination ||
        button.closest('.card')?.querySelector('h3')?.textContent ||
        'this destination';

      localStorage.setItem('selectedDestination', destinationName);
      const price = button.dataset.price || '';
      if (price) localStorage.setItem('selectedPrice', price);

      window.location.href = 'book.html';
    });
  }
});

// ---------- Booking Page ----------
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  const destinationField = document.getElementById('destination');
  const priceField = document.getElementById('price');
  const peopleInput = document.getElementById('people');
  const totalPriceEl = document.getElementById('total-price');
  const paymentSelect = document.getElementById('payment-method');
  const paymentInfo = document.getElementById('payment-info');

  // Populate destination & price from localStorage or URL
  const storedDestination = localStorage.getItem('selectedDestination');
  const storedPrice = localStorage.getItem('selectedPrice');
  const urlParams = new URLSearchParams(window.location.search);

  if (storedDestination) destinationField.value = storedDestination;
  else if (urlParams.get('destination')) destinationField.value = urlParams.get('destination');

  if (storedPrice) priceField.value = storedPrice;
  else if (urlParams.get('price')) priceField.value = urlParams.get('price');

  // Update total price when number of people changes
  peopleInput.addEventListener('input', () => {
    const pricePerPerson = parseFloat(priceField.value) || 0;
    const numPeople = parseInt(peopleInput.value) || 0;
    totalPriceEl.textContent = (pricePerPerson * numPeople).toFixed(2);
  });

  // Show/hide payment instructions dynamically
  if (paymentSelect && paymentInfo) {
    paymentSelect.addEventListener('change', () => {
      paymentInfo.classList.toggle('hidden', !paymentSelect.value);
    });
  }

  // Booking form submission
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const nationality = document.getElementById('nationality').value;
    const date = document.getElementById('date').value;
    const paymentMethod = paymentSelect.value;
    const total = totalPriceEl.textContent;

    if (!name || !email || !phone || !nationality || !date || !paymentMethod) {
      alert('Please fill in all required booking fields.');
      return;
    }

    alert(
      `Thank you for booking with Vitsatrail!\n` +
      `Destination: ${destinationField.value}\n` +
      `Total Amount: ${total} USD\n` +
      `Our team will contact you soon.`
    );

    bookingForm.reset();
    totalPriceEl.textContent = "0";
    if (paymentInfo) paymentInfo.classList.add('hidden');
    localStorage.removeItem('selectedDestination');
    localStorage.removeItem('selectedPrice');
  });
}

// ---------- Contact Form ----------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !subject || !email || !message) {
      alert('Please fill in all contact form fields.');
      return;
    }

    alert(`Thank you ${name}! Your message has been sent successfully. We'll get back to you soon.`);
    contactForm.reset();
  });
}

// ---------- Login Form ----------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    alert(`Welcome back, ${email}! Redirecting to your dashboard...`);
    loginForm.reset();
    window.location.href = 'index.html';
  });
}

// ---------- Forgot Password ----------
const forgotForm = document.getElementById('forgotForm');
if (forgotForm) {
  forgotForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim();

    if (!email) {
      alert('Please enter your registered email address.');
      return;
    }

    alert(`A password reset link has been sent to ${email}. Check your inbox.`);
    forgotForm.reset();
  });
}

// ---------- Registration Form ----------
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    const terms = document.getElementById('terms').checked;

    if (!name || !email || !phone || !pass || !confirm) {
      alert('Please fill in all fields before continuing.');
      return;
    }

    if (pass !== confirm) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    if (!terms) {
      alert('You must agree to the Terms and Conditions.');
      return;
    }

    alert('Registration successful! Welcome to the Vitsatrail partnership program.');
    registerForm.reset();
    window.location.href = 'login.html';
  });
}
