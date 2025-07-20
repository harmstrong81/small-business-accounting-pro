// Client Portal JavaScript

// Global variables
let currentSection = 'dashboard';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortal();
});

// Initialize Portal
function initializePortal() {
    // Check if we're on login page or dashboard
    if (document.querySelector('.login-container')) {
        initializeLoginPage();
    } else if (document.querySelector('.portal-nav')) {
        initializeDashboard();
    }
}

// Login Page Functions
function initializeLoginPage() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Registration form submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistration);
    }

    // File upload area functionality
    const fileUploadArea = document.querySelector('.file-upload-area');
    if (fileUploadArea) {
        fileUploadArea.addEventListener('click', () => {
            document.getElementById('uploadFiles').click();
        });

        fileUploadArea.addEventListener('dragover', handleDragOver);
        fileUploadArea.addEventListener('drop', handleFileDrop);
    }
}

// Dashboard Functions
function initializeDashboard() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize modals
    initializeModals();
    
    // Initialize file uploads
    initializeFileUploads();
    
    // Initialize forms
    initializeForms();
    
    // Load initial data
    loadDashboardData();
}

// Navigation Functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('onclick').match(/showSection\('([^']+)'\)/)[1];
            showSection(section);
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.portal-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    currentSection = sectionName;
    
    // Load section-specific data
    loadSectionData(sectionName);
}

// Modal Functions
function initializeModals() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Close modals with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

function showRegistration() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeRegistration() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showNewProjectModal() {
    const modal = document.getElementById('newProjectModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeNewProjectModal() {
    const modal = document.getElementById('newProjectModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showNewMessageModal() {
    // Implementation for new message modal
    alert('New message functionality would be implemented here');
}

// Form Handling
function initializeForms() {
    // Project form
    const projectForm = document.querySelector('.project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', handleNewProject);
    }

    // Upload form
    const uploadForm = document.querySelector('.upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', handleFileUpload);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isAdmin = document.getElementById('adminToggle')?.checked || false;
    
    // Simulate login process
    if (email && password) {
        // Show loading state
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Redirect based on login type
            if (isAdmin) {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        }, 1500);
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

function toggleLoginType() {
    const isAdmin = document.getElementById('adminToggle').checked;
    const loginHeader = document.querySelector('.login-header h1');
    const loginDescription = document.querySelector('.login-header p');
    
    if (isAdmin) {
        loginHeader.textContent = 'Admin Portal';
        loginDescription.textContent = 'Access administrative controls and business management tools';
    } else {
        loginHeader.textContent = 'Client Portal';
        loginDescription.textContent = 'Access your financial documents and track project progress';
    }
}

function handleRegistration(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate registration process
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Registration request submitted successfully! We\'ll contact you soon.', 'success');
        closeRegistration();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        e.target.reset();
    }, 2000);
}

function handleNewProject(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate project creation
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Project created successfully!', 'success');
        closeNewProjectModal();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        e.target.reset();
        
        // Refresh projects section
        if (currentSection === 'projects') {
            loadSectionData('projects');
        }
    }, 1500);
}

function handleFileUpload(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const files = document.getElementById('uploadFiles').files;
    
    if (files.length === 0) {
        showNotification('Please select files to upload', 'error');
        return;
    }
    
    // Simulate file upload
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification(`${files.length} file(s) uploaded successfully!`, 'success');
        closeUploadModal();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        e.target.reset();
        
        // Refresh documents section
        if (currentSection === 'documents') {
            loadSectionData('documents');
        }
    }, 2000);
}

