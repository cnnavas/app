/* CNN App · Wellness (pas 2.4)
 * Mateixes preguntes i salts que el formulari. Tot es pinta amb textContent / createElementNS. */
(function () {
  "use strict";

  var RPE = ["Repòs", "Molt fàcil", "Còmode", "Esforç mínim", "Una mica ofegat", "Puc parlar bé",
             "Exigent, ja m'ofego", "Molt exigent", "No puc parlar", "Massa dur", "Al límit"];
  var RPE_COL = ["#93C5FD", "#22C55E", "#4ADE80", "#A3E635", "#FACC15", "#FBBF24", "#F59E0B", "#F97316", "#EF4444", "#DC2626", "#991B1B"];
  var DIES_DOLOR = ["Avui és el primer dia", "Fa 2 o 3 dies", "Fa més d'una setmana"];

  var X = {
    ca: { seguent: "Següent", enrere: "← Enrere", enviar: "Enviar", tancar: "Tancar", sortir: "Sortir sense enviar",
          sortirSeg: "Segur que vols sortir? Es perdran les respostes.", sessio: "Wellness de la sessió de",
          nit: "La nit", cincMillor: "Recorda: el 5 sempre és el millor 😉", tria: "Tria una opció",
          totes: "Respon totes les preguntes per continuar", minuts: "minuts", hores: "hores",
          davant: "Davant", esquena: "Esquena", tocaZona: "Toca la zona on et fa mal. Pots marcar-ne més d'una.",
          intensitat: "Quant et fa mal?", faDies: "Fa dies que et passa?", treure: "Treure aquesta zona", fet: "Fet",
          capZona: "Marca almenys una zona", resumTit: "Revisa-ho i envia", enviant: "Enviant…",
          gracies: "Gràcies! 💪", enviat: "El teu wellness s'ha enviat. Només el veus tu i l'equip tècnic.",
          provaTit: "Mode prova (admin)", provaTxt: "No s'ha enviat res. Això és el que s'hauria escrit a la hoja:",
          noi: "Noi", noia: "Noia", opcional: "(opcional)", comp1: "Com de dura ha estat la competició en conjunt?",
          comp2: "Com has arribat a la competició?", km: "Quilòmetres (opcional)", privat: "🔒 Privat: només tu i l'equip tècnic" },
    es: { seguent: "Siguiente", enrere: "← Atrás", enviar: "Enviar", tancar: "Cerrar", sortir: "Salir sin enviar",
          sortirSeg: "¿Seguro que quieres salir? Se perderán las respuestas.", sessio: "Wellness de la sesión de",
          nit: "La noche", cincMillor: "Recuerda: el 5 siempre es lo mejor 😉", tria: "Elige una opción",
          totes: "Responde todas las preguntas para continuar", minuts: "minutos", hores: "horas",
          davant: "Delante", esquena: "Espalda", tocaZona: "Toca la zona donde te duele. Puedes marcar más de una.",
          intensitat: "¿Cuánto te duele?", faDies: "¿Hace días que te pasa?", treure: "Quitar esta zona", fet: "Hecho",
          capZona: "Marca al menos una zona", resumTit: "Revísalo y envía", enviant: "Enviando…",
          gracies: "¡Gracias! 💪", enviat: "Tu wellness se ha enviado. Solo lo ves tú y el equipo técnico.",
          provaTit: "Modo prueba (admin)", provaTxt: "No se ha enviado nada. Esto es lo que se habría escrito en la hoja:",
          noi: "Chico", noia: "Chica", opcional: "(opcional)", comp1: "Com de dura ha estat la competició en conjunt?",
          comp2: "Com has arribat a la competició?", km: "Kilómetros (opcional)", privat: "🔒 Privado: solo tú y el equipo técnico" }
  };

  var C, info, r, pas, vistaCos;
  function x(k) { return (X[C.idioma()] || X.ca)[k]; }
  function el() { return C.el.apply(null, arguments); }

  // ---------- Camí segons les respostes (mateixos salts que el formulari) ----------
  function cami() {
    var o = info.opcions, s = ["inici"];
    var i = o.entrenat.indexOf(r.entrenat);
    if (i === 2) s.push("comp", "esforcComp");
    if (i === 0) s.push("esforc");
    if (i === 3) s.push("altra");
    s.push("estas");
    if (r.dolor === o.dolor[0]) s.push("dolor");
    s.push("ultima");
    if (r.cicle === o.cicle[0]) s.push("cicle");
    s.push("resum");
    return s;
  }

  // ---------- Peces ----------
  function pregunta(text, fills, extra) {
    return el("div", { class: "wq" }, [el("div", { class: "wq-t", text: text }), extra ? el("div", { class: "gris wq-x", text: extra }) : null].concat(fills));
  }
  function botons(opts, clau, multi, despres) {
    return el("div", { class: "wb" }, opts.map(function (o) {
      var on = multi ? (r[clau] || []).indexOf(o) >= 0 : r[clau] === o;
      return el("button", { type: "button", class: "wbtn" + (on ? " on" : ""), "aria-pressed": on ? "true" : "false", text: o, onclick: function () {
        if (multi) { var a = (r[clau] || []).slice(); var k = a.indexOf(o); if (k >= 0) a.splice(k, 1); else a.push(o); r[clau] = a; }
        else r[clau] = o;
        if (despres) despres(); else pinta();
      } });
    }));
  }
  function escala5(clau, etiq) {
    var fila = el("div", { class: "w5" });
    for (var i = 1; i <= 5; i++) (function (v) {
      fila.appendChild(el("button", { type: "button", class: "w5b" + (r[clau] === v ? " on" : ""), "aria-label": String(v), text: String(v), onclick: function () { r[clau] = v; pinta(); } }));
    })(i);
    return el("div", {}, [fila, el("div", { class: "w5e" }, [el("span", { text: "1 · " + etiq[0] }), el("span", { text: etiq[1] + " · 5" })])]);
  }
  function rpe(clau) {
    return el("div", { class: "wrpe" }, RPE.map(function (et, v) {
      var on = r[clau] === v;
      var b = el("button", { type: "button", class: "wr" + (on ? " on" : "") + (v >= 8 ? " fosc" : ""), "aria-pressed": on ? "true" : "false", onclick: function () { r[clau] = v; pinta(); } },
        [el("span", { class: "wr-n", text: String(v) }), el("span", { class: "wr-e", text: et })]);
      b.style.background = RPE_COL[v];
      return b;
    }));
  }
  function stepper(clau, pasV, min, max, unitat) {
    var v = r[clau];
    function canvia(d) { var n = Math.round((v + d) * 2) / 2; if (n >= min && n <= max) { r[clau] = n; pinta(); } }
    return el("div", { class: "wst" }, [
      el("button", { type: "button", class: "wst-b", "aria-label": "−", text: "−", onclick: function () { canvia(-pasV); } }),
      el("div", { class: "wst-v" }, [el("strong", { text: String(v).replace(".", ",") }), el("span", { text: " " + unitat })]),
      el("button", { type: "button", class: "wst-b", "aria-label": "+", text: "+", onclick: function () { canvia(pasV); } })
    ]);
  }
  function text(clau, ph, max, multi) {
    var n = el(multi ? "textarea" : "input", { class: "wtx", maxlength: String(max), placeholder: ph || "", rows: multi ? "3" : null, type: multi ? null : "text" });
    n.value = r[clau] || "";
    n.addEventListener("input", function () { r[clau] = n.value; validaBoto(); });
    return n;
  }

  // ---------- Pantalles ----------
  var botoSeg = null, validador = null;
  function validaBoto() { if (botoSeg && validador) botoSeg.disabled = !validador(); }

  function pantalla(titol, cos, valid, textBoto, accio) {
    var s = cami(), i = s.indexOf(pas), tot = s.length;
    var barra = el("div", { class: "punts" });
    for (var k = 0; k < tot; k++) barra.appendChild(el("span", { class: k <= i ? "on" : "" }));
    botoSeg = el("button", { type: "button", class: "btn", text: textBoto || x("seguent"), onclick: function () {
      if (validador && !validador()) return;
      if (accio) accio(); else { pas = cami()[cami().indexOf(pas) + 1]; pinta(); }
    } });
    validador = valid || null;
    var peu = el("div", { class: "botons wpeu" }, [botoSeg,
      el("button", { type: "button", class: "btn2", text: i > 0 ? x("enrere") : x("sortir"), onclick: function () {
        if (i > 0) { pas = s[i - 1]; pinta(); } else if (window.confirm(x("sortirSeg"))) C.tornar();
      } })]);
    C.pinta(el("div", { class: "pant wpant" }, [
      el("div", { class: "wcap" }, [barra, el("div", { class: "wdia", text: x("sessio") + " " + info.diaTxt }), info.prova ? el("div", { class: "wprova", text: x("provaTit") }) : null]),
      el("h1", { class: "wh", text: titol }),
      el("div", { class: "wcos" }, cos),
      peu
    ]));
    validaBoto();
  }

  function pinta() {
    var o = info.opcions, e = info.escales;
    if (pas === "inici") {
      var tria = function () { pas = cami()[1]; pinta(); };
      return pantalla(o && "Avui has entrenat?", [
        el("div", { class: "gris", text: x("privat") }),
        info.prova ? el("div", { class: "dos" }, [
          el("button", { type: "button", class: "btn3" + (info.sexe === "m" ? " on" : ""), text: x("noi"), onclick: function () { info.sexe = "m"; pinta(); } }),
          el("button", { type: "button", class: "btn3" + (info.sexe === "w" ? " on" : ""), text: x("noia"), onclick: function () { info.sexe = "w"; pinta(); } })]) : null,
        botons(o.entrenat, "entrenat", false, tria)
      ], function () { return !!r.entrenat; });
    }
    if (pas === "comp") {
      return pantalla("Competició", [
        pregunta("Quantes proves has nedat avui? (compta també els relleus)", [stepper("proves", 1, 1, 15, "")]),
        pregunta("Els temps han estat com esperaves?", [botons(o.temps, "temps")]),
        pregunta("Has pogut menjar i beure bé entre curses?", [botons(o.menjar, "menjar")]),
        pregunta("Quina prova t'ha anat millor i quina pitjor?", [text("millor", "", 300, true)], x("opcional"))
      ], function () { return !!r.temps && !!r.menjar; });
    }
    if (pas === "esforcComp") {
      return pantalla("Esforç", [
        pregunta(x("comp1"), [rpe("duresaComp")]),
        pregunta(x("comp2"), [escala5("arribat", e.arribat)], x("cincMillor"))
      ], function () { return r.duresaComp != null && r.arribat != null; });
    }
    if (pas === "esforc") {
      var fet = r.fet || [];
      return pantalla("Esforç de les sessions", [
        pregunta("Què has fet avui?", [botons(o.fet, "fet", true)]),
        fet.indexOf(o.fet[0]) >= 0 ? pregunta("Com de dura ha estat la sessió d'AIGUA?", [rpe("duresaAigua")]) : null,
        fet.indexOf(o.fet[1]) >= 0 ? pregunta("Com de dura ha estat la sessió de SEC?", [rpe("duresaSec")]) : null,
        pregunta("Com has arribat a l'entrenament?", [escala5("arribat", e.arribat)], x("cincMillor"))
      ], function () {
        var f = r.fet || [];
        return f.length > 0 && r.arribat != null && (f.indexOf(o.fet[0]) < 0 || r.duresaAigua != null) && (f.indexOf(o.fet[1]) < 0 || r.duresaSec != null);
      });
    }
    if (pas === "altra") {
      return pantalla("Altra activitat física", [
        pregunta("Quina activitat has fet?", [botons(o.activitat, "activitat")]),
        pregunta("Quant de temps has estat en moviment?", [stepper("minuts", 5, 5, 600, x("minuts"))]),
        pregunta("Com de dura ha estat l'activitat?", [rpe("duresaAct")]),
        pregunta(x("km"), [text("km", "", 10, false)])
      ], function () { return !!r.activitat && r.duresaAct != null; });
    }
    if (pas === "estas") {
      return pantalla("Com estàs", [
        el("div", { class: "gris", text: x("cincMillor") }),
        pregunta("Com et trobes en general?", [escala5("trobes", e.trobes)]),
        pregunta("Com has descansat aquesta nit?", [escala5("descansat", e.descansat)], x("nit") + " " + info.nitTxt),
        pregunta("Quantes hores has dormit?", [stepper("hores", 0.5, 0, 16, x("hores"))], x("nit") + " " + info.nitTxt),
        pregunta("Com de tranquil has estat avui?", [escala5("tranquil", e.tranquil)]),
        pregunta("Com de content estàs amb la natació ara mateix?", [escala5("content", e.content)]),
        pregunta("Tens alguna molèstia o dolor?", [botons(o.dolor, "dolor")])
      ], function () { return r.trobes != null && r.descansat != null && r.tranquil != null && r.content != null && !!r.dolor; });
    }
    if (pas === "dolor") return pantallaDolor();
    if (pas === "ultima") {
      return pantalla("Última", [
        pregunta(info.pregunta || "La pregunta del dia", [text("pregunta", "", 1000, true)], info.pregunta ? "La pregunta del dia" : null),
        pregunta("Vols comentar alguna cosa?", [text("comentari", "", 1000, true)], x("opcional")),
        info.sexe === "w" ? pregunta("Vols respondre les preguntes del cicle menstrual?", [botons(o.cicle, "cicle")], x("opcional")) : null
      ], function () { return true; });
    }
    if (pas === "cicle") {
      return pantalla("Cicle (opcional)", [
        pregunta("Avui és el primer dia del període?", [botons(o.primerDia, "primerDia")]),
        pregunta("Ets al període?", [botons(o.periode, "periode")])
      ], function () { return true; });
    }
    if (pas === "resum") return pantallaResum();
  }

  // ---------- Mapa del dolor ----------
  function pantallaDolor() {
    var sx = info.sexe === "w" ? "w" : "m";
    var dades = window.CNN_COS[vistaCos + sx];
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "30 8 140 375");
    svg.setAttribute("class", "wcos-svg");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", x("tocaZona"));
    dades.zones.forEach(function (z) {
      var sel = r.zones.filter(function (q) { return q.id === z.id; })[0];
      z.d.forEach(function (d) {
        var p = document.createElementNS(NS, "path");
        p.setAttribute("d", d);
        p.setAttribute("fill", sel ? ["#FDE68A", "#FCD34D", "#F59E0B", "#EA580C", "#B91C1C"][sel.int - 1] : "#4A4A4A");
        p.setAttribute("stroke", "#F4F4F2"); p.setAttribute("stroke-width", "1.6"); p.setAttribute("stroke-linejoin", "round");
        p.setAttribute("class", "wzona");
        var t = document.createElementNS(NS, "title"); t.textContent = z.nom; p.appendChild(t);
        p.addEventListener("click", function () { obreZona(z); });
        svg.appendChild(p);
      });
    });
    dades.decor.forEach(function (d) {
      var p = document.createElementNS(NS, "path"); p.setAttribute("d", d); p.setAttribute("fill", "none");
      p.setAttribute("stroke", "#F4F4F2"); p.setAttribute("stroke-width", "1.2"); p.setAttribute("pointer-events", "none"); svg.appendChild(p);
    });
    var cab = document.createElementNS(NS, "path"); cab.setAttribute("d", dades.cabell); cab.setAttribute("fill", "#2A2A2A");
    cab.setAttribute("stroke", "#F4F4F2"); cab.setAttribute("stroke-width", "1.3"); cab.setAttribute("pointer-events", "none"); svg.appendChild(cab);

    var llista = el("div", { class: "wzl" }, r.zones.map(function (z) {
      return el("button", { type: "button", class: "wzi", onclick: function () { obreZona(z); } }, [
        el("span", { class: "wzi-n", text: z.nom }), el("span", { class: "wzi-d", text: z.int + "/5 · " + DIES_DOLOR[z.dies] })]);
    }));
    return pantalla("El dolor", [
      el("div", { class: "gris", text: x("tocaZona") }),
      el("div", { class: "dos" }, [
        el("button", { type: "button", class: "btn3" + (vistaCos === "f" ? " on" : ""), text: x("davant"), onclick: function () { vistaCos = "f"; pinta(); } }),
        el("button", { type: "button", class: "btn3" + (vistaCos === "b" ? " on" : ""), text: x("esquena"), onclick: function () { vistaCos = "b"; pinta(); } })]),
      svg, llista
    ], function () { return r.zones.length > 0; });
  }

  function obreZona(z) {
    var actual = r.zones.filter(function (q) { return q.id === z.id; })[0];
    var tmp = { int: actual ? actual.int : null, dies: actual ? actual.dies : null };
    var capa;
    function tanca() { if (capa && capa.parentNode) capa.parentNode.removeChild(capa); }
    function dibuixa() {
      var ints = el("div", { class: "w5" });
      for (var i = 1; i <= 5; i++) (function (v) {
        ints.appendChild(el("button", { type: "button", class: "w5b" + (tmp.int === v ? " on" : ""), text: String(v), onclick: function () { tmp.int = v; dibuixa(); } }));
      })(i);
      var fet = el("button", { type: "button", class: "btn", text: x("fet"), disabled: !(tmp.int && tmp.dies !== null), onclick: function () {
        r.zones = r.zones.filter(function (q) { return q.id !== z.id; });
        r.zones.push({ id: z.id, nom: z.nom, int: tmp.int, dies: tmp.dies });
        tanca(); pinta();
      } });
      var panell = el("div", { class: "wfull", role: "dialog", "aria-label": z.nom }, [
        el("h2", { text: z.nom }),
        el("div", { class: "wq-t", text: x("intensitat") }), ints,
        el("div", { class: "w5e" }, [el("span", { text: "1 · " + info.escales.quant[0] }), el("span", { text: info.escales.quant[1] + " · 5" })]),
        el("div", { class: "wq-t", text: x("faDies") }),
        el("div", { class: "wb" }, DIES_DOLOR.map(function (t, k) {
          return el("button", { type: "button", class: "wbtn" + (tmp.dies === k ? " on" : ""), text: t, onclick: function () { tmp.dies = k; dibuixa(); } });
        })),
        fet,
        actual ? el("button", { type: "button", class: "btn2", text: x("treure"), onclick: function () {
          r.zones = r.zones.filter(function (q) { return q.id !== z.id; }); tanca(); pinta(); } }) : null,
        el("button", { type: "button", class: "btn2", text: x("tancar"), onclick: tanca })
      ]);
      if (capa) capa.parentNode.removeChild(capa);
      capa = el("div", { class: "menu wfons", onclick: function (ev) { if (ev.target === capa) tanca(); } }, [panell]);
      document.body.appendChild(capa);
    }
    dibuixa();
  }

  // ---------- Resum i enviament ----------
  function respostes() {
    var o = info.opcions, i = o.entrenat.indexOf(r.entrenat);
    var s = { entrenat: r.entrenat, trobes: r.trobes, descansat: r.descansat, hores: r.hores, tranquil: r.tranquil, content: r.content,
              dolor: r.dolor, pregunta: r.pregunta || "", comentari: r.comentari || "" };
    if (i === 2) { s.proves = String(r.proves); s.temps = r.temps; s.menjar = r.menjar; s.millor = r.millor || ""; s.duresaComp = r.duresaComp; s.arribat = r.arribat; }
    if (i === 0) { s.fet = r.fet; s.duresaAigua = r.duresaAigua; s.duresaSec = r.duresaSec; s.arribat = r.arribat; }
    if (i === 3) { s.activitat = r.activitat; s.minuts = String(r.minuts); s.duresaAct = r.duresaAct; s.km = r.km || ""; }
    if (r.dolor === o.dolor[0]) s.zones = r.zones.map(function (z) { return { nom: z.nom, int: z.int, dies: z.dies }; });
    s.cicle = info.sexe === "w" && r.cicle ? r.cicle : o.cicle[o.cicle.length - 1];
    if (s.cicle === o.cicle[0]) { s.primerDia = r.primerDia || ""; s.periode = r.periode || ""; }
    return s;
  }

  function linia(a, b) { return el("div", { class: "wres" }, [el("span", { class: "gris", text: a }), el("strong", { text: b })]); }

  function pantallaResum() {
    var o = info.opcions, i = o.entrenat.indexOf(r.entrenat), L = [];
    L.push(linia("Avui has entrenat?", r.entrenat));
    if (i === 2) { L.push(linia("Proves", String(r.proves)), linia("Temps", r.temps), linia("Duresa competició", r.duresaComp + " · " + RPE[r.duresaComp])); }
    if (i === 0) {
      if (r.duresaAigua != null && (r.fet || []).indexOf(o.fet[0]) >= 0) L.push(linia("Duresa aigua", r.duresaAigua + " · " + RPE[r.duresaAigua]));
      if (r.duresaSec != null && (r.fet || []).indexOf(o.fet[1]) >= 0) L.push(linia("Duresa sec", r.duresaSec + " · " + RPE[r.duresaSec]));
    }
    if (i === 3) L.push(linia(r.activitat, r.minuts + " " + x("minuts") + " · " + r.duresaAct + " · " + RPE[r.duresaAct]));
    L.push(linia("Com et trobes", r.trobes + "/5"), linia("Descans", r.descansat + "/5 · " + String(r.hores).replace(".", ",") + " " + x("hores")));
    L.push(linia("Dolor", r.dolor === o.dolor[0] ? r.zones.map(function (z) { return z.nom + " (" + z.int + ")"; }).join(", ") : r.dolor));
    var err = el("div", { class: "err", role: "alert" });
    return pantalla(x("resumTit"), L.concat([err]), function () { return true; }, x("enviar"), function () {
      botoSeg.disabled = true; botoSeg.textContent = x("enviant");
      C.crida("wellnessEnviar", { token: C.token(), respostes: respostes() }).then(function (res) {
        if (res.ok) fi(res);
        else { err.textContent = C.terr(res.error); botoSeg.disabled = false; botoSeg.textContent = x("enviar"); }
      });
    });
  }

  function fi(res) {
    var fills = [el("div", { class: "prox-ic", text: res.prova ? "🧪" : "✅" }), el("h1", { text: res.prova ? x("provaTit") : x("gracies") }),
                 el("p", { text: res.prova ? x("provaTxt") : x("enviat") })];
    if (res.prova && res.resum) fills.push(el("div", { class: "caixa wresum" }, res.resum.map(function (f) { return linia(f[0], f[1]); })));
    C.pinta(el("div", { class: "pant" }, [el("div", { class: "mig" }, fills),
      el("div", { class: "botons" }, [el("button", { type: "button", class: "btn", text: x("tancar"), onclick: function () { C.tornar(true); } })])]));
  }

  // ---------- Entrada ----------
  window.CNN_W = {
    obre: function (ctx) {
      C = ctx;
      C.pinta(el("div", { class: "carrega", text: C.t("carregant") }));
      C.crida("wellnessInici", { token: C.token() }).then(function (res) {
        if (!res.ok) { window.alert(C.terr(res.error)); C.tornar(res.error === "ja_fet"); return; }
        info = res;
        r = { proves: 1, minuts: 60, hores: 8, zones: [] };
        pas = "inici"; vistaCos = "f";
        pinta();
      });
    }
  };
})();
