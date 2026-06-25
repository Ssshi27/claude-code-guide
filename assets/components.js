// ═══════ 计算站点根路径 ═══════
function getSiteRoot() {
  // GitHub Pages: https://ssshi27.github.io/claude-code-guide/posts/xxx/
  // 本地: file:///D:/xxx/index.html
  const loc = location;
  if (loc.protocol === 'file:') {
    // 本地文件，用相对路径
    const depth = (loc.pathname.match(/\/posts\//)) ? '../../' : './';
    return depth;
  }
  // GitHub Pages 或其他服务器
  const pathParts = loc.pathname.split('/').filter(Boolean);
  // 第一段是仓库名（github.io 的情况）
  if (loc.hostname.includes('github.io') && pathParts.length > 0) {
    return '/' + pathParts[0] + '/';
  }
  return '/';
}

// ═══════ Right Sidebar Component ═══════
function loadRightSidebar() {
  const el = document.getElementById('rightSidebar');
  if (!el) return;
  const root = getSiteRoot();
  el.innerHTML = `
  <a href="${root}" class="right-home-btn"><i class="ri-home-4-line"></i> 返回主页</a>
  <div class="profile-card">
    <div class="profile-avatar">👨‍💻</div>
    <div class="profile-name">Ssshi27</div>
    <div class="profile-motto">永恒的唯物主义</div>
    <div class="profile-stats">
      <div class="text-center"><div class="stat-num">2</div><div class="stat-label">文章</div></div>
      <div class="text-center"><div class="stat-num">5</div><div class="stat-label">标签</div></div>
      <div class="text-center"><div class="stat-num">2</div><div class="stat-label">分类</div></div>
    </div>
    <div class="profile-links">
      <a href="https://github.com/Ssshi27" target="_blank" title="GitHub"><i class="ri-github-fill"></i></a>
    </div>
  </div>
  <div class="right-section">
    <div class="right-section-title"><i class="ri-time-line"></i> 最新文章</div>
    <ul>
      <li><a href="${root}posts/cpp-lambda-netlink/">C++ Lambda 与 Netlink</a><span class="date">06-25</span></li>
      <li><a href="${root}posts/claude-code-guide/">Claude Code 指南</a><span class="date">06-24</span></li>
    </ul>
  </div>
  <div class="right-section">
    <div class="right-section-title"><i class="ri-price-tag-3-line"></i> 标签</div>
    <div class="tag-cloud">
      <span style="color:#a78bfa;border-color:rgba(167,139,250,.3);background:rgba(167,139,250,.06)">C++</span>
      <span style="color:#34d399;border-color:rgba(52,211,153,.3);background:rgba(52,211,153,.06)">Linux</span>
      <span style="color:#fbbf24;border-color:rgba(251,191,36,.3);background:rgba(251,191,36,.06)">AI</span>
      <span style="color:#60a5fa;border-color:rgba(96,165,250,.3);background:rgba(96,165,250,.06)">VS Code</span>
      <span style="color:#f472b6;border-color:rgba(244,114,182,.3);background:rgba(244,114,182,.06)">网络编程</span>
    </div>
  </div>`;
}

// ═══════ Sidebar highlight ═══════
function initSidebarHighlight() {
  const links = document.querySelectorAll('.sidebar-nav a');
  const sections = [];
  links.forEach(link => {
    const id = link.getAttribute('href');
    if (!id || !id.startsWith('#')) return;
    const el = document.getElementById(id.substring(1));
    if (el) sections.push({ el, link });
  });
  function update() {
    let current = sections[0];
    for (const s of sections) {
      if (s.el.getBoundingClientRect().top <= 100) current = s;
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
