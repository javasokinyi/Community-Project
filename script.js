'use strict';

/* ─────────────────────────────────────────────
   PAGE ROUTER
───────────────────────────────────────────── */
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) { target.classList.add('active'); window.scrollTo(0,0); }
  if (page === 'dashboard') showDash('overview');
  // Close mobile menu
  document.getElementById('mobile-menu').classList.remove('open');
}

/* ─────────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────────── */
function toggleMobile() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* ─────────────────────────────────────────────
   SIDEBAR TOGGLE (dashboard)
───────────────────────────────────────────── */
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  if (sb) sb.classList.toggle('open');
}

/* ─────────────────────────────────────────────
   NOTIFICATION PANEL
───────────────────────────────────────────── */
function toggleNotif() {
  const panel = document.getElementById('notif-panel');
  if (panel) panel.classList.toggle('open');
}
document.addEventListener('click', e => {
  const panel = document.getElementById('notif-panel');
  if (panel && !panel.contains(e.target) && !e.target.closest('.notif-btn')) {
    panel.classList.remove('open');
  }
});

/* ─────────────────────────────────────────────
   PASSWORD VISIBILITY TOGGLE
───────────────────────────────────────────── */
function togglePass(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  btn.textContent = isText ? '👁' : '🙈';
}

/* ─────────────────────────────────────────────
   BILLING TOGGLE
───────────────────────────────────────────── */
let isYearly = false;
function toggleBilling() {
  isYearly = !isYearly;
  const track = document.getElementById('billing-toggle');
  if (track) track.classList.toggle('on', isYearly);

  const prices = {
    'price-starter':   { monthly: '0',     yearly: '0' },
    'price-community': { monthly: '2,500',  yearly: '2,000' },
  };
  Object.entries(prices).forEach(([id, vals]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = isYearly ? vals.yearly : vals.monthly;
  });
}

