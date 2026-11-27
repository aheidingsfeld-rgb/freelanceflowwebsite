// Adds a spinning 3D wireframe globe + node network behind the homepage hero.
// Runs as part of `npm run build` and patches dist/index.html only.
const fs = require("fs");
const file = "dist/index.html";
let h = fs.readFileSync(file, "utf8");
if (h.includes('id="ff-globe-bg"')) process.exit(0);

const marker = '<section class="wrap hero">';
if (!h.includes(marker)) throw new Error("Hero section not found");

const markup = '<div class="ff-globe-bg" id="ff-globe-bg" aria-hidden="true"><canvas></canvas></div>';

const css = String.raw`<style id="ff-globe-css">
.ff-globe-bg{--globe-line:199,243,107;--globe-node:199,243,107;position:absolute;z-index:0;right:-4%;top:50%;transform:translateY(-50%);width:min(660px,62%);aspect-ratio:1/1;pointer-events:none;opacity:.6}
.ff-globe-bg canvas{width:100%;height:100%;display:block}
@media(max-width:980px){.ff-globe-bg{right:50%;transform:translate(50%,-50%);top:56%;width:min(560px,96%);opacity:.32}}
@media(max-width:560px){.ff-globe-bg{width:120%;opacity:.26}}
</style>`;

