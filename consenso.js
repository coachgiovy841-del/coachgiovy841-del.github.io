// Banner dei cookie e pixel Meta solo dopo il consenso (03/11/2026).
// Linee guida del Garante del 10/06/2021: nessun tracciamento al primo accesso,
// «Rifiuta» e la X valgono quanto «Accetta», la scelta si cambia dal link
// «Preferenze cookie» in fondo alle pagine. Dataset «Coach Giovy funnel VSL».
(function () {
  var PIXEL = '1387991586741126';
  var CHIAVE = 'cg-consenso-cookie';  // memoria tecnica della scelta, non traccia
  var VERSIONE = '2026-11-03';

  function leggi() {
    try { var v = JSON.parse(localStorage.getItem(CHIAVE)); return v && v.versione === VERSIONE ? v.scelta : null; }
    catch (e) { return null; }
  }
  function salva(scelta) {
    try { localStorage.setItem(CHIAVE, JSON.stringify({scelta: scelta, versione: VERSIONE, data: new Date().toISOString()})); }
    catch (e) {}
  }

  function accendiPixel() {
    if (window.fbq) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL);
    window.fbq('track', 'PageView');
  }

  // Revoca: si tolgono i cookie del pixel e si ricarica senza tracciamento.
  function spegniPixel() {
    ['_fbp', '_fbc'].forEach(function (c) {
      document.cookie = c + '=; Max-Age=0; path=/';
      document.cookie = c + '=; Max-Age=0; path=/; domain=' + location.hostname;
      document.cookie = c + '=; Max-Age=0; path=/; domain=.' + location.hostname;
    });
  }

  var stile = '#cg-cookie{position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;max-width:620px;margin:0 auto;' +
    'background:#fff;color:#050A30;border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,.45);padding:18px 18px 16px;' +
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;font-size:15px;line-height:1.45}' +
    '#cg-cookie b{display:block;font-size:17px;margin:0 28px 6px 0}' +
    '#cg-cookie p{margin:0 0 12px;color:#050A30}' +
    '#cg-cookie a{color:#050A30;text-decoration:underline}' +
    '#cg-cookie .x{position:absolute;top:8px;right:10px;background:none;border:0;font-size:26px;line-height:1;cursor:pointer;color:#050A30}' +
    '#cg-cookie .bt{display:flex;gap:10px;flex-wrap:wrap}' +
    '#cg-cookie .bt button{flex:1 1 160px;font:inherit;font-weight:800;font-size:16px;padding:12px 14px;border-radius:10px;cursor:pointer;border:2px solid #050A30}' +
    '#cg-cookie .si{background:#050A30;color:#FFFF00}#cg-cookie .no{background:#fff;color:#050A30}';

  function mostraBanner() {
    if (document.getElementById('cg-cookie')) return;
    if (!document.getElementById('cg-cookie-stile')) {
      var st = document.createElement('style'); st.id = 'cg-cookie-stile'; st.textContent = stile; document.head.appendChild(st);
    }
    var box = document.createElement('div');
    box.id = 'cg-cookie'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Preferenze cookie');
    box.innerHTML = '<button class="x" type="button" aria-label="Chiudi e continua senza accettare">×</button>' +
      '<b>Cookie su questa pagina</b>' +
      '<p>Uso solo i cookie tecnici necessari. Con il tuo consenso attivo anche il pixel di Meta, che misura le visite arrivate ' +
      'dalle inserzioni su Facebook e Instagram e serve a mostrarle alle persone giuste. Puoi cambiare idea quando vuoi dal link ' +
      '«Preferenze cookie» in fondo alla pagina. <a href="privacy.html#cookie">Dettagli</a></p>' +
      '<div class="bt"><button class="no" type="button">Rifiuta</button><button class="si" type="button">Accetta</button></div>';
    document.body.appendChild(box);
    function chiudi(scelta) {
      var prima = leggi();
      salva(scelta); box.remove();
      if (scelta === 'si') accendiPixel();
      else if (prima === 'si') { spegniPixel(); location.reload(); }
    }
    box.querySelector('.x').onclick = function () { chiudi('no'); };
    box.querySelector('.no').onclick = function () { chiudi('no'); };
    box.querySelector('.si').onclick = function () { chiudi('si'); };
  }

  function avvia() {
    var s = leggi();
    if (s === 'si') accendiPixel();
    else if (s === null) mostraBanner();
    document.querySelectorAll('[data-cookie]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); mostraBanner(); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvia); else avvia();
})();
