// ============================================================================
// Mastery OS - Engineering Curriculum Tracker
// ============================================================================

// Configuration
const STORAGE_KEY = 'mastery-os-progress-v1';
const START_DATE_KEY = 'mastery-os-start-date-v1';

// Global state
let timerInterval;
let timeLeft = 2700;
let sessionQuote = '';

// ============================================================================
// UI Utilities
// ============================================================================

/**
 * Toggle between light and dark theme
 */
window.toggleTheme = function() {
    const root = document.documentElement;
    const theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

/**
 * Update all time displays on the page
 */
window.updateDateTime = function() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
    const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.querySelectorAll('.live-clock').forEach(el => el.innerText = timeStr);
    document.querySelectorAll('.full-date-display').forEach(el => el.innerText = dateStr);
};

/**
 * Scroll to today's active day card
 * @param {boolean} isManual - Whether scroll was triggered by user action
 */
window.focusToday = function(isManual = false) {
    const todayEl = document.querySelector('.active-day-focus');
    if (todayEl) {
        todayEl.scrollIntoView({
            behavior: 'smooth',
            block: isManual ? 'center' : 'start'
        });
    }
};

/**
 * Calculate overall progress percentage
 * @returns {number} Progress percentage (0-100)
 */
window.calculateProgress = function() {
    const checks = document.querySelectorAll('input[type="checkbox"]');
    if (checks.length === 0) return 0;
    const completed = Array.from(checks).filter(c => c.checked).length;
    return Math.round((completed / checks.length) * 100);
};

/**
 * Filter day cards based on search query
 */
window.filterContent = function() {
    const query = document.getElementById('globalSearch').value.toLowerCase();
    document.querySelectorAll('.day-card').forEach(card => {
        const matches = card.innerText.toLowerCase().includes(query);
        card.style.display = matches ? 'block' : 'none';
    });
};

/**
 * Clear all localStorage cache and reset the app
 */
window.clearCache = function() {
    if (!confirm('🔄 Clear all progress and reset the app? This cannot be undone.')) {
        return;
    }
    
    // Remove all app-related storage
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(START_DATE_KEY);
    localStorage.removeItem('theme');
    
    // Reload the page
    window.location.reload();
};

// ============================================================================
// Sidebar & Dashboard
// ============================================================================

/**
 * Set random motivational quote for the session
 */
function setRandomQuote() {
    if (window.MASTER_QUOTES && window.MASTER_QUOTES.length > 0) {
        const randomIndex = Math.floor(Math.random() * window.MASTER_QUOTES.length);
        sessionQuote = window.MASTER_QUOTES[randomIndex];
    } else {
        sessionQuote = 'The only way to go fast, is to go well.';
    }
}

/**
 * Generate sidebar HTML with progress and navigation
 * @returns {string} Rendered sidebar HTML
 */
function getSidebarHTML() {
    return `
        <div class="full-date-display"></div>
        <div class="live-clock mb-4">00:00:00</div>

        <div class="quote-card mb-4">
            <i class="fa-solid fa-quote-left mb-2 opacity-25" style="font-size: 0.8rem;"></i>
            <div class="quote-text">${sessionQuote}</div>
            <div class="quote-author">— Engineering Mastery</div>
        </div>

        <button class="btn btn-primary w-100 py-2 mb-3 rounded-3 fw-bold shadow-sm" onclick="focusToday(true)">FOCUS TODAY</button>

        <div class="sidebar-note text-center opacity-75">Keep it simple. Do one meaningful thing today.</div>`;
}

/**
 * Update UI components with current data
 */
function updateUI() {
    const sidebarHTML = getSidebarHTML();
    const desktopSidebar = document.getElementById('desktopSidebar');
    const mobileSidebar = document.getElementById('mobileSidebar');
    
    if (desktopSidebar) desktopSidebar.innerHTML = sidebarHTML;
    if (mobileSidebar) mobileSidebar.innerHTML = sidebarHTML;

    updateHeroQuote();
    updateStartDateLabel();
    window.updateDateTime();
}

function parseStoredDate(value) {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    parsed.setHours(0, 0, 0, 0);
    return parsed;
}

