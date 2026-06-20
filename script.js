// CV Builder Pro - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    initTabs();
    initPhotoUpload();
    initTagInputs();
    initDynamicEntries();
    initPreview();
    initModal();
    initDownload();
    generatePreview();
}

// ==================== TABS ====================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ==================== PHOTO UPLOAD ====================
function initPhotoUpload() {
    const photoPreview = document.getElementById('photoPreview');
    const photoInput = document.getElementById('photoInput');

    if (photoPreview && photoInput) {
        photoPreview.addEventListener('click', () => photoInput.click());
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    photoPreview.innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
                    generatePreview();
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// ==================== TAG INPUTS ====================
function initTagInputs() {
    const containers = ['technicalSkills', 'softSkills', 'languages'];
    
    containers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            const input = container.querySelector('input');
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && this.value.trim()) {
                    e.preventDefault();
                    addTag(container, this.value.trim());
                    this.value = '';
                    generatePreview();
                }
            });
            container.addEventListener('click', function(e) {
                if (e.target.classList.contains('remove-tag')) {
                    e.target.parentElement.remove();
                    generatePreview();
                }
            });
        }
    });
}

function addTag(container, text) {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `${text} <span class="remove-tag">&times;</span>`;
    container.insertBefore(tag, container.querySelector('input'));
}

function getTags(containerId) {
    const container = document.getElementById(containerId);
    const tags = container.querySelectorAll('.tag');
    return Array.from(tags).map(tag => tag.textContent.replace('×', '').trim());
}

// ==================== DYNAMIC ENTRIES ====================
function initDynamicEntries() {
    document.getElementById('addEducation')?.addEventListener('click', addEducationEntry);
    document.getElementById('addExperience')?.addEventListener('click', addExperienceEntry);
    document.getElementById('addProject')?.addEventListener('click', addProjectEntry);
    
    // Add initial entries
    if (document.getElementById('educationList').children.length === 0) addEducationEntry();
    if (document.getElementById('experienceList').children.length === 0) addExperienceEntry();
    if (document.getElementById('projectsList').children.length === 0) addProjectEntry();
}

function addEducationEntry() {
    const container = document.getElementById('educationList');
    const entry = document.createElement('div');
    entry.className = 'entry-card';
    entry.innerHTML = `
        <div class="entry-header">
            <h4>Education ${container.children.length + 1}</h4>
            <div class="entry-actions">
                <button type="button" class="btn btn-icon" onclick="removeEntry(this)"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        <div class="form-grid">
            <div class="form-group"><label>Degree</label><input type="text" class="edu-degree" placeholder="Bachelor of Science" oninput="generatePreview()"></div>
            <div class="form-group"><label>Field of Study</label><input type="text" class="edu-field" placeholder="Computer Science" oninput="generatePreview()"></div>
            <div class="form-group"><label>Institution</label><input type="text" class="edu-institution" placeholder="University Name" oninput="generatePreview()"></div>
            <div class="form-group"><label>Location</label><input type="text" class="edu-location" placeholder="City, Country" oninput="generatePreview()"></div>
            <div class="form-group"><label>Start Date</label><input type="month" class="edu-start" oninput="generatePreview()"></div>
            <div class="form-group"><label>End Date</label><input type="month" class="edu-end" oninput="generatePreview()"></div>
            <div class="form-group full-width"><label>Description</label><textarea class="edu-description" rows="2" placeholder="Achievements, coursework..." oninput="generatePreview()"></textarea></div>
        </div>
    `;
    container.appendChild(entry);
}

function addExperienceEntry() {
    const container = document.getElementById('experienceList');
    const entry = document.createElement('div');
    entry.className = 'entry-card';
    entry.innerHTML = `
        <div class="entry-header">
            <h4>Experience ${container.children.length + 1}</h4>
            <div class="entry-actions">
                <button type="button" class="btn btn-icon" onclick="removeEntry(this)"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        <div class="form-grid">
            <div class="form-group"><label>Job Title</label><input type="text" class="exp-title" placeholder="Software Engineer" oninput="generatePreview()"></div>
            <div class="form-group"><label>Company</label><input type="text" class="exp-company" placeholder="Company Name" oninput="generatePreview()"></div>
            <div class="form-group"><label>Location</label><input type="text" class="exp-location" placeholder="City, Country" oninput="generatePreview()"></div>
            <div class="form-group"><label>Start Date</label><input type="month" class="exp-start" oninput="generatePreview()"></div>
            <div class="form-group"><label>End Date</label><input type="month" class="exp-end" oninput="generatePreview()"></div>
            <div class="form-group"><label><input type="checkbox" class="exp-current" onchange="toggleEndDate(this); generatePreview()"> Currently working</label></div>
            <div class="form-group full-width"><label>Description</label><textarea class="exp-description" rows="3" placeholder="Responsibilities and achievements..." oninput="generatePreview()"></textarea></div>
        </div>
    `;
    container.appendChild(entry);
}

function addProjectEntry() {
    const container = document.getElementById('projectsList');
    const entry = document.createElement('div');

    entry.className = 'entry-card';

    entry.innerHTML = `
        <div class="entry-header">
            <h4>Project ${container.children.length + 1}</h4>

            <div class="entry-actions">
                <button type="button"
                        class="btn btn-icon"
                        onclick="removeEntry(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>

        <div class="form-grid">

            <div class="form-group">
                <label>Project Name</label>
                <input type="text"
                       class="proj-name"
                       placeholder="Project Name"
                       oninput="generatePreview()">
            </div>

            <div class="form-group">
                <label>Tech Stack</label>
                <input type="text"
                       class="proj-tech"
                       placeholder="React, Node.js, MongoDB"
                       oninput="generatePreview()">
            </div>

            <div class="form-group">
                <label>Project Link</label>
                <input type="url"
                       class="proj-link"
                       placeholder="https://github.com/project"
                       oninput="generatePreview()">
            </div>

            <div class="form-group">
                <label>Duration</label>
                <input type="text"
                       class="proj-duration"
                       placeholder="Jan 2025 - Mar 2025"
                       oninput="generatePreview()">
            </div>

            <div class="form-group full-width">
                <label>Description</label>
                <textarea class="proj-description"
                          rows="3"
                          placeholder="Describe your project"
                          oninput="generatePreview()"></textarea>
            </div>

        </div>
    `;

    container.appendChild(entry);
}