/* =========================================================
   PORTFOLIO  |  main.js  —  3D Animated Edition
   ========================================================= */

/* ── 0. SCROLL PROGRESS BAR ── */
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (window.scrollY / h * 100) + '%';
}, { passive: true });

/* ── 1. THREE.JS 3D BACKGROUND ── */
(function init3D() {
  const container = document.getElementById('three-bg');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Gentle lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);
  const directional = new THREE.DirectionalLight(0x4f46e5, 0.3);
  directional.position.set(5, 10, 7);
  scene.add(directional);

  // Floating geometries
  const geometries = [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(0.8, 0),
    new THREE.TetrahedronGeometry(0.7, 0),
    new THREE.TorusGeometry(0.6, 0.2, 8, 16),
    new THREE.DodecahedronGeometry(0.7, 0),
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
  ];

  const meshes = [];
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x4f46e5,
    transparent: true,
    opacity: 0.07,
    roughness: 0.3,
    metalness: 0.1,
    wireframe: true,
  });

  const material2 = new THREE.MeshPhysicalMaterial({
    color: 0x7c3aed,
    transparent: true,
    opacity: 0.05,
    roughness: 0.5,
    metalness: 0.2,
    wireframe: true,
  });

  for (let i = 0; i < 25; i++) {
    const geo = geometries[Math.floor(Math.random() * geometries.length)];
    const mat = Math.random() > 0.5 ? material : material2;
    const mesh = new THREE.Mesh(geo, mat);

    const scale = 0.4 + Math.random() * 2;
    mesh.scale.set(scale, scale, scale);
    mesh.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 30
    );
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    mesh.userData = {
      speedX: (Math.random() - 0.5) * 0.005,
      speedY: (Math.random() - 0.5) * 0.005,
      speedZ: (Math.random() - 0.5) * 0.005,
      floatSpeed: 0.3 + Math.random() * 0.7,
      floatOffset: Math.random() * Math.PI * 2,
      origY: mesh.position.y,
    };

    scene.add(mesh);
    meshes.push(mesh);
  }

  // Particle system
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 120;
  const pPositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    pPositions[i] = (Math.random() - 0.5) * 60;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x4f46e5,
    size: 0.06,
    transparent: true,
    opacity: 0.3,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  let mouseNormX = 0, mouseNormY = 0;

  document.addEventListener('mousemove', e => {
    mouseNormX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseNormY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let clock = 0;
  function animate3D() {
    requestAnimationFrame(animate3D);
    clock += 0.008;

    // Camera follows mouse gently
    camera.position.x += (mouseNormX * 3 - camera.position.x) * 0.02;
    camera.position.y += (-mouseNormY * 2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    // Rotate & float meshes
    meshes.forEach(m => {
      m.rotation.x += m.userData.speedX;
      m.rotation.y += m.userData.speedY;
      m.rotation.z += m.userData.speedZ;
      m.position.y = m.userData.origY + Math.sin(clock * m.userData.floatSpeed + m.userData.floatOffset) * 1.5;
    });

    // Slow rotate particles
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;

    renderer.render(scene, camera);
  }
  animate3D();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();


/* ── 2. SOFT GRADIENT MESH (canvas) ── */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const blobs = [
  { x: 0.25, y: 0.30, r: 340, color: [200, 220, 255], vx: 0.12, vy: 0.08 },
  { x: 0.70, y: 0.55, r: 300, color: [230, 210, 255], vx: -0.10, vy: 0.14 },
  { x: 0.50, y: 0.80, r: 280, color: [255, 215, 230], vx: 0.08, vy: -0.11 },
  { x: 0.85, y: 0.20, r: 260, color: [200, 245, 230], vx: -0.07, vy: 0.09 },
  { x: 0.15, y: 0.70, r: 250, color: [255, 235, 200], vx: 0.11, vy: -0.06 },
];

let mouseX = W / 2, mouseY = H / 2;
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

let time = 0;

function drawBlobs() {
  ctx.clearRect(0, 0, W, H);
  time += 0.003;

  for (const b of blobs) {
    const cx = b.x * W + Math.sin(time * b.vx * 10 + b.r) * 120;
    const cy = b.y * H + Math.cos(time * b.vy * 10 + b.r) * 100;

    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const pull = Math.max(0, 1 - dist / 600) * 30;
    const fx = cx + (dx / (dist || 1)) * pull;
    const fy = cy + (dy / (dist || 1)) * pull;

    const pr = b.r + Math.sin(time * 2 + b.r) * 40;

    const grad = ctx.createRadialGradient(fx, fy, 0, fx, fy, pr);
    grad.addColorStop(0, `rgba(${b.color[0]},${b.color[1]},${b.color[2]}, 0.35)`);
    grad.addColorStop(0.5, `rgba(${b.color[0]},${b.color[1]},${b.color[2]}, 0.1)`);
    grad.addColorStop(1, `rgba(${b.color[0]},${b.color[1]},${b.color[2]}, 0)`);

    ctx.beginPath();
    ctx.arc(fx, fy, pr, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  requestAnimationFrame(drawBlobs);
}
drawBlobs();

/* ── 3. CUSTOM CURSOR ── */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let cx = 0, cy = 0, rx = 0, ry = 0;

if (cursorDot && cursorRing) {
  document.addEventListener('mousemove', e => {
    cx = e.clientX;
    cy = e.clientY;
    cursorDot.style.left = cx + 'px';
    cursorDot.style.top = cy + 'px';
  });

  function animateRing() {
    rx += (cx - rx) * 0.12;
    ry += (cy - ry) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover expand on interactive elements
  document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .cert-item, .ach-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });
}


/* ── 4. FLOATING SHAPES ── */
const shapeContainer = document.createElement('div');
shapeContainer.id = 'floating-shapes';
shapeContainer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden;';
document.body.appendChild(shapeContainer);

const shapes = ['circle', 'ring', 'square'];
for (let i = 0; i < 18; i++) {
  const el = document.createElement('div');
  const type = shapes[i % 3];
  const size = 6 + Math.random() * 14;
  const hue = [210, 260, 330, 160, 30][Math.floor(Math.random() * 5)];
  const duration = 14 + Math.random() * 22;
  const delay = Math.random() * 15;

  el.style.cssText =
    `position:absolute;` +
    `width:${size}px;height:${size}px;` +
    `left:${Math.random() * 100}vw;` +
    `bottom:-20px;` +
    `opacity:0;` +
    `animation:shapeFloat ${duration}s ${delay}s linear infinite;` +
    `--drift:${(Math.random() - 0.5) * 200}px;` +
    `--spin:${Math.random() > 0.5 ? 360 : -360}deg;`;

  if (type === 'circle') {
    el.style.borderRadius = '50%';
    el.style.background = `hsla(${hue}, 60%, 75%, 0.35)`;
  } else if (type === 'ring') {
    el.style.borderRadius = '50%';
    el.style.border = `1.5px solid hsla(${hue}, 50%, 65%, 0.3)`;
  } else {
    el.style.borderRadius = '3px';
    el.style.border = `1.5px solid hsla(${hue}, 50%, 65%, 0.25)`;
    el.style.transform = 'rotate(45deg)';
  }

  shapeContainer.appendChild(el);
}


/* ── 5. HERO NAME — TEXT SCRAMBLE ENTRANCE ── */
window.addEventListener('load', () => {
  const hn = document.getElementById('heroName');
  if (!hn) return;

  const finalText = hn.dataset.text || hn.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  let iteration = 0;
  const speed = 40;

  setTimeout(() => {
    hn.classList.add('visible');
    hn.classList.add('scrambling');

    const interval = setInterval(() => {
      hn.textContent = finalText
        .split('')
        .map((char, idx) => {
          if (idx < iteration) return finalText[idx];
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      iteration += 1 / 2;

      if (iteration >= finalText.length) {
        clearInterval(interval);
        hn.textContent = finalText;
        // Restore gradient after scramble
        setTimeout(() => hn.classList.remove('scrambling'), 100);
      }
    }, speed);
  }, 300);
});


/* ── 6. SCROLL REVEAL with stagger ── */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));


/* ── 7. SKILL BAR ANIMATION ── */
const skillIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const fill = e.target.querySelector('.skill-fill');
    const level = parseFloat(e.target.dataset.level) || 0;
    if (fill) {
      setTimeout(() => {
        fill.style.transform = `scaleX(${level})`;
      }, parseInt(e.target.style.getPropertyValue('--i') || 0) * 80);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(c => skillIO.observe(c));


/* ── 8. 3D TILT EFFECT ── */
function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Update glow position
      el.style.setProperty('--mouse-x', (x / rect.width * 100) + '%');
      el.style.setProperty('--mouse-y', (y / rect.height * 100) + '%');
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      el.style.transition = 'transform 0.5s cubic-bezier(.03,.98,.52,.99)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.15s ease-out';
    });
  });

  // Mini tilt for list items
  document.querySelectorAll('[data-tilt-mini]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
      el.style.transition = 'transform 0.4s cubic-bezier(.03,.98,.52,.99)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.12s ease-out';
    });
  });
}
initTilt();


