document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements for editor
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');
    const previewFrame = document.getElementById('preview-frame');
    const runBtn = document.getElementById('run-btn');
    const liveToggle = document.getElementById('live-toggle');
    const toggleLabel = document.getElementById('toggle-label');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const editorTabs = document.querySelectorAll('.editor-tab');

    // DOM Elements for hamburger menu
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav ul li a');

    // Initialize with some starter code
    htmlCode.value = `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Start coding here...</p>
</body>
</html>`;
    cssCode.value = `body {
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #f0f0f0;
}

h1 {
  color: #333;
}`;
    jsCode.value = `// Your JavaScript code here
console.log("Hello from JavaScript!");`;

    // Hamburger menu toggle
    hamburgerIcon.addEventListener('click', function () {
        hamburgerIcon.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburgerIcon.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!nav.contains(event.target) && !hamburgerIcon.contains(event.target) && nav.classList.contains('active')) {
            hamburgerIcon.classList.remove('active');
            nav.classList.remove('active');
        }
    });

    // Tab Switching Functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            editorTabs.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked button and corresponding tab
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Update Preview
    function updatePreview() {
        const html = htmlCode.value;
        const css = cssCode.value;
        const js = jsCode.value;

        const previewContent = `
            ${html.replace('</head>', `<style>${css}</style></head>`)}
            <script>${js}</script>
        `;

        const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
        previewDocument.open();
        previewDocument.write(previewContent);
        previewDocument.close();
    }

    // Run Button Event
    runBtn.addEventListener('click', updatePreview);

    // Live Toggle Functionality
    liveToggle.addEventListener('change', function () {
        if (this.checked) {
            // Enable live preview
            toggleLabel.textContent = 'Live Preview';
            runBtn.disabled = true;
            runBtn.style.opacity = '0.5';

            // Set up event listeners for live updates
            ['input', 'keyup', 'change'].forEach(event => {
                htmlCode.addEventListener(event, updatePreview);
                cssCode.addEventListener(event, updatePreview);
                jsCode.addEventListener(event, updatePreview);
            });

            // Update preview immediately
            updatePreview();
        } else {
            // Disable live preview
            toggleLabel.textContent = 'Manual Run';
            runBtn.disabled = false;
            runBtn.style.opacity = '1';

            // Remove event listeners
            ['input', 'keyup', 'change'].forEach(event => {
                htmlCode.removeEventListener(event, updatePreview);
                cssCode.removeEventListener(event, updatePreview);
                jsCode.removeEventListener(event, updatePreview);
            });
        }
    });

    // Initialize with live preview enabled
    liveToggle.checked = true;
    liveToggle.dispatchEvent(new Event('change'));

    // Initialize preview on load
    updatePreview();

    // Apply settings if available
    applyUserSettings();

    // Check if template data is available from templates page
    function loadTemplateIfAvailable() {
        const templateApplied = sessionStorage.getItem('templateApplied');

        if (templateApplied === 'true') {
            // Load template code from sessionStorage
            const templateHTML = sessionStorage.getItem('templateHTML');
            const templateCSS = sessionStorage.getItem('templateCSS');
            const templateJS = sessionStorage.getItem('templateJS');
            const templateName = sessionStorage.getItem('templateName');

            if (templateHTML) htmlCode.value = templateHTML;
            if (templateCSS) cssCode.value = templateCSS;
            if (templateJS) jsCode.value = templateJS;

            // Show notification to the user
            showNotification(`Template "${templateName}" loaded successfully!`);

            // Clear the flag so it doesn't load again on refresh
            sessionStorage.removeItem('templateApplied');

            // Update preview immediately
            updatePreview();

            return true;
        }

        // Check URL parameters for template loading
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('template')) {
            // Try to load from localStorage if we have a template ID but no sessionStorage data
            const savedTemplate = localStorage.getItem('currentTemplate');
            if (savedTemplate) {
                const templateData = JSON.parse(savedTemplate);

                htmlCode.value = templateData.html || '';
                cssCode.value = templateData.css || '';
                jsCode.value = templateData.js || '';

                // Show notification to the user
                showNotification(`Template "${templateData.name}" loaded successfully!`);

                // Update preview immediately
                updatePreview();

                return true;
            }
        }

        return false;
    }

    // Show notification function
    function showNotification(message, type = 'success') {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = `notification ${type}`;
            document.body.appendChild(notification);
        }

        // Set message and show notification
        notification.textContent = message;
        notification.classList.add('show');

        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Save user settings to localStorage
    function saveUserSettings() {
        const settings = {
            livePreview: liveToggle.checked,
            lastActiveTab: document.querySelector('.tab-btn.active')?.dataset.target || 'html-tab'
        };
        localStorage.setItem('codeEditorSettings', JSON.stringify(settings));
    }

    // Apply user settings from localStorage
    function applyUserSettings() {
        const savedSettings = localStorage.getItem('codeEditorSettings');

        // Also check for codecraftSettings from settings.js
        const codecraftSettings = localStorage.getItem('codecraftSettings');

        if (savedSettings) {
            const settings = JSON.parse(savedSettings);

            // Apply live preview setting
            if (liveToggle && settings.livePreview !== undefined) {
                liveToggle.checked = settings.livePreview;
                updateToggleLabel();
            }

            // Set active tab
            if (settings.lastActiveTab) {
                const tabToActivate = document.querySelector(`.tab-btn[data-target="${settings.lastActiveTab}"]`);
                if (tabToActivate) {
                    tabBtns.forEach(btn => btn.classList.remove('active'));
                    tabToActivate.classList.add('active');

                    editorTabs.forEach(tab => tab.classList.remove('active'));
                    document.getElementById(settings.lastActiveTab).classList.add('active');
                }
            }
        }

        // Apply codecraft settings if available
        if (codecraftSettings) {
            const settings = JSON.parse(codecraftSettings);
            applyCodecraftSettings(settings);
        }
    }

    // Function to apply settings from settings.js
    function applyCodecraftSettings(settings) {
        if (!settings) return;

        // Apply theme
        if (settings.theme) {
            document.body.classList.remove('theme-light', 'theme-dark','theme-contrast');
            document.body.classList.add(`theme-${settings.theme}`);
        }


        // Apply font settings to code editors
        if (htmlCode && cssCode && jsCode) {
            const codeAreas = [htmlCode, cssCode, jsCode];

            codeAreas.forEach(area => {
                if (settings.fontFamily) {
                    area.style=`font-family:${settings.fontFamily}`;
                }
                if (settings.fontSize) {
                    area.style.fontSize = `${settings.fontSize}px`;
                }
                // Apply word wrap setting if available
                if (settings.wordWrap !== undefined) {
                    area.style.whiteSpace = settings.wordWrap ? 'pre-wrap' : 'pre';
                }
            });
        }

        // Apply live preview settings
        if (liveToggle && settings.defaultPreview) {
            liveToggle.checked = settings.defaultPreview === 'live';
            updateToggleLabel();
        }
    }

    // Helper function to get actual font family CSS value
    function getFontFamilyValue(fontFamilySetting) {
        switch (fontFamilySetting) {
            case 'monospace':
                return 'Consolas, Monaco, "Andale Mono", monospace';
            case 'dyslexic':
                return '"Open Dyslexic", sans-serif';
            case 'sans-serif':
                return 'Arial, Helvetica, sans-serif';
            default:
                return 'Consolas, Monaco, "Andale Mono", monospace';
        }
    }

    // Update toggle label based on state
    function updateToggleLabel() {
        if (toggleLabel && liveToggle) {
            toggleLabel.textContent = liveToggle.checked ? 'Live Preview' : ' Manual Preview (run)';
        }
    }

    // Save current code to localStorage
    function saveCurrentCode() {
        const currentCode = {
            html: htmlCode.value,
            css: cssCode.value,
            js: jsCode.value,
            lastEdited: new Date().toISOString()
        };

        localStorage.setItem('savedCode', JSON.stringify(currentCode));
        showNotification('Code saved to browser storage');
    }

    // Load saved code from localStorage
    function loadSavedCode() {
        const savedCode = localStorage.getItem('savedCode');
        if (savedCode) {
            const parsedCode = JSON.parse(savedCode);
            htmlCode.value = parsedCode.html || '';
            cssCode.value = parsedCode.css || '';
            jsCode.value = parsedCode.js || '';
            updatePreview();
            showNotification('Loaded previously saved code');
        }
    }

    // Initialize editor
    function init() {
        // Check for template data
        const templateLoaded = loadTemplateIfAvailable();

        // If no template was loaded, set default code
        if (!templateLoaded) {
            // Initialize with starter code
            htmlCode.value = '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>Start coding here...</p>\n</body>\n</html>';
            cssCode.value = 'body {\n  font-family: Arial, sans-serif;\n  margin: 20px;\n  background-color: #f0f0f0;\n}\n\nh1 {\n  color: #333;\n}';
            jsCode.value = '// Your JavaScript code here\nconsole.log("Hello from JavaScript!");';

            // Run the preview with default content
            updatePreview();
        }

        // Set up event listeners
        if (runBtn) {
            runBtn.addEventListener('click', updatePreview);
        }

        // Live preview toggle
        if (liveToggle) {
            liveToggle.addEventListener('change', function () {
                updateToggleLabel();
                saveUserSettings();

                if (this.checked) {
                    updatePreview();
                    showNotification('Live preview enabled');
                } else {
                    showNotification('Live preview disabled');
                }
            });
        }

        // Tab switching
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Remove active class from all buttons and tabs
                tabBtns.forEach(b => b.classList.remove('active'));
                editorTabs.forEach(tab => tab.classList.remove('active'));

                // Add active class to clicked button and corresponding tab
                this.classList.add('active');
                const targetId = this.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');

                // Save user settings
                saveUserSettings();
            });
        });

        // Setup input events for live preview
        [htmlCode, cssCode, jsCode].forEach(editor => {
            if (editor) {
                editor.addEventListener('input', function () {
                    if (liveToggle && liveToggle.checked) {
                        updatePreview();
                    }
                });
            }
        });

        // Hamburger menu functionality
        if (hamburgerIcon && nav) {
            hamburgerIcon.addEventListener('click', function () {
                hamburgerIcon.classList.toggle('active');
                nav.classList.toggle('active');
            });

            // Close menu when clicking a link
            navLinks.forEach(link => {
                link.addEventListener('click', function () {
                    hamburgerIcon.classList.remove('active');
                    nav.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function (event) {
                if (nav && hamburgerIcon && !nav.contains(event.target) && !hamburgerIcon.contains(event.target) && nav.classList.contains('active')) {
                    hamburgerIcon.classList.remove('active');
                    nav.classList.remove('active');
                }
            });
        }

        

        // Add keyboard shortcuts
        document.addEventListener('keydown', function (e) {
            

            // Ctrl+R or Cmd+R to run
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                updatePreview();
            }
        });

        // Initialize toggle label
        updateToggleLabel();
    }

    // Start the application
    init();
});