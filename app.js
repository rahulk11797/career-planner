let timerInterval;
let timeLeft = 2700;

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

window.sync = function(id) {
    const cb = document.getElementById(id);
    if (cb.checked) localStorage.setItem(id, 'true');
    else localStorage.removeItem(id);
    cb.closest('.task-slot').classList.toggle('done', cb.checked);
    updateUI();
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
        <button class="btn btn-primary w-100 py-2 mb-3 rounded-3 fw-bold" onclick="focusToday(true)">JUMP TO TODAY</button>
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

window.renderRoadmap = function() {
    const grid = document.getElementById('roadmap-grid');
    let html = '';
    
    // 1. Get your starting point from data.js
    // If today is June 1st and Start Date was May 20th, Day 1 stays on May 20th.
    const startDate = new Date(window.USER_START_DATE);
    startDate.setHours(0, 0, 0, 0);
    
    const todayStr = new Date().toDateString();

    // 2. Loop through all 90 days of your curriculum
    for (let i = 0; i < 90; i++) {
        // Calculate the specific calendar date for Day (i + 1)
        let cardDate = new Date(startDate);
        cardDate.setDate(startDate.getDate() + i);
        
        const isToday = cardDate.toDateString() === todayStr;
        const isPast = cardDate < new Date().setHours(0,0,0,0);
        
        // Map to your task array (loops if roadmap > task list)
        const dayData = window.MASTER_DATA[i % window.MASTER_DATA.length];

        html += `
            <div class="day-card ${isToday ? 'active-day-focus' : ''} ${isPast && !isToday ? 'opacity-75' : ''}" 
                 id="day-card-${i + 1}" 
                 style="${isPast && !isToday ? 'filter: grayscale(0.5);' : ''}">
                
                <div class="p-3 border-bottom d-flex justify-content-between align-items-center">
                    <div>
                        <span class="fw-black">DAY ${i + 1}</span>
                        ${isToday ? '<span class="badge bg-primary ms-2">TODAY</span>' : ''}
                    </div>
                    <span class="small fw-bold opacity-50">${cardDate.toLocaleDateString('en-US', {weekday: 'short', month:'short', day:'numeric'})}</span>
                </div>

                <div class="card-body p-0">
                    ${dayData.tasks.map((t, idx) => {
                        const id = `d${i + 1}t${idx}`; // Unique ID for this specific day/task
                        const done = localStorage.getItem(id);
                        return `
                        <div class="task-slot ${done ? 'done' : ''}">
                            <input type="checkbox" class="form-check-input" id="${id}" 
                                   onchange="sync('${id}')" ${done ? 'checked' : ''}>
                            <div style="flex:1">
                                <div class="fw-bold" style="font-size:0.9rem">${t.topic}</div>
                                <span class="cat-badge cat-${t.cat}">${t.cat}</span>
                                <span class="level-badge level-${t.level}">${t.level}</span>
                            </div>
                            <a href="${t.link}" target="_blank" class="btn-study">STUDY</a>
                        </div>`;
                    }).join('')}
                </div>
            </div>`;
    }
    
    grid.innerHTML = html;
    updateUI();
    
    // 3. AUTO-SCROLL TO TODAY
    // This is vital so you don't have to scroll past 20 days to find where you are
    setTimeout(() => {
        const todayCard = document.querySelector('.active-day-focus');
        if (todayCard) {
            todayCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 1000);
};

window.onload = () => {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    window.renderRoadmap();
    
    // Smooth scroll to the active day after a short delay
    setTimeout(() => {
        window.focusToday(false);
    }, 800);

    setInterval(window.updateDateTime, 1000);
};