/* ── 9. COUNTER ANIMATION for Stats ── */
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const num = e.target.querySelector('.stat-num');
    if (!num || num.dataset.animated) return;
    num.dataset.animated = 'true';

    const finalVal = num.dataset.count || num.textContent;
    const isNum = /^\d+(\.\d+)?$/.test(finalVal);

    if (isNum) {
      const target = parseFloat(finalVal);
      const decimals = finalVal.includes('.') ? finalVal.split('.')[1].length : 0;
      const duration = 1500;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = (eased * target).toFixed(decimals);
        num.textContent = current;
        if (progress < 1) requestAnimationFrame(step);
        else num.textContent = finalVal;
      }
      requestAnimationFrame(step);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(s => counterIO.observe(s));


/* ── 10. PARALLAX SCROLL SECTIONS ── */
const parallaxSections = document.querySelectorAll('.section-title');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  parallaxSections.forEach(el => {
    const rect = el.getBoundingClientRect();
    const speed = 0.05;
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.style.transform = `translateY(${rect.top * speed}px)`;
    }
  });
}, { passive: true });


/* ── 11. MOUSE GLOW on cards ── */
document.querySelectorAll('.skill-card, .cert-item, .ach-item').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
    el.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
  });
});


/* ── 12. MOBILE MENU ── */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}
function closeMobile() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}