function getEffectiveStartDate() {
    const saved = localStorage.getItem(START_DATE_KEY);
    const savedDate = parseStoredDate(saved);
    const defaultDate = parseStoredDate(window.USER_START_DATE);

    if (savedDate && defaultDate) {
        if (savedDate >= defaultDate) {
            return savedDate;
        }
        // If the stored start date is older than the configured default,
        // discard it and use the current default date instead.
        localStorage.removeItem(START_DATE_KEY);
        return defaultDate;
    }

    if (savedDate) return savedDate;
    if (defaultDate) return defaultDate;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

function getStartDateLabel() {
    const startDate = getEffectiveStartDate();
    return 'Start day: ' + startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function updateStartDateLabel() {
    const label = document.getElementById('startDateLabel');
    if (label) label.textContent = getStartDateLabel();
}

function updateHeroQuote() {
    const quoteEl = document.getElementById('heroQuote');
    if (quoteEl) quoteEl.textContent = '“' + sessionQuote + '”';
}

function saveStartDate(dateValue) {
    const parsed = parseStoredDate(dateValue);
    if (!parsed) return;
    localStorage.setItem(START_DATE_KEY, parsed.toISOString().slice(0, 10));
}

window.setStartDate = function(dateString) {
    saveStartDate(dateString);
    setRandomQuote();
    updateUI();
    window.renderRoadmap();
    window.updateDashboard();
};

window.resetStartDay = function(dateString) {
    if (dateString) {
        window.setStartDate(dateString);
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    saveStartDate(today.toISOString().slice(0, 10));
    setRandomQuote();
    updateUI();
    window.renderRoadmap();
    window.updateDashboard();
};

// ============================================================================
// Local Persistence
// ============================================================================

/**
 * Calculate total visible tasks in the curriculum.
 * This supports variable task counts per day while keeping storage compact.
 */
function getTotalTaskCount() {
    return window.MASTER_DATA.reduce((sum, day) => sum + (day.tasks?.length || 0), 0);
}

/**
 * Convert a task id like "d12t1" into a zero-based progress index.
 */
function getTaskIndex(taskId) {
    const match = /^d(\d+)t(\d+)$/.exec(taskId);
    if (!match) return -1;

    const dayNum = Number(match[1]);
    const taskIdx = Number(match[2]);
    let index = 0;

    for (let day = 0; day < dayNum - 1 && day < window.MASTER_DATA.length; day++) {
        index += (window.MASTER_DATA[day].tasks?.length || 0);
    }

    return index + taskIdx;
}

/**
 * Restore a task id from a flat progress index.
 */
function getTaskIdFromIndex(taskIndex) {
    let cursor = 0;
    for (let day = 0; day < window.MASTER_DATA.length; day++) {
        const dayTaskCount = window.MASTER_DATA[day].tasks?.length || 0;
        if (taskIndex < cursor + dayTaskCount) {
            return 'd' + (day + 1) + 't' + (taskIndex - cursor);
        }
        cursor += dayTaskCount;
    }
    return null;
}

/**
 * Decode a compact base64 task bitmap into a progress map.
 */
function decodeProgressString(value) {
    const progressMap = {};
    if (!value) return progressMap;

    const trimmed = value.trim();

    // Try compact base64 bitmap first
    if (/^[A-Za-z0-9+/=\r\n]+$/.test(trimmed)) {
        try {
            const raw = atob(trimmed);
            const totalTasks = getTotalTaskCount();

            for (let byteIndex = 0; byteIndex < raw.length; byteIndex++) {
                const byte = raw.charCodeAt(byteIndex);
                for (let bit = 0; bit < 8; bit++) {
                    const taskIndex = byteIndex * 8 + bit;
                    if (taskIndex >= totalTasks) break;
                    if (byte & (1 << bit)) {
                        const taskId = getTaskIdFromIndex(taskIndex);
                        if (taskId) {
                            progressMap[taskId] = true;
                        }
                    }
                }
            }
            return progressMap;
        } catch (error) {
            console.warn('Progress base64 decode failed:', error);
        }
    }

    // Fallback to JSON map for legacy or corrupted values
    try {
        const parsed = JSON.parse(trimmed);
        if (parsed && typeof parsed === 'object') {
            Object.keys(parsed).forEach(taskId => {
                if (parsed[taskId]) progressMap[taskId] = true;
            });
        }
    } catch (error) {
        console.warn('Progress JSON decode failed:', error);
    }

    return progressMap;
}

/**
 * Encode progress as a compact base64 string.
 */
function encodeProgressMap(progressMap) {
    const totalTasks = getTotalTaskCount();
    const bytes = new Uint8Array(Math.ceil(totalTasks / 8));

    Object.entries(progressMap).forEach(([taskId, isCompleted]) => {
        if (!isCompleted) return;
        const index = getTaskIndex(taskId);
        if (index < 0) return;
        const byteIndex = Math.floor(index / 8);
        const bit = index % 8;
        bytes[byteIndex] |= 1 << bit;
    });

    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
}

/**
 * Read saved progress from browser storage.
 */
function loadProgressMap() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return {};

        const progressMap = decodeProgressString(stored);
        if (Object.keys(progressMap).length === 0 && stored.trim() && !/^[A-Za-z0-9+/=\r\n]+$/.test(stored.trim())) {
            // Clear invalid legacy data that cannot be decoded cleanly
            localStorage.removeItem(STORAGE_KEY);
        }
        return progressMap;
    } catch (error) {
        console.warn('Unable to load progress from localStorage:', error);
        return {};
    }
}

/**
 * Persist a single task's completion state.
 */
function saveTaskProgress(taskId, isCompleted) {
    const progressMap = loadProgressMap();
    if (isCompleted) {
        progressMap[taskId] = true;
    } else {
        delete progressMap[taskId];
    }

    try {
        if (Object.keys(progressMap).length === 0) {
            localStorage.removeItem(STORAGE_KEY);
        } else {
            localStorage.setItem(STORAGE_KEY, encodeProgressMap(progressMap));
        }
    } catch (error) {
        console.warn('Unable to save progress to localStorage:', error);
    }
    return progressMap;
}

/**
 * Sync task completion status to browser storage.
 * @param {string} taskId - Task identifier
 */
window.sync = async function(taskId) {
    const checkbox = document.getElementById(taskId);
    const isCompleted = checkbox.checked;

    checkbox.closest('.task-slot').classList.toggle('done', isCompleted);
    updateUI();
    const progressMap = saveTaskProgress(taskId, isCompleted);
    setTimeout(() => window.updateDashboard(progressMap), 500);
};

// ============================================================================
// Roadmap Rendering
// ============================================================================

/**
 * Render the 90-day curriculum roadmap using browser storage progress
 */
window.renderRoadmap = async function() {
    const grid = document.getElementById('roadmap-grid');
    if (!grid) return;

    grid.innerHTML = '<div class="col-12 text-center p-5 opacity-50">' +
        '<i class="fa-solid fa-circle-notch fa-spin fa-2xl mb-3"></i>' +
        '<p class="fw-bold">Loading your saved progress...</p></div>';

    try {
        const progressMap = loadProgressMap();

        let html = '';
        const startDate = getEffectiveStartDate();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toDateString();

        for (let i = 0; i < 90; i++) {
            const cardDate = new Date(startDate);
            cardDate.setDate(startDate.getDate() + i);

            const isToday = cardDate.toDateString() === todayStr;
            const isPast = cardDate < today;
            const dayData = window.MASTER_DATA[i % window.MASTER_DATA.length];

            html += renderDayCard(i, cardDate, isToday, isPast, dayData, progressMap);
        }

        grid.innerHTML = html;
        updateUI();

    } catch (error) {
        console.error('Failed to render roadmap:', error);
        grid.innerHTML = '<div class="alert alert-danger mx-auto" style="max-width:500px;">Unable to load saved progress.</div>';
    }
};

/**
 * Generate HTML for a single day card
 */
function renderDayCard(dayIndex, cardDate, isToday, isPast, dayData, progressMap) {
    const dayNum = dayIndex + 1;
    const taskListHTML = dayData.tasks.map((task, taskIdx) => {
        const taskId = 'd' + dayNum + 't' + taskIdx;
        const isDone = progressMap[taskId] || false;
        return renderTaskSlot(taskId, task, isDone);
    }).join('');

    return '<div class="day-card ' + (isToday ? 'active-day-focus' : '') + ' ' + (isPast ? 'past-day' : '') + '" id="day-card-' + dayNum + '">' +
        '<div class="p-3 border-bottom d-flex justify-content-between align-items-center bg-card-header">' +
            '<div>' +
                '<span class="fw-black small opacity-50">DAY ' + String(dayNum).padStart(2, '0') + '</span>' +
                (isToday ? '<span class="badge bg-primary ms-2 animate-pulse">ACTIVE</span>' : '') +
            '</div>' +
            '<span class="small fw-bold ' + (isToday ? 'text-primary' : 'opacity-50') + '">' +
                cardDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase() +
            '</span>' +
        '</div>' +
        '<div class="task-list">' + taskListHTML + '</div>' +
    '</div>';
}

/**
 * Generate HTML for a single task slot
 */
function renderTaskSlot(taskId, task, isDone) {
    return '<div class="task-slot ' + (isDone ? 'done' : '') + '">' +
        '<div class="task-action-check">' +
            '<input type="checkbox" class="form-check-input" id="' + taskId + '" ' +
                   'onchange="sync(\'' + taskId + '\')" ' + (isDone ? 'checked' : '') + '>' +
        '</div>' +
        '<div class="task-info">' +
            '<div class="task-title">' + task.topic + '</div>' +
            '<div class="task-meta">' +
                '<span class="cat-badge cat-' + task.cat + '">' + task.cat + '</span>' +
                '<span class="time-meta"><i class="fa-regular fa-clock me-1"></i>' + task.time + '</span>' +
                '<span class="level-meta level-' + task.level + '">' + task.level + '</span>' +
            '</div>' +
        '</div>' +
        '<div class="task-link">' +
            '<a href="' + task.link + '" target="_blank" class="btn-study-mini" title="View Documentation">' +
                '<i class="fa-solid fa-arrow-up-right-from-square"></i>' +
            '</a>' +
        '</div>' +
    '</div>';
}

// ============================================================================
// Analytics & Metrics
// ============================================================================

/**
 * Calculate current learning streak (consecutive days completed)
 * @param {Object} progressMap - Map of task completions
 * @returns {number} Number of consecutive days completed
 */
window.calculateStreak = function(progressMap) {
    const startDate = getEffectiveStartDate();
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);

    for (let i = 0; i < 90; i++) {
        const dayIndex = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
        if (dayIndex < 0) break;

        const dataIndex = dayIndex % window.MASTER_DATA.length;
        const dayTasks = window.MASTER_DATA[dataIndex].tasks;
        const dayCompleted = dayTasks.every((_, idx) => progressMap['d' + (dayIndex + 1) + 't' + idx]);

        if (dayCompleted) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    return streak;
};

/**
 * Calculate progress by category
 * @param {Object} progressMap - Map of task completions
 * @returns {Object} Progress percentage per category
 */
window.calculateCategoryProgress = function(progressMap) {
    const categories = {};
    const totalTasks = {};

    const startDate = getEffectiveStartDate();
    const today = new Date();
    const daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const maxDays = Math.min(Math.max(daysElapsed, 0), 90);

    for (let i = 0; i < maxDays; i++) {
        const dataIndex = i % window.MASTER_DATA.length;
        const day = window.MASTER_DATA[dataIndex];
        day.tasks.forEach((task, taskIndex) => {
            const cat = task.cat;
            const taskId = 'd' + (i + 1) + 't' + taskIndex;

            if (!categories[cat]) {
                categories[cat] = 0;
                totalTasks[cat] = 0;
            }
            totalTasks[cat]++;
            if (progressMap[taskId]) categories[cat]++;
        });
    }

    const progress = {};
    Object.keys(categories).forEach(cat => {
        progress[cat] = Math.round((categories[cat] / totalTasks[cat]) * 100);
    });

    return progress;
};

/**
 * Update dashboard with current metrics
 */
window.updateDashboard = function(progressMap = null) {
    try {
        const currentProgress = progressMap || loadProgressMap();
        const streak = window.calculateStreak(currentProgress);
        const overallProgress = window.calculateProgress();
        const categoryProgress = window.calculateCategoryProgress(currentProgress);

        updateDashboardElements(streak, overallProgress, categoryProgress, currentProgress);

    } catch (error) {
        console.error('Dashboard update failed:', error);
        resetDashboardElements();
    }
};

/**
 * Update dashboard UI elements with calculated metrics
 */
function updateDashboardElements(streak, overallProgress, categoryProgress, progressMap) {
    const streakEl = document.getElementById('currentStreak');
    const progressEl = document.getElementById('overallProgress');
    const timeEl = document.getElementById('studyTime');
    const daysEl = document.getElementById('daysCompleted');
    const categoryContainer = document.getElementById('categoryProgress');

    if (streakEl) streakEl.textContent = streak;
    if (progressEl) progressEl.textContent = `${overallProgress}%`;

    if (timeEl) {
        const totalTasks = Object.values(progressMap).filter(Boolean).length;
        const studyHours = Math.floor(totalTasks * 0.75);
        timeEl.textContent = `${studyHours}h`;
    }

    if (daysEl) {
        const startDate = getEffectiveStartDate();
        const today = new Date();
        const daysElapsed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
        let completedDays = 0;

        for (let i = 0; i < Math.min(daysElapsed, 90); i++) {
            const dataIndex = i % window.MASTER_DATA.length;
            const dayTasks = window.MASTER_DATA[dataIndex].tasks;
            const dayCompleted = dayTasks.every((_, idx) => progressMap['d' + (i + 1) + 't' + idx]);
            if (dayCompleted) completedDays++;
        }
        daysEl.textContent = completedDays;
    }

    if (categoryContainer) {
        renderCategoryProgress(categoryContainer, categoryProgress);
    }
}

/**
 * Render category progress bars
 */
function renderCategoryProgress(container, categoryProgress) {
    const categoryColors = {
        'java': '#ffa726',
        'dsa': '#ef5350',
        'system-design': '#ab47bc',
        'database': '#4dd0e1',
        'interview': '#fbc02d'
    };

    container.innerHTML = Object.entries(categoryProgress).map(([cat, progress]) =>
        '<div class="col-md-6">' +
            '<div class="d-flex justify-content-between small mb-1">' +
                '<span class="text-capitalize">' + cat.replace('-', ' ') + '</span>' +
                '<span>' + progress + '%</span>' +
            '</div>' +
            '<div class="progress" style="height: 8px;">' +
                '<div class="progress-bar" role="progressbar" style="width: ' + progress + '%; background-color: ' + (categoryColors[cat] || '#6c757d') + ';"></div>' +
            '</div>' +
        '</div>'
    ).join('');
}

/**
 * Reset dashboard to default values (error state)
 */
function resetDashboardElements() {
    const elements = {
        'currentStreak': '0',
        'overallProgress': '0%',
        'studyTime': '0h',
        'daysCompleted': '0'
    };

    Object.entries(elements).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });

    const categoryContainer = document.getElementById('categoryProgress');
    if (categoryContainer) {
        categoryContainer.innerHTML = '<div class="text-center text-muted">Loading...</div>';
    }
}

