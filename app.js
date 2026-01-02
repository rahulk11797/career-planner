let timerInterval;
let timeLeft = 2700;

// 1. Corrected Initialization
const SUPABASE_URL = 'https://rfydogvkdqjgmcgcywqx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ewGvs6lVIGDGp6Is_3-a6g_pJ4gN9X3';

// Use a different variable name for your client to avoid name collision
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

window.toggleTheme = function() {
    const root = document.documentElement;
    const theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

window.updateDateTime = function() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.querySelectorAll('.live-clock').forEach(el => el.innerText = timeStr);
    document.querySelectorAll('.full-date-display').forEach(el => el.innerText = dateStr);
};

window.focusToday = function(isManual = false) {
    const todayEl = document.querySelector('.active-day-focus');
    if (todayEl) {
        todayEl.scrollIntoView({ behavior: 'smooth', block: isManual ? 'center' : 'start' });
    }
};

window.calculateProgress = function() {
    const checks = document.querySelectorAll('input[type="checkbox"]');
    if (checks.length === 0) return 0;
    const done = Array.from(checks).filter(c => c.checked).length;
    return Math.round((done / checks.length) * 100);
};

// 2. Updated Sync Function
window.sync = async function(taskId) {
    const checkbox = document.getElementById(taskId);
    const isCompleted = checkbox.checked;

    checkbox.closest('.task-slot').classList.toggle('done', isCompleted);
    updateUI();

    const { error } = await db
        .from('user_progress')
        .upsert({ 
            id: taskId, 
            is_completed: isCompleted,
            updated_at: new Date() 
        });

    if (error) {
        console.error("Cloud sync failed:", error);
    }
};

window.handleTimer = function() {
    const btn = document.getElementById('timerBtn');
    const display = document.getElementById('timer-display');
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        btn.innerText = "RESUME";
    } else {
        btn.innerText = "PAUSE";
        timerInterval = setInterval(() => {
            timeLeft--;
            const m = Math.floor(timeLeft / 60);
            const s = timeLeft % 60;
            display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
            if (timeLeft <= 0) { 
                clearInterval(timerInterval); 
                alert("Session Finished!");
            }
        }, 1000);
    }
};

window.filterContent = function() {
    const query = document.getElementById('globalSearch').value.toLowerCase();
    document.querySelectorAll('.day-card').forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(query) ? 'block' : 'none';
    });
};

// Add this near the top of app.js (after your supabase init)
let sessionQuote = "";

function setRandomQuote() {
    if (window.MASTER_QUOTES && window.MASTER_QUOTES.length > 0) {
        const randomIndex = Math.floor(Math.random() * window.MASTER_QUOTES.length);
        sessionQuote = window.MASTER_QUOTES[randomIndex];
    } else {
        sessionQuote = "The only way to go fast, is to go well.";
    }
}

// Modify your getSidebarHTML to use the sessionQuote
function getSidebarHTML() {
    const progress = window.calculateProgress();
    const linksHTML = (window.SIDEBAR_LINKS || []).map(item => `
        <a href="${item.link}" target="_blank" class="portal-link d-flex gap-3 p-2 border rounded-3 text-decoration-none mb-2" style="color:var(--text-main);">
            <i class="fa-solid ${item.icon} ${item.color}"></i> <span class="small fw-bold">${item.name}</span>
        </a>
    `).join('');

    return `
        <div class="full-date-display"></div>
        <div class="live-clock mb-4">00:00:00</div>
        
        <div class="quote-card mb-4">
            <i class="fa-solid fa-quote-left mb-2 opacity-25" style="font-size: 0.8rem;"></i>
            <div class="quote-text">${sessionQuote}</div>
            <div class="quote-author">— Engineering Mastery</div>
        </div>

        <button class="btn btn-primary w-100 py-2 mb-3 rounded-3 fw-bold shadow-sm" onclick="focusToday(true)">JUMP TO TODAY</button>
        
        <div class="timer-card text-center mb-4 p-3 rounded-4" style="background:var(--accent); color:white">
            <div class="h2 fw-black" id="timer-display">45:00</div>
            <button class="btn btn-sm btn-light w-100 rounded-pill fw-bold" onclick="handleTimer()" id="timerBtn">START</button>
        </div>
        
        <div class="mb-4">
            <div class="d-flex justify-content-between small fw-bold mb-1"><span>PROGRESS</span><span>${progress}%</span></div>
            <div style="height:6px; background:var(--border); border-radius:10px; overflow:hidden;"><div style="width:${progress}%; height:100%; background:var(--accent)"></div></div>
        </div>
        <nav class="nav flex-column">${linksHTML}</nav>`;
}

