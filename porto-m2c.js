/**
 * MilitaryToCorp (M2C) — Porto SEO 2 Interactive Logic
 * Updated with exact M2C positions, links, and modal behavior.
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 0. Reveal Porto appear-animations (theme.js is not loaded on this page)
  // ---------------------------------------------------------------------------
  function initAppearAnimations() {
    const items = document.querySelectorAll('.appear-animation');
    if (!items.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const play = (el) => {
      if (el.classList.contains('appear-animation-visible')) return;

      const anim = el.getAttribute('data-appear-animation');
      const delay = el.getAttribute('data-appear-animation-delay');
      const duration = el.getAttribute('data-appear-animation-duration');

      if (!reduceMotion && anim) {
        el.style.animationDelay = delay
          ? (/ms$|s$/.test(delay) ? delay : delay + 'ms')
          : '0ms';
        el.style.animationDuration = duration
          ? (/ms$|s$/.test(duration) ? duration : duration + 'ms')
          : '900ms';
        el.style.animationFillMode = 'both';
        el.classList.add(anim);
      }

      el.classList.add('appear-animation-visible');
    };

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(play);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        play(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '120px 0px', threshold: 0.01 });

    items.forEach((el) => observer.observe(el));
  }

  initAppearAnimations();

  // ---------------------------------------------------------------------------
  // 1. Toast Notification Utility
  // ---------------------------------------------------------------------------
  const toastEl = document.getElementById('portoToast');
  const toastMsg = document.getElementById('portoToastMsg');
  let toastTimeout = null;

  function showToast(message, duration = 4000) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, duration);
  }
  window.showPortoToast = showToast;

  // ---------------------------------------------------------------------------
  // 2. Jobs Database — Exact User Roles & Links
  // ---------------------------------------------------------------------------
  const jobsData = [
    {
      id: 'M2C10738',
      title: 'Technical Support Manager',
      category: 'tech',
      company: 'A leading Tech & IT Company',
      location: 'Bangalore',
      type: 'Full-Time',
      posted: '3 weeks ago',
      isNew: true,
      skills: ['Technical Support'],
      desc: 'Lead High-Performance Teams: Manage a support team to achieve business objectives...',
      applyUrl: 'https://www.militarytocorp.com/job-seeker/login',
      detailsUrl: 'https://www.militarytocorp.com/job-details/M2C10738',
      experience: 'Ex-Officers / Signals / Technical Corps with leadership experience',
      responsibilities: [
        'Lead High-Performance Teams: Manage a support team to achieve business objectives',
        'Direct 24/7 technical incident response and SLA compliance',
        'Mentor cross-functional technical engineers on operational discipline'
      ]
    },
    {
      id: 'M2C10736',
      title: 'Audit Team Leader',
      category: 'leadership',
      company: 'E-Commerce',
      location: 'Amritsar',
      type: 'Full-Time',
      posted: '1 month ago',
      isNew: false,
      skills: ['Internal Audit', 'Risk Management'],
      desc: 'Job Role: Audit Team Leader Job Locations: Amritsar, Punjab, India Required...',
      applyUrl: 'https://www.militarytocorp.com/job-seeker/login',
      detailsUrl: 'https://www.militarytocorp.com/job-details/M2C10736',
      experience: 'Ex-Service Officers with administrative or vigilance audit background',
      responsibilities: [
        'Execute regular inventory audits and high-value asset reconciliations',
        'Investigate transit loss, pilferage risks, and supply chain deviations',
        'Deliver executive risk assessment briefings to operational heads'
      ]
    },
    {
      id: 'M2C10735',
      title: 'Sr Manager- Security and Vigilance',
      category: 'security',
      company: 'Leading Telecom Infra Company',
      location: 'Kolkata',
      type: 'Full-Time',
      posted: '1 month ago',
      isNew: false,
      skills: ['Security Command', 'Perimeter Vigilance'],
      desc: 'Hiring for Sr. Manager – Security & Vigilance | Kolkata Leadership role with...',
      applyUrl: 'https://www.militarytocorp.com/job-seeker/login',
      detailsUrl: 'https://www.militarytocorp.com/job-details/M2C10735',
      experience: 'Ex-Armed Forces Officers (Major / Lt Col or equivalent)',
      responsibilities: [
        'Steer physical asset protection and emergency readiness across critical telecom hubs',
        'Manage security personnel deployments and rapid-reaction protocols',
        'Maintain liaison with law enforcement and regulatory authorities'
      ]
    },
    {
      id: 'M2C10734',
      title: 'Personal Security Officer',
      category: 'security',
      company: 'A leading real estate & property mgmt MNC',
      location: 'Bengaluru',
      type: 'Full-Time',
      posted: '1 month ago',
      isNew: false,
      skills: ['Personal Security', 'Executive Protection'],
      desc: 'Hiring Ex-Servicemen | Personal Security Officer (PSO) | Bangalore We are...',
      applyUrl: 'https://www.militarytocorp.com/job-seeker/login',
      detailsUrl: 'https://www.militarytocorp.com/job-details/M2C10734',
      experience: 'Ex-Servicemen / Commando / Special Forces veterans with impeccable records',
      responsibilities: [
        'Deliver close executive protection and discreet route reconnaissance',
        'Maintain contingency evacuation plans and medical protocols',
        'Uphold utmost discretion and professional protocol'
      ]
    },
    {
      id: 'M2C10733',
      title: 'Engineering Roles',
      category: 'tech',
      company: 'A Leading Education Society',
      location: 'Coimbatore',
      type: 'Full-Time',
      posted: '1 month ago',
      isNew: false,
      skills: ['Engineering Management', 'Infrastructure'],
      desc: 'Hiring Ex-Servicemen | Multiple Roles | Coimbatore Budget: 6–7.2 LPA We...',
      applyUrl: 'https://www.militarytocorp.com/job-seeker/login',
      detailsUrl: 'https://www.militarytocorp.com/job-details/M2C10733',
      experience: 'Ex-Corps of Engineers / EME / Technical Officers',
      responsibilities: [
        'Oversee multi-site facility utilities, electrical grids, and civil maintenance',
        'Lead planned preventative maintenance across technical departments',
        'Enforce workplace safety and environmental standards'
      ]
    }
  ];

  let currentCategory = 'all';
  let searchQuery = '';

  const jobsGrid = document.getElementById('portoJobsGrid');
  const countBadge = document.getElementById('portoJobsCount');
  const searchInput = document.getElementById('portoJobSearch');
  const filterBtns = document.querySelectorAll('.jobs-filter-btn');

  function renderJobs() {
    if (!jobsGrid) return;

    const filtered = jobsData.filter(job => {
      const matchCat = currentCategory === 'all' || job.category === currentCategory;
      const q = searchQuery.toLowerCase();
      const matchQ = !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.id.toLowerCase().includes(q) ||
        job.skills.some(s => s.toLowerCase().includes(q));
      return matchCat && matchQ;
    });

    if (countBadge) {
      countBadge.innerHTML = `Showing <strong>${filtered.length}</strong> positions`;
    }

    if (filtered.length === 0) {
      jobsGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="p-5 bg-white rounded-3 shadow-sm border">
            <i class="fas fa-search text-7 text-muted mb-3"></i>
            <h4 class="text-color-dark font-weight-bold mb-2">No matching positions found</h4>
            <p class="text-muted mb-3">Try adjusting your search keywords or switching to "All Positions".</p>
            <button type="button" class="btn btn-secondary btn-rounded px-4" id="resetJobSearch">Reset Filters</button>
          </div>
        </div>
      `;
      const resetBtn = document.getElementById('resetJobSearch');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentCategory = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          filterBtns.forEach(b => b.classList.toggle('is-active', b.dataset.category === 'all'));
          renderJobs();
        });
      }
      return;
    }

    jobsGrid.innerHTML = filtered.map(job => `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="job-card-porto">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="job-badge-id">Job ID - ${job.id}</span>
              <span class="text-1 text-muted"><i class="far fa-clock me-1"></i>${job.posted}</span>
            </div>
            <h3 class="job-title-porto">${job.title}</h3>
            <div class="job-meta-row">
              <span class="job-meta-item"><i class="fas fa-building"></i> Company - ${job.company}</span>
              <span class="job-meta-item"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
            </div>
            ${job.skills.length ? `
              <div class="job-meta-row mb-2">
                <span class="job-meta-item"><strong>Key Skills:</strong> ${job.skills.join(', ')}</span>
              </div>
            ` : ''}
            <p class="job-desc-snippet">${job.desc}</p>
          </div>
          <div class="pt-3 border-top mt-2 d-flex flex-wrap gap-2 job-card-actions">
            <a href="${job.applyUrl}" target="_blank" rel="noopener" class="btn btn-gradient btn-sm text-center font-weight-bold">
              Apply Now
            </a>
            <button type="button" class="btn btn-secondary btn-outline btn-sm font-weight-bold btn-view-job" data-job-id="${job.id}">
              View Details
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listeners to View Details buttons
    jobsGrid.querySelectorAll('.btn-view-job').forEach(btn => {
      btn.addEventListener('click', () => {
        const jId = btn.getAttribute('data-job-id');
        openJobModal(jId);
      });
    });
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentCategory = btn.getAttribute('data-category');
      renderJobs();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderJobs();
    });
  }

  // Initial render
  renderJobs();

  // ---------------------------------------------------------------------------
  // 3. Job Modal Handling
  // ---------------------------------------------------------------------------
  const jobModal = document.getElementById('portoJobModal');
  const jobModalClose = document.getElementById('portoModalClose');
  const modalJobId = document.getElementById('modalJobId');
  const modalJobTitle = document.getElementById('modalJobTitle');
  const modalJobCompany = document.getElementById('modalJobCompany');
  const modalJobLocation = document.getElementById('modalJobLocation');
  const modalJobType = document.getElementById('modalJobType');
  const modalJobDesc = document.getElementById('modalJobDesc');
  const modalJobExp = document.getElementById('modalJobExp');
  const modalJobResp = document.getElementById('modalJobResp');
  const modalJobSkills = document.getElementById('modalJobSkills');
  const modalHiddenId = document.getElementById('modalFormJobId');
  const modalDirectLink = document.getElementById('modalDirectLink');
  const jobAppForm = document.getElementById('portoJobAppForm');

  function openJobModal(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (!job || !jobModal) return;

    if (modalJobId) modalJobId.textContent = `Job ID - ${job.id}`;
    if (modalJobTitle) modalJobTitle.textContent = job.title;
    if (modalJobCompany) modalJobCompany.textContent = job.company;
    if (modalJobLocation) modalJobLocation.textContent = job.location;
    if (modalJobType) modalJobType.textContent = job.type;
    if (modalJobDesc) modalJobDesc.textContent = job.desc;
    if (modalJobExp) modalJobExp.textContent = job.experience || 'Ex-Armed Forces Personnel / Officers';
    if (modalDirectLink) modalDirectLink.href = job.detailsUrl;

    if (modalJobResp) {
      modalJobResp.innerHTML = (job.responsibilities && job.responsibilities.length)
        ? job.responsibilities.map(r => `<li>${r}</li>`).join('')
        : '<li>Lead operational teams and execute strategic corporate objectives with military discipline.</li>';
    }

    if (modalJobSkills) {
      modalJobSkills.innerHTML = job.skills.map(s => `<span class="job-skill-chip">${s}</span>`).join(' ');
    }

    if (modalHiddenId) modalHiddenId.value = job.id;

    jobModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeJobModal() {
    if (!jobModal) return;
    jobModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (jobModalClose) {
    jobModalClose.addEventListener('click', closeJobModal);
  }

  if (jobModal) {
    jobModal.addEventListener('click', (e) => {
      if (e.target === jobModal) closeJobModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && jobModal && jobModal.classList.contains('is-open')) {
      closeJobModal();
    }
  });

  // Application form submit
  if (jobAppForm) {
    jobAppForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const applicantName = document.getElementById('applicantName')?.value || 'Candidate';
      const jId = modalHiddenId?.value || 'M2C Role';

      closeJobModal();
      jobAppForm.reset();
      showToast(`Thank you, ${applicantName}! Your application for ${jId} has been successfully submitted to M2C Talent Directors.`);
    });
  }

  // ---------------------------------------------------------------------------
  // 4. Consultation Form
  // ---------------------------------------------------------------------------
  const auditForm = document.getElementById('portoAuditForm');
  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = auditForm.querySelector('input[type="email"]')?.value || 'your email';
      auditForm.reset();
      showToast(`Inquiry received for ${email}. M2C Talent Directors will connect with you shortly.`);
    });
  }

  // ---------------------------------------------------------------------------
  // 5. Floating Help Button
  // ---------------------------------------------------------------------------
  const floatHelp = document.getElementById('portoFloatHelp');
  if (floatHelp) {
    floatHelp.addEventListener('click', () => {
      showToast('Need assistance? Email: info@militarytocorp.com or visit contact-us.html', 5000);
    });
  }

  // ---------------------------------------------------------------------------
  // 6. Sticky Header Scroll Effect
  // ---------------------------------------------------------------------------
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('sticky-active');
    } else {
      header.classList.remove('sticky-active');
    }
  }, { passive: true });

  // ---------------------------------------------------------------------------
  // 7. Mobile nav toggle (reliable fallback for hamburger)
  // ---------------------------------------------------------------------------
  const navToggle = document.querySelector('.header-btn-collapse-nav');
  const mainNav = document.getElementById('portoMainNavbar');

  if (navToggle && mainNav) {
    const setNavOpen = (open) => {
      mainNav.classList.toggle('show', open);
      mainNav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.classList.toggle('is-active', open);
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars', !open);
        icon.classList.toggle('fa-times', open);
      }
    };

    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const willOpen = !mainNav.classList.contains('show') && !mainNav.classList.contains('is-open');
      setNavOpen(willOpen);
    });

    mainNav.querySelectorAll('a.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1200) setNavOpen(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth >= 1200) return;
      if (!mainNav.classList.contains('show') && !mainNav.classList.contains('is-open')) return;
      if (mainNav.contains(e.target) || navToggle.contains(e.target)) return;
      setNavOpen(false);
    });
  }

})();