/* ─────────────────────────────────────────────
   NAV SCROLL SHADOW
───────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (nav) nav.style.boxShadow = window.scrollY > 10 ? '0 4px 30px rgba(0,0,0,.4)' : '';
});

/* ─────────────────────────────────────────────
   DASHBOARD RENDERER
   [BACKEND] Replace innerHTML blocks with
   fetch() calls to your REST API endpoints.
───────────────────────────────────────────── */
function showDash(section) {
  document.querySelectorAll('.sitem').forEach(i => i.classList.remove('active'));

  const body  = document.getElementById('dash-body');
  const title = document.getElementById('dash-title');
  if (!body || !title) return;

  // Highlight active sidebar item
  document.querySelectorAll('.sitem').forEach(i => {
    if (i.textContent.trim().toLowerCase().includes(section)) {
      i.classList.add('active');
    }
  });

  /* ── OVERVIEW ── */
  if (section === 'overview') {
    title.textContent = 'Dashboard Overview';
    body.innerHTML = `
      <div class="ai-block">
        <div class="ai-block-head">
          <div class="ai-ico">🤖</div>
          <div>
            <div class="ai-block-title">AI Financial Insights</div>
            <div class="ai-block-sub">Powered by CommunityPay Intelligence</div>
          </div>
        </div>
        <div class="ai-items">
          <div class="ai-item"><div class="ai-dot" style="background:#10b981"></div>Contribution rate is up 18% this month. Strong engagement from senior members.</div>
          <div class="ai-item"><div class="ai-dot" style="background:#f59e0b"></div>12 members have pending contributions for June. Consider sending a reminder before the 15th.</div>
          <div class="ai-item"><div class="ai-dot" style="background:#6366f1"></div>At the current pace, your Harambee event will reach its target 3 days ahead of schedule.</div>
        </div>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card kpi-indigo">
          <div class="kpi-label">Total Contributions <span class="kpi-icon">💰</span></div>
          <div class="kpi-val">KSh 487,200</div>
          <div class="kpi-delta up">↑ 18.2% from last month</div>
        </div>
        <div class="kpi-card kpi-emerald">
          <div class="kpi-label">Welfare Fund <span class="kpi-icon">🏥</span></div>
          <div class="kpi-val">KSh 125,000</div>
          <div class="kpi-delta up">↑ 5.4% growth</div>
        </div>
        <div class="kpi-card kpi-cyan">
          <div class="kpi-label">Active Events <span class="kpi-icon">🎯</span></div>
          <div class="kpi-val">2 Events</div>
          <div class="kpi-delta up">1 new this month</div>
        </div>
        <div class="kpi-card kpi-amber">
          <div class="kpi-label">Pending Balances <span class="kpi-icon">⏳</span></div>
          <div class="kpi-val">KSh 34,800</div>
          <div class="kpi-delta down">12 members overdue</div>
        </div>
        <div class="kpi-card kpi-purple">
          <div class="kpi-label">Total Members <span class="kpi-icon">👥</span></div>
          <div class="kpi-val">148 Members</div>
          <div class="kpi-delta up">↑ 6 new this month</div>
        </div>
        <div class="kpi-card kpi-indigo">
          <div class="kpi-label">Monthly Growth <span class="kpi-icon">📈</span></div>
          <div class="kpi-val">+18.2%</div>
          <div class="kpi-delta up">Best month in 2025</div>
        </div>
      </div>

      <div class="charts-row">
        <div class="chart-card">
          <div class="chart-head">
            <div class="chart-title">Contribution Trends</div>
            <div class="chart-tabs">
              <button class="ctab active">6M</button>
              <button class="ctab">1Y</button>
              <button class="ctab">All</button>
            </div>
          </div>
          <svg class="svg-chart" viewBox="0 0 420 170">
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#4F46E5" stop-opacity=".3"/>
                <stop offset="100%" stop-color="#4F46E5" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="M20,130 L80,110 L140,90 L200,70 L260,75 L320,50 L400,25"
                  fill="none" stroke="#6366F1" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M20,130 L80,110 L140,90 L200,70 L260,75 L320,50 L400,25 L400,155 L20,155Z"
                  fill="url(#cg)"/>
            <circle cx="400" cy="25" r="5" fill="#6366F1"/>
            <text x="400" y="17" fill="#6366F1" font-size="10" text-anchor="middle" font-family="Inter">487K</text>
            <text x="20"  y="165" fill="#4A5B7A" font-size="9" text-anchor="middle" font-family="Inter">Jan</text>
            <text x="80"  y="165" fill="#4A5B7A" font-size="9" text-anchor="middle" font-family="Inter">Feb</text>
            <text x="140" y="165" fill="#4A5B7A" font-size="9" text-anchor="middle" font-family="Inter">Mar</text>
            <text x="200" y="165" fill="#4A5B7A" font-size="9" text-anchor="middle" font-family="Inter">Apr</text>
            <text x="260" y="165" fill="#4A5B7A" font-size="9" text-anchor="middle" font-family="Inter">May</text>
            <text x="320" y="165" fill="#4A5B7A" font-size="9" text-anchor="middle" font-family="Inter">Jun</text>
          </svg>
        </div>
        <div class="chart-card">
          <div class="chart-head"><div class="chart-title">By Category</div></div>
          <svg class="svg-chart" viewBox="0 0 200 170">
            <circle cx="100" cy="80" r="58" fill="none" stroke="#1e3a8a" stroke-width="20"/>
            <circle cx="100" cy="80" r="58" fill="none" stroke="#06b6d4" stroke-width="20" stroke-dasharray="91 273" stroke-dashoffset="-50"/>
            <circle cx="100" cy="80" r="58" fill="none" stroke="#10b981" stroke-width="20" stroke-dasharray="55 273" stroke-dashoffset="-141"/>
            <circle cx="100" cy="80" r="58" fill="none" stroke="#8b5cf6" stroke-width="20" stroke-dasharray="36 273" stroke-dashoffset="-196"/>
            <text x="100" y="75" fill="#F1F5FF" font-size="16" font-weight="700" text-anchor="middle" font-family="Space Grotesk">KSh</text>
            <text x="100" y="91" fill="#8A9BBD" font-size="9" text-anchor="middle" font-family="Inter">487,200</text>
          </svg>
          <div style="display:flex;flex-direction:column;gap:.3rem;margin-top:-.5rem;">
            ${[['#1e3a8a','Monthly (52%)'],['#06b6d4','Events (33%)'],['#10b981','Welfare (10%)'],['#8b5cf6','Special (5%)']].map(([c,l]) =>
              `<div style="display:flex;align-items:center;gap:.4rem;font-size:.71rem;color:var(--text2)"><div style="width:9px;height:9px;border-radius:50%;background:${c};flex-shrink:0"></div>${l}</div>`
            ).join('')}
          </div>
        </div>
      </div>

      <div class="charts-row" style="grid-template-columns:1fr 1fr;">
        <div class="chart-card">
          <div class="chart-head"><div class="chart-title">Recent Activity</div></div>
          <div class="activity-list">
            ${[
              ['PM','Peter Mwangi','Monthly contribution','2 mins ago','+KSh 2,000','credit','linear-gradient(135deg,#4F46E5,#06b6d4)'],
              ['GO','Grace Otieno','Harambee contribution','15 mins ago','+KSh 5,000','credit','linear-gradient(135deg,#059669,#06b6d4)'],
              ['WF','Welfare Fund','Disbursement to J. Ochieng','1 hr ago','-KSh 8,000','debit','linear-gradient(135deg,#7c3aed,#db2777)'],
            ].map(([init,name,desc,time,amt,type,grad]) => `
              <div class="activity-item">
                <div class="act-av" style="background:${grad}">${init}</div>
                <div style="flex:1;min-width:0;">
                  <div class="act-name">${name}</div>
                  <div class="act-desc">${desc}</div>
                  <div class="act-time">${time}</div>
                </div>
                <div class="act-amt ${type}">${amt}</div>
              </div>`).join('')}
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-head"><div class="chart-title">Event Progress</div></div>
          <div class="prog-list">
            ${[
              ['Annual Harambee 2025','62.5%',62.5,'KSh 187,500 / KSh 300,000','linear-gradient(90deg,#4F46E5,#06b6d4)','#6366F1'],
              ['Christmas Drive 2024','100%',100,'KSh 245,000 / KSh 200,000 ✓','linear-gradient(90deg,#10b981,#22d3ee)','#10b981'],
              ['Welfare Q3 Fund','0%',0,'KSh 0 / KSh 150,000 · Not started','linear-gradient(90deg,#8b5cf6,#4F46E5)','#f59e0b'],
            ].map(([name,pct,w,lbl,grad,col]) => `
              <div class="prog-item">
                <div class="prog-head">
                  <span style="font-weight:600;font-size:.8rem;">${name}</span>
                  <span style="font-size:.8rem;font-weight:700;color:${col}">${pct}</span>
                </div>
                <div class="prog-bar"><div class="prog-fill" style="width:${w}%;background:${grad}"></div></div>
                <div class="prog-lbl">${lbl}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
    addChartTabInteractivity();
  }

  /* ── MEMBERS ── */
  else if (section === 'members') {
    title.textContent = 'Member Management';
    body.innerHTML = `
      <div style="display:flex;gap:.6rem;margin-bottom:1.25rem;flex-wrap:wrap;">
        <button class="btn-pill sm">+ Add Member</button>
        <button class="btn-ghost-sm">📤 Export CSV</button>
        <button class="btn-ghost-sm">📧 Send Reminder</button>
        <select class="finput" style="width:auto;padding:.38rem .8rem;font-size:.8rem;">
          <option>All Groups</option>
          <option>Deacons</option>
          <option>Youth</option>
          <option>Women's Guild</option>
        </select>
      </div>
      <div class="table-card">
        <div class="table-top">
          <h3>All Members <span style="color:var(--text3);font-weight:400;">(148)</span></h3>
          <div class="search-box">🔍 <input placeholder="Search members..."></div>
        </div>
        <table>
          <thead>
            <tr><th>Member</th><th>Role</th><th>Contributions</th><th>Balance</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            ${[
              ['PM','Peter Mwangi','peter@email.com','Deacon','KSh 48,000','KSh 0','#10b981','s-active','Active','linear-gradient(135deg,#4F46E5,#0891b2)'],
              ['GO','Grace Otieno','grace@email.com','Secretary','KSh 36,000','KSh 0','#10b981','s-active','Active','linear-gradient(135deg,#059669,#06b6d4)'],
              ['DM','David Mutua','david@email.com','Member','KSh 24,000','KSh 2,000','#f59e0b','s-pending','Pending','linear-gradient(135deg,#7c3aed,#1e40af)'],
              ['AK','Agnes Kamau','agnes@email.com','Member','KSh 18,000','KSh 4,000','#ef4444','s-overdue','Overdue','linear-gradient(135deg,#b45309,#d97706)'],
              ['JO','James Ochieng','james@email.com','Treasurer','KSh 60,000','KSh 0','#10b981','s-active','Active','linear-gradient(135deg,#065f46,#059669)'],
            ].map(([init,name,email,role,contrib,bal,balCol,pillClass,pillText,grad]) => `
              <tr>
                <td><div class="member-cell"><div class="m-av" style="background:${grad}">${init}</div><div><div class="m-name">${name}</div><div class="m-email">${email}</div></div></div></td>
                <td>${role}</td><td>${contrib}</td>
                <td style="color:${balCol};font-weight:600;">${bal}</td>
                <td><span class="status-pill ${pillClass}">${pillText}</span></td>
                <td><button class="btn-ghost-sm">View</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
        <div class="table-footer">
          <span class="table-count">Showing 5 of 148 members</span>
          <div class="pagination">
            <button class="btn-ghost-sm">← Prev</button>
            <button class="btn-pill sm">Next →</button>
          </div>
        </div>
      </div>`;
  }

  /* ── CONTRIBUTIONS ── */
  else if (section === 'contributions') {
    title.textContent = 'Contribution Management';
    body.innerHTML = `
      <div class="contrib-grid">
        <div class="form-card">
          <h3>Record Contribution</h3>
          <div class="form-group"><label>Member</label>
            <select class="finput fselect"><option>Select member...</option><option>Peter Mwangi</option><option>Grace Otieno</option><option>David Mutua</option></select>
          </div>
          <div class="form-group"><label>Category</label>
            <select class="finput fselect"><option>Monthly Contribution</option><option>Harambee</option><option>Welfare Fund</option><option>Special Collection</option></select>
          </div>
          <div class="form-group"><label>Amount (KSh)</label>
            <div class="amount-wrap"><span class="amount-prefix">KSh</span><input class="finput" type="number" placeholder="0.00"></div>
          </div>
          <div class="form-group"><label>Payment Method</label>
            <select class="finput fselect"><option>M-Pesa</option><option>Bank Transfer</option><option>Cash</option><option>Cheque</option></select>
          </div>
          <div class="form-group"><label>Reference / Transaction ID</label><input class="finput" placeholder="e.g. QHE7XXXXXX"></div>
          <div class="form-group"><label>Notes (optional)</label><input class="finput" placeholder="Any notes..."></div>
          <button class="btn-pill form-btn" onclick="showContribSuccess(this)">Record Contribution ✓</button>
        </div>
        <div>
          <div class="table-card" style="margin-bottom:1rem;">
            <div class="table-top">
              <h3>Recent Contributions</h3>
              <div class="search-box">🔍 <input placeholder="Search..."></div>
            </div>
            <table>
              <thead><tr><th>Member</th><th>Category</th><th>Amount</th><th>Method</th><th>Date</th><th>Receipt</th></tr></thead>
              <tbody>
                <tr><td>Peter Mwangi</td><td>Monthly</td><td style="color:var(--emerald);font-weight:600;">KSh 2,000</td><td>M-Pesa</td><td>Today</td><td><button class="btn-ghost-sm">📄</button></td></tr>
                <tr><td>Grace Otieno</td><td>Harambee</td><td style="color:var(--emerald);font-weight:600;">KSh 5,000</td><td>M-Pesa</td><td>Today</td><td><button class="btn-ghost-sm">📄</button></td></tr>
                <tr><td>David Mutua</td><td>Monthly</td><td style="color:var(--emerald);font-weight:600;">KSh 2,000</td><td>Cash</td><td>Jun 12</td><td><button class="btn-ghost-sm">📄</button></td></tr>
                <tr><td>Agnes Kamau</td><td>Monthly</td><td style="color:var(--amber);font-weight:600;">KSh 1,000</td><td>Bank</td><td>Jun 10</td><td><button class="btn-ghost-sm">📄</button></td></tr>
              </tbody>
            </table>
          </div>
          <div class="kpi-grid" style="grid-template-columns:1fr 1fr;">
            <div class="kpi-card kpi-indigo"><div class="kpi-label">This Month</div><div class="kpi-val" style="font-size:1.3rem;">KSh 87,500</div><div class="kpi-delta up">↑ 18.2%</div></div>
            <div class="kpi-card kpi-emerald"><div class="kpi-label">Collected Today</div><div class="kpi-val" style="font-size:1.3rem;">KSh 7,000</div><div class="kpi-delta up">2 payments</div></div>
          </div>
        </div>
      </div>`;
  }

  /* ── REPORTS ── */
  else if (section === 'reports') {
    title.textContent = 'Reports & Exports';
    body.innerHTML = `
      <div class="reports-grid">
        ${[
          ['📊','rgba(79,70,229,.15)','Monthly Financial Report','Full income and expense summary with charts and member breakdown. June 2025.'],
          ['🏥','rgba(16,185,129,.15)','Welfare Fund Report','Disbursements, claims, balances, and beneficiary report with full audit trail.'],
          ['🎯','rgba(245,158,11,.15)','Event Performance Report','Fundraising event analytics, contributor list, and goal achievement breakdown.'],
          ['👤','rgba(139,92,246,.15)','Member Statements','Individual contribution history and balance statements for all or specific members.'],
        ].map(([icon,bg,title,desc]) => `
          <div class="report-card">
            <div class="report-ico" style="background:${bg}">${icon}</div>
            <h3>${title}</h3>
            <p>${desc}</p>
            <div class="report-btns">
              <button class="btn-pill sm">📥 PDF</button>
              <button class="btn-ghost-sm">📋 CSV</button>
            </div>
          </div>`).join('')}
      </div>
      <div class="chart-card">
        <div class="chart-head"><div class="chart-title">Annual Financial Overview — 2025</div></div>
        <svg class="svg-chart" viewBox="0 0 600 170">
          <defs>
            <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#4F46E5"/>
              <stop offset="100%" stop-color="#1e3a8a"/>
            </linearGradient>
          </defs>
          ${['Jan','Feb','Mar','Apr','May','Jun'].map((m, i) => {
            const heights = [60, 72, 68, 95, 88, 115];
            const h = heights[i]; const x = 40 + i * 92;
            return `<rect x="${x}" y="${145-h}" width="45" height="${h}" rx="5" fill="url(#bg1)" opacity="${(0.6 + i * 0.07).toFixed(2)}"/>
                    <text x="${x+22}" y="158" fill="#4A5B7A" font-size="9" text-anchor="middle" font-family="Inter">${m}</text>`;
          }).join('')}
        </svg>
      </div>`;
  }

  /* ── ANALYTICS ── */
  else if (section === 'analytics') {
    title.textContent = 'Analytics & Insights';
    body.innerHTML = `
      <div class="ai-block" style="margin-bottom:1.5rem;">
        <div class="ai-block-head">
          <div class="ai-ico">🤖</div>
          <div>
            <div class="ai-block-title">AI-Powered Financial Intelligence</div>
            <div class="ai-block-sub">Predictive analytics · Anomaly detection · Trend forecasting</div>
          </div>
        </div>
        <div class="ai-items">
          <div class="ai-item"><div class="ai-dot" style="background:var(--emerald)"></div><strong>Trend:</strong>&nbsp;Contributions peak on last Friday of each month. Schedule events accordingly.</div>
          <div class="ai-item"><div class="ai-dot" style="background:var(--amber)"></div><strong>Anomaly:</strong>&nbsp;John Doe's contribution pattern changed — usually KSh 2,000/mo, this month KSh 500.</div>
          <div class="ai-item"><div class="ai-dot" style="background:var(--indigo2)"></div><strong>Forecast:</strong>&nbsp;At current growth rate, contributions will exceed KSh 600,000 by August 2025.</div>
          <div class="ai-item"><div class="ai-dot" style="background:var(--purple)"></div><strong>Insight:</strong>&nbsp;85% of welfare requests approved within 48 hours. Treasurer and Secretary top performers.</div>
        </div>
      </div>
      <div class="kpi-grid">
        <div class="kpi-card kpi-indigo"><div class="kpi-label">Contribution Rate</div><div class="kpi-val">91.2%</div><div class="kpi-delta up">↑ Of members active</div></div>
        <div class="kpi-card kpi-emerald"><div class="kpi-label">Avg. Contribution</div><div class="kpi-val">KSh 3,291</div><div class="kpi-delta up">↑ Per member/month</div></div>
        <div class="kpi-card kpi-cyan"><div class="kpi-label">Welfare Claims</div><div class="kpi-val">8 Claims</div><div class="kpi-delta neutral">This month</div></div>
        <div class="kpi-card kpi-amber"><div class="kpi-label">Collection Rate</div><div class="kpi-val">87.5%</div><div class="kpi-delta up">↑ Of target collected</div></div>
        <div class="kpi-card kpi-purple"><div class="kpi-label">Retention Rate</div><div class="kpi-val">96.2%</div><div class="kpi-delta up">Members retained</div></div>
        <div class="kpi-card kpi-indigo"><div class="kpi-label">Fund Growth YoY</div><div class="kpi-val">+34.8%</div><div class="kpi-delta up">↑ Excellent performance</div></div>
      </div>`;
  }

  /* ── SETTINGS ── */
  else if (section === 'settings') {
    title.textContent = 'Organization Settings';
    body.innerHTML = `
      <div class="settings-layout">
        <nav class="settings-nav">
          <a class="active">🏢 Organization</a>
          <a>👥 Roles</a>
          <a>💰 Categories</a>
          <a>🔔 Notifications</a>
          <a>🎨 Branding</a>
          <a>🔒 Security</a>
        </nav>
        <div>
          <div class="settings-card">
            <h3>Organization Details</h3>
            <div class="form-row">
              <div class="form-group"><label>Organization Name</label><input class="finput" value="Westlands Community Church"></div>
              <div class="form-group"><label>Type</label><select class="finput fselect"><option selected>Church</option></select></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Contact Email</label><input class="finput" value="info@westlandschurch.co.ke"></div>
              <div class="form-group"><label>Phone</label><input class="finput" value="+254 700 000 000"></div>
            </div>
            <div class="form-group"><label>Location</label><input class="finput" value="Westlands, Nairobi"></div>
            <button class="btn-pill">Save Changes</button>
          </div>
          <div class="settings-card">
            <h3>Contribution Categories</h3>
            <div style="display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem;">
              ${['Monthly Contribution','Harambee Fund','Welfare Fund','Special Collection','Building Fund'].map(c =>
                `<div class="cat-item"><span>${c}</span><button class="btn-ghost-sm">Edit</button></div>`
              ).join('')}
            </div>
            <button class="btn-ghost-sm">+ Add Category</button>
          </div>
        </div>
      </div>`;
  }
}

/* ─────────────────────────────────────────────
   CONTRIBUTION SUCCESS TOAST
───────────────────────────────────────────── */
function showContribSuccess(btn) {
  btn.textContent = '✓ Recorded!';
  btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
  setTimeout(() => {
    btn.textContent = 'Record Contribution ✓';
    btn.style.background = '';
  }, 2000);
}

/* ─────────────────────────────────────────────
   CHART TAB INTERACTIVITY
───────────────────────────────────────────── */
function addChartTabInteractivity() {
  document.querySelectorAll('.chart-tabs').forEach(tabs => {
    tabs.querySelectorAll('.ctab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.querySelectorAll('.ctab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  });
}

/* ─────────────────────────────────────────────
   LIVE DISPLAY SIMULATION
   [BACKEND] Replace with WebSocket / SSE feed:
   ws://your-server/ws/events/{id}/live
───────────────────────────────────────────── */
const NAMES = [
  '💎 Deacon Peter Mwangi','🌟 Sister Grace Otieno','✨ Brother David Mutua',
  '⭐ Mary Njeri','🎖 Pastor John K.','🌺 Agnes Wambua','💫 Anonymous',
  '🏅 Elder Samuel O.','🌟 Youth Group','✨ Mama Sarah',
];
let liveAmount = 187500;
const liveTarget = 300000;

function startLiveSimulation() {
  setInterval(() => {
    if (liveAmount >= liveTarget) return;
    const add = Math.floor(Math.random() * 5000) + 500;
    liveAmount = Math.min(liveAmount + add, liveTarget);
    const pct = ((liveAmount / liveTarget) * 100).toFixed(1);
    const remaining = liveTarget - liveAmount;

    const amountEl    = document.getElementById('live-amount');
    const barEl       = document.getElementById('live-bar');
    const pctEl       = document.getElementById('live-pct');
    const remainingEl = document.getElementById('live-remaining');
    // Also update hero card if visible
    const heroAmt     = document.getElementById('hero-amount');
    const heroBar     = document.getElementById('hero-bar');
    const heroPct     = document.getElementById('hero-pct');

    if (amountEl) amountEl.textContent = 'KSh ' + liveAmount.toLocaleString();
    if (barEl)    barEl.style.width    = pct + '%';
    if (pctEl)    pctEl.textContent    = pct + '% reached';
    if (remainingEl) remainingEl.textContent = 'KSh ' + remaining.toLocaleString() + ' to go';
    if (heroAmt)  heroAmt.textContent  = 'KSh ' + liveAmount.toLocaleString();
    if (heroBar)  heroBar.style.width  = pct + '%';
    if (heroPct)  heroPct.textContent  = pct + '% reached';

    // Add new contributor to feed
    const feed = document.getElementById('live-feed');
    if (feed) {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const amt  = add.toLocaleString();
      const item = document.createElement('div');
      item.className = 'live-contrib';
      item.innerHTML = `<div class="lc-rank">${name.split(' ')[0]}</div><div class="lc-name">${name.slice(name.indexOf(' ')+1)}</div><div class="lc-amt">KSh ${amt}</div>`;
      item.style.opacity = '0';
      feed.insertBefore(item, feed.firstChild);
      setTimeout(() => { item.style.opacity = '1'; item.style.transition = 'opacity .4s'; }, 50);
      // Keep max 6 items
      while (feed.children.length > 6) feed.removeChild(feed.lastChild);
    }
  }, 4000);
}

/* ─────────────────────────────────────────────
   BENTO CARD KEYBOARD NAV
───────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.classList.contains('bento-card')) {
    e.target.querySelector('.bento-cta')?.click();
  }
});

/* ─────────────────────────────────────────────
   BOOT
───────────────────────────────────────────── */
showDash('overview');
startLiveSimulation();