/* CNN App · client (pas 2.3)
 * Cap dada privada es desa al mòbil: només el testimoni de sessió i l'última pantalla d'inici.
 * Tot el text es pinta amb textContent (mai innerHTML) per evitar injeccions. */
(function () {
  "use strict";

  var API = "https://script.google.com/macros/s/AKfycbx3JnxOjB4wb-N9VKIznsVGRFttcha17HE4NzJBsaHIofNJT-EXS8-plOUnqHVkFkIQ/exec";
  var FORM_WELLNESS = "https://forms.gle/ukDWqjv5iPdptk1K7";

  // ---------- Textos ----------
  var T = {
    ca: {
      benvinguda: "Benvingut/da a l'app del Club Natació Navàs",
      lema: "La teva setmana, els teus temps i el teu equip, al mòbil.",
      tincCodi: "Tinc un codi d'invitació", jaTinc: "Ja tinc compte · Entrar",
      codiTit: "El teu codi d'invitació", codiTxt: "Te l'ha enviat el club per privat. Només serveix una vegada.",
      codi: "Codi", continuar: "Continuar", enrere: "← Enrere",
      creaTit: "Crea el teu accés", creaTxt: "Tria un nom d'usuari i una contrasenya. No la comparteixis amb ningú.",
      usuari: "Nom d'usuari", usuariAjuda: "De 3 a 20 lletres minúscules o números (sense espais ni accents). Ex.: carla.r",
      contrasenya: "Contrasenya", repeteix: "Repeteix-la", prouLlarga: "✓ Mínim 8 caràcters", coincideixen: "✓ Coincideixen",
      normesTit: "Normes", normesTxt: "Les normes de funcionament del club també s'apliquen a l'app.",
      wellPrivat: "El teu wellness és privat: només el veus tu i l'equip tècnic.",
      noDadesPrivades: "L'app mai mostra comptes bancaris, telèfons ni documents privats. Per a això, parla amb el club en persona.",
      accepto: "He llegit i accepto les normes", acceptar: "Acceptar i crear el compte",
      instTit: "Posa l'app a la pantalla d'inici", iphone: "iPhone (Safari)", iphoneTxt: "Botó Compartir → «Afegir a la pantalla d'inici».",
      android: "Android (Chrome)", androidTxt: "Menú ⋮ → «Instal·lar l'aplicació» o «Afegir a la pantalla d'inici».",
      instPeu: "Així tindràs la icona del club com qualsevol altra app.", entrarApp: "Entrar a l'app",
      entrarTit: "Entrar", entrar: "Entrar", oblidat: "Si has oblidat la contrasenya, demana al club que et desbloquegi o et faci un codi nou.",
      hola: "Hola", avui: "Avui", setmana: "Setmana", calendari: "Calendari", temps: "Temps", equip: "Equip",
      noAvisos: "Cap avís nou. Bon entrenament! 💪",
      wellTit: "Wellness d'avui", wellTxt: "Aviat el podràs omplir aquí mateix. De moment, fes servir el formulari de sempre.",
      wellBtn: "Obrir el formulari",
      aviat: "Pròximament", aviatTxt: "Aquest apartat encara no està obert. L'activarem ben aviat.", aviatEt: "aviat",
      tornar: "Tornar a Avui",
      menu: "Menú", botiga: "Botiga", reunio: "Demanar reunió", quotes: "Quotes", eix: "Eix (bàscula)", documents: "Documents",
      perfil: "Canviar contrasenya", idioma: "Idioma · Castellano", ajuda: "Ajuda", sortir: "Sortir", sortirTot: "Sortir de tots els dispositius",
      tancar: "Tancar",
      antiga: "Contrasenya actual", nova: "Contrasenya nova", desar: "Desar", desat: "Fet ✅ Contrasenya canviada.",
      ajudaTxt: "Dubtes amb l'app? Parla amb el Jaime a la piscina. Mai enviïs la teva contrasenya a ningú, ni tan sols al club.",
      sortirSeg: "Segur que vols tancar la sessió a tots els dispositius?",
      sense: "Sense connexió · dades de l'última vegada",
      carregant: "Carregant…",
      wellness: "Wellness", sessio: "Sessió", avisar: "Avisar", minimes: "Mínimes", convocatories: "Convocatòries", reunions: "Reunions",
      errors: {
        codi: "Aquest codi no existeix. Revisa'l lletra a lletra.", codi_usat: "Aquest codi ja s'ha fet servir. Demana'n un de nou al club.",
        codi_caducat: "Aquest codi ha caducat. Demana'n un de nou al club.", usuari_existeix: "Aquest nom d'usuari ja existeix. Tria'n un altre.",
        usuari_format: "Nom d'usuari no vàlid: 3 a 20 minúscules o números, sense espais.", contrasenya_curta: "La contrasenya ha de tenir com a mínim 8 caràcters.",
        credencials: "Usuari o contrasenya incorrectes.", bloquejat: "Massa intents. Espera 15 minuts o demana al club que et desbloquegi.",
        inactiu: "Aquest compte no està actiu. Parla amb el club.", espera: "Massa intents seguits. Espera un minut.",
        sessio: "La sessió ha caducat. Torna a entrar.", xarxa: "No hi ha connexió. Torna-ho a provar.", altre: "Alguna cosa ha fallat. Torna-ho a provar.",
        noCoincideixen: "Les contrasenyes no coincideixen."
      }
    },
    es: {
      benvinguda: "Bienvenido/a a la app del Club Natació Navàs",
      lema: "Tu semana, tus tiempos y tu equipo, en el móvil.",
      tincCodi: "Tengo un código de invitación", jaTinc: "Ya tengo cuenta · Entrar",
      codiTit: "Tu código de invitación", codiTxt: "Te lo ha enviado el club por privado. Solo sirve una vez.",
      codi: "Código", continuar: "Continuar", enrere: "← Atrás",
      creaTit: "Crea tu acceso", creaTxt: "Elige un nombre de usuario y una contraseña. No la compartas con nadie.",
      usuari: "Nombre de usuario", usuariAjuda: "De 3 a 20 letras minúsculas o números (sin espacios ni acentos). Ej.: carla.r",
      contrasenya: "Contraseña", repeteix: "Repítela", prouLlarga: "✓ Mínimo 8 caracteres", coincideixen: "✓ Coinciden",
      normesTit: "Normas", normesTxt: "Las normas de funcionamiento del club también se aplican a la app.",
      wellPrivat: "Tu wellness es privado: solo lo ves tú y el equipo técnico.",
      noDadesPrivades: "La app nunca muestra cuentas bancarias, teléfonos ni documentos privados. Para eso, habla con el club en persona.",
      accepto: "He leído y acepto las normas", acceptar: "Aceptar y crear la cuenta",
      instTit: "Pon la app en la pantalla de inicio", iphone: "iPhone (Safari)", iphoneTxt: "Botón Compartir → «Añadir a pantalla de inicio».",
      android: "Android (Chrome)", androidTxt: "Menú ⋮ → «Instalar aplicación» o «Añadir a pantalla de inicio».",
      instPeu: "Así tendrás el icono del club como cualquier otra app.", entrarApp: "Entrar en la app",
      entrarTit: "Entrar", entrar: "Entrar", oblidat: "Si has olvidado la contraseña, pide al club que te desbloquee o te haga un código nuevo.",
      hola: "Hola", avui: "Hoy", setmana: "Semana", calendari: "Calendario", temps: "Tiempos", equip: "Equipo",
      noAvisos: "Ningún aviso nuevo. ¡Buen entreno! 💪",
      wellTit: "Wellness de hoy", wellTxt: "Pronto lo podrás rellenar aquí mismo. De momento, usa el formulario de siempre.",
      wellBtn: "Abrir el formulario",
      aviat: "Próximamente", aviatTxt: "Este apartado todavía no está abierto. Lo activaremos muy pronto.", aviatEt: "pronto",
      tornar: "Volver a Hoy",
      menu: "Menú", botiga: "Tienda", reunio: "Pedir reunión", quotes: "Cuotas", eix: "Eix (báscula)", documents: "Documentos",
      perfil: "Cambiar contraseña", idioma: "Idioma · Català", ajuda: "Ayuda", sortir: "Salir", sortirTot: "Salir de todos los dispositivos",
      tancar: "Cerrar",
      antiga: "Contraseña actual", nova: "Contraseña nueva", desar: "Guardar", desat: "Hecho ✅ Contraseña cambiada.",
      ajudaTxt: "¿Dudas con la app? Habla con Jaime en la piscina. Nunca envíes tu contraseña a nadie, ni siquiera al club.",
      sortirSeg: "¿Seguro que quieres cerrar la sesión en todos los dispositivos?",
      sense: "Sin conexión · datos de la última vez",
      carregant: "Cargando…",
      wellness: "Wellness", sessio: "Sesión", avisar: "Avisar", minimes: "Mínimas", convocatories: "Convocatorias", reunions: "Reuniones",
      errors: {
        codi: "Este código no existe. Revísalo letra a letra.", codi_usat: "Este código ya se ha usado. Pide uno nuevo al club.",
        codi_caducat: "Este código ha caducado. Pide uno nuevo al club.", usuari_existeix: "Este nombre de usuario ya existe. Elige otro.",
        usuari_format: "Nombre de usuario no válido: 3 a 20 minúsculas o números, sin espacios.", contrasenya_curta: "La contraseña debe tener como mínimo 8 caracteres.",
        credencials: "Usuario o contraseña incorrectos.", bloquejat: "Demasiados intentos. Espera 15 minutos o pide al club que te desbloquee.",
        inactiu: "Esta cuenta no está activa. Habla con el club.", espera: "Demasiados intentos seguidos. Espera un minuto.",
        sessio: "La sesión ha caducado. Vuelve a entrar.", xarxa: "No hay conexión. Vuelve a intentarlo.", altre: "Algo ha fallado. Vuelve a intentarlo.",
        noCoincideixen: "Las contraseñas no coinciden."
      }
    }
  };

  // ---------- Petit magatzem (amb try/catch: alguns mòbils el bloquegen) ----------
  function llegeix(k) { try { return localStorage.getItem("cnn_" + k); } catch (e) { return null; } }
  function escriu(k, v) { try { if (v === null) localStorage.removeItem("cnn_" + k); else localStorage.setItem("cnn_" + k, v); } catch (e) {} }

  var estat = {
    idioma: llegeix("idioma") || ((navigator.language || "ca").slice(0, 2) === "es" ? "es" : "ca"),
    token: llegeix("token"),
    inici: null,
    pestanya: "avui",
    offline: false
  };
  try { estat.inici = JSON.parse(llegeix("inici") || "null"); } catch (e) { estat.inici = null; }

  function t(k) { return T[estat.idioma][k] || T.ca[k] || k; }
  function terr(k) { return T[estat.idioma].errors[k] || T[estat.idioma].errors.altre; }

  // ---------- Crear elements sense innerHTML ----------
  function el(tag, props, fills) {
    var n = document.createElement(tag);
    if (props) Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v === undefined || v === null || v === false) return;
      if (k === "text") n.textContent = v;
      else if (k === "class") n.className = v;
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    });
    (fills || []).forEach(function (f) { if (f) n.appendChild(typeof f === "string" ? document.createTextNode(f) : f); });
    return n;
  }
  function pinta(node) { var a = document.getElementById("app"); a.textContent = ""; a.appendChild(node); window.scrollTo(0, 0); }

  // ---------- Servidor ----------
  function crida(accio, dades) {
    var cos = Object.assign({ accio: accio }, dades || {});
    return fetch(API, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(cos), redirect: "follow", credentials: "omit", cache: "no-store" })
      .then(function (r) { return r.json(); })
      .catch(function () { return { ok: false, error: "xarxa" }; });
  }

  // ---------- Primer accés (activar) ----------
  var alta = { pas: 1, codi: "", usuari: "", pw1: "", pw2: "", accepta: false };

  function punts(n) {
    var c = el("div", { class: "punts", "aria-label": n + "/5" });
    for (var i = 1; i <= 5; i++) c.appendChild(el("span", { class: i <= n ? "on" : "" }));
    return c;
  }

  function pantallaAlta() {
    var p = alta.pas, mig = el("div", { class: "mig" }), botons = el("div", { class: "botons" });
    var err = el("div", { class: "err", role: "alert" });

    if (p === 1) {
      mig.appendChild(el("div", { class: "logo", "aria-hidden": "true", text: "CN" }));
      mig.appendChild(el("h1", { class: "gran", text: t("benvinguda") }));
      mig.appendChild(el("p", { text: t("lema") }));
      mig.appendChild(el("div", { class: "dos", role: "group", "aria-label": "Idioma" }, [
        el("button", { type: "button", class: "btn3" + (estat.idioma === "ca" ? " on" : ""), text: "Català", onclick: function () { canviaIdioma("ca"); } }),
        el("button", { type: "button", class: "btn3" + (estat.idioma === "es" ? " on" : ""), text: "Castellano", onclick: function () { canviaIdioma("es"); } })
      ]));
      botons.appendChild(el("button", { type: "button", class: "btn", text: t("tincCodi"), onclick: function () { alta.pas = 2; pantallaAlta(); } }));
      botons.appendChild(el("button", { type: "button", class: "btn2", text: t("jaTinc"), onclick: pantallaEntrar }));
    }

    if (p === 2) {
      var inC = el("input", { id: "codi", type: "text", class: "codi", value: alta.codi, autocomplete: "off", autocapitalize: "characters", spellcheck: "false", maxlength: "14", placeholder: "XXXX-XXXX-XX" });
      mig.appendChild(el("h1", { text: t("codiTit") }));
      mig.appendChild(el("p", { text: t("codiTxt") }));
      mig.appendChild(el("label", { for: "codi", text: t("codi") }));
      mig.appendChild(inC);
      mig.appendChild(err);
      botons.appendChild(el("button", { type: "button", class: "btn", text: t("continuar"), onclick: function () {
        alta.codi = inC.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        if (alta.codi.length !== 10) { err.textContent = terr("codi"); return; }
        alta.pas = 3; pantallaAlta();
      } }));
    }

    if (p === 3) {
      var inU = el("input", { id: "usu", type: "text", value: alta.usuari, autocomplete: "username", autocapitalize: "none", spellcheck: "false", maxlength: "20" });
      var in1 = el("input", { id: "pw1", type: "password", value: alta.pw1, autocomplete: "new-password", maxlength: "100" });
      var in2 = el("input", { id: "pw2", type: "password", value: alta.pw2, autocomplete: "new-password", maxlength: "100" });
      var ok = el("div", { class: "ok" });
      function revisa() {
        var s = [];
        if (in1.value.length >= 8) s.push(t("prouLlarga"));
        if (in1.value && in1.value === in2.value) s.push(t("coincideixen"));
        ok.textContent = s.join(" · ");
      }
      in1.addEventListener("input", revisa); in2.addEventListener("input", revisa);
      mig.appendChild(el("h1", { text: t("creaTit") }));
      mig.appendChild(el("p", { text: t("creaTxt") }));
      mig.appendChild(el("label", { for: "usu", text: t("usuari") }));
      mig.appendChild(inU);
      mig.appendChild(el("div", { class: "gris", text: t("usuariAjuda") }));
      mig.appendChild(el("label", { for: "pw1", text: t("contrasenya") }));
      mig.appendChild(in1);
      mig.appendChild(el("label", { for: "pw2", text: t("repeteix") }));
      mig.appendChild(in2);
      mig.appendChild(ok);
      mig.appendChild(err);
      botons.appendChild(el("button", { type: "button", class: "btn", text: t("continuar"), onclick: function () {
        alta.usuari = inU.value.trim().toLowerCase(); alta.pw1 = in1.value; alta.pw2 = in2.value;
        if (!/^[a-z0-9._-]{3,20}$/.test(alta.usuari)) { err.textContent = terr("usuari_format"); return; }
        if (alta.pw1.length < 8) { err.textContent = terr("contrasenya_curta"); return; }
        if (alta.pw1 !== alta.pw2) { err.textContent = terr("noCoincideixen"); return; }
        alta.pas = 4; pantallaAlta();
      } }));
      revisa();
    }

    if (p === 4) {
      var chk = el("input", { type: "checkbox", id: "acc" });
      var bt = el("button", { type: "button", class: "btn", text: t("acceptar"), disabled: true });
      chk.addEventListener("change", function () { bt.disabled = !chk.checked; });
      mig.appendChild(el("h1", { text: t("normesTit") }));
      mig.appendChild(el("div", { class: "caixa" }, [
        el("span", { text: t("normesTxt") }),
        el("span", { class: "gris", text: t("wellPrivat") }),
        el("span", { class: "gris", text: t("noDadesPrivades") })
      ]));
      mig.appendChild(el("label", { class: "check", for: "acc" }, [chk, t("accepto")]));
      mig.appendChild(err);
      bt.addEventListener("click", function () {
        bt.disabled = true; bt.textContent = t("carregant");
        crida("activar", { codi: alta.codi, usuari: alta.usuari, contrasenya: alta.pw1 }).then(function (r) {
          if (r.ok && r.token) {
            desaToken(r.token);
            alta.pw1 = alta.pw2 = "";
            alta.pas = 5; pantallaAlta();
          } else {
            err.textContent = terr(r.error);
            bt.disabled = false; bt.textContent = t("acceptar");
            if (r.error === "usuari_existeix" || r.error === "usuari_format") { alta.pas = 3; setTimeout(pantallaAlta, 1800); }
            if (r.error === "codi" || r.error === "codi_usat" || r.error === "codi_caducat") { alta.pas = 2; setTimeout(pantallaAlta, 1800); }
          }
        });
      });
      botons.appendChild(bt);
    }

    if (p === 5) {
      mig.appendChild(el("h1", { text: t("instTit") }));
      mig.appendChild(el("div", { class: "caixa" }, [
        el("strong", { class: "groc", text: t("iphone") }), el("span", { text: t("iphoneTxt") }),
        el("strong", { class: "groc", text: t("android") }), el("span", { text: t("androidTxt") })
      ]));
      mig.appendChild(el("p", { text: t("instPeu") }));
      botons.appendChild(el("button", { type: "button", class: "btn", text: t("entrarApp"), onclick: function () { alta = { pas: 1 }; carregaInici(); } }));
    }

    if (p > 1 && p < 5) botons.appendChild(el("button", { type: "button", class: "btn2", text: t("enrere"), onclick: function () { alta.pas = p - 1; pantallaAlta(); } }));
    pinta(el("div", { class: "pant" }, [punts(p), mig, botons]));
    var primer = document.querySelector(".mig input");
    if (primer && primer.type !== "checkbox") primer.focus();
  }

  // ---------- Entrar ----------
  function pantallaEntrar() {
    var inU = el("input", { id: "usu", type: "text", autocomplete: "username", autocapitalize: "none", spellcheck: "false", maxlength: "20" });
    var inP = el("input", { id: "pw", type: "password", autocomplete: "current-password", maxlength: "100" });
    var err = el("div", { class: "err", role: "alert" });
    var bt = el("button", { type: "submit", class: "btn", text: t("entrar") });
    var form = el("form", { class: "pant", novalidate: true }, [
      el("div", { class: "mig" }, [
        el("div", { class: "logo", "aria-hidden": "true", text: "CN" }),
        el("h1", { text: t("entrarTit") }),
        el("label", { for: "usu", text: t("usuari") }), inU,
        el("label", { for: "pw", text: t("contrasenya") }), inP,
        err,
        el("p", { class: "gris", text: t("oblidat") })
      ]),
      el("div", { class: "botons" }, [
        bt,
        el("button", { type: "button", class: "btn2", text: t("tincCodi"), onclick: function () { alta = { pas: 2, codi: "" }; pantallaAlta(); } })
      ])
    ]);
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      bt.disabled = true; bt.textContent = t("carregant"); err.textContent = "";
      crida("entrar", { usuari: inU.value.trim().toLowerCase(), contrasenya: inP.value }).then(function (r) {
        if (r.ok && r.token) { desaToken(r.token); inP.value = ""; carregaInici(); }
        else { err.textContent = terr(r.error); bt.disabled = false; bt.textContent = t("entrar"); }
      });
    });
    pinta(form);
    inU.focus();
  }

  function desaToken(tk) { estat.token = tk; escriu("token", tk); }
  function oblida() { estat.token = null; estat.inici = null; escriu("token", null); escriu("inici", null); }

  // ---------- Inici ----------
  function carregaInici() {
    if (!estat.token) { pantallaAlta(); return; }
    if (estat.inici) pantallaApp(); else pinta(el("div", { class: "carrega", text: t("carregant") }));
    crida("inici", { token: estat.token }).then(function (r) {
      if (r.ok) {
        estat.offline = false;
        estat.inici = { nom: r.nom, rol: r.rol, moduls: r.moduls || {}, avisos: r.avisos || [] };
        escriu("inici", JSON.stringify(estat.inici));
        pantallaApp();
      } else if (r.error === "xarxa" && estat.inici) {
        estat.offline = true; pantallaApp();
      } else if (r.error === "xarxa") {
        pinta(el("div", { class: "pant" }, [el("div", { class: "mig" }, [
          el("p", { text: terr("xarxa") }),
          el("button", { type: "button", class: "btn", text: t("continuar"), onclick: carregaInici })
        ])]));
      } else {
        oblida(); pantallaEntrar();
      }
    });
  }

  function estatModul(clau) { var m = (estat.inici && estat.inici.moduls) || {}; return m[clau] || "aviat"; }

  var BARRA = [
    { clau: "avui", ic: "🏠" }, { clau: "setmana", ic: "📅" }, { clau: "calendari", ic: "🗓️" },
    { clau: "temps", ic: "⏱️" }, { clau: "equip", ic: "👥" }
  ];

  function pantallaApp() {
    var d = estat.inici || { nom: "", moduls: {}, avisos: [] };
    var pes = estat.pestanya;
    var cap = el("div", { class: "cap" }, [
      el("div", {}, [
        el("div", { class: "nom", text: t("hola") + ", " + String(d.nom || "").split(" ")[0] }),
        el("h1", { text: t(pes) })
      ]),
      el("button", { type: "button", class: "ham", "aria-label": t("menu"), text: "☰", onclick: obreMenu })
    ]);
    var cos = el("div", { class: "cos" });

    if (pes === "avui") {
      if (estatModul("wellness") === "on" && d.rol !== "PARE") {
        cos.appendChild(el("div", { class: "caixa" }, [
          el("h2", { text: t("wellTit") }),
          el("span", { class: "gris", text: t("wellTxt") }),
          el("a", { href: FORM_WELLNESS, target: "_blank", rel: "noopener noreferrer", class: "btn", text: t("wellBtn") })
        ]));
      }
      if (!d.avisos.length) cos.appendChild(el("div", { class: "caixa gris", text: t("noAvisos") }));
      d.avisos.forEach(function (a) {
        cos.appendChild(el("div", { class: "caixa avis" }, [
          a.data ? el("div", { class: "data", text: a.data }) : null,
          el("div", { class: "tit", text: a.titol }),
          a.text ? el("div", { class: "txt", text: a.text }) : null
        ]));
      });
    } else {
      cos.appendChild(proximament());
    }

    var barra = el("nav", { class: "barra", "aria-label": "Navegació" }, [el("div", { class: "in" },
      BARRA.filter(function (b) { return b.clau === "avui" || estatModul(b.clau) !== "no"; }).map(function (b) {
        var e = b.clau === "avui" ? "on" : estatModul(b.clau);
        return el("button", { type: "button", class: (pes === b.clau ? "on" : "") + (e === "aviat" ? " aviat" : ""), "aria-current": pes === b.clau ? "page" : null,
          onclick: function () { estat.pestanya = b.clau; pantallaApp(); } },
          [el("span", { class: "ic", "aria-hidden": "true", text: b.ic }), el("span", { text: t(b.clau) })]);
      }))]);

    var cont = el("div", { class: "envolt" }, [estat.offline ? el("div", { class: "offline", text: t("sense") }) : null, cap, cos, barra]);
    pinta(cont);
  }

  function proximament() {
    return el("div", { class: "prox" }, [
      el("div", { class: "ic", "aria-hidden": "true", text: "🚧" }),
      el("h2", { text: t("aviat") }),
      el("p", { text: t("aviatTxt") }),
      el("button", { type: "button", class: "btn3", text: t("tornar"), onclick: function () { estat.pestanya = "avui"; pantallaApp(); } })
    ]);
  }

  // ---------- Menú ☰ ----------
  function obreMenu() {
    var capa;
    function tanca() { if (capa && capa.parentNode) capa.parentNode.removeChild(capa); }
    function item(ic, text, fn, etiqueta) {
      return el("button", { type: "button", class: "it", onclick: function () { tanca(); fn(); } },
        [el("span", { "aria-hidden": "true", text: ic }), el("span", { text: text }), etiqueta ? el("span", { class: "et", text: etiqueta }) : null]);
    }
    function modul(clau, ic, text) {
      var e = estatModul(clau);
      if (e === "no") return null;
      return item(ic, text, function () { estat.pestanya = clau; pantallaApp(); }, e === "aviat" ? t("aviatEt") : null);
    }
    var panell = el("div", { class: "panell", role: "dialog", "aria-label": t("menu") }, [
      modul("botiga", "🛍️", t("botiga")),
      modul("reunions", "🤝", t("reunio")),
      modul("quotes", "💶", t("quotes")),
      el("hr"),
      item("🔑", t("perfil"), pantallaContrasenya),
      item("🌐", t("idioma"), function () { canviaIdioma(estat.idioma === "ca" ? "es" : "ca"); }),
      item("❓", t("ajuda"), pantallaAjuda),
      el("hr"),
      item("🚪", t("sortir"), function () { surt(false); }),
      item("📵", t("sortirTot"), function () { if (window.confirm(t("sortirSeg"))) surt(true); }),
      el("button", { type: "button", class: "btn2", text: t("tancar"), onclick: tanca })
    ]);
    capa = el("div", { class: "menu", onclick: function (e) { if (e.target === capa) tanca(); } }, [panell]);
    document.body.appendChild(capa);
  }

  function pantallaSimple(titol, fills) {
    pinta(el("div", { class: "pant" }, [
      el("div", { class: "mig" }, [el("h1", { text: titol })].concat(fills)),
      el("div", { class: "botons" }, [el("button", { type: "button", class: "btn2", text: t("enrere"), onclick: pantallaApp })])
    ]));
  }

  function pantallaAjuda() { pantallaSimple(t("ajuda"), [el("p", { text: t("ajudaTxt") })]); }

  function pantallaContrasenya() {
    var a = el("input", { id: "a", type: "password", autocomplete: "current-password", maxlength: "100" });
    var n = el("input", { id: "n", type: "password", autocomplete: "new-password", maxlength: "100" });
    var n2 = el("input", { id: "n2", type: "password", autocomplete: "new-password", maxlength: "100" });
    var err = el("div", { class: "err", role: "alert" });
    var bt = el("button", { type: "button", class: "btn", text: t("desar") });
    bt.addEventListener("click", function () {
      err.textContent = "";
      if (n.value.length < 8) { err.textContent = terr("contrasenya_curta"); return; }
      if (n.value !== n2.value) { err.textContent = terr("noCoincideixen"); return; }
      bt.disabled = true;
      crida("canviarContrasenya", { token: estat.token, antiga: a.value, nova: n.value }).then(function (r) {
        bt.disabled = false;
        if (r.ok) { a.value = n.value = n2.value = ""; err.className = "ok"; err.textContent = t("desat"); }
        else if (r.error === "sessio") { oblida(); pantallaEntrar(); }
        else { err.className = "err"; err.textContent = terr(r.error); }
      });
    });
    pantallaSimple(t("perfil"), [
      el("label", { for: "a", text: t("antiga") }), a,
      el("label", { for: "n", text: t("nova") }), n,
      el("label", { for: "n2", text: t("repeteix") }), n2,
      err, bt
    ]);
  }

  function surt(totes) {
    var tk = estat.token;
    oblida();
    if (tk) crida(totes ? "sortirTot" : "sortir", { token: tk });
    alta = { pas: 1 };
    pantallaEntrar();
  }

  function canviaIdioma(i) {
    estat.idioma = i; escriu("idioma", i);
    document.documentElement.lang = i;
    if (estat.token && estat.inici) pantallaApp(); else pantallaAlta();
  }

  // ---------- Arrencada ----------
  document.documentElement.lang = estat.idioma;
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
  if (estat.token) carregaInici(); else pantallaAlta();
})();
