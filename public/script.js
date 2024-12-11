// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Three.js Scene Setup
let scene, camera, renderer;
let heroScene, heroCube;

function init() {
    // Hero Scene
    heroScene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    document.getElementById('hero-3d').appendChild(renderer.domElement);

    // Create animated cube for hero section
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6c63ff,
        specular: 0x555555,
        shininess: 30
    });
    heroCube = new THREE.Mesh(geometry, material);
    heroScene.add(heroCube);

    // Add lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    heroScene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    heroScene.add(ambientLight);

    camera.position.z = 5;

    // Dashboard Scene
    initDashboard();

    // Start animation
    animate();
}

// Dashboard visualization
function initDashboard() {
    const dashboardScene = new THREE.Scene();
    const dashboardCamera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / 400, 0.1, 1000);
    
    const dashboardRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    dashboardRenderer.setSize(window.innerWidth * 0.6, 400);
    document.getElementById('dashboard-3d').appendChild(dashboardRenderer.domElement);

    // Create dashboard visualization
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x4CAF50,
        specular: 0x555555,
        shininess: 30
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    dashboardScene.add(sphere);

    // Add lights to dashboard
    const dashboardLight = new THREE.DirectionalLight(0xffffff, 1);
    dashboardLight.position.set(5, 5, 5);
    dashboardScene.add(dashboardLight);

    const dashboardAmbientLight = new THREE.AmbientLight(0x404040);
    dashboardScene.add(dashboardAmbientLight);

    dashboardCamera.position.z = 5;

    // Animate dashboard
    function animateDashboard() {
        requestAnimationFrame(animateDashboard);
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        dashboardRenderer.render(dashboardScene, dashboardCamera);
    }
    animateDashboard();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    heroCube.rotation.x += 0.01;
    heroCube.rotation.y += 0.01;

    renderer.render(heroScene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / 2 / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Scroll animations
function initScrollAnimations() {
    // Animate feature cards
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });

    // Animate dashboard section
    gsap.from('.dashboard-preview', {
        scrollTrigger: {
            trigger: '.dashboard',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
}

// Initialize everything when the page loads
window.addEventListener('load', () => {
    init();
    initScrollAnimations();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Login button animation
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('mouseenter', () => {
    gsap.to(loginBtn, {
        scale: 1.1,
        duration: 0.3
    });
});

loginBtn.addEventListener('mouseleave', () => {
    gsap.to(loginBtn, {
        scale: 1,
        duration: 0.3
    });
}); 