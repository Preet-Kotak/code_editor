document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const templatesGrid = document.getElementById('templates-grid');
    const templateModal = document.getElementById('template-modal');
    const closeModal = document.getElementById('close-modal');
    const templateSearch = document.getElementById('template-search');
    const categorySelect = document.getElementById('category-select');
    const searchBtn = document.getElementById('search-btn');
    const templatePreviewFrame = document.getElementById('template-preview-frame');
    const modalTemplateName = document.getElementById('modal-template-name');
    const modalTemplateDescription = document.getElementById('modal-template-description');
    const modalTemplateTags = document.getElementById('modal-template-tags');
    const modalCategory = document.getElementById('modal-category');
    const useTemplateBtn = document.getElementById('use-template-btn');
    const customizeTemplateBtn = document.getElementById('customize-template-btn');
    
    // Template data
    const templates = [
        {
            id: 1,
            name: 'Business Landing Page',
            description: 'A professional landing page template perfect for business websites, featuring hero section, services, testimonials, and contact form.',
            thumbnail: 'assets/templates/business-landing.jpg',
            category: 'landing-page',
            tags: ['Business', 'Professional', 'Landing Page'],
            previewUrl: 'templates/business-landing/index.html',
            html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Business Landing Page</title>\n</head>\n<body>\n  <header>\n    <h1>Business Name</h1>\n    <nav>\n      <ul>\n        <li><a href="#home">Home</a></li>\n        <li><a href="#services">Services</a></li>\n        <li><a href="#about">About</a></li>\n        <li><a href="#contact">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n  <section id="home" class="hero">\n    <h2>Welcome to Our Business</h2>\n    <p>Your trusted partner for professional services</p>\n    <button>Learn More</button>\n  </section>\n  <!-- More sections would go here -->\n</body>\n</html>',
            css: 'body {\n  font-family: "Arial", sans-serif;\n  margin: 0;\n  color: #333;\n}\n\nheader {\n  background-color: #fff;\n  box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n  padding: 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.hero {\n  background-color: #f5f5f5;\n  padding: 100px 20px;\n  text-align: center;\n}\n\n/* More styles would go here */',
            js: '// Basic JavaScript for the landing page\ndocument.addEventListener("DOMContentLoaded", function() {\n  console.log("Business Landing Page Template Loaded");\n  \n  // Smooth scrolling for navigation\n  document.querySelectorAll("nav a").forEach(anchor => {\n    anchor.addEventListener("click", function(e) {\n      e.preventDefault();\n      \n      const targetId = this.getAttribute("href");\n      const targetElement = document.querySelector(targetId);\n      \n      window.scrollTo({\n        top: targetElement.offsetTop,\n        behavior: "smooth"\n      });\n    });\n  });\n});'
        },
        {
            id: 2,
            name: 'Portfolio Showcase',
            description: 'Elegant portfolio template to showcase your work and skills, with project gallery, about section, and contact information.',
            thumbnail: 'assets/templates/portfolio.jpg',
            category: 'portfolio',
            tags: ['Portfolio', 'Creative', 'Showcase'],
            previewUrl: 'templates/portfolio/index.html',
            html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Portfolio Showcase</title>\n</head>\n<body>\n  <header>\n    <h1>Your Name</h1>\n    <nav>\n      <ul>\n        <li><a href="#work">Work</a></li>\n        <li><a href="#about">About</a></li>\n        <li><a href="#contact">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n  <section id="intro" class="intro">\n    <h2>Hello, I\'m a Designer & Developer</h2>\n    <p>I create beautiful digital experiences</p>\n  </section>\n  <section id="work" class="portfolio">\n    <h2>My Work</h2>\n    <div class="project-grid">\n      <!-- Project items would go here -->\n    </div>\n  </section>\n  <!-- More sections would go here -->\n</body>\n</html>',
            css: 'body {\n  font-family: "Helvetica", sans-serif;\n  margin: 0;\n  color: #222;\n  background-color: #fafafa;\n}\n\nheader {\n  padding: 30px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.intro {\n  min-height: 80vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  padding: 0 20px;\n}\n\n.portfolio {\n  padding: 80px 20px;\n}\n\n.project-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 30px;\n  margin-top: 40px;\n}\n\n/* More styles would go here */',
            js: '// Portfolio functionality\ndocument.addEventListener("DOMContentLoaded", function() {\n  console.log("Portfolio Template Loaded");\n  \n  // Project filtering functionality could go here\n  // Lightbox for project images could go here\n});'
        },
        {
            id: 3,
            name: 'Blog Layout',
            description: 'Clean and responsive blog template with featured posts, categories, and sidebar widgets.',
            thumbnail: 'assets/templates/blog.jpg',
            category: 'blog',
            tags: ['Blog', 'Content', 'Articles'],
            previewUrl: 'templates/blog/index.html',
            html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Blog Layout</title>\n</head>\n<body>\n  <header>\n    <h1>Blog Title</h1>\n    <nav>\n      <ul>\n        <li><a href="#home">Home</a></li>\n        <li><a href="#categories">Categories</a></li>\n        <li><a href="#about">About</a></li>\n        <li><a href="#contact">Contact</a></li>\n      </ul>\n    </nav>\n  </header>\n  <main>\n    <section class="featured-post">\n      <article>\n        <h2>Featured Post Title</h2>\n        <p class="meta">Posted on January 1, 2025 by Author</p>\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>\n        <a href="#" class="read-more">Read More</a>\n      </article>\n    </section>\n    <div class="content-wrapper">\n      <section class="posts">\n        <!-- Article items would go here -->\n      </section>\n      <aside class="sidebar">\n        <!-- Sidebar widgets would go here -->\n      </aside>\n    </div>\n  </main>\n  <footer>\n    <p>&copy; 2025 Blog Name. All rights reserved.</p>\n  </footer>\n</body>\n</html>',
            css: 'body {\n  font-family: "Georgia", serif;\n  margin: 0;\n  color: #333;\n  line-height: 1.6;\n}\n\nheader {\n  background-color: #fff;\n  box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n  padding: 20px;\n  text-align: center;\n}\n\nmain {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.featured-post {\n  margin-bottom: 40px;\n  padding: 30px;\n  background-color: #f9f9f9;\n  border-radius: 5px;\n}\n\n.content-wrapper {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 30px;\n}\n\n/* More styles would go here */',
            js: '// Blog functionality\ndocument.addEventListener("DOMContentLoaded", function() {\n  console.log("Blog Template Loaded");\n  \n  // Comment form handling could go here\n  // Post search functionality could go here\n});'
        },
        {
            id: 4,
            name: 'E-Commerce Product Page',
            description: 'Detailed product page template for online stores with product gallery, description, reviews, and add-to-cart functionality.',
            thumbnail: 'assets/templates/ecommerce.jpg',
            category: 'e-commerce',
            tags: ['E-Commerce', 'Shop', 'Product'],
            previewUrl: 'templates/ecommerce/product.html',
            html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Product Name - Your Store</title>\n</head>\n<body>\n  <header>\n    <div class="logo">Your Store</div>\n    <nav>\n      <ul>\n        <li><a href="#home">Home</a></li>\n        <li><a href="#shop">Shop</a></li>\n        <li><a href="#categories">Categories</a></li>\n        <li><a href="#account">Account</a></li>\n      </ul>\n    </nav>\n    <div class="cart-icon">\n      <span class="cart-count">0</span>\n      <i class="cart-icon">🛒</i>\n    </div>\n  </header>\n  <main class="product-container">\n    <div class="product-gallery">\n      <!-- Product images would go here -->\n    </div>\n    <div class="product-info">\n      <h1>Product Name</h1>\n      <p class="price">$99.99</p>\n      <div class="rating">★★★★☆ (4.0)</div>\n      <p class="description">Detailed product description goes here...</p>\n      <div class="product-options">\n        <!-- Size, color, quantity selectors would go here -->\n      </div>\n      <button class="add-to-cart-btn">Add to Cart</button>\n    </div>\n  </main>\n  <!-- More sections like product details, reviews would go here -->\n  <footer>\n    <p>&copy; 2025 Your Store. All rights reserved.</p>\n  </footer>\n</body>\n</html>',
            css: 'body {\n  font-family: "Helvetica", sans-serif;\n  margin: 0;\n  color: #333;\n}\n\nheader {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px 30px;\n  background-color: #fff;\n  box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n}\n\n.product-container {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 40px;\n  max-width: 1200px;\n  margin: 40px auto;\n  padding: 0 20px;\n}\n\n.product-gallery {\n  display: grid;\n  grid-template-columns: 1fr 5fr;\n  gap: 10px;\n}\n\n.add-to-cart-btn {\n  background-color: #4CAF50;\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  font-size: 16px;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n.add-to-cart-btn:hover {\n  background-color: #45a049;\n}\n\n/* More styles would go here */',
            js: '// E-commerce functionality\ndocument.addEventListener("DOMContentLoaded", function() {\n  console.log("E-Commerce Template Loaded");\n  \n  // Add to cart functionality\n  const addToCartBtn = document.querySelector(".add-to-cart-btn");\n  const cartCount = document.querySelector(".cart-count");\n  \n  addToCartBtn.addEventListener("click", function() {\n    // Update cart count\n    let currentCount = parseInt(cartCount.textContent);\n    cartCount.textContent = currentCount + 1;\n    \n    // Animation for feedback\n    addToCartBtn.textContent = "Added to Cart!";\n    setTimeout(() => {\n      addToCartBtn.textContent = "Add to Cart";\n    }, 2000);\n  });\n  \n  // Product image gallery functionality could go here\n  // Product reviews loading could go here\n});'
        },
        {
            id: 5,
            name: 'Admin Dashboard',
            description: 'Comprehensive admin dashboard template with statistics widgets, data tables, and charts for data visualization.',
            thumbnail: 'assets/templates/dashboard.jpg',
            category: 'dashboard',
            tags: ['Admin', 'Dashboard', 'Analytics'],
            previewUrl: 'templates/dashboard/index.html',
            html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Admin Dashboard</title>\n</head>\n<body>\n  <div class="dashboard-container">\n    <aside class="sidebar">\n      <div class="logo">Admin Panel</div>\n      <nav class="sidebar-nav">\n        <ul>\n          <li><a href="#dashboard" class="active">Dashboard</a></li>\n          <li><a href="#users">Users</a></li>\n          <li><a href="#analytics">Analytics</a></li>\n          <li><a href="#settings">Settings</a></li>\n          <li><a href="#logout">Logout</a></li>\n        </ul>\n      </nav>\n    </aside>\n    <main class="main-content">\n      <header class="dashboard-header">\n        <h1>Dashboard Overview</h1>\n        <div class="user-profile">\n          <img src="avatar.jpg" alt="User Avatar">\n          <span>Admin User</span>\n        </div>\n      </header>\n      <div class="stats-grid">\n        <!-- Stat widgets would go here -->\n      </div>\n      <div class="data-tables">\n        <!-- Tables and charts would go here -->\n      </div>\n    </main>\n  </div>\n</body>\n</html>',
            css: 'body {\n  font-family: "Roboto", sans-serif;\n  margin: 0;\n  background-color: #f5f7fa;\n  color: #333;\n}\n\n.dashboard-container {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  min-height: 100vh;\n}\n\n.sidebar {\n  background-color: #2c3e50;\n  color: white;\n  padding: 20px 0;\n}\n\n.logo {\n  padding: 0 20px 20px;\n  font-size: 1.5rem;\n  font-weight: bold;\n  border-bottom: 1px solid rgba(255,255,255,0.1);\n  margin-bottom: 20px;\n}\n\n.sidebar-nav ul {\n  list-style-type: none;\n  padding: 0;\n}\n\n.sidebar-nav a {\n  display: block;\n  padding: 12px 20px;\n  color: #ecf0f1;\n  text-decoration: none;\n  transition: background-color 0.3s;\n}\n\n.sidebar-nav a:hover, .sidebar-nav a.active {\n  background-color: rgba(255,255,255,0.1);\n}\n\n.main-content {\n  padding: 20px;\n}\n\n.dashboard-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n}\n\n.stats-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n}\n\n/* More styles would go here */',
            js: '// Dashboard functionality\ndocument.addEventListener("DOMContentLoaded", function() {\n  console.log("Dashboard Template Loaded");\n  \n  // Example chart creation with mock data\n  function createDemoChart() {\n    // This is just a placeholder - in a real app, you\'d use a library like Chart.js\n    console.log("Creating demo chart");\n    const chartElement = document.createElement("div");\n    chartElement.className = "chart";\n    chartElement.textContent = "Chart Placeholder";\n    document.querySelector(".data-tables").appendChild(chartElement);\n  }\n  \n  // Call demo functions\n  createDemoChart();\n  \n  // Sidebar toggle functionality could go here\n  // Data filtering functionality could go here\n});'
        }
    ];

    // Render templates
    function renderTemplates(templatesArray) {
        templatesGrid.innerHTML = '';
        
        if (templatesArray.length === 0) {
            templatesGrid.innerHTML = '<div class="no-templates">No templates found matching your criteria.</div>';
            return;
        }
        
        templatesArray.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card';
            card.dataset.id = template.id;
            
            card.innerHTML = `
                <div class="template-thumbnail" style="background-color:rgb(255,0,0,0.5)">
                </div>
                <div class="template-info">
                    <h3>${template.name}</h3>
                    <p>${template.description.substring(0, 70)}${template.description.length > 70 ? '...' : ''}</p>
                    <div class="template-tags">
                        ${template.tags.map(tag => `<span class="template-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => openTemplateModal(template));
            templatesGrid.appendChild(card);
        });
    }

    // Open template modal
    function openTemplateModal(template) {
        modalTemplateName.textContent = template.name;
        modalTemplateDescription.textContent = template.description;
        modalCategory.textContent = template.category.charAt(0).toUpperCase() + template.category.slice(1);
        
        // Set tags
        modalTemplateTags.innerHTML = '';
        template.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'template-tag';
            tagElement.textContent = tag;
            modalTemplateTags.appendChild(tagElement);
        });
        
        // Set up preview iframe
        templatePreviewFrame.srcdoc = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    ${template.css}
                </style>
            </head>
            <body>
                ${template.html}
                <script>
                    ${template.js}
                </script>
            </body>
            </html>
        `;
        
        // Set up action buttons
        useTemplateBtn.onclick = () => useTemplate(template);
        customizeTemplateBtn.onclick = () => customizeTemplate(template);
        
        templateModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeTemplateModal() {
        templateModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Use template function
    function useTemplate(template) {
        sessionStorage.setItem('templateHTML', template.html);
        sessionStorage.setItem('templateCSS', template.css);
        sessionStorage.setItem('templateJS', template.js);
        sessionStorage.setItem('templateName', template.name);
        sessionStorage.setItem('templateApplied', 'true');
        
        localStorage.setItem('currentTemplate', JSON.stringify({
            html: template.html,
            css: template.css,
            js: template.js,
            name: template.name
        }));
        
        sessionStorage.setItem('comingFromTemplates', 'true');
        window.location.href = 'index.html?template=' + template.id;
    }

    // Customize template function
    function customizeTemplate(template) {
        sessionStorage.setItem('templateHTML', template.html);
        sessionStorage.setItem('templateCSS', template.css);
        sessionStorage.setItem('templateJS', template.js);
        sessionStorage.setItem('templateName', template.name);
        sessionStorage.setItem('templateApplied', 'true');
        sessionStorage.setItem('customizeMode', 'true');
        
        localStorage.setItem('currentTemplate', JSON.stringify({
            html: template.html,
            css: template.css,
            js: template.js,
            name: template.name,
            customize: true
        }));
        
        sessionStorage.setItem('comingFromTemplates', 'true');
        window.location.href = 'index.html?template=' + template.id + '&customize=true';
    }

    // Filter templates
    function filterTemplates() {
        const searchQuery = templateSearch.value.toLowerCase();
        const categoryFilter = categorySelect.value;
        
        const filteredTemplates = templates.filter(template => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery) || 
                                 template.description.toLowerCase().includes(searchQuery) ||
                                 template.tags.some(tag => tag.toLowerCase().includes(searchQuery));
            
            const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });
        
        renderTemplates(filteredTemplates);
    }
    
    // Event listeners
    closeModal.addEventListener('click', closeTemplateModal);
    window.addEventListener('click', (event) => {
        if (event.target === templateModal) closeTemplateModal();
    });
    templateSearch.addEventListener('input', filterTemplates);
    categorySelect.addEventListener('change', filterTemplates);
    searchBtn.addEventListener('click', filterTemplates);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && templateModal.style.display === 'block') {
            closeTemplateModal();
        }
    });
    
    // Initial render
    renderTemplates(templates);
});