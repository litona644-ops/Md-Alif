import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

(function () {
  // ---- EDIT ME: path or data-URI of the portrait ----
  const PORTRAIT_SRC = "";
  const $ = function (s: string, c?: Element | Document): any {
    return (c || document).querySelector(s);
  };
  const $$ = function (s: string, c?: Element | Document): HTMLElement[] {
    return [].slice.call((c || document).querySelectorAll(s));
  };
  const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const wide = window.matchMedia('(min-width:761px)').matches;
  if (rm) document.documentElement.classList.add('rm');
  if (PORTRAIT_SRC) {
    $$('.portrait').forEach(function (i: any) {
      i.src = PORTRAIT_SRC;
      i.style.display = 'block';
    });
    $$('.pt').forEach(function (p) {
      p.style.display = 'none';
    });
  }
  $$('a[data-ph]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });
  $$('.pj').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out' });

  // marquee content
  const WD: Record<string, string[]> = {
    m1: ['Web Design', 'Graphic Design', 'Motion'],
    m2: ['Create', 'Explore', 'Build', 'Design'],
  };
  [['m1', 1], ['m2', 1]].forEach(function (p) {
    const el = $('#' + p[0]);
    if (!el) return;
    let h = '';
    for (let k = 0; k < 2; k++) {
      WD[p[0] as string].forEach(function (w) {
        h += '<span>' + w + '</span>';
      });
    }
    el.innerHTML = h;
  });

  // expertise
  const items = [
    ['Web Design', 'Interfaces built with precision and rhythm.'],
    ['Graphic Design', 'Composition, type and image with a point of view.'],
    ['UI / UX', 'Clear flows that feel natural to use.'],
    ['Motion Design', 'Movement that guides attention.'],
    ['Brand Identity', 'Systems that stay recognisable everywhere.'],
    ['Creative Direction', 'One idea carried through every detail.'],
  ];
  const exl = $('#exl');
  if (exl) {
    items.forEach(function (it, i) {
      const b = document.createElement('button');
      b.className = 'ex';
      b.innerHTML = '<span class="meta">0' + (i + 1) + '</span><span class="disp">' + it[0] + '</span>';
      const d = document.createElement('div');
      d.className = 'exd';
      d.textContent = it[1];
      exl.appendChild(b);
      exl.appendChild(d);
      function on() {
        $$('.ex').forEach(function (x) {
          x.classList.remove('on');
        });
        b.classList.add('on');
        exl.classList.add('t');
      }
      b.addEventListener('mouseenter', on);
      b.addEventListener('focus', on);
      b.addEventListener('click', on);
    });
    exl.addEventListener('mouseleave', function () {
      exl.classList.remove('t');
      $$('.ex').forEach(function (x) {
        x.classList.remove('on');
      });
    });
  }

  let mx = window.innerWidth / 2,
    my = window.innerHeight / 2,
    px = mx,
    py = my,
    heroOn = true;
  const layers = $$('[data-d]');
  window.addEventListener(
    'pointermove',
    function (e) {
      mx = e.clientX;
      my = e.clientY;
    },
    { passive: true }
  );
  gsap.ticker.add(function () {
    px += (mx - px) * 0.08;
    py += (my - py) * 0.08;
    if (fine && !rm && heroOn) {
      const nx = px / window.innerWidth - 0.5,
        ny = py / window.innerHeight - 0.5;
      layers.forEach(function (l) {
        const d = +(l.dataset.d || 0);
        l.style.translate = nx * d * 2 + 'px ' + ny * d * 2 + 'px';
      });
    }
  });
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    onToggle: function (s) {
      heroOn = s.isActive;
    },
  });

  // magnetic button
  const m = $('#mag');
  if (fine && m) {
    m.addEventListener('mousemove', function (e: MouseEvent) {
      const r = m.getBoundingClientRect();
      gsap.to(m, {
        x: (e.clientX - r.left - r.width / 2) * 0.25,
        y: (e.clientY - r.top - r.height / 2) * 0.35,
        duration: 0.4,
      });
    });
    m.addEventListener('mouseleave', function () {
      gsap.to(m, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,.4)' });
    });
  }

  // progress
  gsap.to('#prog', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { scrub: 0.3, start: 0, end: 'max' },
  });

  // opening
  function opening() {
    const tl = gsap.timeline();
    tl.to('#load .bar i', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' })
      .to('#load', { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '+=.15')
      .set('#load', { display: 'none' })
      .fromTo('.hl', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.9, ease: 'expo.inOut' }, '-=.3')
      .fromTo(
        '.hero-t .l1>span',
        { xPercent: -115, skewX: -16, scale: 1.12, filter: 'blur(18px)', opacity: 0 },
        { xPercent: 0, skewX: 0, scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.6, ease: 'expo.out' },
        '-=.5'
      )
      .fromTo(
        '.hero-t .l2>span',
        { xPercent: 115, skewX: 16, scale: 1.12, filter: 'blur(18px)', opacity: 0 },
        { xPercent: 0, skewX: 0, scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.6, ease: 'expo.out' },
        '<.3'
      )
      .fromTo('.hero-t .disp', { letterSpacing: '.05em' }, { letterSpacing: '-.05em', duration: 1.9, ease: 'expo.out' }, '<')
      .to('#pw', { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'expo.inOut' }, '-=.9')
      .fromTo('.portrait,#pw .pt', { scale: 1.4, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.6, ease: 'expo.out' }, '<')
      .to('.hl', { scaleX: 0, transformOrigin: 'right', duration: 0.8, ease: 'expo.inOut' }, '-=.8')
      .from('.hero-f .hf,.hero-f .scrl', { opacity: 0, y: 18, stagger: 0.22, duration: 1, ease: 'power3.out' }, '-=.2');

    // hero title passes in front of portrait on scroll
    if (!rm)
      gsap.to('.hero-t', {
        xPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    if (!rm)
      gsap.to('#pw', {
        scale: 1.15,
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      });
  }

  if (rm) {
    gsap.set('#pw', { clipPath: 'none' });
  } else {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    opening();
    setTimeout(function () {
      document.body.style.overflow = '';
    }, 2600);
  }

  if (!rm) {
    // intro: scrub
    const it = gsap.timeline({ scrollTrigger: { trigger: '#intro', start: 'top top', end: '+=220%', pin: true, scrub: 0.6 } });
    it.fromTo('#i1', { xPercent: 0, opacity: 1 }, { xPercent: -30, opacity: 0.15, duration: 1 }, 0)
      .fromTo('#i2', { xPercent: 6 }, { xPercent: -8, duration: 1 }, 0)
      .fromTo('#i3', { scale: 0.35, xPercent: 0 }, { scale: 1.9, xPercent: 4, duration: 1.4, ease: 'power2.in' }, 0.2);

    // about
    const at = gsap.timeline({ scrollTrigger: { trigger: '#about', start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
    at.fromTo('#ap', { clipPath: 'inset(38% 28% 38% 28%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'none' }, 0)
      .fromTo('#ap', { scale: 0.8 }, { scale: wide ? 2.6 : 2.2, duration: 1, ease: 'none' }, 0)
      .fromTo('#ab1', { xPercent: -8 }, { xPercent: 8, duration: 1, ease: 'none' }, 0)
      .fromTo('#ab2', { xPercent: 8 }, { xPercent: -8, duration: 1, ease: 'none' }, 0)
      .fromTo('.tag', { y: 40, opacity: 0 }, { y: -40, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'none' }, 0);

    // expertise heading + rows
    $$('#exp .ex').forEach(function (r) {
      gsap.from(r, {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: r, start: 'top 92%' },
      });
    });

    // work reveals
    gsap.from('#wh .ln>span', {
      yPercent: 110,
      duration: 1.2,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#wh', start: 'top 80%' },
    });
    $$('.pj').forEach(function (p) {
      const im = $('.im', p);
      if (im) gsap.to(im, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: p, start: 'top 85%' } });
      const imDiv = $('.im>div', p);
      if (imDiv) gsap.fromTo(imDiv, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.from($$('.row>*', p), { y: 20, opacity: 0, stagger: 0.08, duration: 0.9, scrollTrigger: { trigger: p, start: 'top 75%' } });
    });
    gsap.to('.p2', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.p2', start: 'top bottom', end: 'bottom top', scrub: true } });

    // horizontal gallery
    const tr = $('#tr');
    if (tr) {
      gsap.to(tr, {
        x: function () {
          return -(tr.scrollWidth - window.innerWidth);
        },
        ease: 'none',
        scrollTrigger: {
          trigger: '#hg',
          start: 'top top',
          end: function () {
            return '+=' + (tr.scrollWidth - window.innerWidth);
          },
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      $$('.hs .im').forEach(function (im) {
        gsap.fromTo(im, { scale: 0.86 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: im, start: 'top bottom', end: 'center center', scrub: true } });
      });
    }

    // marquee
    let d1 = 0,
      d2 = 0,
      sp = 1;
    const m1 = $('#m1'),
      m2 = $('#m2');
    let w1 = 0,
      w2 = 0;
    function mw() {
      if (m1) w1 = m1.scrollWidth / 2;
      if (m2) w2 = m2.scrollWidth / 2;
    }
    mw();
    window.addEventListener('resize', mw);
    const mq = $('#mq');
    let vel = 0;
    ScrollTrigger.create({
      onUpdate: function (s) {
        vel = s.getVelocity() / 1200;
      },
    });
    if (mq) {
      mq.addEventListener('mouseenter', function () {
        sp = 3;
      });
      mq.addEventListener('mouseleave', function () {
        sp = 1;
      });
    }
    let sm = 1;
    gsap.ticker.add(function () {
      sm += (sp - sm) * 0.06;
      const v = Math.max(-3, Math.min(3, vel));
      vel *= 0.9;
      d1 -= 1.2 * sm + v;
      d2 += 0.7 * sm + v * 0.6;
      if (d1 < -w1) d1 += w1;
      if (d1 > 0) d1 -= w1;
      if (d2 > 0) d2 -= w2;
      if (d2 < -w2) d2 += w2;
      if (m1) m1.style.transform = 'translate3d(' + d1 + 'px,0,0)';
      if (m2) m2.style.transform = 'translate3d(' + (d2 - w2) + 'px,0,0)';
    });

    // process
    const steps = $$('.st2'),
      pn = $('#pn'),
      pt = $('#pt');
    steps.forEach(function (s, i) {
      ScrollTrigger.create({
        trigger: s,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: function (x) {
          if (x.isActive) {
            steps.forEach(function (o) {
              o.classList.remove('on');
            });
            s.classList.add('on');
            if (pn) {
              gsap.fromTo(pn, { yPercent: 20, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6 });
              pn.textContent = '0' + (i + 1);
            }
            if (pt) {
              const h3 = $('h3', s);
              if (h3) pt.textContent = h3.textContent;
            }
          }
        },
      });
    });
    gsap.to('#pl', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.tl', start: 'top 55%', end: 'bottom 55%', scrub: true } });

    // statement
    const w = $$('#stmt .w');
    if (w.length >= 3) {
      const st = gsap.timeline({ scrollTrigger: { trigger: '#stmt', start: 'top top', end: '+=200%', pin: true, scrub: 0.6 } });
      st.fromTo(w[0], { xPercent: 0, scale: 1.25 }, { xPercent: -45, scale: 1, duration: 1, ease: 'power2.inOut' }, 0)
        .fromTo(w[1], { scale: 1.5, opacity: 1 }, { scale: 0.85, duration: 1, ease: 'power2.inOut' }, 0)
        .fromTo(w[2], { xPercent: 0, scale: 1.25 }, { xPercent: 45, scale: 1, duration: 1, ease: 'power2.inOut' }, 0)
        .to(w[0], { xPercent: 0, duration: 1, ease: 'power3.inOut' }, 1.1)
        .to(w[2], { xPercent: 0, duration: 1, ease: 'power3.inOut' }, 1.1)
        .to('#stmt .sig', { opacity: 1, letterSpacing: '.6em', duration: 0.8 }, 1.8);
    }

    // contact
    gsap.from('#ct .ln>span', { yPercent: 110, rotate: 3, duration: 1.3, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '#ct', start: 'top 60%' } });
    gsap.from('#mag', { scale: 0.6, opacity: 0, duration: 1, ease: 'back.out(1.6)', scrollTrigger: { trigger: '#mag', start: 'top 92%' } });
    gsap.to('#ct', { backgroundColor: '#0b0f19', ease: 'none', scrollTrigger: { trigger: '#ct', start: 'top bottom', end: 'top top', scrub: true } });
  } else {
    $$('.st2').forEach(function (s) {
      s.classList.add('on');
    });
  }

  // experiment: bending line field on canvas
  const cv = $('#cv') as HTMLCanvasElement | null;
  const lab = $('#lab');
  let P = 0;
  if (cv && lab) {
    const g = cv.getContext('2d');
    let W = 0,
      H = 0,
      dpr = 1,
      vis = false,
      tx = -999,
      ty = -999,
      sx = 0,
      sy = 0;

    function rs() {
      if (!cv || !lab || !g) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = lab.clientWidth;
      H = lab.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      sx = W / 2;
      sy = H / 2;
      tx = sx;
      ty = sy;
    }
    rs();
    window.addEventListener('resize', rs);

    function mv(e: PointerEvent) {
      if (!lab) return;
      const r = lab.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    }
    lab.addEventListener('pointermove', mv as any, { passive: true });
    lab.addEventListener('pointerdown', mv as any, { passive: true });

    new IntersectionObserver(function (e) {
      vis = e[0].isIntersecting;
    }, { threshold: 0 }).observe(lab);

    function draw(t: number) {
      requestAnimationFrame(draw);
      if (!vis || !g) return;
      P *= 0.94;
      sx += (tx - sx) * 0.07;
      sy += (ty - sy) * 0.07;
      g.clearRect(0, 0, W, H);
      const rows = Math.round(H / (wide ? 14 : 16)),
        R = Math.min(W, H) * 0.42,
        ts = rm ? 0 : t * 0.0006;
      for (let i = 0; i <= rows; i++) {
        const y0 = (i / rows) * H;
        g.beginPath();
        for (let x = 0; x <= W; x += 8) {
          const dx = x - sx,
            dy = y0 - sy,
            d = Math.sqrt(dx * dx + dy * dy),
            f = Math.exp((-d * d) / (R * R * 0.5));
          const y = y0 - f * (90 + P) * Math.sin(x * 0.012 + ts * 3 + i * 0.15) - f * (dy / (d + 40)) * 70 + Math.sin(x * 0.004 + i * 0.3 + ts) * 4;
          if (x) g.lineTo(x, y);
          else g.moveTo(x, y);
        }
        const near = Math.abs(y0 - sy) < R * 0.6;
        g.strokeStyle = near
          ? 'rgba(91,124,255,' + (0.25 + 0.6 * Math.exp(-Math.pow(y0 - sy, 2) / (R * R * 0.2))) + ')'
          : 'rgba(238,241,247,.13)';
        g.lineWidth = 1;
        g.stroke();
      }
    }
    requestAnimationFrame(draw);

    lab.addEventListener('pointerdown', function () {
      P = 170;
    });
  }

  $$('.pj .im').forEach(function (im) {
    const d = document.createElement('div');
    d.className = 'gl pin meta';
    d.textContent = 'Case study ↗';
    im.appendChild(d);
  });

  const mag = $('#mag');
  if (mag) {
    mag.addEventListener('click', function (this: HTMLAnchorElement, e: MouseEvent) {
      e.preventDefault();
      const h = this.href,
        r = this.getBoundingClientRect(),
        c = 'circle(0px at ' + (r.left + r.width / 2) + 'px ' + (r.top + r.height / 2) + 'px)',
        big = Math.hypot(window.innerWidth, window.innerHeight) * 1.1;
      gsap.set('#tv', { clipPath: c, display: 'block' });
      gsap.to('#tv', {
        clipPath: c.replace('0px', big + 'px'),
        duration: 0.9,
        ease: 'expo.inOut',
        onComplete: function () {
          window.location.href = h;
          gsap.to('#tv', {
            clipPath: c,
            duration: 0.8,
            delay: 0.8,
            ease: 'expo.inOut',
            onComplete: function () {
              gsap.set('#tv', { display: 'none' });
            },
          });
        },
      });
    });
  }

  if (!rm) {
    const sc = function (t: string, o?: gsap.plugins.ScrollTriggerInstanceVars) {
      return Object.assign({ trigger: t, start: 'top top', end: 'bottom top', scrub: true }, o || {});
    };
    gsap.to('.l2', { scaleX: 1.4, transformOrigin: 'right center', ease: 'none', scrollTrigger: sc('#hero') });
    $$('.gp:not(.hg1)').forEach(function (g, i) {
      if (g.closest('#about'))
        gsap.fromTo(g, { y: 100 + i * 50 }, { y: -160 - i * 90, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top top', end: 'bottom bottom', scrub: true } });
    });
    const zk = Math.hypot(window.innerWidth, window.innerHeight) / (0.16 * Math.min(window.innerWidth, window.innerHeight));
    gsap
      .timeline({ scrollTrigger: { trigger: '#zoom', start: 'top top', end: '+=260%', pin: true, scrub: 0.6, invalidateOnRefresh: true } })
      .fromTo('.zc', { scale: 0.35, rotate: -25 }, { scale: zk, rotate: 0, duration: 1.4, ease: 'power3.in' }, 0)
      .fromTo('.zin', { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.3)
      .fromTo('.zin>*', { scale: 5, filter: 'blur(14px)' }, { scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'expo.out', stagger: 0.1 }, 1.35)
      .to('.zin', { yPercent: -100, duration: 0.7, ease: 'power3.inOut' }, 2.6);

    const bk = $('#brk');
    const D = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ];
    const sO = function (i: number) {
      const d = D[i % 4];
      return {
        x: d[0] * window.innerWidth * 0.45,
        y: d[1] * window.innerHeight * 0.5,
        rotation: i % 5 == 4 ? 70 : i % 2 ? 14 : -14,
        scale: i % 6 == 5 ? 2.6 : 1,
      };
    };
    if (bk) {
      const bt = gsap.timeline({ scrollTrigger: { trigger: '#brk', start: 'top top', end: '+=360%', pin: true, scrub: 0.6 } });
      ['CREATE.', 'DESIGN.', 'EXPERIENCE.'].forEach(function (w, wi) {
        const d = document.createElement('div');
        d.className = 'wd disp';
        d.setAttribute('aria-hidden', 'true');
        d.innerHTML = w
          .split('')
          .map(function (c) {
            return '<span>' + c + '</span>';
          })
          .join('');
        bk.appendChild(d);
        const sp = $$('span', d),
          T = wi * 2;
        bt.fromTo(
          sp,
          {
            x: function (i: number) {
              return sO(i).x;
            },
            y: function (i: number) {
              return sO(i).y;
            },
            rotation: function (i: number) {
              return sO(i).rotation;
            },
            scale: function (i: number) {
              return sO(i).scale;
            },
            opacity: 0,
            filter: 'blur(14px)',
          },
          { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, filter: 'blur(0px)', stagger: 0.06, duration: 0.9, ease: 'power3.out' },
          T
        );
        if (wi < 2)
          bt.to(
            sp,
            {
              x: function (i: number) {
                return -sO(i).x;
              },
              y: function (i: number) {
                return -sO(i).y;
              },
              rotation: function (i: number) {
                return -sO(i).rotation;
              },
              scale: function (i: number) {
                return sO(i).scale;
              },
              opacity: 0,
              filter: 'blur(14px)',
              stagger: 0.04,
              duration: 0.7,
              ease: 'power3.in',
            },
            T + 1.25
          );
        else
          bt.to(sp, { color: '#5B7CFF', stagger: 0.04, duration: 0.5 }, T + 1.2).to(sp, { letterSpacing: '.1em', duration: 0.8 }, T + 1.2);
      });
    }

    const m3 = $('#m3');
    let h3 = '';
    for (let k = 0; k < 8; k++) h3 += '<span>MD. ALIF</span>';
    if (m3) m3.innerHTML = h3;
    let w3 = m3 ? m3.scrollWidth / 2 : 0,
      d3 = 0;
    window.addEventListener('resize', function () {
      if (m3) w3 = m3.scrollWidth / 2;
    });

    let V = 0,
      SK = 0;
    const SW = $$('#wh,#cth,.nm,#ph,#exh');
    const IM = $$('.pj .im');
    ScrollTrigger.create({
      onUpdate: function (s) {
        V = s.getVelocity();
      },
    });
    gsap.ticker.add(function () {
      const t = Math.max(-8, Math.min(8, V / -260));
      SK += (t - SK) * 0.1;
      V *= 0.9;
      const a = Math.abs(SK);
      SW.forEach(function (e) {
        e.style.transform = a > 0.05 ? 'skewY(' + SK * 0.6 + 'deg) scaleY(' + (1 + a * 0.012) + ')' : '';
      });
      IM.forEach(function (e) {
        e.style.filter = a > 0.4 ? 'blur(' + a * 0.3 + 'px)' : '';
      });
      d3 += SK * 1.6 - 0.5;
      if (d3 < -w3) d3 += w3;
      if (d3 > 0) d3 -= w3;
      if (m3) m3.style.transform = 'translate3d(' + (d3 - w3 * 0.5) + 'px,0,0)';
    });

    const sp2 = gsap.timeline({ scrollTrigger: { trigger: '#split', start: 'top top', end: '+=260%', pin: true, scrub: 0.6 } });
    sp2.fromTo('.sl', { yPercent: 45 }, { yPercent: -45, duration: 1, ease: 'none' }, 0)
      .fromTo('.sr2', { yPercent: -45 }, { yPercent: 45, duration: 1, ease: 'none' }, 0)
      .fromTo('.fr', { rotateY: -32, rotateX: 8 }, { rotateY: 32, rotateX: -4, duration: 1, ease: 'none' }, 0)
      .to('.sl', { x: '16vw', duration: 0.7, ease: 'power3.inOut' }, 1)
      .to('.sr2', { x: '-16vw', duration: 0.7, ease: 'power3.inOut' }, 1)
      .to('.sm', { clipPath: 'inset(22% 22% 22% 22% round 28px)', duration: 0.6, ease: 'power2.inOut' }, 1.3)
      .to('.sm', { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.7, ease: 'expo.inOut' }, 1.9);

    const DK = {
      backgroundColor: 'rgb(7,10,18)',
      '--fg': 'rgb(238,241,247)',
      '--mut': 'rgb(139,147,167)',
      '--ln': 'rgba(238,241,247,.14)',
    };
    const LT = {
      backgroundColor: 'rgb(238,241,247)',
      '--fg': 'rgb(11,16,32)',
      '--mut': 'rgb(92,100,120)',
      '--ln': 'rgba(11,16,32,.14)',
    };
    const SB = {
      backgroundColor: 'rgb(198,212,255)',
      '--fg': 'rgb(11,16,32)',
      '--mut': 'rgb(66,76,104)',
      '--ln': 'rgba(11,16,32,.16)',
    };

    function th(sel: string, A: any, B: any, C: any) {
      function o(f: any, t: any, st: string, en: string, im: boolean) {
        gsap.fromTo(
          sel,
          f,
          Object.assign({}, t, {
            ease: 'none',
            immediateRender: im,
            scrollTrigger: { trigger: sel, start: st, end: en, scrub: 0.5 },
          })
        );
      }
      o(A, B, 'top 92%', 'top 30%', true);
      o(B, C, 'bottom 75%', 'bottom 20%', false);
    }
    th('#exp', DK, LT, DK);
    th('#proc', DK, SB, DK);
    gsap.from('.cp', { y: 70, opacity: 0, duration: 1.1, scrollTrigger: { trigger: '.cp', start: 'top 92%' } });
  }

  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });
})();
