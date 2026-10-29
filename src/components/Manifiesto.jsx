"use client";

/*
  RINOKU — "Manifiesto"
  --------------------------------------------------------------
  Constelación técnica que crece por escena (observar → comprender →
  decidir → actuar) y cierra con la marca RINOKU. Auto-play con timeline
  y pausa. Paleta RINOKU clara (papel / grafito / terracota).
  Client Component; estilos scopeados a .rk-manifesto vía styled-jsx.
*/

import { useEffect, useRef } from "react";

const SCENES = [
  { headline: <>No comenzamos por la tecnología.<br />Comenzamos por comprender.</> },
  { num: "01", tag: "Observar", cond: "Si observamos con precisión,", cons: "comprendemos lo que realmente ocurre." },
  { num: "02", tag: "Comprender", cond: "Si comprendemos con criterio,", cons: "podemos decidir con responsabilidad." },
  { num: "03", tag: "Decidir", cond: "Si decidimos con responsabilidad,", cons: "actuamos con eficiencia." },
  { num: "04", tag: "Actuar", cond: "Y si actuamos con eficiencia,", cons: "hacemos mejor lo que realmente importa." },
  { empty: true },
];

export default function Manifiesto() {
  const rootRef = useRef(null);
  const netRef = useRef(null);
  const finaleRef = useRef(null);
  const timelineRef = useRef(null);
  const ctrlRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const cv = netRef.current;
    const finaleEl = finaleRef.current;
    const tl = timelineRef.current;
    const ctrl = ctrlRef.current;
    if (!root || !cv || !finaleEl || !tl || !ctrl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = cv.getContext("2d");
    const scenes = [...root.querySelectorAll(".scene")];
    const segs = [...tl.children];

    const play = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    const pauseI = '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';
    ctrl.innerHTML = pauseI;

    const DUR = [2600, 3000, 3000, 3000, 4800, 5200];
    const TARGET = [0.12, 0.34, 0.58, 0.8, 1.0, 1.0];
    const FINALE = scenes.length - 1;

    let W, H, DPR, neurons = [], edges = [], signals = [], motes = [], shocks = [], last = performance.now();
    let scene = 0, tScene = 0, paused = false, growth = 0, prevScene = -1, flash = 0;
    let clx = 0, cly = 0, clr = 1, maxLen = 1;
    let killed = false, raf = 0;

    function build() {
      DPR = Math.min(window.devicePixelRatio || 1, 2); W = root.clientWidth; H = root.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR; cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const cx = W * 0.72, cy = H * 0.235, rx = Math.min(W * 0.26, 320), ry = Math.min(H * 0.2, 260);
      clx = cx; cly = cy; clr = Math.max(rx, ry);
      const N = Math.round(Math.max(22, Math.min(34, (W * H) / 30000)));
      neurons = [];
      let tries = 0;
      while (neurons.length < N && tries < N * 60) {
        tries++;
        const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random());
        const x = cx + Math.cos(a) * r * rx, y = cy + Math.sin(a) * r * ry;
        if (neurons.some((n) => Math.hypot(n.x - x, n.y - y) < Math.min(rx, ry) * 0.22)) continue;
        neurons.push({ x, y, d: Math.hypot((x - cx) / rx, (y - cy) / ry), act: 0, litAt: -1, ph: Math.random() * Math.PI * 2 });
      }
      neurons.sort((a, b) => a.d - b.d);
      neurons.forEach((n, i) => (n.thr = 0.06 + 0.9 * (i / Math.max(1, neurons.length - 1))));

      edges = [];
      const seen = new Set();
      for (let i = 0; i < neurons.length; i++) {
        const order = neurons.map((n, j) => ({ j, d: Math.hypot(n.x - neurons[i].x, n.y - neurons[i].y) }))
          .filter((o) => o.j !== i).sort((a, b) => a.d - b.d).slice(0, 3);
        for (const o of order) {
          const key = i < o.j ? i + "-" + o.j : o.j + "-" + i;
          if (seen.has(key)) continue; seen.add(key);
          const a = neurons[i], b = neurons[o.j];
          edges.push({ a: i, b: o.j, len: o.d, thr: Math.min(1, Math.max(a.thr, b.thr) + 0.03), opt: edges.length % 3 === 0 });
        }
      }
      neurons.forEach((n) => (n.nb = []));
      edges.forEach((e, ei) => { neurons[e.a].nb.push({ e: ei, o: e.b }); neurons[e.b].nb.push({ e: ei, o: e.a }); });
      maxLen = Math.max(...edges.map((e) => e.len), 1);
      signals = []; motes = [];
    }

    const vN = (i) => neurons[i].thr <= growth;
    const vE = (e) => e.thr <= growth && vN(e.a) && vN(e.b);

    function fire(i, now, gen) {
      const n = neurons[i]; n.act = 1; n.litAt = now;
      if (gen > 3 || signals.length > 40) return;
      const p = scene >= 3 ? 0.5 : scene >= 2 ? 0.38 : 0.24;
      for (const nb of n.nb) { if (!vE(edges[nb.e])) continue; if (Math.random() < p) signals.push({ a: i, b: nb.o, t: 0, sp: 1.5 + Math.random() * 1.1, gen: gen + 1 }); }
    }
    function seedSignal(now) { const vis = neurons.map((n, i) => i).filter(vN); if (vis.length < 2) return; fire(vis[(Math.random() * vis.length) | 0], now, 0); }
    function spawnMote() {
      const vis = neurons.map((n, i) => i).filter(vN); if (!vis.length) return;
      const tgt = vis[(Math.random() * vis.length) | 0], n = neurons[tgt];
      const ang = Math.random() * Math.PI * 2, R = Math.max(W, H) * 0.18;
      motes.push({ x: n.x + Math.cos(ang) * R, y: n.y + Math.sin(ang) * R, tx: n.x, ty: n.y, tgt, life: 1 });
    }

    function setScene(i) {
      scene = ((i % scenes.length) + scenes.length) % scenes.length; tScene = 0;
      scenes.forEach((s, k) => s.classList.toggle("active", k === scene));
      segs.forEach((s, k) => { s.classList.toggle("done", k < scene); const bar = s.querySelector("i"); if (bar) bar.style.width = k < scene ? "100%" : "0"; });
    }
    function ignite(now) {
      for (const n of neurons) { if (n.thr <= growth) { n.act = 1; n.litAt = now; } }
      shocks.push({ r: 0, life: 1 }, { r: 0, life: 1, delay: 180 }, { r: 0, life: 1, delay: 420 });
      flash = 1;
      for (let k = 0; k < 6; k++) seedSignal(now);
    }
    function onSceneEnter(now) {
      if (scene === FINALE) { ignite(now); finaleEl.classList.add("show"); finaleEl.setAttribute("aria-hidden", "false"); }
      else { finaleEl.classList.remove("show"); finaleEl.setAttribute("aria-hidden", "true"); shocks.length = 0; flash = 0; }
    }

    let sigTimer = 0, moteTimer = 0;
    function tick(now) {
      if (killed) return;
      const dt = Math.min(50, now - last); last = now;

      if (!paused && !reduce) {
        tScene += dt;
        const bar = segs[scene]?.querySelector("i"); if (bar) bar.style.width = Math.min(100, (tScene / DUR[scene]) * 100) + "%";
        if (tScene >= DUR[scene]) setScene(scene + 1);
      }
      if (scene !== prevScene) { prevScene = scene; if (!reduce) onSceneEnter(now); }

      const tgt = reduce ? 1 : TARGET[scene];
      growth += (tgt - growth) * Math.min(1, dt / 700);

      if (!reduce) {
        const rate = [9999, 1400, 650, 320, 240, 150][scene];
        sigTimer += dt; if (sigTimer >= rate) { sigTimer = 0; seedSignal(now); }
        const mrate = scene <= 1 ? 260 : scene === 2 ? 900 : 99999;
        moteTimer += dt; if (moteTimer >= mrate) { moteTimer = 0; spawnMote(); }
      }

      flash *= 0.9; if (flash < 0.01) flash = 0;
      for (let i = shocks.length - 1; i >= 0; i--) {
        const s = shocks[i];
        if (s.delay > 0) { s.delay -= dt; continue; }
        s.r += Math.max(W, H) * 1.15 * (dt / 1400);
        s.life -= dt / 1400;
        if (s.life <= 0) shocks.splice(i, 1);
      }

      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i]; s.t += s.sp * (dt / 1000) * (1 / Math.max(0.25, (s.len || maxLen) / maxLen));
        if (s.t >= 1) { fire(s.b, now, s.gen); signals.splice(i, 1); }
      }
      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i]; m.x += (m.tx - m.x) * 0.08; m.y += (m.ty - m.y) * 0.08; m.life -= dt / 1400;
        if (Math.hypot(m.tx - m.x, m.ty - m.y) < 4 || m.life <= 0) { if (neurons[m.tgt]) { neurons[m.tgt].act = 1; neurons[m.tgt].litAt = now; } motes.splice(i, 1); }
      }

      const unison = scene >= 4 ? 1 : 0;
      for (const n of neurons) { n.act *= 0.94; if (n.act < 0.001) n.act = 0; }

      ctx.clearRect(0, 0, W, H);

      for (const e of edges) {
        if (!vE(e)) continue;
        const a = neurons[e.a], b = neurons[e.b];
        const heat = Math.min(1, (a.act + b.act) * 0.9);
        const strong = e.opt && scene >= 3;
        let base = (1 - e.len / (maxLen * 1.05)) * 0.22; if (strong) base += 0.12;
        if (heat > 0.05 || strong) {
          ctx.strokeStyle = `rgba(167,68,44,${Math.min(0.72, base + heat * 0.5 + (strong ? 0.16 : 0))})`;
        } else {
          ctx.strokeStyle = `rgba(48,58,54,${base * 0.6})`;
        }
        ctx.lineWidth = strong ? 1.5 : 0.8 + heat;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      for (const s of signals) {
        const a = neurons[s.a], b = neurons[s.b];
        const x = a.x + (b.x - a.x) * s.t, y = a.y + (b.y - a.y) * s.t;
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 7); ctx.fillStyle = "rgba(167,68,44,.95)";
        ctx.shadowColor = "rgba(167,68,44,.55)"; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
      }
      for (const n of neurons) {
        if (n.thr > growth) continue;
        let a = n.act;
        if (unison) a = Math.max(a, 0.3 + 0.3 * Math.sin(now / 620 + n.ph));
        if (a > 0.05) {
          const rr = 2.4 + 5 * a;
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rr);
          g.addColorStop(0, `rgba(167,68,44,${0.85 * Math.min(1, a + 0.2)})`); g.addColorStop(1, "rgba(167,68,44,0)");
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, rr, 0, 7); ctx.fill();
        } else { ctx.fillStyle = "rgba(48,58,54,.30)"; ctx.beginPath(); ctx.arc(n.x, n.y, 1.6, 0, 7); ctx.fill(); }
      }
      for (const m of motes) { ctx.beginPath(); ctx.arc(m.x, m.y, 1.8, 0, 7); ctx.fillStyle = `rgba(72,102,88,${0.5 * m.life + 0.2})`; ctx.fill(); }

      if (scene === FINALE) {
        const prog = Math.min(1, tScene / 1300);
        const rad = Math.max(W, H) * (0.18 + 0.32 * prog);
        const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, rad);
        g.addColorStop(0, `rgba(167,68,44,${0.13 * prog})`); g.addColorStop(1, "rgba(167,68,44,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(W / 2, H / 2, rad, 0, 7); ctx.fill();
      }
      for (const s of shocks) {
        if (s.delay > 0) continue;
        ctx.beginPath(); ctx.arc(clx, cly, s.r, 0, 7);
        ctx.strokeStyle = `rgba(167,68,44,${0.5 * s.life})`; ctx.lineWidth = 2.5 * s.life + 0.5;
        ctx.shadowColor = "rgba(167,68,44,.6)"; ctx.shadowBlur = 14 * s.life; ctx.stroke(); ctx.shadowBlur = 0;
      }
      if (flash > 0) { ctx.fillStyle = `rgba(167,68,44,${flash * 0.07})`; ctx.fillRect(0, 0, W, H); }

      raf = requestAnimationFrame(tick);
    }

    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize);

    const onCtrl = () => { paused = !paused; ctrl.innerHTML = paused ? play : pauseI; last = performance.now(); };
    const onVis = () => { if (document.hidden) { paused = true; ctrl.innerHTML = play; } };

    if (reduce) {
      root.classList.add("reduced");
      scenes.forEach((s) => s.classList.add("active"));
      growth = 1; raf = requestAnimationFrame(tick);
    } else {
      setScene(0);
      raf = requestAnimationFrame(tick);
      ctrl.addEventListener("click", onCtrl);
      document.addEventListener("visibilitychange", onVis);
    }

    return () => {
      killed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      ctrl.removeEventListener("click", onCtrl);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <section ref={rootRef} className="rk-manifesto" id="manifiesto">
      <canvas ref={netRef} className="net" aria-hidden="true" />
      <div className="scrim" aria-hidden="true" />

      <div className="stage">
        {SCENES.map((s, i) =>
          s.empty ? (
            <div key={i} className="scene" />
          ) : s.headline ? (
            <div key={i} className="scene">
              <div className="headline">{s.headline}</div>
            </div>
          ) : (
            <div key={i} className="scene">
              <div className="tag"><span className="num">{s.num}</span> {s.tag}</div>
              <span className="cond">{s.cond}</span>
              <span className="cons">{s.cons}</span>
            </div>
          )
        )}
      </div>

      <div className="finale" ref={finaleRef} aria-hidden="true">
        <svg className="fmark" viewBox="0 0 40 40" fill="none">
          <path d="M20 2 L38 20 L20 38 L2 20 Z" fill="#a7442c" />
          <path d="M20 11 L29 20 L20 29 L11 20 Z" fill="none" stroke="#faf7f0" strokeWidth="2.2" />
        </svg>
        <div className="fword">RINOKU</div>
        <div className="ftag">Información confiable. Decisiones eficientes.</div>
      </div>

      <div className="timeline" ref={timelineRef}>
        {SCENES.map((_, i) => (
          <div key={i} className="seg"><i /></div>
        ))}
      </div>
      <button className="ctrl" ref={ctrlRef} aria-label="Pausar o reanudar" />

      <style jsx>{`
        .rk-manifesto {
          --muted:#5b625d; --ink:#252c29; --graphite:#303a36; --terra:#a7442c; --terra-hi:#8e3726; --line:#d3c9b9;
          position:relative; height:100vh; min-height:560px; overflow:hidden;
          background:#faf7f0; color:var(--ink);
          font-family:"IBM Plex Sans", system-ui, -apple-system, sans-serif; -webkit-font-smoothing:antialiased;
        }
        .rk-manifesto :global(*) { box-sizing:border-box; }

        .net { position:absolute; inset:0; width:100%; height:100%; z-index:0; display:block; }
        .scrim { position:absolute; inset:0; z-index:1; pointer-events:none;
          background:radial-gradient(120% 85% at 28% 85%, rgba(250,247,240,.55), transparent 60%); }

        .stage { position:relative; z-index:2; height:100%; max-width:980px; margin:0 auto; }
        .scene { position:absolute; left:1.9rem; right:1.9rem; bottom:16vh; max-width:24ch;
          opacity:0; transform:translateY(26px);
          transition:opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1); pointer-events:none; }
        .scene.active { opacity:1; transform:none; }

        .headline { font-family:"Archivo Black","Archivo",sans-serif; font-size:clamp(2rem,7.4vw,3rem); line-height:1.08; letter-spacing:-0.025em; color:var(--graphite); max-width:20ch; }
        .tag { font-family:"IBM Plex Mono", monospace; font-size:.72rem; letter-spacing:.22em; text-transform:uppercase;
          color:var(--terra); display:flex; align-items:baseline; gap:.85rem; margin-bottom:1.1rem; }
        .tag .num { color:var(--muted); }
        .cond { display:block; color:var(--muted); font-weight:400; font-size:clamp(1.4rem,5vw,2.1rem); line-height:1.16; }
        .cons { display:block; color:var(--graphite); font-weight:600; font-size:clamp(1.6rem,5.8vw,2.5rem); line-height:1.16; margin-top:.12em; }

        .timeline { position:absolute; left:1.9rem; right:1.9rem; bottom:6.5vh; z-index:5; display:flex; gap:6px; }
        .timeline .seg { flex:1; height:3px; background:var(--line); border-radius:2px; overflow:hidden; }
        .timeline .seg i { display:block; height:100%; width:0; background:var(--terra); }
        .timeline .seg.done i { width:100%; }

        .ctrl { position:absolute; right:1.6rem; bottom:5.2vh; z-index:6; width:34px; height:34px; border-radius:50%;
          border:1px solid var(--line); background:rgba(255,255,255,.7); color:var(--graphite); cursor:pointer;
          display:grid; place-items:center; transition:border-color .3s, transform .15s; }
        .ctrl:hover { border-color:var(--terra); }
        .ctrl:active { transform:scale(.92); }
        .ctrl :global(svg) { width:14px; height:14px; fill:var(--graphite); }

        .finale { position:absolute; inset:0; z-index:4; display:flex; flex-direction:column;
          align-items:center; justify-content:center; gap:.7rem; pointer-events:none;
          opacity:0; transform:scale(.88); filter:blur(5px);
          transition:opacity 1.1s ease, transform 1.4s cubic-bezier(.16,1,.3,1), filter 1.1s ease; }
        .finale.show { opacity:1; transform:scale(1); filter:blur(0); }
        .fmark { width:58px; height:58px; filter:drop-shadow(0 6px 16px rgba(167,68,44,.25)); }
        .fword { font-family:"Archivo Black","Archivo",sans-serif; font-size:clamp(2.4rem,11vw,4rem); letter-spacing:-0.02em; color:var(--graphite); }
        .ftag { font-family:"IBM Plex Mono", monospace; font-size:.72rem; letter-spacing:.18em;
          text-transform:uppercase; color:var(--terra); }

        .rk-manifesto.reduced { height:auto; overflow:visible; }
        .rk-manifesto.reduced .stage { height:auto; padding:22vh 0 12vh; }
        .rk-manifesto.reduced .scene { position:static; left:auto; right:auto; bottom:auto;
          opacity:1; transform:none; margin:0 1.9rem 2.6rem; max-width:26ch; }
        .rk-manifesto.reduced .timeline, .rk-manifesto.reduced .ctrl { display:none; }
      `}</style>
    </section>
  );
}
