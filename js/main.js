/**
 * Doaa Mohamed Salah - Portfolio Main Script
 * Classy Editorial & Luxury Minimalist Edition
 * Palette: #181818 | #242424 | #C09891 | #BEA8A7 | #F4DBD8
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Light / Dark Classy Theme System
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeToggleBtnMobile = document.getElementById('theme-toggle-btn-mobile');
  const themeIcon = document.getElementById('theme-icon');
  const themeIconMobile = document.getElementById('theme-icon-mobile');

  function getPreferredTheme() {
    const saved = localStorage.getItem('classy-portfolio-theme');
    if (saved) return saved;
    return 'dark'; // Dark Mode default (#181818)
  }

  function applyTheme(theme, animate = true) {
    const htmlEl = document.documentElement;
    if (theme === 'light') {
      htmlEl.classList.remove('dark');
      htmlEl.classList.add('light');
    } else {
      htmlEl.classList.remove('light');
      htmlEl.classList.add('dark');
    }
    localStorage.setItem('classy-portfolio-theme', theme);

    const isLight = theme === 'light';
    const newClass = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

    [themeIcon, themeIconMobile].forEach(icon => {
      if (!icon) return;
      if (animate && typeof gsap !== 'undefined') {
        gsap.to(icon, {
          rotate: '+=360',
          scale: 0.6,
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            icon.className = `${newClass} text-sm`;
            gsap.to(icon, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2)' });
          }
        });
      } else {
        icon.className = `${newClass} text-sm`;
      }
    });

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }

  // Initial Theme Setup
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme, false);

  [themeToggleBtn, themeToggleBtnMobile].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
        applyTheme(current === 'light' ? 'dark' : 'light', true);
      });
    }
  });


  // =========================================================================
  // 2. Lenis Smooth Scrolling Engine
  // =========================================================================
  let lenis;
  try {
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    }
  } catch (e) {
    console.warn('Lenis could not be initialized:', e);
  }


  // =========================================================================
  // 3. Ambient Background Glow Orbs Animation
  // =========================================================================
  if (typeof gsap !== 'undefined') {
    gsap.to('.glow-orb-1', {
      x: 'random(-50, 50)',
      y: 'random(-40, 40)',
      duration: 16,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    gsap.to('.glow-orb-2', {
      x: 'random(-40, 40)',
      y: 'random(-50, 50)',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Profile Picture Gentle Floating Animation (10px up/down over 4s)
    gsap.to('.hero-profile-floating', {
      y: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }


    // =========================================================================
  // 4. Ultra-Refined 3D Perspective Card Tilt (Max 5 Deg & Moving Sheen)
  // =========================================================================
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    // A. Desktop Mouse Move Subtle 3D Tilt (Clamped to max 4.5 degrees)
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle, expensive rotation: max 4.5 degrees
      const maxTilt = 4.5;
      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      // Cursor sheen spotlight positioning
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1200,
          scale: 1.008,
          duration: 0.35,
          ease: 'power2.out'
        });
      }
    });

    // B. Desktop Mouse Leave Smooth Reset
    card.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    });

    // C. Click / Tap 3D Spring Response
    const triggerSpring = (e) => {
      const rect = card.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : rect.left + rect.width / 2);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : rect.top + rect.height / 2);

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = -((y - centerY) / centerY) * 4;
      const tiltY = ((x - centerX) / centerX) * 4;

      if (typeof gsap !== 'undefined') {
        gsap.timeline()
          .to(card, {
            scale: 0.985,
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 1200,
            duration: 0.16,
            ease: 'power2.out'
          })
          .to(card, {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 0.85,
            ease: 'elastic.out(1, 0.45)'
          });
      }
    };

    card.addEventListener('pointerdown', (e) => {
      if (!e.target.closest('button, a, input, select')) {
        triggerSpring(e);
      }
    });
  });


  // =========================================================================
  // 5. Hero Entrance & Silky ScrollTrigger Reveals
  // =========================================================================
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    heroTl.fromTo('.hero-badge', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1.0, clearProps: 'transform' })
          .fromTo('.hero-subheading', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0, clearProps: 'transform' }, '-=0.75')
          .fromTo('.hero-heading', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, clearProps: 'transform' }, '-=0.8')
          .fromTo('.hero-role-wrap', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0, clearProps: 'transform' }, '-=0.8')
          .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.1, clearProps: 'transform' }, '-=0.8')
          .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.1, clearProps: 'transform' }, '-=0.8')
          .fromTo('.hero-meta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.0, clearProps: 'transform' }, '-=0.8')
          .fromTo('.hero-profile-floating', { opacity: 0, scale: 0.94, y: 35 }, { opacity: 1, scale: 1, y: 0, duration: 1.4, clearProps: 'transform' }, '-=1.0');

    initScrollTriggers();
  }

  function initScrollTriggers() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Section Headers: Gentle float up
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.fromTo(header,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
          },
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          clearProps: 'transform'
        }
      );
    });

    // Timeline Items
    gsap.utils.toArray('.timeline-card').forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
          },
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          clearProps: 'transform'
        }
      );
    });

    // Project Cards (Staggered Grid Reveal)
    const projectCards = gsap.utils.toArray('.project-card');
    if (projectCards.length > 0) {
      ScrollTrigger.batch('.project-card', {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.fromTo(batch,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.12,
              ease: 'expo.out',
              clearProps: 'transform'
            }
          );
        },
        once: true
      });
    }

    // Skill Category Cards (Staggered Grid Reveal)
    const skillCards = gsap.utils.toArray('.skill-category-card');
    if (skillCards.length > 0) {
      ScrollTrigger.batch('.skill-category-card', {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.fromTo(batch,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.10,
              ease: 'expo.out',
              clearProps: 'transform'
            }
          );
        },
        once: true
      });
    }

    // Certificate Cards (Staggered Grid Reveal)
    const certCards = gsap.utils.toArray('.open-cert-modal');
    if (certCards.length > 0) {
      ScrollTrigger.batch('.open-cert-modal', {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.fromTo(batch,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.14,
              ease: 'expo.out',
              clearProps: 'transform'
            }
          );
        },
        once: true
      });
    }

    // Contact Cards (Staggered Grid Reveal)
    const contactCards = gsap.utils.toArray('.contact-card');
    if (contactCards.length > 0) {
      ScrollTrigger.batch('.contact-card', {
        start: 'top 88%',
        onEnter: (batch) => {
          gsap.fromTo(batch,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.12,
              ease: 'expo.out',
              clearProps: 'transform'
            }
          );
        },
        once: true
      });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.stat-counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10);
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            innerText: target,
            duration: 2.0,
            snap: { innerText: 1 },
            ease: 'power3.out'
          });
        }
      });
    });
  }


  // =========================================================================
  // 6. Cinematic & Slower GSAP Preloader Sequence
  // =========================================================================
  const preloader = document.getElementById('preloader');
  const preloaderContent = document.getElementById('preloader-content');
  const preloaderPercent = document.getElementById('preloader-percent');
  const preloaderBar = document.getElementById('preloader-bar');

  if (preloader) {
    document.body.style.overflow = 'hidden';

    const loadProgress = { value: 0 };
    const preloaderTl = gsap.timeline();

    // 1. Soft fade-in of Monogram and "Doaa Mohamed Salah"
    preloaderTl.fromTo(preloaderContent,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }
    )
    // 2. Thin progress line in #C09891 gently filling
    .to(loadProgress, {
      value: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(loadProgress.value);
        const formatted = val < 10 ? `0${val}%` : `${val}%`;
        if (preloaderPercent) preloaderPercent.textContent = formatted;
        if (preloaderBar) preloaderBar.style.width = `${val}%`;
      }
    }, '-=0.35')
    // 3. Brief elegant pause at 100%
    .to({}, { duration: 0.25 })
    // 4. Soft fade out of typography
    .to(preloaderContent, {
      opacity: 0,
      y: -20,
      duration: 0.45,
      ease: 'power3.in'
    })
    // 5. Silky smooth slide-up reveal (ease: "power4.inOut", duration: 1.5)
    .to(preloader, {
      yPercent: -100,
      duration: 1.5,
      ease: 'power4.inOut',
      onComplete: () => {
        preloader.style.display = 'none';
        document.body.style.overflow = '';
      }
    }, '+=0.05');

    // 6. Start Hero entrance animations as the preloader slides up
    preloaderTl.add(() => {
      initHeroAnimations();
    }, '-=1.1');

  } else {
    initHeroAnimations();
  }


// =========================================================================
  // 7. Bilingual Translation Dictionary
  // =========================================================================
  const translations = {
    en: {
      navAbout: "About",
      navExp: "Experience",
      navProjects: "Projects",
      navSkills: "Skills",
      navCerts: "Certifications",
      navContact: "Contact",
      btnViewCV: "View CV",
      badgeAvailable: "Open to Web Development & Data Engineering Roles • Giza, Egypt",
      heroGreeting: "Portfolio • 2026",
      heroName: "Doaa Mohamed Salah",
      heroRole: "Web Developer | Data Engineer & Data Analyst",
      heroSummary: "Results-driven Software Engineer and Data Science enthusiast with hands-on experience delivering reliable web applications and data solutions using C#, ASP.NET Core MVC, JavaScript, Python, SQL, Java, and Power BI. Proven leadership in orchestrating project lifecycles, designing normalized relational data models (ERD), building ETL pipelines, and extracting actionable business intelligence from complex data.",
      btnExploreProjects: "Explore Projects",
      btnContactWhatsApp: "WhatsApp",
      badgeRole: "Software & Data Engineer",
      badgeCred: "BIS • DEPI • NTI Certified",
      heroTabWeb: "Web Engineering",
      heroTabData: "Data & BI",
      
      aboutSubtitle: "Bridging Software Architecture and Data Analytics",
      aboutTitle: "About & Academic Foundation",
      aboutP1: "Graduated with a Bachelor's Degree in Business Information Systems (BIS) from the Faculty of Commerce & Business Administration. My education provided a solid foundation in connecting core enterprise operations with modern technology.",
      aboutFocusTitle: "Academic & Practical Focus Areas:",
      focus1: "Systems Analysis & Design: Use Case Diagrams, Activity Flows, ERD, and Relational Schema Modeling.",
      focus2: "Relational Database Engineering: Complex querying, normalization, and integrity constraints with SQL Server, Oracle & MySQL.",
      focus3: "Object-Oriented Development: Enterprise programming with C# (.NET Core) and Java.",
      focus4: "Business Intelligence & Analytics: ETL data pipelines, statistical modeling, and executive KPI reporting in Power BI.",
      stat1Label: "DEPI MSDE Training Hours",
      stat2Label: "NTI AI Ambassador Hours",
      stat3Label: "Engineered Applications",
      stat4Label: "Core Domains Mastered",

      expSubtitle: "Career & Training Milestones",
      expTitle: "Work Experience & Intensive Programs",
      exp1Role: "Web Developer & Team Leader",
      exp1Org: "Shifa Medical Services Platform",
      exp1Type: "Featured Team Project",
      exp1Desc: "Orchestrated the entire development lifecycle from requirements gathering to delivery. Led system analysis, Use Case & Activity modeling, and designed the normalized MS SQL Server relational database. Built core web modules using C# and ASP.NET Core MVC with responsive UI prototypes initially designed in Figma.",
      
      exp2Role: "Microsoft Data Engineer (MSDE) - AI & Data Science",
      exp2Org: "Digital Egypt Pioneers Initiative (DEPI) - MCIT",
      exp2Type: "200 Training Hours",
      exp2Desc: "Advanced program covering Python and SQL for high-volume database operations. Designed automated ETL pipelines, applied data cleaning and exploratory data analysis (EDA), applied statistical analysis, and implemented machine learning models on real-world datasets.",
      
      exp3Role: "Artificial Intelligence Ambassador",
      exp3Org: "National Telecommunication Institute (NTI) & ESE",
      exp3Type: "80 Training Hours (Beginner & Advanced)",
      exp3Desc: "Studied modern AI principles, Machine Learning, and Natural Language Processing (NLP). Engineered interactive Power BI executive dashboards with KPI tracking and visual storytelling, leveraging Generative AI tools for workflow automation.",
      
      exp4Role: "Egyptian Banking System Model (EBSM) Fellowship",
      exp4Org: "Banque Misr Training",
      exp4Type: "Professional Banking Fellowship",
      exp4Desc: "Completed intensive practical sessions covering Financial Inclusion, Banking Operations, and financial institutions' workflows, gaining deep insight into enterprise banking processes and business process modeling.",

      projectsSubtitle: "Selected Works & Architecture",
      projectsTitle: "Featured Engineering Projects",
      filterAll: "All Systems",
      filterWeb: "Web & Enterprise",
      filterData: "Data & BI Analytics",
      btnDetails: "System Architecture & KPIs",

      skillsSubtitle: "Technical Proficiencies",
      skillsTitle: "Skills & Technologies Matrix",
      catWebTitle: "Web Development",
      catDataEngTitle: "Data Engineering & Databases",
      catAiBiTitle: "Data Science, AI & BI",
      catToolsTitle: "Tools, Soft Skills & Languages",

      certsSubtitle: "Accredited Credentials",
      certsTitle: "Honors & Official Certifications",
      cert1Title: "Artificial Intelligence Ambassadors Program",
      cert1Issuer: "Ministry of Communications (MCIT) • NTI & ESE",
      cert1Meta: "Credential ID: AI (B9) - 1210 | 80 Training Hours",
      cert2Title: "Egyptian Banking System Model (EBSM)",
      cert2Issuer: "Banque Misr • Financial Inclusion & Operations",
      cert2Meta: "Banking Operations & Branch Fellowship",
      certClickZoom: "Click to inspect in high resolution",

      contactSubtitle: "Get In Touch",
      contactTitle: "Let's Collaborate on Your Next Solution",
      contactDesc: "Whether you have an opportunity for a Web Developer, Data Engineer, or Data Analyst role, feel free to reach out directly via WhatsApp, LinkedIn, or Email.",
      contactLocation: "Giza, Egypt",
      whatsappLabel: "Instant Chat on WhatsApp",
      whatsappDesc: "+20 111 513 7318 • Active & Responsive",
      linkedinLabel: "Connect on LinkedIn",
      linkedinDesc: "linkedin.com/in/doaa-mohamed-091164375",
      emailLabel: "Send an Email",
      emailDesc: "doaa.mhmd.xo@gmail.com",
      
      footerText: "Editorial & Minimalist Portfolio for Doaa Mohamed Salah.",
      cvModalTitle: "Doaa Mohamed Salah — Official Curriculum Vitae",
      btnDownloadCV: "Download PDF",
      btnClose: "Close"
    },
    ar: {
      navAbout: "نبذة عني",
      navExp: "الخبرات والتدريب",
      navProjects: "المشاريع",
      navSkills: "المهارات",
      navCerts: "الشهادات",
      navContact: "تواصل معي",
      btnViewCV: "عرض السيرة الذاتية",
      badgeAvailable: "متاحة لفرص تطوير الويب وهندسة البيانات • الجيزة، مصر",
      heroGreeting: "الملف المهني • 2026",
      heroName: "دعاء محمد صلاح",
      heroRole: "مطورة ويب | مهندسة ومحللة بيانات",
      heroSummary: "مهندسة برمجيات وشغوفة بعلوم البيانات، أمتلك خبرة عملية في تطوير تطبيقات الويب وحلول البيانات المتقدمة باستخدام C# و ASP.NET Core MVC و JavaScript و Python و SQL و Java و Power BI. أتمتع بخبرة مثبتة في قيادة فرق العمل، وتصميم المخططات العلائقية (ERD)، وبناء خطوط معالجة البيانات (ETL)، وتحويل البيانات الأولية إلى رؤى وقرارات عمل استراتيجية.",
      btnExploreProjects: "استعراض المشاريع",
      btnContactWhatsApp: "واتساب",
      badgeRole: "مهندسة برمجيات وبيانات",
      badgeCred: "خريجة نظم معلومات إدارية • معتمدة من DEPI و NTI",
      heroTabWeb: "هندسة الويب",
      heroTabData: "البيانات و BI",
      
      aboutSubtitle: "الربط بين تطوير البرمجيات وتحليل البيانات",
      aboutTitle: "النبذة التعريفية والأساس الأكاديمي",
      aboutP1: "حاصلة على درجة البكالوريوس في نظم معلومات الأعمال (BIS) من كلية التجارة وإدارة الأعمال. ركزت دراستي على ربط احتياجات المؤسسات التجارية والمالية بالحلول التكنولوجية الحديثة.",
      aboutFocusTitle: "مجالات التركيز الأكاديمي والتطبيقي:",
      focus1: "تحليل وتصميم النظم: مخططات حالات الاستخدام (Use Case)، مخططات النشاط (Activity Flow)، ومخططات الكيانات والعلاقات (ERD).",
      focus2: "هندسة قواعد البيانات العلائقية: الاستعلامات المتقدمة وضوابط التكامل في SQL Server و Oracle و MySQL.",
      focus3: "البرمجة كائنية التوجه (OOP): بناء البرمجيات المتقدمة باستخدام C# و Java.",
      focus4: "ذكاء الأعمال وتحليل البيانات: بناء مسارات تدفق البيانات (ETL) وتصميم لوحات مؤشرات الأداء (KPIs) في Power BI.",
      stat1Label: "ساعة تدريبية في مبادرة رواد مصر الرقمية (DEPI)",
      stat2Label: "ساعة تدريب في سفراء الذكاء الاصطناعي (NTI)",
      stat3Label: "أنظمة برمجية متكاملة تم إنجازها",
      stat4Label: "مجالات رئيسية متمكنة منها",

      expSubtitle: "المسار المهني والتدريبات المكثفة",
      expTitle: "الخبرات العملية والبرامج الاحترافية",
      exp1Role: "مطورة ويب وقائدة فريق العمل (Team Leader)",
      exp1Org: "منصة شفاء للخدمات الطبية والعيادات (Shifa)",
      exp1Type: "مشروع ريادي متميز",
      exp1Desc: "قدت الفريق طوال دورة حياة المشروع بدءاً من تحديد النطاق وتحليل النظام ونمذجته (Use Case, Activity, ERD) وتصميم واجهات Figma، وصولاً لبناء النظام باستخدام C# و ASP.NET Core MVC وقواعد بيانات MS SQL Server مع ADO.NET.",
      
      exp2Role: "مهندسة بيانات معتمدة (MSDE) - الذكاء الاصطناعي وعلوم البيانات",
      exp2Org: "مبادرة رواد مصر الرقمية (DEPI) - وزارة الاتصالات",
      exp2Type: "200 ساعة تدريبية مكثفة",
      exp2Desc: "برنامج تدريبي متقدم ركز على استخدام Python و SQL للعمليات المعقدة والبيانات الضخمة، وبناء مسارات الـ ETL وتنظيف البيانات والتحليل الإحصائي الاستكشافي (EDA) ونماذج تعلم الآلة.",
      
      exp3Role: "سفيرة الذكاء الاصطناعي (AI Ambassador)",
      exp3Org: "المعهد القومي للاتصالات (NTI) وجمعية ESE",
      exp3Type: "80 ساعة تدريبية (مستوى متقدم ومبتدئ)",
      exp3Desc: "دراسة متعمقة لمفاهيم تعلم الآلة ومعالجة اللغات الطبيعية (NLP) وأخلاقيات الذكاء الاصطناعي، مع بناء لوحات Power BI تفاعلية لتتبع مؤشرات الأداء (KPIs) وسرد البيانات بصرياً واستخدام أدوات GenAI.",
      
      exp4Role: "نموذج النظام المصرفي المصري (EBSM) - زمالة بنك مصر",
      exp4Org: "تدريب بنك مصر (Banque Misr)",
      exp4Type: "تدريب مهني مصرفي",
      exp4Desc: "حضور ورش عمل وتدريبات متقدمة في الشمول المالي، والعمليات المصرفية، وتدفق الإجراءات البنكية الداخلية بما يدعم فهم الأعمال وتحليل النظم.",

      projectsSubtitle: "الأعمال المنجزة وهندسة الأنظمة",
      projectsTitle: "المشاريع البرمجية والتحليلية",
      filterAll: "كافة المشاريع",
      filterWeb: "الويب والأنظمة (.NET / Java)",
      filterData: "البيانات وذكاء الأعمال (BI / Python)",
      btnDetails: "تفاصيل التحليل ومؤشرات الأداء",

      skillsSubtitle: "الكفاءات والتقنيات",
      skillsTitle: "مصفوفة المهارات والتقنيات",
      catWebTitle: "تطوير الويب والواجهات",
      catDataEngTitle: "هندسة البيانات وقواعد البيانات",
      catAiBiTitle: "علوم البيانات، الذكاء الاصطناعي و BI",
      catToolsTitle: "الأدوات، المهارات الشخصية واللغات",

      certsSubtitle: "الاعتمادات الرسمية",
      certsTitle: "الشهادات والتكريمات",
      cert1Title: "برنامج سفراء الذكاء الاصطناعي (AI Ambassadors)",
      cert1Issuer: "وزارة الاتصالات (MCIT) • المعهد القومي للاتصالات (NTI) و ESE",
      cert1Meta: "كود الاعتماد: AI (B9) - 1210 | 80 ساعة تدريبية",
      cert2Title: "نموذج النظام المصرفي المصري (EBSM)",
      cert2Issuer: "بنك مصر (Banque Misr) • الشمول المالي والعمليات",
      cert2Meta: "تدريب الفروع والعمليات المصرفية",
      certClickZoom: "اضغط للمعاينة بدقة عالية وتكبير",

      contactSubtitle: "تواصل مباشر",
      contactTitle: "جاهزة للتعاون في مشروعك القادم",
      contactDesc: "سواء كنت تبحث عن مطورة ويب محترفة أو متخصصة في هندسة وتحليل البيانات، يسعدني تواصلك المباشر عبر واتساب أو لينكد إن أو البريد الإلكتروني.",
      contactLocation: "الجيزة، مصر",
      whatsappLabel: "محادثة فورية على واتساب",
      whatsappDesc: "+20 111 513 7318 • رد سريع ومباشر",
      linkedinLabel: "الملف المهني على لينكد إن",
      linkedinDesc: "linkedin.com/in/doaa-mohamed-091164375",
      emailLabel: "مراسلة عبر البريد الإلكتروني",
      emailDesc: "doaa.mhmd.xo@gmail.com",
      
      footerText: "تصميم ومعمارية تحريرية راقية لدعاء محمد صلاح.",
      cvModalTitle: "دعاء محمد صلاح — السيرة الذاتية الرسمية (CV)",
      btnDownloadCV: "تحميل ملف PDF",
      btnClose: "إغلاق"
    }
  };

  let currentLang = 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    const langToggleBtn = document.getElementById('lang-toggle-btn');
    if (langToggleBtn) {
      langToggleBtn.innerHTML = lang === 'en' 
        ? '<span class="font-bold text-[var(--accent-primary)]">عربي</span> <span class="text-[10px] text-[var(--text-muted)]">/ EN</span>' 
        : '<span class="font-bold text-[var(--accent-primary)]">EN</span> <span class="text-[10px] text-[var(--text-muted)]">/ عربي</span>';
    }

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }

  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLanguage(currentLang === 'en' ? 'ar' : 'en');
    });
  }


  // =========================================================================
  // 8. Interactive Hero Visual Tabs
  // =========================================================================
  const tabBtnWeb = document.getElementById('tab-btn-web');
  const tabBtnData = document.getElementById('tab-btn-data');
  const tabContentWeb = document.getElementById('tab-content-web');
  const tabContentData = document.getElementById('tab-content-data');

  if (tabBtnWeb && tabBtnData) {
    tabBtnWeb.addEventListener('click', () => {
      tabBtnWeb.className = 'px-3 py-1 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] font-medium transition-all';
      tabBtnData.className = 'px-3 py-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-all';

      tabContentWeb.classList.remove('hidden');
      tabContentData.classList.add('hidden');
    });

    tabBtnData.addEventListener('click', () => {
      tabBtnData.className = 'px-3 py-1 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] font-medium transition-all';
      tabBtnWeb.className = 'px-3 py-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-all';

      tabContentData.classList.remove('hidden');
      tabContentWeb.classList.add('hidden');
    });
  }


  // =========================================================================
  // 9. Project Filter Logic
  // =========================================================================
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.className = 'project-filter-btn px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-hairline)] hover:text-[var(--text-primary)]';
      });
      btn.className = 'project-filter-btn px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all bg-[var(--accent-primary)] text-[var(--bg-primary)] border-[var(--accent-primary)] font-bold';

      const filterVal = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.classList.remove('hidden');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
          }
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  // =========================================================================
  // 10. Project Architecture Details Modal
  // =========================================================================
  const projectDetails = {
    shifa: {
      titleEn: "Shifa - Clinic Appointments & Nearby Pharmacies Web App",
      titleAr: "منصة شفاء - حجز العيادات والصيدليات القريبة",
      roleEn: "Team Leader & Web Developer",
      roleAr: "قائدة الفريق ومطورة الويب",
      statusEn: "Featured Project • Active Development",
      statusAr: "مشروع ريادي • قيد التطوير النشط",
      overviewEn: "Shifa solves the fragmentation in local healthcare services by offering patients a single, cohesive portal to search verified medical doctors, inspect specialties and schedules, book clinic appointments, and locate nearby operating pharmacies on an interactive map.",
      overviewAr: "يهدف مشروع شفاء إلى معالجة تشتت الخدمات الطبية المحلية من خلال تزويد المرضى ببوابة موحدة للبحث عن الأطباء المعتمدين، وفحص المواعيد وحجز الكشوفات، وتحديد مواقع الصيدليات القريبة المفتوحة.",
      archHighlightsEn: [
        "Architectural Pattern: Multi-Tier ASP.NET Core MVC with clean separation of Concerns (Presentation, Business Logic, and Data Access via ADO.NET).",
        "Relational Database Schema: Comprehensive schema hosted on MS SQL Server with 7 key entities: Patients, Doctors, DoctorSchedules, Appointments, Reviews, Pharmacies, and Specialties.",
        "System Analysis Artifacts: Authored complete Use Case Models, Detailed Activity Diagrams, and Normalized Relational Schemas (3NF) to guarantee zero appointment double-booking.",
        "UI Prototyping: Full responsive high-fidelity prototype designed first in Figma with atomic design tokens before frontend implementation."
      ],
      archHighlightsAr: [
        "النمط المعماري: معمارية متعددة الطبقات (ASP.NET Core MVC) مع فصل واضح للمسؤوليات (طبقة العرض، منطق الأعمال، وطبقة الوصول للبيانات عبر ADO.NET).",
        "المخطط العلائقي لقواعد البيانات: تصميم متكامل على MS SQL Server يضم 7 كيانات أساسية: المرضى، الأطباء، جداول المواعيد، الحجوزات، التقييمات، الصيدليات، والتخصصات.",
        "مخرجات تحليل النظم: إعداد مخططات Use Case، ومخططات النشاط (Activity Diagrams)، ومخطط الكيانات والعلاقات المنقح (ERD 3NF) لضمان عدم تضارب المواعيد.",
        "تصميم الواجهات: نموذج تفاعلي كامل عالي الدقة تم تصميمه في Figma وفق مبادئ التصميم الذري قبل الشروع في كتابة الأكواد."
      ],
      techStack: ["C#", "ASP.NET Core MVC", "MS SQL Server", "ADO.NET", "HTML5", "CSS3", "JavaScript", "Figma", "Draw.io", "Visual Paradigm"]
    },
    retail: {
      titleEn: "Retail Sales Performance Analytics Dashboard",
      titleAr: "لوحة تحليلات أداء مبيعات التجزئة (Power BI)",
      roleEn: "Data Analyst & BI Specialist (NTI Final Project)",
      roleAr: "محللة بيانات ومتخصصة ذكاء أعمال (مشروع NTI النهائي)",
      statusEn: "Production-Grade Business Intelligence",
      statusAr: "ذكاء أعمال متكامل بمستوى احترافي",
      overviewEn: "An interactive Power BI analytics suite engineered to assess commercial retail performance across 6 major Egyptian metropolitan regions. Developed as the final capstone for the National Telecommunication Institute (NTI) AI Ambassadors Program.",
      overviewAr: "لوحة تحكم تفاعلية متطورة في Power BI صُممت لتقييم أداء مبيعات التجزئة التجارية عبر 6 مدن ومحافظات مصرية رئيسية، كالمشروع النهائي لبرنامج سفراء الذكاء الاصطناعي بالمعهد القومي للاتصالات (NTI).",
      archHighlightsEn: [
        "Core Tracked KPIs: Dynamic KPI cards tracking Total Sales (95K+ EGP), Net Profit (36K+ EGP), and total Order Volume (1,400+ transactions).",
        "Data Modeling: Engineered a robust Star Schema consisting of a centralized Sales Fact table with associated Date, Geography, Category, and Customer dimensions.",
        "Advanced DAX Measures: Implemented calculated measures for Profit Margin (38.5%), Year-over-Year growth, and moving average sales trends.",
        "Visual Storytelling & Interactivity: Integrated multi-dimensional slicers, categorical Pareto distributions, and heatmaps for regional sales density."
      ],
      archHighlightsAr: [
        "مؤشرات الأداء الرئيسية: تتبع فوري لإجمالي المبيعات (أكثر من 95 ألف جنيه)، وصافي الأرباح (أكثر من 36 ألف جنيه)، وحجم الطلبات (أكثر من 1400 طلب).",
        "نمذجة البيانات (Data Modeling): بناء نموذج نجمي (Star Schema) يربط جدول الحقائق (Sales Fact) بجداول الأبعاد (التاريخ، المدن، الفئات، شرائح العملاء).",
        "معادلات DAX متقدمة: حساب هوامش الربح بدقة (38.5%)، ومعدلات النمو الشهرية، ومعدلات المبيعات المتحركة.",
        "السرد البصري للبيانات: فلاتر تفاعلية متعددة الأبعاد، وتوزيعات فئات المنتجات، ومخططات جغرافية لكثافة المبيعات بالمدن."
      ],
      techStack: ["Microsoft Power BI", "DAX Formulas", "Data Modeling (Star Schema)", "KPI Tracking", "Visual Storytelling", "Excel ETL"]
    },
    clinic: {
      titleEn: "Clinic Management Desktop System",
      titleAr: "نظام إدارة العيادات الطبية (تطبيق ديسكتوب)",
      roleEn: "Systems Architect & Developer",
      roleAr: "مهندسة ومطورة النظام",
      statusEn: "Enterprise Desktop System",
      statusAr: "نظام مكتبي مكتمل",
      overviewEn: "A robust desktop application engineered using Java to handle high-concurrency patient registrations, physician schedules, medical consult records, and billing with strict data consistency.",
      overviewAr: "تطبيق ديسكتوب مصمم بلغة Java للتعامل بكفاءة مع تسجيل المرضى، وجداول الأطباء، وسجلات الكشوفات الطبية، وإصدار الفواتير مع ضمان سلامة البيانات.",
      archHighlightsEn: [
        "Object-Oriented Architecture: Implemented in Java (NetBeans IDE) adhering strictly to SOLID design principles and the DAO (Data Access Object) pattern.",
        "Relational Integrity: Structured database schemas in Oracle and MySQL enforcing foreign keys, unique constraint validations, and ACID transaction safety.",
        "Security & Verification: Automated input sanitizer and query parameterization preventing SQL injection vulnerabilities."
      ],
      archHighlightsAr: [
        "معمارية كائنية التوجه (OOP): بناء التطبيق بلغة Java (NetBeans IDE) مع الالتزام التام بمبادئ SOLID ونمط التصميم DAO.",
        "سلامة العلاقات وقواعد البيانات: تصميم جداول Oracle و MySQL مع فرض القيود والتكامل المرجعي لضمان عدم فقدان السجلات الطبية.",
        "الأمان والموثوقية: تأمين الاستعلامات والتحقق من صحة المدخلات لمنع ثغرات الحقن وضمان استقرار النظام."
      ],
      techStack: ["Java (OOP)", "NetBeans IDE", "Oracle Database", "MySQL", "SQL Constraints", "JDBC / DAO Pattern"]
    },
    gpa: {
      titleEn: "Student GPA & Academic Honors Calculator",
      titleAr: "حاسبة المعدل التراكمي وتصنيف المراتب الأكاديمية",
      roleEn: "Frontend & Algorithm Developer",
      roleAr: "مطورة الخوارزمية والواجهة",
      statusEn: "Academic Computation Tool",
      statusAr: "أداة حساب أكاديمية متقدمة",
      overviewEn: "A precision calculator tool built to compute cumulative university GPA, weighted grade points, and academic honors classifications based on variable credit hours.",
      overviewAr: "أداة دقيقة لحساب المعدل التراكمي الجامعي (GPA) والأوزان النسبية للساعات المعتمدة، مع تحديد مراتب الشرف الأكاديمية والتصنيف التقديري للطلاب.",
      archHighlightsEn: [
        "Dynamic Interface: Lightweight and responsive client-side interface allowing students to dynamically add/remove semester courses and credit weightings.",
        "Deterministic Logic: High-precision rounding algorithms compliant with university BIS credit-hour regulations.",
        "Instant Feedback: Real-time visual grade distribution badge and status calculation."
      ],
      archHighlightsAr: [
        "واجهة ديناميكية: تصميم تفاعلي سريع يتيح للطلاب إضافة وحذف المقررات وتحديد أوزان الساعات المعتمدة لحظياً.",
        "خوارزميات حساب دقيقة: حسابات تراكمية تتوافق مع لوائح نظم معلومات الأعمال (BIS) والساعات المعتمدة الجامعية.",
        "تغذية بصرية فورية: إظهار تقديرات الشرف ومستوى الطالب مباشرة مع كل تغيير في المدخلات."
      ],
      techStack: ["JavaScript (ES6+)"],
      techStack: ["JavaScript (ES6+)", "HTML5 Semantic", "CSS3 Flex/Grid", "DOM Manipulation", "Algorithm Design"]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const projectModalContent = document.getElementById('project-modal-content');
  const closeProjectModalBtn = document.getElementById('close-project-modal');

  document.querySelectorAll('.open-project-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-project-id');
      const data = projectDetails[projId];
      if (!data) return;

      const isAr = currentLang === 'ar';
      const title = isAr ? data.titleAr : data.titleEn;
      const role = isAr ? data.roleAr : data.roleEn;
      const status = isAr ? data.statusAr : data.statusEn;
      const overview = isAr ? data.overviewAr : data.overviewEn;
      const highlights = isAr ? data.archHighlightsAr : data.archHighlightsEn;

      projectModalContent.innerHTML = `
        <div class="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
          <div>
            <span class="inline-block px-3 py-1 text-xs font-mono rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--accent-primary)] mb-2 font-medium">
              ${status}
            </span>
            <h3 class="editorial-title text-xl md:text-2xl font-serif text-[var(--text-primary)]">${title}</h3>
            <p class="text-xs text-[var(--text-secondary)] mt-1 font-mono"><i class="fa-solid fa-user-gear text-[var(--accent-primary)] mr-1.5"></i> ${role}</p>
          </div>
        </div>

        <div class="mt-6 space-y-6">
          <div>
            <h4 class="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
              ${isAr ? 'نظرة عامة على النظام' : 'System Overview'}
            </h4>
            <p class="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base bg-[var(--bg-subtle)] p-4 rounded-xl border border-[var(--border-hairline)] font-sans">
              ${overview}
            </p>
          </div>

          <div>
            <h4 class="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] mb-3 flex items-center gap-2">
              <i class="fa-solid fa-diagram-project"></i>
              ${isAr ? 'تفاصيل المعمارية وتحليل النظم والمخططات' : 'System Architecture, ERD & Technical Highlights'}
            </h4>
            <ul class="space-y-2.5">
              ${highlights.map(item => `
                <li class="flex items-start gap-3 text-[var(--text-secondary)] text-sm md:text-base font-sans">
                  <span class="text-[var(--accent-primary)] mt-1 text-xs"><i class="fa-solid fa-chevron-right"></i></span>
                  <span class="leading-relaxed">${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3">
              ${isAr ? 'حزمة التقنيات المستخدمة (Tech Stack)' : 'Technologies & Tools Used'}
            </h4>
            <div class="flex flex-wrap gap-2">
              ${data.techStack.map(t => `
                <span class="tech-tag">
                  ${t}
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      projectModal.classList.remove('hidden');
      projectModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', () => {
      projectModal.classList.add('hidden');
      projectModal.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }


  // =========================================================================
  // 11. Certificate Lightbox Modal
  // =========================================================================
  const certModal = document.getElementById('cert-modal');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalMeta = document.getElementById('cert-modal-meta');
  const closeCertModalBtn = document.getElementById('close-cert-modal');

  document.querySelectorAll('.open-cert-modal').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-cert-src');
      const title = card.getAttribute('data-cert-title');
      const meta = card.getAttribute('data-cert-meta');

      certModalImg.src = src;
      certModalTitle.textContent = title;
      certModalMeta.textContent = meta;

      certModal.classList.remove('hidden');
      certModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeCertModalBtn) {
    closeCertModalBtn.addEventListener('click', () => {
      certModal.classList.add('hidden');
      certModal.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }


  // =========================================================================
  // 12. CV Viewer Modal
  // =========================================================================
  const cvModal = document.getElementById('cv-modal');
  const openCvBtns = document.querySelectorAll('.open-cv-modal');
  const closeCvModalBtn = document.getElementById('close-cv-modal');

  openCvBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      cvModal.classList.remove('hidden');
      cvModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeCvModalBtn) {
    closeCvModalBtn.addEventListener('click', () => {
      cvModal.classList.add('hidden');
      cvModal.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }

  // Close modals on clicking backdrop
  [projectModal, certModal, cvModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          document.body.style.overflow = '';
        }
      });
    }
  });

  // Close modals on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [projectModal, certModal, cvModal].forEach(modal => {
        if (modal && !modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          document.body.style.overflow = '';
        }
      });
    }
  });


  // =========================================================================
  // 13. Mobile Navigation Drawer
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

});
