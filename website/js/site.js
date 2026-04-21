(function () {
  const nav = document.querySelector("nav");
  const toggle = document.querySelector(".nav-toggle");
  const backdrop = document.querySelector(".nav-backdrop");
  const mq = window.matchMedia("(max-width: 768px)");

  function setOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-menu-open", open);
    if (backdrop) backdrop.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function closeMenu() {
    setOpen(false);
  }

  toggle?.addEventListener("click", () => {
    setOpen(!nav.classList.contains("nav-open"));
  });

  backdrop?.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  mq.addEventListener("change", (e) => {
    if (!e.matches) closeMenu();
  });

  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => {
      if (mq.matches) closeMenu();
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
})();

/* ── Animated circuit board overlay ── */
(function initCircuitAnimation() {
  var el = document.querySelector('.circuit-lines');
  if (!el) return;

  var C = '#00ffe7';
  var G = '#ffc93c';
  var DRAW = 1.5;

  var paths = [
    { d:'M0,100 L120,100 L120,40 L300,40 L300,100 L480,100',              c:C, w:1.5, t:0 },
    { d:'M0,200 L80,200 L80,300 L260,300 L260,200 L500,200 L500,140',     c:C, w:1.2, t:0.3 },
    { d:'M120,40 L120,0',                                                   c:C, w:1,   t:0.8 },
    { d:'M300,0 L300,40',                                                   c:C, w:1,   t:0.9 },
    { d:'M480,100 L480,220 L600,220',                                       c:C, w:1.2, t:1.0 },
    { d:'M260,300 L260,400 L400,400',                                       c:C, w:1,   t:1.2 },
    { d:'M0,150 L55,150 L55,70 L200,70 L200,160 L380,160',                 c:G, w:1.5, t:0.4 },
    { d:'M200,70 L200,0',                                                   c:G, w:1,   t:1.0 },
    { d:'M1920,90 L1800,90 L1800,40 L1620,40 L1620,90 L1440,90',           c:C, w:1.5, t:0.15 },
    { d:'M1920,190 L1840,190 L1840,290 L1660,290 L1660,190 L1420,190 L1420,130', c:C, w:1.2, t:0.4 },
    { d:'M1800,40 L1800,0',                                                 c:C, w:1,   t:0.85 },
    { d:'M1620,0 L1620,40',                                                 c:C, w:1,   t:0.95 },
    { d:'M1440,90 L1440,210 L1320,210',                                     c:C, w:1.2, t:1.1 },
    { d:'M1660,290 L1660,400 L1520,400',                                    c:C, w:1,   t:1.3 },
    { d:'M1920,140 L1860,140 L1860,70 L1720,70 L1720,150 L1540,150',       c:G, w:1.5, t:0.5 },
    { d:'M1720,70 L1720,0',                                                 c:G, w:1,   t:1.05 },
    { d:'M0,440 L70,440 L70,600 L0,600',                                    c:C, w:1,   t:1.5 },
    { d:'M70,510 L180,510 L180,570',                                        c:C, w:1,   t:1.7 },
    { d:'M0,680 L45,680 L45,780 L130,780',                                  c:G, w:1,   t:1.9 },
    { d:'M1920,420 L1850,420 L1850,580 L1920,580',                          c:C, w:1,   t:1.6 },
    { d:'M1850,490 L1740,490 L1740,550',                                    c:C, w:1,   t:1.8 },
    { d:'M1920,660 L1880,660 L1880,760 L1790,760',                          c:G, w:1,   t:2.0 },
    { d:'M0,900 L150,900 L150,830 L350,830 L350,930 L530,930',              c:C, w:1.2, t:2.0 },
    { d:'M0,980 L110,980 L110,1080',                                        c:G, w:1,   t:2.2 },
    { d:'M150,830 L150,750',                                                c:C, w:1,   t:2.4 },
    { d:'M1920,900 L1770,900 L1770,830 L1570,830 L1570,930 L1390,930',      c:C, w:1.2, t:2.1 },
    { d:'M1920,980 L1810,980 L1810,1080',                                   c:G, w:1,   t:2.3 },
    { d:'M1770,830 L1770,750',                                              c:C, w:1,   t:2.5 }
  ];

  var nodes = [
    [120,40,3.5,C],[300,40,4,C],[480,100,4.5,C],[260,300,4,C],
    [500,200,4,C],[600,220,3.5,C],[400,400,3.5,C],
    [200,70,4,G],[380,160,4,G],
    [1800,40,3.5,C],[1620,40,4,C],[1440,90,4.5,C],[1660,290,4,C],
    [1420,190,4,C],[1320,210,3.5,C],[1520,400,3.5,C],
    [1720,70,4,G],[1540,150,4,G],
    [70,440,3,C],[70,600,3,C],[180,510,3.5,C],[130,780,3.5,G],
    [1850,420,3,C],[1850,580,3,C],[1740,490,3.5,C],[1790,760,3.5,G],
    [350,830,4,C],[530,930,4,C],[150,750,3,C],
    [1570,830,4,C],[1390,930,4,C],[1770,750,3,C]
  ];

  var rings = [
    [480,100,9,C],[1440,90,9,C],[200,70,8,G],[1720,70,8,G],
    [350,830,8,C],[1570,830,8,C]
  ];

  var glows = [
    [300,40,20,C],[480,100,16,C],[200,70,14,G],
    [1620,40,20,C],[1440,90,16,C],[1720,70,14,G],
    [350,830,14,C],[1570,830,14,C]
  ];

  var particleRefs = [0,1,6,8,9,14,16,19,22,25];

  var svg = '<svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">';
  svg += '<defs>';
  svg += '<filter id="cf"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
  svg += '<filter id="gf"><feGaussianBlur stdDeviation="6"/></filter>';
  svg += '<filter id="pf"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
  svg += '</defs>';

  svg += '<g fill="none" stroke-linecap="square">';
  for (var i = 0; i < paths.length; i++) {
    var p = paths[i];
    svg += '<path id="t' + i + '" class="cp" d="' + p.d + '" stroke="' + p.c + '" stroke-width="' + p.w + '" data-t="' + p.t + '"/>';
  }
  svg += '</g>';

  svg += '<g filter="url(#cf)" class="node-group">';
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    svg += '<circle class="cn" cx="' + n[0] + '" cy="' + n[1] + '" r="' + n[2] + '" fill="' + n[3] + '" opacity="0"/>';
  }
  for (var i = 0; i < rings.length; i++) {
    var r = rings[i];
    svg += '<circle class="cn" cx="' + r[0] + '" cy="' + r[1] + '" r="' + r[2] + '" fill="none" stroke="' + r[3] + '" stroke-width="0.8" opacity="0"/>';
  }
  svg += '</g>';

  svg += '<g filter="url(#gf)" class="glow-group">';
  for (var i = 0; i < glows.length; i++) {
    var g = glows[i];
    svg += '<circle class="cg" cx="' + g[0] + '" cy="' + g[1] + '" r="' + g[2] + '" fill="' + g[3] + '" opacity="0"/>';
  }
  svg += '</g>';

  svg += '<g class="particle-group" opacity="0" filter="url(#pf)">';
  for (var i = 0; i < particleRefs.length; i++) {
    var pi = particleRefs[i];
    var pc = paths[pi].c;
    var isRect = i % 3 === 1;
    var dur = (2.5 + (i * 0.4)) + 's';
    if (isRect) {
      svg += '<rect width="14" height="2" rx="1" fill="' + pc + '" opacity="0.8">';
      svg += '<animateMotion dur="' + dur + '" repeatCount="indefinite" rotate="auto"><mpath href="#t' + pi + '"/></animateMotion>';
      svg += '</rect>';
    } else {
      svg += '<circle r="2.5" fill="' + pc + '">';
      svg += '<animateMotion dur="' + dur + '" repeatCount="indefinite"><mpath href="#t' + pi + '"/></animateMotion>';
      svg += '</circle>';
    }
  }
  svg += '</g>';
  svg += '</svg>';

  el.innerHTML = svg;

  var allPaths = el.querySelectorAll('.cp');
  allPaths.forEach(function(p) {
    var len = p.getTotalLength();
    var delay = parseFloat(p.dataset.t) || 0;
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
    p.style.transition = 'stroke-dashoffset ' + DRAW + 's cubic-bezier(.4,0,.2,1) ' + delay + 's';
  });

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      allPaths.forEach(function(p) { p.style.strokeDashoffset = '0'; });
    });
  });

  var allNodes = el.querySelectorAll('.cn');
  allNodes.forEach(function(n, idx) {
    var area = parseFloat(n.getAttribute('cx'));
    var cy = parseFloat(n.getAttribute('cy'));
    var base;
    if (cy < 420) base = 1.6;
    else if (cy < 700) base = 3.0;
    else base = 3.6;
    if (area > 960) base += 0.15;
    var jitter = (idx % 5) * 0.08;
    setTimeout(function() {
      n.style.transition = 'opacity .5s ease';
      n.style.opacity = '0.85';
    }, (base + jitter) * 1000);
  });

  var allGlows = el.querySelectorAll('.cg');
  allGlows.forEach(function(g, idx) {
    var cy = parseFloat(g.getAttribute('cy'));
    var base = cy < 400 ? 2.0 : 3.8;
    var jitter = idx * 0.12;
    setTimeout(function() {
      g.style.transition = 'opacity 1.2s ease';
      g.style.opacity = '0.15';
      g.style.animation = 'glow-breathe 4s ease-in-out ' + (idx * 0.5) + 's infinite';
    }, (base + jitter) * 1000);
  });

  var pg = el.querySelector('.particle-group');
  if (pg) {
    setTimeout(function() {
      pg.style.transition = 'opacity 1.5s ease';
      pg.style.opacity = '1';
    }, 4200);
  }
})();
