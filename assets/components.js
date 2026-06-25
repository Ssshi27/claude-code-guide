// ═══════ Right Sidebar Component ═══════
function loadRightSidebar() {
  const html = `
  <div class="profile-card">
    <div class="profile-avatar">👨‍💻</div>
    <div class="profile-name">Ssshi27</div>
    <div class="profile-motto">永恒的唯物主义</div>
    <div class="profile-stats">
      <div class="stat"><div class="stat-num">2</div><div class="stat-label">文章</div></div>
      <div class="stat"><div class="stat-num">5</div><div class="stat-label">标签</div></div>
      <div class="stat"><div class="stat-num">2</div><div class="stat-label">分类</div></div>
    </div>
    <div class="profile-links">
      <a href="https://github.com/Ssshi27" target="_blank" title="GitHub">🐙</a>
    </div>
  </div>
  <div class="right-section">
    <div class="right-section-title">🕐 最新文章</div>
    <ul>
      <li><a href="/posts/cpp-lambda-netlink/">C++ Lambda 与 Netlink</a><span class="date">06-25</span></li>
      <li><a href="/posts/claude-code-guide/">Claude Code 使用指南</a><span class="date">06-24</span></li>
    </ul>
  </div>
  <div class="right-section">
    <div class="right-section-title">🏷️ 标签</div>
    <div class="tag-cloud">
      <span style="background:#eef2ff;color:#6366f1;">C++</span>
      <span style="background:#ecfdf5;color:#10b981;">Linux</span>
      <span style="background:#fef3c7;color:#d97706;">AI</span>
      <span style="background:#ede9fe;color:#7c3aed;">VS Code</span>
      <span style="background:#fce7f3;color:#db2777;">网络编程</span>
    </div>
  </div>`;
  const el = document.getElementById('rightSidebar');
  if (el) el.innerHTML = html;
}

// ═══════ Sidebar scroll highlight ═══════
function initSidebarHighlight() {
  const links = document.querySelectorAll('.sidebar-nav a');
  const sections = [];
  links.forEach(link => {
    const id = link.getAttribute('href').substring(1);
    const el = document.getElementById(id);
    if (el) sections.push({ el, link });
  });
  function update() {
    let current = sections[0];
    for (const s of sections) {
      if (s.el.getBoundingClientRect().top <= 80) current = s;
    }
    links.forEach(l => l.classList.remove('active'));
    if (current) current.link.classList.add('active');
  }
  window.addEventListener('scroll', update);
  update();
}

// ═══════ Init ═══════
document.addEventListener('DOMContentLoaded', () => {
  loadRightSidebar();
  initSidebarHighlight();
});