// ============================================================================
// User Interactions
// ============================================================================

/**
 * Navigation to specific date or day number
 */
window.jumpToDate = function() {
    const dateStr = prompt('Enter date (YYYY-MM-DD) or day number (1-90):');
    if (!dateStr) return;

    let targetDay;
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const targetDate = new Date(dateStr);
        const startDate = getEffectiveStartDate();
        targetDay = Math.floor((targetDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    } else {
        targetDay = parseInt(dateStr);
    }

    if (targetDay >= 1 && targetDay <= 90) {
        const element = document.getElementById('day-card-' + targetDay);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.style.animation = 'jumpPulse 2s';
            setTimeout(() => element.style.animation = '', 2000);
        }
    } else {
        alert('Invalid date or day number. Please enter a date between day 1-90.');
    }
};

/**
 * Start Pomodoro timer with automatic break intervals
 */
window.startPomodoro = function() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    timeLeft = 1500;
    let isBreak = false;
    let pomodoroCount = 0;

    const runPomodoro = () => {
        const display = document.getElementById('timer-display');
        const btn = document.getElementById('timerBtn');

        if (timeLeft <= 0) {
            if (!isBreak) {
                pomodoroCount++;
                if (pomodoroCount % 4 === 0) {
                    timeLeft = 900;
                    alert('Great work! Take a 15-minute break.');
                } else {
                    timeLeft = 300;
                    alert('Pomodoro complete! Take a 5-minute break.');
                }
                isBreak = true;
            } else {
                timeLeft = 1500;
                isBreak = false;
                alert('Break over! Ready for another Pomodoro?');
            }
        }

        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
        btn.innerText = isBreak ? 'BREAK' : 'POMODORO';

        timeLeft--;
    };

    timerInterval = setInterval(runPomodoro, 1000);
};