function updateUI() {
    const side = getSidebarHTML();
    if(document.getElementById('desktopSidebar')) document.getElementById('desktopSidebar').innerHTML = side;
    if(document.getElementById('mobileSidebar')) document.getElementById('mobileSidebar').innerHTML = side;
    window.updateDateTime();
}

// 3. Updated Render Function
window.renderRoadmap = async function() {
    const grid = document.getElementById('roadmap-grid');
    if(!grid) return;

    // Show a sleek loading state
    grid.innerHTML = `
        <div class="col-12 text-center p-5 opacity-50">
            <i class="fa-solid fa-circle-notch fa-spin fa-2xl mb-3"></i>
            <p class="fw-bold">Syncing with Cloud Core...</p>
        </div>`;
    
    try {
        const { data: cloudData, error } = await db
            .from('user_progress')
            .select('*');

        const progressMap = {};
        if (cloudData) {
            cloudData.forEach(item => progressMap[item.id] = item.is_completed);
        }

        let html = '';
        const startDate = new Date(window.USER_START_DATE);
        startDate.setHours(0, 0, 0, 0);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayStr = today.toDateString();

        for (let i = 0; i < 90; i++) {
            let cardDate = new Date(startDate);
            cardDate.setDate(startDate.getDate() + i);
            
            const isToday = cardDate.toDateString() === todayStr;
            const isPast = cardDate < today;
            const dayData = window.MASTER_DATA[i % window.MASTER_DATA.length];

            html += `
                <div class="day-card ${isToday ? 'active-day-focus' : ''} ${isPast ? 'past-day' : ''}" id="day-card-${i + 1}">
                    <div class="p-3 border-bottom d-flex justify-content-between align-items-center bg-card-header">
                        <div>
                            <span class="fw-black small opacity-50">DAY ${String(i + 1).padStart(2, '0')}</span>
                            ${isToday ? '<span class="badge bg-primary ms-2 animate-pulse">ACTIVE</span>' : ''}
                        </div>
                        <span class="small fw-bold ${isToday ? 'text-primary' : 'opacity-50'}">
                            ${cardDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                        </span>
                    </div>

                    <div class="task-list">
                        ${dayData.tasks.map((t, idx) => {
                            const taskId = `d${i+1}t${idx}`; 
                            const done = progressMap[taskId] || false; 
                            
                            return `
                            <div class="task-slot ${done ? 'done' : ''}">
                                <div class="task-action-check">
                                    <input type="checkbox" class="form-check-input" id="${taskId}" 
                                           onchange="sync('${taskId}')" ${done ? 'checked' : ''}>
                                </div>

                                <div class="task-info">
                                    <div class="task-title">${t.topic}</div>
                                    <div class="task-meta">
                                        <span class="cat-badge cat-${t.cat}">${t.cat}</span>
                                        <span class="time-meta"><i class="fa-regular fa-clock me-1"></i>${t.time}</span>
                                        <span class="level-meta level-${t.level}">${t.level}</span>
                                    </div>
                                </div>

                                <div class="task-link">
                                    <a href="${t.link}" target="_blank" class="btn-study-mini" title="View Documentation">
                                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                    </a>
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>`;
        }
        grid.innerHTML = html;
        updateUI();
    } catch (e) {
        console.error("Render failed", e);
        grid.innerHTML = '<div class="alert alert-danger mx-auto" style="max-width:500px;">Connection failed. Please refresh.</div>';
    }
};

window.onload = () => {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    
    // Select the quote for this session
    setRandomQuote(); 
    
    window.renderRoadmap();
    
    setTimeout(() => {
        window.focusToday(false);
    }, 1200);

    setInterval(window.updateDateTime, 1000);
};