// File Upload Functions
function initializeFileUploads() {
    const fileUploadArea = document.querySelector('.file-upload-area');
    if (fileUploadArea) {
        fileUploadArea.addEventListener('click', () => {
            document.getElementById('uploadFiles').click();
        });

        fileUploadArea.addEventListener('dragover', handleDragOver);
        fileUploadArea.addEventListener('drop', handleFileDrop);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#3b82f6';
    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
}

function handleDragLeave(e) {
    e.currentTarget.style.borderColor = '#475569';
    e.currentTarget.style.background = '#334155';
}

function handleFileDrop(e) {
    e.preventDefault();
    e.currentTarget.style.borderColor = '#475569';
    e.currentTarget.style.background = '#334155';
    
    const files = e.dataTransfer.files;
    const fileInput = document.getElementById('uploadFiles');
    
    if (fileInput) {
        fileInput.files = files;
        updateFileUploadDisplay(files);
    }
}

function updateFileUploadDisplay(files) {
    const uploadArea = document.querySelector('.file-upload-area');
    if (uploadArea && files.length > 0) {
        uploadArea.innerHTML = `
            <i class="fas fa-check-circle" style="color: #10b981;"></i>
            <p>${files.length} file(s) selected</p>
            <p style="font-size: 0.9rem; color: #64748b;">Ready to upload</p>
        `;
    }
}

// Password Toggle
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleBtn.className = 'fas fa-eye';
    }
}

// Data Loading Functions
function loadDashboardData() {
    // Simulate loading dashboard data
    console.log('Loading dashboard data...');
    
    // Update stats with animation
    animateStats();
    
    // Load recent projects
    loadRecentProjects();
    
    // Load recent messages
    loadRecentMessages();
}

function loadSectionData(sectionName) {
    switch(sectionName) {
        case 'projects':
            loadProjectsData();
            break;
        case 'documents':
            loadDocumentsData();
            break;
        case 'messages':
            loadMessagesData();
            break;
        case 'billing':
            loadBillingData();
            break;
    }
}

function loadProjectsData() {
    // Simulate loading projects data
    console.log('Loading projects data...');
}

function loadDocumentsData() {
    // Simulate loading documents data
    console.log('Loading documents data...');
}

function loadMessagesData() {
    // Simulate loading messages data
    console.log('Loading messages data...');
}

function loadBillingData() {
    // Simulate loading billing data
    console.log('Loading billing data...');
}

function loadRecentProjects() {
    // Simulate loading recent projects
    console.log('Loading recent projects...');
}

function loadRecentMessages() {
    // Simulate loading recent messages
    console.log('Loading recent messages...');
}

// Animation Functions
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-content h3');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
        if (!isNaN(numericValue)) {
            animateNumber(stat, 0, numericValue, 1000);
        }
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// Add CSS for notifications
const notificationStyles = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Admin-specific functions
function showNewClientModal() {
    const modal = document.getElementById('newClientModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeNewClientModal() {
    const modal = document.getElementById('newClientModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function showNewTeamModal() {
    const modal = document.getElementById('newTeamModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeNewTeamModal() {
    const modal = document.getElementById('newTeamModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Admin form handlers
function handleNewClient(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate client creation
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Client added successfully!', 'success');
        closeNewClientModal();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        e.target.reset();
        
        // Refresh clients section
        if (currentSection === 'clients') {
            loadSectionData('clients');
        }
    }, 1500);
}

function handleNewTeamMember(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate team member creation
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Team member added successfully!', 'success');
        closeNewTeamModal();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        e.target.reset();
        
        // Refresh team section
        if (currentSection === 'team') {
            loadSectionData('team');
        }
    }, 1500);
}

// Initialize admin forms
function initializeAdminForms() {
    const clientForm = document.querySelector('.client-form');
    if (clientForm) {
        clientForm.addEventListener('submit', handleNewClient);
    }

    const teamForm = document.querySelector('.team-form');
    if (teamForm) {
        teamForm.addEventListener('submit', handleNewTeamMember);
    }
}

// Export functions for global access
window.showSection = showSection;
window.showRegistration = showRegistration;
window.closeRegistration = closeRegistration;
window.showUploadModal = showUploadModal;
window.closeUploadModal = closeUploadModal;
window.showNewProjectModal = showNewProjectModal;
window.closeNewProjectModal = closeNewProjectModal;
window.showNewMessageModal = showNewMessageModal;
window.togglePassword = togglePassword;
window.showNewClientModal = showNewClientModal;
window.closeNewClientModal = closeNewClientModal;
window.showNewTeamModal = showNewTeamModal;
window.closeNewTeamModal = closeNewTeamModal; 