/* ── 13. CONTACT FORM ── */
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('cf-name').value,
      email: document.getElementById('cf-email').value,
      message: document.getElementById('cf-msg').value,
    };

    formStatus.textContent = 'Sending…';
    formStatus.className = 'form-status';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        formStatus.textContent = '✓ ' + data.message;
        formStatus.className = 'form-status ok';
        form.reset();
      } else {
        formStatus.textContent = '✗ ' + (data.error || 'Something went wrong.');
        formStatus.className = 'form-status err';
      }
    } catch {
      formStatus.textContent = '✗ Network error. Please try again.';
      formStatus.className = 'form-status err';
    }
  });
}


/* ── 14. ACTIVE NAV LINK on SCROLL + NAV SHADOW ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navEl = document.querySelector('nav');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    const isActive = a.getAttribute('href') === '#' + current;
    a.style.color = isActive ? 'var(--accent)' : 'var(--g400)';
  });

  // Nav shadow on scroll
  if (navEl) {
    navEl.classList.toggle('scrolled', window.scrollY > 50);
  }
}, { passive: true });


/* ── 15. SMOOTH SECTION ENTRY VIA INTERSECTION ── */
// Stagger children of grids
const staggerIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const children = e.target.children;
    Array.from(children).forEach((child, i) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(20px)';
      child.style.transition = `opacity 0.6s ${i * 0.08}s cubic-bezier(.16,1,.3,1), transform 0.6s ${i * 0.08}s cubic-bezier(.16,1,.3,1)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        });
      });
    });
    staggerIO.unobserve(e.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.cert-grid, .ach-list, .projects-grid').forEach(g => staggerIO.observe(g));