/**
 * Basic timer without Pomodoro intervals
 */
window.handleTimer = function() {
    const btn = document.getElementById('timerBtn');
    const display = document.getElementById('timer-display');

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        btn.innerText = 'RESUME';
    } else {
        btn.innerText = 'PAUSE';
        timerInterval = setInterval(() => {
            timeLeft--;
            const m = Math.floor(timeLeft / 60);
            const s = timeLeft % 60;
            display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Session Finished!');
            }
        }, 1000);
    }
};

/**
 * Show detailed statistics (placeholder for future modal)
 */
window.showStats = function() {
    alert('Detailed statistics feature coming soon! Check the dashboard for current metrics.');
};

// ============================================================================
// Initialization
// ============================================================================

/**
 * Initialize application on page load
 */
window.onload = async () => {
    // Load saved theme
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);

    // Set motivational quote
    setRandomQuote();
    updateHeroQuote();
    updateStartDateLabel();

    try {
        // Render curriculum and dashboard
        await window.renderRoadmap();
        window.updateDashboard();
    } catch (error) {
        console.error('Initialization failed:', error);
    }

    // Focus on today's lesson after a brief delay
    setTimeout(() => {
        window.focusToday(false);
    }, 1200);

    // Update time display every second
    setInterval(window.updateDateTime, 1000);
};
