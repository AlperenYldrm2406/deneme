// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
}

// ===== HERO PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['#6c5ce7', '#00cec9', '#fd79a8', '#0984e3'];

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    container.appendChild(particle);
  }
}

createParticles();

// ===== SCROLL REVEAL ANIMATIONS =====
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .reveal-stagger');
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== ACTIVE NAV LINK HIGHLIGHT =====
function highlightNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.querySelectorAll('a').forEach(link => {
    link.classList.remove('active');
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (linkHref === 'index.html' && currentPath === '')) {
      link.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', highlightNav);

// ===== CURSOR GLOW EFFECT ON CARDS =====
document.querySelectorAll('.team-card, .contact-info-item').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(108, 92, 231, 0.06), rgba(255,255,255,0.03))`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = 'rgba(255, 255, 255, 0.03)';
  });
});

// ===== TILT EFFECT ON TEAM CARDS =====
document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * 8;
    const tiltY = (x - 0.5) * -8;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CONSOLE EASTER EGG =====
console.log('%c🧠 YZBBT', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #6c5ce7, #00cec9); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cYapay Zeka ve Bilgisayar Bilimleri Topluluğu', 'font-size: 14px; color: #8a8a9a;');
console.log('%cKSBÜ - Kütahya Sağlık Bilimleri Üniversitesi', 'font-size: 12px; color: #00cec9;');

// ===== STATS COUNTER ANIMATION =====
function animateCounter(el, target, duration) {
  if (target === 0) return; // sıfır ise animasyon gerekmez
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = start;
  }, 16);
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  let counted = false;
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.stat-number').forEach(el => {
          const target = parseInt(el.getAttribute('data-target'), 10);
          animateCounter(el, target, 1200);
        });
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

// ===== YAPAY ZEKA & MESLEKLER PANEL =====
(function initYzPanel() {
  const overlay        = document.getElementById('yzOverlay');
  const openBtn        = document.getElementById('openYzPanel');
  const closeBtn       = document.getElementById('closeYzPanel');
  const sectorsView    = document.getElementById('yzSectorsView');
  const profsView      = document.getElementById('yzProfessionsView');
  const detailView     = document.getElementById('yzDetailView');
  const sectorsGrid    = document.getElementById('yzSectorsGrid');
  const profsGrid      = document.getElementById('yzProfessionsGrid');
  const sectorTitle    = document.getElementById('yzSectorTitle');
  const backBtn        = document.getElementById('yzBackBtn');
  const detailBackBtn  = document.getElementById('yzDetailBackBtn');
  const detailContent  = document.getElementById('yzDetailContent');

  if (!overlay || !openBtn) return;

  const yzData = window.YZ_DATA;
  let activeSector = null;

  // Sektörleri render et
  function renderSectors() {
    sectorsGrid.innerHTML = '';
    if (!yzData || !yzData.sectors) return;

    yzData.sectors.forEach(sector => {
      const card = document.createElement('div');
      card.className = 'yz-sector-card';
      card.innerHTML = `
        <span class="yz-sector-icon">${sector.icon || '💼'}</span>
        <div class="yz-sector-name">${sector.name}</div>
        <div class="yz-sector-count">${sector.professions ? sector.professions.length : 0} Meslek Alanı</div>
      `;
      card.addEventListener('click', () => showProfessions(sector));
      sectorsGrid.appendChild(card);
    });
  }

  // Meslekleri render et
  function showProfessions(sector) {
    activeSector = sector;
    sectorTitle.textContent = sector.name + ' ve Yapay Zeka';
    profsGrid.innerHTML = '';
    
    if (!sector.professions) return;

    sector.professions.forEach(prof => {
      const card = document.createElement('div');
      card.className = 'yz-profession-card';
      card.innerHTML = `
        <div class="yz-profession-name">${prof.name}</div>
        <div class="yz-profession-desc">${prof.shortDesc || ''}</div>
      `;
      card.addEventListener('click', () => showDetail(prof));
      profsGrid.appendChild(card);
    });

    sectorsView.classList.add('yz-hidden');
    detailView.classList.add('yz-hidden');
    profsView.classList.remove('yz-hidden');
  }

  // Meslek Detayını Göster
  function showDetail(prof) {
    // Uzak resim yolunu oluştur
    let imgUrl = prof.imagePath || '';
    if (imgUrl.startsWith('images/')) {
      imgUrl = 'https://raw.githubusercontent.com/yigitbozbulut657/Yapay-zeka-Meslekler/main/' + imgUrl;
    } else if (!imgUrl) {
      imgUrl = 'https://via.placeholder.com/800x400?text=Görsel+Bulunamadı';
    }

    // Proje listelerini HTML formatına çevir
    const pastHTML = (prof.pastProjects || []).map(p => `<li>${p}</li>`).join('');
    const futureHTML = (prof.futureProjects || []).map(p => `<li>${p}</li>`).join('');

    // Paragraf ayrımını yap
    const articleHTML = (prof.article || '').split('\n\n').map(p => `<p>${p}</p>`).join('');

    detailContent.innerHTML = `
      <div class="yz-detail-card">
        <div class="yz-detail-header">
          <img src="${imgUrl}" alt="${prof.name}" class="yz-detail-image" onerror="this.src='https://via.placeholder.com/800x400?text=Görsel+Bulunamadı'">
          <div class="yz-detail-image-overlay">
            <h2 class="yz-detail-title">${prof.name}</h2>
            <div class="yz-detail-subtitle">YAPAY ZEKA ENTEGRASYONU</div>
          </div>
        </div>
        <div class="yz-detail-grid">
          <div class="yz-article-section">
            <h3>👥 Genel Bakış</h3>
            ${articleHTML}
          </div>
          <div class="yz-projects-section">
            <div class="yz-project-box">
              <h4>🎯 Mevcut Projeler</h4>
              <ul class="yz-project-list">
                ${pastHTML || '<li>Mevcut proje bilgisi bulunmamaktadır.</li>'}
              </ul>
            </div>
            <div class="yz-project-box">
              <h4>🔮 Gelecek Vizyonu</h4>
              <ul class="yz-project-list">
                ${futureHTML || '<li>Gelecek vizyonu bilgisi bulunmamaktadır.</li>'}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    sectorsView.classList.add('yz-hidden');
    profsView.classList.add('yz-hidden');
    detailView.classList.remove('yz-hidden');
  }

  function showSectors() {
    detailView.classList.add('yz-hidden');
    profsView.classList.add('yz-hidden');
    sectorsView.classList.remove('yz-hidden');
  }

  function openPanel() {
    renderSectors();
    showSectors();
    overlay.classList.add('yz-open');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    overlay.classList.remove('yz-open');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);
  backBtn.addEventListener('click', showSectors);
  
  detailBackBtn.addEventListener('click', () => {
    if (activeSector) {
      showProfessions(activeSector);
    } else {
      showSectors();
    }
  });

  // Overlay dışına tıklayınca kapat (yz-panel dışı)
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePanel();
  });

  // ESC ile kapat
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('yz-open')) closePanel();
  });
})();