const js = String.raw`<script id="ff-globe-js">
(function () {
  var root = document.getElementById('ff-globe-bg');
  if (!root) return;
  var canvas = root.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  if (!ctx) return;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function rgb(name) { return getComputedStyle(root).getPropertyValue(name).trim() || '199,243,107'; }
  var LINE = rgb('--globe-line'), NODE = rgb('--globe-node');

  var dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = root.getBoundingClientRect().width || 400;
    canvas.width = canvas.height = Math.round(w * dpr);
  }

  var D2R = Math.PI / 180, wire = [], i, k, pts;
  for (var lat = -80; lat <= 80; lat += 20) {
    pts = [];
    for (i = 0; i <= 72; i++) {
      var a = i * 5 * D2R, r = Math.cos(lat * D2R);
      pts.push([r * Math.cos(a), Math.sin(lat * D2R), r * Math.sin(a)]);
    }
    wire.push(pts);
  }
  for (var lon = 0; lon < 360; lon += 20) {
    pts = [];
    for (i = 0; i <= 72; i++) {
      var phi = (-90 + i * 2.5) * D2R, th = lon * D2R;
      pts.push([Math.cos(phi) * Math.cos(th), Math.sin(phi), Math.cos(phi) * Math.sin(th)]);
    }
    wire.push(pts);
  }

  var N = 80, nodes = [], golden = Math.PI * (3 - Math.sqrt(5));
  for (i = 0; i < N; i++) {
    var y = 1 - (i / (N - 1)) * 2, rad = Math.sqrt(1 - y * y), t = i * golden, j = 0.04;
    var p = [rad * Math.cos(t) + (Math.random() - 0.5) * j, y + (Math.random() - 0.5) * j, rad * Math.sin(t) + (Math.random() - 0.5) * j];
    var len = Math.hypot(p[0], p[1], p[2]);
    nodes.push([p[0] / len, p[1] / len, p[2] / len]);
  }
  var edges = [];
  for (i = 0; i < N; i++) for (k = i + 1; k < N; k++) {
    if (Math.hypot(nodes[i][0] - nodes[k][0], nodes[i][1] - nodes[k][1], nodes[i][2] - nodes[k][2]) < 0.5) edges.push([i, k]);
  }
  var pulses = [];
  for (i = 0; i < 8; i++) pulses.push({ e: Math.floor(Math.random() * edges.length), t: Math.random(), s: 0.004 + Math.random() * 0.006, dir: 1 });

  var yaw = 0, tilt = 0.4;
  function project(p, cy, sy, ct, st, R, c0) {
    var x = p[0] * cy + p[2] * sy, z = -p[0] * sy + p[2] * cy;
    var y = p[1] * ct - z * st; z = p[1] * st + z * ct;
    var s = 1 + z * 0.12;
    return [c0 + x * R * s, c0 - y * R * s, z];
  }

  function draw() {
    var W = canvas.width, c0 = W / 2, R = W * 0.4;
    ctx.clearRect(0, 0, W, W);
    ctx.lineWidth = Math.max(1, dpr * 0.8);
    ctx.lineCap = 'round';
    var cy = Math.cos(yaw), sy = Math.sin(yaw), ct = Math.cos(tilt), st = Math.sin(tilt);

    var g = ctx.createRadialGradient(c0, c0, R * 0.2, c0, c0, R * 1.25);
    g.addColorStop(0, 'rgba(' + LINE + ',0.08)');
    g.addColorStop(1, 'rgba(' + LINE + ',0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, W);

    var back = new Path2D(), front = new Path2D();
    wire.forEach(function (line) {
      var prev = project(line[0], cy, sy, ct, st, R, c0);
      for (var n = 1; n < line.length; n++) {
        var cur = project(line[n], cy, sy, ct, st, R, c0);
        var path = (prev[2] + cur[2]) / 2 < 0 ? back : front;
        path.moveTo(prev[0], prev[1]); path.lineTo(cur[0], cur[1]);
        prev = cur;
      }
    });
    ctx.strokeStyle = 'rgba(' + LINE + ',0.10)'; ctx.stroke(back);
    ctx.strokeStyle = 'rgba(' + LINE + ',0.28)'; ctx.stroke(front);

    var proj = nodes.map(function (p) { return project(p, cy, sy, ct, st, R, c0); });
    var eb = new Path2D(), ef = new Path2D();
    edges.forEach(function (e) {
      var a = proj[e[0]], b = proj[e[1]];
      var path = (a[2] + b[2]) / 2 < 0 ? eb : ef;
      path.moveTo(a[0], a[1]); path.lineTo(b[0], b[1]);
    });
    ctx.strokeStyle = 'rgba(' + NODE + ',0.10)'; ctx.stroke(eb);
    ctx.strokeStyle = 'rgba(' + NODE + ',0.45)'; ctx.stroke(ef);

    proj.map(function (p, idx) { return idx; }).sort(function (a, b) { return proj[a][2] - proj[b][2]; }).forEach(function (idx) {
      var p = proj[idx], depth = (p[2] + 1) / 2;
      ctx.fillStyle = 'rgba(' + NODE + ',' + (0.2 + depth * 0.8).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(p[0], p[1], dpr * (1 + depth * 2), 0, Math.PI * 2); ctx.fill();
    });

    pulses.forEach(function (pl) {
      var e = edges[pl.e], a = proj[e[0]], b = proj[e[1]], tt = pl.dir > 0 ? pl.t : 1 - pl.t;
      var x = a[0] + (b[0] - a[0]) * tt, yy = a[1] + (b[1] - a[1]) * tt, z = a[2] + (b[2] - a[2]) * tt;
      if (z < -0.1) return;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.shadowColor = 'rgba(' + NODE + ',1)'; ctx.shadowBlur = 10 * dpr;
      ctx.beginPath(); ctx.arc(x, yy, dpr * 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    });
  }

  function step() {
    yaw += 0.0025;
    pulses.forEach(function (pl) {
      pl.t += pl.s;
      if (pl.t >= 1) { pl.t = 0; pl.e = Math.floor(Math.random() * edges.length); pl.dir = Math.random() < 0.5 ? 1 : -1; }
    });
  }

  var running = false, visible = true, raf;
  function loop() { if (!running) return; step(); draw(); raf = requestAnimationFrame(loop); }
  function start() { if (!running && visible && !document.hidden && !reduceMotion) { running = true; raf = requestAnimationFrame(loop); } }
  function stop() { running = false; cancelAnimationFrame(raf); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; visible ? start() : stop(); }).observe(root);
  }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  window.addEventListener('resize', function () { resize(); if (!running) draw(); });
  resize(); draw(); start();
})();
</script>`;

h = h.replace(marker, () => marker + markup);
h = h.replace("</head>", () => css + "</head>");
h = h.replace("</body>", () => js + "</body>");
fs.writeFileSync(file, h);
console.log("Hero globe added to homepage.");
