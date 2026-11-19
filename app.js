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
      oficial: "App oficial del Club Natació Navàs",
      ocultModul: "👁️ Només ho veus tu: aquest apartat encara està tancat per als nedadors (MÒDULS).",
      setmanaVinent: "Setmana vinent", aiguaK: "Aigua", secK: "Sec", kmK: "Km", mati: "Matí", tarda: "Tarda", sec: "Sec",
      descans: "Descans", festiu: "Festiu", avuiTag: "AVUI", setTancada: "La setmana encara no està publicada. El Jaime l'obrirà aviat.",
      noObertaAdmin: "No publicada (només la veus tu)",
      avisarTit: "Avisar", faltesTit: "📋 Avisos de falta", avisarTxt: "Si un dia no pots venir, arribaràs tard o marxaràs abans, avisa aquí.", avisarBtn: "Avisar que no vinc / arribaré tard",
      perPares: "avisat pels pares", anullar: "Anul·lar", anullarSeg: "Vols anul·lar aquest avís?", quiFalta: "Qui?", quinDia: "Quin dia?", queFas: "Què passa?",
      tNoVinc: "No vinc", tTard: "Arribaré tard", tAbans: "Marxaré abans", motiu: "Motiu", motiuPh: "Ex.: tinc un examen, metge, viatge…",
      motiuAjuda: "No cal que hi posis detalls de salut. Ho veuran el Jaime i la teva família.", enviarAvis: "Enviar l'avís", avisFalta: "Tria el dia, què passa i escriu el motiu.",
      avisEnviat: "Fet ✅ Avís enviat. El Jaime i la teva família ja ho poden veure.", avisProva: "Mode prova (admin): no s'ha desat res.",
      calTemp: "Temporada", calMes: "Mes", calDia: "Dia", calLlegComp: "competició", calLlegFest: "festiu", calMesBuit: "Aquest mes no hi ha competicions.", calDiaBuit: "Aquest dia no hi ha res apuntat.",
      calPassades: "Veure competicions passades", calProperes: "← Tornar a les properes", calBuit: "No hi ha res al calendari.", calAra: "Ara!", calDema: "Demà", calFalten: "Falten {n} dies", senseCategoria: "El teu perfil encara no té categoria. Parla amb el Jaime.",
      entrenoTit: "Entreno", sessioCanviada: "Aquesta sessió s'ha actualitzat. Torna-la a tocar.", avuiMin: "Avui", sessioN: "Sessió", sessioPdf: "Sessió en PDF",
      veureCom: "Veure com…", veientCom: "Veient com", sortirVC: "Sortir", triaPerfil: "Tria un perfil per veure l'app com la veu aquella persona. Només per mirar: no es pot canviar res.",
      canviObligat: "Com a administrador, la teva contrasenya ha de tenir mínim 12 caràcters. Canvia-la ara per continuar.",
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
      wellTit: "Wellness", wellTxt: "Aviat el podràs omplir aquí mateix. De moment, fes servir el formulari de sempre.",
      wellBtn: "Obrir el formulari", wellFer: "Fer el wellness", wellProva: "Provar el wellness (no s'envia)", wellSessio: "Sessió de",
      wellFet: "Fet ✅ Gràcies!", wellForm: "o fes servir el formulari", wellSensePerfil: "El teu perfil encara no està connectat al wellness. De moment, fes servir el formulari.",
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
        noCoincideixen: "Les contrasenyes no coincideixen.", contrasenya_admin: "La contrasenya d'administrador ha de tenir com a mínim 12 caràcters.", permis: "No tens permís per fer això.", sense_entreno: "Aquest apartat no està actiu per a tu.", sense_perfil: "El teu perfil encara no està connectat al wellness. Parla amb el Jaime.", ja_fet: "Ja has fet el wellness d'aquesta sessió. Gràcies!", dades: "Falta alguna resposta. Revisa-ho."
      }
    },
    es: {
      benvinguda: "Bienvenido/a a la app del Club Natació Navàs",
      oficial: "App oficial del Club Natació Navàs",
      ocultModul: "👁️ Solo lo ves tú: este apartado todavía está cerrado para los nadadores (MÒDULS).",
      setmanaVinent: "Semana que viene", aiguaK: "Agua", secK: "Seco", kmK: "Km", mati: "Mañana", tarda: "Tarde", sec: "Seco",
      descans: "Descanso", festiu: "Festivo", avuiTag: "HOY", setTancada: "La semana todavía no está publicada. Jaime la abrirá pronto.",
      noObertaAdmin: "No publicada (solo la ves tú)",
      avisarTit: "Avisar", faltesTit: "📋 Avisos de falta", avisarTxt: "Si un día no puedes venir, llegarás tarde o te irás antes, avisa aquí.", avisarBtn: "Avisar que no voy / llegaré tarde",
      perPares: "avisado por los padres", anullar: "Anular", anullarSeg: "¿Quieres anular este aviso?", quiFalta: "¿Quién?", quinDia: "¿Qué día?", queFas: "¿Qué pasa?",
      tNoVinc: "No voy", tTard: "Llegaré tarde", tAbans: "Me iré antes", motiu: "Motivo", motiuPh: "Ej.: tengo un examen, médico, viaje…",
      motiuAjuda: "No hace falta poner detalles de salud. Lo verán Jaime y tu familia.", enviarAvis: "Enviar el aviso", avisFalta: "Elige el día, qué pasa y escribe el motivo.",
      avisEnviat: "Hecho ✅ Aviso enviado. Jaime y tu familia ya lo pueden ver.", avisProva: "Modo prueba (admin): no se ha guardado nada.",
      calTemp: "Temporada", calMes: "Mes", calDia: "Día", calLlegComp: "competición", calLlegFest: "festivo", calMesBuit: "Este mes no hay competiciones.", calDiaBuit: "Este día no hay nada apuntado.",
      calPassades: "Ver competiciones pasadas", calProperes: "← Volver a las próximas", calBuit: "No hay nada en el calendario.", calAra: "¡Ahora!", calDema: "Mañana", calFalten: "Faltan {n} días", senseCategoria: "Tu perfil todavía no tiene categoría. Habla con Jaime.",
      entrenoTit: "Entreno", sessioCanviada: "Esta sesión se ha actualizado. Vuelve a tocarla.", avuiMin: "Hoy", sessioN: "Sesión", sessioPdf: "Sesión en PDF",
      veureCom: "Ver como…", veientCom: "Viendo como", sortirVC: "Salir", triaPerfil: "Elige un perfil para ver la app como la ve esa persona. Solo para mirar: no se puede cambiar nada.",
      canviObligat: "Como administrador, tu contraseña debe tener mínimo 12 caracteres. Cámbiala ahora para continuar.",
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
      wellTit: "Wellness", wellTxt: "Pronto lo podrás rellenar aquí mismo. De momento, usa el formulario de siempre.",
      wellBtn: "Abrir el formulario", wellFer: "Hacer el wellness", wellProva: "Probar el wellness (no se envía)", wellSessio: "Sesión de",
      wellFet: "Hecho ✅ ¡Gracias!", wellForm: "o usa el formulario", wellSensePerfil: "Tu perfil todavía no está conectado al wellness. De momento, usa el formulario.",
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
        noCoincideixen: "Las contraseñas no coinciden.", contrasenya_admin: "La contraseña de administrador debe tener como mínimo 12 caracteres.", permis: "No tienes permiso para hacer esto.", sense_entreno: "Este apartado no está activo para ti.", sense_perfil: "Tu perfil todavía no está conectado al wellness. Habla con Jaime.", ja_fet: "Ya has hecho el wellness de esta sesión. ¡Gracias!", dades: "Falta alguna respuesta. Revísalo."
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
    offline: false,
    veureCom: null
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
      mig.appendChild(el("img", { class: "logo", src: "icon-192.png", alt: "Club Natació Navàs" }));
      mig.appendChild(el("div", { class: "oficial", text: t("oficial") }));
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
        el("img", { class: "logo", src: "icon-192.png", alt: "Club Natació Navàs" }), el("div", { class: "oficial", text: t("oficial") }),
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
        if (r.ok && r.token) { desaToken(r.token); inP.value = ""; if (r.canviObligat) pantallaContrasenya(true); else carregaInici(); }
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
    if (estat.veureCom) {
      pinta(el("div", { class: "carrega", text: t("carregant") }));
      crida("inici", { token: estat.token, veureCom: estat.veureCom.id }).then(function (r) {
        if (r.ok) { estat.dadesVC = { nom: r.nom, rol: r.rol, moduls: r.moduls || {}, avisos: r.avisos || [] }; pantallaApp(); }
        else { estat.veureCom = null; estat.dadesVC = null; carregaInici(); }
      });
      return;
    }
    if (estat.inici) pantallaApp(); else pinta(el("div", { class: "carrega", text: t("carregant") }));
    crida("inici", { token: estat.token }).then(function (r) {
      if (r.ok) {
        estat.offline = false;
        estat.inici = { nom: r.nom, rol: r.rol, moduls: r.moduls || {}, avisos: r.avisos || [], wellness: r.wellness || null, sessions: r.sessions || [], faltes: r.faltes || [], fills: r.fills || [] };
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

  function dades() { return estat.veureCom ? estat.dadesVC : estat.inici; }
  function estatModul(clau) { var m = (dades() && dades().moduls) || {}; return m[clau] || "aviat"; }

  var BARRA = [
    { clau: "avui", ic: "🏠" }, { clau: "setmana", ic: "📅" }, { clau: "calendari", ic: "🗓️" },
    { clau: "temps", ic: "⏱️" }, { clau: "equip", ic: "👥" }
  ];

  function pantallaApp() {
    var d = dades() || { nom: "", moduls: {}, avisos: [] };
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
      if (estatModul("wellness") === "on" && d.rol !== "PARE" && !(d.wellness && d.wellness.no)) {
        var w = d.wellness || { prova: true };
        var enllac = el("a", { href: FORM_WELLNESS, target: "_blank", rel: "noopener noreferrer", class: "wform", text: t("wellForm") });
        var fills = [el("h2", { text: t("wellTit") + (w.diaTxt ? " · " + t("wellSessio") + " " + w.diaTxt : "") })];
        if (w.fet) fills.push(el("div", { class: "ok gran", text: t("wellFet") }));
        else if (w.sensePerfil) fills.push(el("span", { class: "gris", text: t("wellSensePerfil") }),
          el("a", { href: FORM_WELLNESS, target: "_blank", rel: "noopener noreferrer", class: "btn", text: t("wellBtn") }));
        else fills.push(el("button", { type: "button", class: "btn", text: w.prova ? t("wellProva") : t("wellFer"), onclick: obreWellness }), w.prova ? null : enllac);
        cos.appendChild(el("div", { class: "caixa" }, fills));
      }
      if (d.sessions && d.sessions.length) {
        cos.appendChild(el("div", { class: "caixa" }, [el("h2", { text: t("entrenoTit") })].concat(d.sessions.map(function (s) { return botoSessio(s, false); }))));
      }
      var potAvisar = (d.rol === "NEDADOR" || d.rol === "PARE" || d.rol === "ADMIN") && !estat.veureCom &&
        (estatModul("avisar") === "on" || d.rol === "ADMIN") && (d.rol === "ADMIN" || (d.fills || []).some(function (f) { return f.entreno; }));
      if (potAvisar || (d.faltes && d.faltes.length)) {
        var tecnic = d.rol === "ADMIN" || d.rol === "TECNIC";
        var fl = [el("h2", { text: tecnic ? t("faltesTit") : t("avisarTit") })];
        (d.faltes || []).forEach(function (f) {
          fl.push(el("div", { class: "falta" }, [
            el("div", {}, [el("strong", { text: (tecnic || (d.fills || []).length > 1 ? f.nom + " · " : "") + f.tipus + " · " + dCurt(f.data) }),
              el("div", { class: "gris", text: f.motiu + (f.perPares ? " (" + t("perPares") + ")" : "") })]),
            tecnic ? null : el("button", { type: "button", class: "btn2 falta-x", text: t("anullar"), onclick: function () {
              if (!window.confirm(t("anullarSeg"))) return;
              crida("anullarFalta", { token: estat.token, k: f.k }).then(function (r) { if (r.ok) carregaInici(); else window.alert(terr(r.error)); });
            } })
          ]));
        });
        if (!tecnic && !(d.faltes || []).length) fl.push(el("span", { class: "gris", text: t("avisarTxt") }));
        if (potAvisar) fl.push(el("button", { type: "button", class: "btn3", text: "📢 " + t("avisarBtn"), onclick: pantallaAvisar }));
        cos.appendChild(el("div", { class: "caixa" }, fl));
      }
      if (!d.avisos.length) cos.appendChild(el("div", { class: "caixa gris", text: t("noAvisos") }));
      d.avisos.forEach(function (a) {
        cos.appendChild(el("div", { class: "caixa avis" }, [
          a.data ? el("div", { class: "data", text: a.data }) : null,
          el("div", { class: "tit", text: a.titol }),
          a.text ? el("div", { class: "txt", text: a.text }) : null
        ]));
      });
    } else if (pes === "setmana" && (estatModul("setmana") === "on" || ((d.rol === "ADMIN" || d.rol === "TECNIC") && estatModul("setmana") !== "no"))) {
      if (estatModul("setmana") !== "on") cos.appendChild(el("div", { class: "caixa gris", text: t("ocultModul") }));
      cos.appendChild(vistaSetmana());
    } else if (pes === "calendari" && (estatModul("calendari") === "on" || ((d.rol === "ADMIN" || d.rol === "TECNIC") && estatModul("calendari") !== "no"))) {
      if (estatModul("calendari") !== "on") cos.appendChild(el("div", { class: "caixa gris", text: t("ocultModul") }));
      cos.appendChild(vistaCalendari());
    } else {
      cos.appendChild(proximament());
    }

    var barra = el("nav", { class: "barra", "aria-label": "Navegació" }, [el("div", { class: "in" },
      BARRA.filter(function (b) { return b.clau === "avui" || estatModul(b.clau) !== "no"; }).map(function (b) {
        var e = b.clau === "avui" ? "on" : estatModul(b.clau);
        return el("button", { type: "button", class: (pes === b.clau ? "on" : "") + (e === "aviat" ? " aviat" : ""), "aria-current": pes === b.clau ? "page" : null,
          onclick: function () { estat.pestanya = b.clau; apunta(b.clau); pantallaApp(); } },
          [el("span", { class: "ic", "aria-hidden": "true", text: b.ic }), el("span", { text: t(b.clau) })]);
      }))]);

    var banda = estat.veureCom ? el("div", { class: "vc" }, [
      el("span", { text: "👁️ " + t("veientCom") + ": " + estat.veureCom.nom }),
      el("button", { type: "button", text: t("sortirVC"), onclick: surtVeureCom })
    ]) : null;
    var cont = el("div", { class: "envolt" + (estat.veureCom ? " ambvc" : "") }, [banda, estat.offline ? el("div", { class: "offline", text: t("sense") }) : null, cap, cos, barra]);
    pinta(cont);
  }

  function textSobre(hex) {
    var h = String(hex || "").replace("#", "");
    if (h.length !== 6) return "#111";
    var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? "#111" : "#fff";
  }

  function vistaSetmana() {
    var cont = el("div", { class: "setm" });
    function dibuixa(r) {
      cont.textContent = "";
      if (!r.ok) { cont.appendChild(el("div", { class: "caixa gris", text: terr(r.error) })); return; }
      if (!r.setmanes.length) { cont.appendChild(el("div", { class: "caixa gris", text: t("setTancada") })); return; }
      r.setmanes.forEach(function (s, idx) {
        if (idx > 0) cont.appendChild(el("h2", { class: "setm-sub", text: t("setmanaVinent") }));
        cont.appendChild(el("div", { class: "setm-cap" }, [
          el("div", { class: "setm-tit", text: s.titol }),
          s.oberta === false ? el("div", { class: "wprova", text: t("noObertaAdmin") }) : null,
          s.obs ? el("div", { class: "setm-obs", text: s.obs }) : null,
          el("div", { class: "setm-xifres" }, [
            el("div", {}, [el("strong", { text: s.aigua || "–" }), el("span", { text: t("aiguaK") })]),
            el("div", {}, [el("strong", { text: s.sec || "–" }), el("span", { text: t("secK") })]),
            el("div", {}, [el("strong", { text: s.km || "–" }), el("span", { text: t("kmK") })])
          ])
        ]));
        s.dies.forEach(function (dd) {
          var esAvui = dd.data === r.avui;
          var linies = [];
          function franja(nom, f) {
            if (!f) return;
            var xip = el("span", { class: "setm-xip", text: f.t });
            if (f.c) { xip.style.background = f.c; xip.style.color = textSobre(f.c); }
            linies.push(el("div", { class: "setm-lin" }, [el("span", { class: "setm-fr", text: nom }), xip]));
          }
          franja(t("mati"), dd.am); franja(t("tarda"), dd.pm);
          if (dd.sec) linies.push(el("div", { class: "setm-lin" }, [el("span", { class: "setm-fr", text: t("sec") }), el("span", { class: "setm-xip sec", text: dd.sec.t })]));
          if (!linies.length) linies.push(el("div", { class: "gris", text: dd.festiu ? t("festiu") : t("descans") }));
          (r.sessions || []).filter(function (x) { return x.data === dd.data; }).forEach(function (x) { linies.push(botoSessio(x, true)); });
          var dm = dd.data ? dd.data.slice(8, 10) + "/" + dd.data.slice(5, 7) : "";
          cont.appendChild(el("div", { class: "setm-dia" + (esAvui ? " avui" : "") + (dd.festiu ? " festiu" : "") }, [
            el("div", { class: "setm-dcap" }, [el("strong", { text: dd.d + " " + dm }), esAvui ? el("span", { class: "setm-tag", text: t("avuiTag") }) : null]),
            el("div", { class: "setm-lins" }, linies)
          ]));
        });
      });
    }
    if (estat.cacheSetmana) dibuixa(estat.cacheSetmana); else cont.appendChild(el("div", { class: "carrega", text: t("carregant") }));
    crida("setmana", { token: estat.token, veureCom: estat.veureCom ? estat.veureCom.id : null }).then(function (r) {
      if (r.ok) estat.cacheSetmana = r;
      if (estat.pestanya === "setmana" && cont.isConnected) dibuixa(r.ok || !estat.cacheSetmana ? r : estat.cacheSetmana);
    });
    return cont;
  }

  function botoSessio(s, curt) {
    var avui = new Date(); var ka = avui.getFullYear() + "-" + ("0" + (avui.getMonth() + 1)).slice(-2) + "-" + ("0" + avui.getDate()).slice(-2);
    var quan = s.data === ka ? t("avuiMin") : (s.dia ? s.dia.charAt(0) + s.dia.slice(1).toLowerCase() : "") + " " + s.data.slice(8, 10) + "/" + s.data.slice(5, 7);
    var b = el("button", { type: "button", class: curt ? "btn3 sbtn curt" : "btn3 sbtn" }, [
      el("span", { class: "sbtn-ic", "aria-hidden": "true", text: "📄" }),
      el("span", { class: "sbtn-t" }, [el("strong", { text: curt ? t("sessioPdf") : quan + (s.hora ? " · " + s.hora : "") }),
        el("span", { class: "gris", text: curt ? (s.hora || "") : t("sessioN") + " " + s.num + (s.titol ? " · " + s.titol : "") })])
    ]);
    b.addEventListener("click", function () { descarregaSessio(s, b); });
    return b;
  }

  function descarregaSessio(s, b) {
    b.disabled = true;
    var orig = b.firstChild.textContent; b.firstChild.textContent = "⏳";
    crida("sessioPdf", { token: estat.token, k: s.k }).then(function (r) {
      b.disabled = false; b.firstChild.textContent = orig;
      if (!r.ok) { window.alert(r.error === "permis" ? t("sessioCanviada") : terr(r.error)); if (r.error === "permis") carregaInici(); return; }
      var bin = atob(r.b64), arr = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      var url = URL.createObjectURL(new Blob([arr], { type: "application/pdf" }));
      var a = el("a", { href: url, download: r.nom || "sessio.pdf" });
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
    });
  }

  var MESOS = { ca: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
                es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"] };
  var DSEM = { ca: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"], es: ["do", "lu", "ma", "mi", "ju", "vi", "sá"] };
  function dObj(k) { return new Date(k + "T12:00:00"); }
  function dCurt(k) { var x = dObj(k); return DSEM[estat.idioma][x.getDay()] + " " + x.getDate(); }
  function diesFins(k, avui) { return Math.round((dObj(k) - dObj(avui)) / 864e5); }

  function vistaCalendari() {
    var cont = el("div", { class: "cal" });
    var zoom = estat.calZoom || "mes", veurePassades = false;
    var avuiK = (function () { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); })();
    var mesVist = estat.calMes || avuiK.slice(0, 7), diaVist = estat.calDia || avuiK;
    function k(y, m, d) { return y + "-" + ("0" + m).slice(-2) + "-" + ("0" + d).slice(-2); }
    function delDia(r, dk) {
      return { comps: r.evs.filter(function (e) { return e.inici <= dk && e.fi >= dk; }), fest: r.festius.filter(function (f) { return f.data === dk; }) };
    }
    function xipCat(e) {
      var xip = el("span", { class: "cal-cat", text: e.cat || "" });
      if (e.color && e.color !== "#ffffff") { xip.style.background = e.color; xip.style.color = textSobre(e.color); }
      return xip;
    }
    function selector(r) {
      var b = el("div", { class: "cal-zoom", role: "tablist" });
      [["temp", t("calTemp")], ["mes", t("calMes")], ["dia", t("calDia")]].forEach(function (z) {
        b.appendChild(el("button", { type: "button", class: zoom === z[0] ? "on" : "", role: "tab", "aria-selected": zoom === z[0] ? "true" : "false", text: z[1],
          onclick: function () { zoom = estat.calZoom = z[0]; dibuixa(r); } }));
      });
      return b;
    }
    function targeta(e, r, ambFalten) {
      var falten = diesFins(e.inici, r.avui);
      var quan = dCurt(e.inici) + (e.fi !== e.inici ? " – " + dCurt(e.fi) : "");
      return el("div", { class: "cal-ev" + (e.inici <= r.avui && e.fi >= r.avui ? " ara" : "") + (e.fi < r.avui ? " passada" : "") }, [
        el("div", { class: "cal-ev-cap" }, [el("strong", { text: quan }), e.cat ? xipCat(e) : null]),
        el("div", { class: "cal-nom", text: e.nom }),
        ambFalten && e.fi >= r.avui ? el("div", { class: "gris cal-falten", text: falten <= 0 ? t("calAra") : (falten === 1 ? t("calDema") : t("calFalten").replace("{n}", falten)) }) : null
      ]);
    }

    function vistaTemp(r) {
      var items = r.evs.map(function (e) { return { tipus: "c", inici: e.inici, fi: e.fi, e: e }; })
        .concat(r.festius.map(function (f) { return { tipus: "f", inici: f.data, fi: f.data, e: f }; }))
        .filter(function (x) { return veurePassades ? x.fi < r.avui : x.fi >= r.avui; })
        .sort(function (a, b) { return veurePassades ? b.inici.localeCompare(a.inici) : a.inici.localeCompare(b.inici); });
      cont.appendChild(el("button", { type: "button", class: "btn2 cal-tog", text: veurePassades ? t("calProperes") : t("calPassades"),
        onclick: function () { veurePassades = !veurePassades; dibuixa(r); } }));
      if (!items.length) cont.appendChild(el("div", { class: "caixa gris", text: t("calBuit") }));
      var mesAnt = "";
      items.forEach(function (x) {
        var mes = x.inici.slice(0, 7);
        if (mes !== mesAnt) { mesAnt = mes; cont.appendChild(el("h2", { class: "cal-mes", text: MESOS[estat.idioma][Number(mes.slice(5, 7)) - 1] + " " + mes.slice(0, 4) })); }
        if (x.tipus === "f") {
          cont.appendChild(el("div", { class: "cal-f" }, [el("span", { class: "cal-d", text: dCurt(x.inici) }), el("span", { text: "🔴 " + x.e.nom })]));
          return;
        }
        cont.appendChild(targeta(x.e, r, !veurePassades));
      });
    }

    function vistaMes(r) {
      var y = Number(mesVist.slice(0, 4)), m = Number(mesVist.slice(5, 7));
      function mou(d) { var nm = m + d, ny = y; if (nm < 1) { nm = 12; ny--; } if (nm > 12) { nm = 1; ny++; } mesVist = estat.calMes = ny + "-" + ("0" + nm).slice(-2); dibuixa(r); }
      cont.appendChild(el("div", { class: "cal-nav" }, [
        el("button", { type: "button", class: "cal-fl", "aria-label": "‹", text: "‹", onclick: function () { mou(-1); } }),
        el("strong", { text: MESOS[estat.idioma][m - 1] + " " + y }),
        el("button", { type: "button", class: "cal-fl", "aria-label": "›", text: "›", onclick: function () { mou(1); } })
      ]));
      var graella = el("div", { class: "cal-graella" });
      var noms = estat.idioma === "es" ? ["L", "M", "X", "J", "V", "S", "D"] : ["DL", "DT", "DC", "DJ", "DV", "DS", "DG"];
      noms.forEach(function (n) { graella.appendChild(el("div", { class: "cal-gcap", text: n })); });
      var primer = new Date(y, m - 1, 1), offset = (primer.getDay() + 6) % 7, nd = new Date(y, m, 0).getDate();
      for (var i = 0; i < offset; i++) graella.appendChild(el("div", { class: "cal-gbuit" }));
      var delMes = [];
      for (var d = 1; d <= nd; d++) (function (d) {
        var dk = k(y, m, d), info = delDia(r, dk);
        var cel = el("button", { type: "button", class: "cal-gdia" + (dk === avuiK ? " avui" : "") + (info.fest.length ? " fest" : "") + (info.comps.length ? " comp" : "") + (dk === diaVist ? " sel" : ""),
          "aria-label": dk, onclick: function () { diaVist = estat.calDia = dk; zoom = estat.calZoom = "dia"; dibuixa(r); } },
          [el("span", { text: String(d) })]);
        if (info.comps.length) {
          var c0 = info.comps[0];
          var punt = el("span", { class: "cal-punt" });
          punt.style.background = c0.color && c0.color !== "#ffffff" ? c0.color : "#F1C332";
          cel.appendChild(punt);
          info.comps.forEach(function (c) { if (delMes.indexOf(c) < 0) delMes.push(c); });
        }
        graella.appendChild(cel);
      })(d);
      cont.appendChild(graella);
      cont.appendChild(el("div", { class: "cal-llegenda gris" }, [el("span", { class: "cal-punt" }), " " + t("calLlegComp") + "   ", el("span", { class: "cal-quad" }), " " + t("calLlegFest")]));
      if (delMes.length) delMes.forEach(function (e) { cont.appendChild(targeta(e, r, true)); });
      else cont.appendChild(el("div", { class: "caixa gris", text: t("calMesBuit") }));
    }

    function vistaDia(r) {
      var x = dObj(diaVist);
      function mou(dd) { var n = new Date(x.getTime() + dd * 864e5); diaVist = estat.calDia = k(n.getFullYear(), n.getMonth() + 1, n.getDate()); mesVist = estat.calMes = diaVist.slice(0, 7); dibuixa(r); }
      cont.appendChild(el("div", { class: "cal-nav" }, [
        el("button", { type: "button", class: "cal-fl", "aria-label": "‹", text: "‹", onclick: function () { mou(-1); } }),
        el("strong", { text: dCurt(diaVist) + " " + MESOS[estat.idioma][x.getMonth()] + (diaVist === avuiK ? " · " + t("avuiMin") : "") }),
        el("button", { type: "button", class: "cal-fl", "aria-label": "›", text: "›", onclick: function () { mou(1); } })
      ]));
      var info = delDia(r, diaVist), res = false;
      info.fest.forEach(function (f) { res = true; cont.appendChild(el("div", { class: "caixa cal-festiu", text: "🔴 " + t("festiu") + " · " + f.nom })); });
      info.comps.forEach(function (e) { res = true; cont.appendChild(targeta(e, r, true)); });
      // Entreno d'aquell dia, si la setmana està publicada
      var sm = estat.cacheSetmana;
      if (sm && sm.setmanes) sm.setmanes.forEach(function (s) {
        s.dies.forEach(function (dd) {
          if (dd.data !== diaVist) return;
          var lin = [];
          [["mati", dd.am], ["tarda", dd.pm]].forEach(function (p) {
            if (!p[1]) return;
            var xip = el("span", { class: "setm-xip", text: p[1].t });
            if (p[1].c) { xip.style.background = p[1].c; xip.style.color = textSobre(p[1].c); }
            lin.push(el("div", { class: "setm-lin" }, [el("span", { class: "setm-fr", text: t(p[0]) }), xip]));
          });
          if (dd.sec) lin.push(el("div", { class: "setm-lin" }, [el("span", { class: "setm-fr", text: t("sec") }), el("span", { class: "setm-xip sec", text: dd.sec.t })]));
          (sm.sessions || []).filter(function (q) { return q.data === diaVist; }).forEach(function (q) { lin.push(botoSessio(q, true)); });
          if (lin.length) { res = true; cont.appendChild(el("div", { class: "setm-dia" }, [el("strong", { text: t("entrenoTit") })].concat(lin))); }
        });
      });
      if (!res) cont.appendChild(el("div", { class: "caixa gris", text: t("calDiaBuit") }));
    }

    function dibuixa(r) {
      cont.textContent = "";
      if (!r.ok) { cont.appendChild(el("div", { class: "caixa gris", text: terr(r.error) })); return; }
      if (r.senseCategoria) cont.appendChild(el("div", { class: "caixa gris", text: t("senseCategoria") }));
      cont.appendChild(selector(r));
      if (zoom === "temp") vistaTemp(r); else if (zoom === "dia") vistaDia(r); else vistaMes(r);
    }
    if (estat.cacheCal) dibuixa(estat.cacheCal); else cont.appendChild(el("div", { class: "carrega", text: t("carregant") }));
    crida("calendari", { token: estat.token, veureCom: estat.veureCom ? estat.veureCom.id : null }).then(function (r) {
      if (r.ok) estat.cacheCal = r;
      if (estat.pestanya === "calendari" && cont.isConnected) dibuixa(r.ok || !estat.cacheCal ? r : estat.cacheCal);
    });
    if (!estat.cacheSetmana && estatModul("setmana") !== "no") crida("setmana", { token: estat.token, veureCom: estat.veureCom ? estat.veureCom.id : null }).then(function (r) { if (r.ok) estat.cacheSetmana = r; });
    return cont;
  }

  function pantallaAvisar() {
    var d = estat.inici || {};
    var fills = (d.fills || []).filter(function (f) { return f.entreno; });
    var s = { id: fills.length ? fills[0].id : "", data: null, tipus: null };
    var err = el("div", { class: "err", role: "alert" });
    var motiu = el("textarea", { class: "wtx", rows: "3", maxlength: "300", placeholder: t("motiuPh") });
    function avuiMes(n) { var x = new Date(Date.now() + n * 864e5); return x.getFullYear() + "-" + ("0" + (x.getMonth() + 1)).slice(-2) + "-" + ("0" + x.getDate()).slice(-2); }
    function pinta2() {
      var fillsB = fills.length > 1 ? el("div", { class: "wq" }, [el("div", { class: "wq-t", text: t("quiFalta") }), el("div", { class: "wb" }, fills.map(function (f) {
        return el("button", { type: "button", class: "wbtn" + (s.id === f.id ? " on" : ""), text: f.nom, onclick: function () { s.id = f.id; pinta2(); } }); }))]) : null;
      var dies = el("div", { class: "dies-av" });
      for (var n = 0; n < 14; n++) (function (k) {
        dies.appendChild(el("button", { type: "button", class: "dia-av" + (s.data === k ? " on" : ""), text: (n === 0 ? t("avuiMin") : dCurt(k)) + (n === 0 ? "" : "/" + k.slice(5, 7)),
          onclick: function () { s.data = k; pinta2(); } }));
      })(avuiMes(n));
      var tipus = el("div", { class: "wb" }, [t("tNoVinc"), t("tTard"), t("tAbans")].map(function (tx, i) {
        var val = ["No vinc", "Arribaré tard", "Marxaré abans"][i];
        return el("button", { type: "button", class: "wbtn" + (s.tipus === val ? " on" : ""), text: tx, onclick: function () { s.tipus = val; pinta2(); } });
      }));
      var bt = el("button", { type: "button", class: "btn", text: t("enviarAvis"), onclick: function () {
        err.textContent = "";
        if (!s.data || !s.tipus || motiu.value.trim().length < 3) { err.textContent = t("avisFalta"); return; }
        bt.disabled = true; bt.textContent = t("carregant");
        crida("avisarFalta", { token: estat.token, idCnn: s.id, data: s.data, tipus: s.tipus, motiu: motiu.value }).then(function (r) {
          if (r.ok) { window.alert(r.prova ? t("avisProva") : t("avisEnviat")); estat.pestanya = "avui"; carregaInici(); }
          else { err.textContent = terr(r.error); bt.disabled = false; bt.textContent = t("enviarAvis"); }
        });
      } });
      var y = window.scrollY || 0;
      pantallaSimple(t("avisarTit"), [
        fillsB,
        el("div", { class: "wq" }, [el("div", { class: "wq-t", text: t("quinDia") }), dies]),
        el("div", { class: "wq" }, [el("div", { class: "wq-t", text: t("queFas") }), tipus]),
        el("div", { class: "wq" }, [el("div", { class: "wq-t", text: t("motiu") }), motiu, el("div", { class: "gris", text: t("motiuAjuda") })]),
        err, bt
      ]);
      window.scrollTo(0, y);
    }
    pinta2();
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
      return item(ic, text, function () { estat.pestanya = clau; apunta(clau); pantallaApp(); }, e === "aviat" ? t("aviatEt") : null);
    }
    var panell = el("div", { class: "panell", role: "dialog", "aria-label": t("menu") }, [
      modul("botiga", "🛍️", t("botiga")),
      modul("reunions", "🤝", t("reunio")),
      modul("quotes", "💶", t("quotes")),
      el("hr"),
      estat.veureCom ? item("👁️", t("sortirVC") + " · " + t("veureCom"), surtVeureCom) : null,
      !estat.veureCom && estat.inici && estat.inici.rol === "ADMIN" ? item("👁️", t("veureCom"), pantallaPerfils) : null,
      estat.veureCom ? null : item("🔑", t("perfil"), function () { pantallaContrasenya(false); }),
      item("🌐", t("idioma"), function () { canviaIdioma(estat.idioma === "ca" ? "es" : "ca"); }),
      item("❓", t("ajuda"), pantallaAjuda),
      estat.veureCom ? null : el("hr"),
      estat.veureCom ? null : item("🚪", t("sortir"), function () { surt(false); }),
      estat.veureCom ? null : item("📵", t("sortirTot"), function () { if (window.confirm(t("sortirSeg"))) surt(true); }),
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

  function pantallaContrasenya(obligat) {
    var a = el("input", { id: "a", type: "password", autocomplete: "current-password", maxlength: "100" });
    var n = el("input", { id: "n", type: "password", autocomplete: "new-password", maxlength: "100" });
    var n2 = el("input", { id: "n2", type: "password", autocomplete: "new-password", maxlength: "100" });
    var err = el("div", { class: "err", role: "alert" });
    var bt = el("button", { type: "button", class: "btn", text: t("desar") });
    bt.addEventListener("click", function () {
      err.textContent = "";
      var minim = (obligat || (estat.inici && estat.inici.rol === "ADMIN")) ? 12 : 8;
      if (n.value.length < minim) { err.textContent = terr(minim === 12 ? "contrasenya_admin" : "contrasenya_curta"); return; }
      if (n.value !== n2.value) { err.textContent = terr("noCoincideixen"); return; }
      bt.disabled = true;
      crida("canviarContrasenya", { token: estat.token, antiga: a.value, nova: n.value }).then(function (r) {
        bt.disabled = false;
        if (r.ok) { a.value = n.value = n2.value = ""; err.className = "ok"; err.textContent = t("desat"); if (obligat) setTimeout(carregaInici, 1200); }
        else if (r.error === "sessio") { oblida(); pantallaEntrar(); }
        else { err.className = "err"; err.textContent = terr(r.error); }
      });
    });
    pantallaSimple(t("perfil"), [
      obligat ? el("div", { class: "caixa", text: t("canviObligat") }) : null,
      el("label", { for: "a", text: t("antiga") }), a,
      el("label", { for: "n", text: t("nova") }), n,
      el("label", { for: "n2", text: t("repeteix") }), n2,
      err, bt
    ]);
  }

  function apunta(clau) {
    if (estat.veureCom || clau === "avui" || !estat.token) return;
    crida("vista", { token: estat.token, apartat: clau });
  }

  function pantallaPerfils() {
    var llista = el("div", { class: "llista" }, [el("div", { class: "gris", text: t("carregant") })]);
    pantallaSimple(t("veureCom"), [el("p", { text: t("triaPerfil") }), llista]);
    crida("perfils", { token: estat.token }).then(function (r) {
      llista.textContent = "";
      if (!r.ok) { llista.appendChild(el("div", { class: "err", text: terr(r.error) })); return; }
      r.perfils.forEach(function (p) {
        llista.appendChild(el("button", { type: "button", class: "btn3 perfil", onclick: function () {
          estat.veureCom = { id: p.id, nom: p.nom }; estat.pestanya = "avui"; estat.cacheCal = estat.cacheSetmana = null; carregaInici();
        } }, [el("span", { text: p.nom }), el("span", { class: "et", text: p.rol })]));
      });
    });
  }

  function obreWellness() {
    if (!window.CNN_W) return;
    window.CNN_W.obre({
      el: el, pinta: pinta, crida: crida, t: t, terr: terr,
      idioma: function () { return estat.idioma; },
      token: function () { return estat.token; },
      tornar: function (refresca) { estat.pestanya = "avui"; if (refresca && !estat.veureCom) carregaInici(); else pantallaApp(); }
    });
  }

  function surtVeureCom() { estat.veureCom = null; estat.dadesVC = null; estat.cacheCal = estat.cacheSetmana = null; estat.pestanya = "avui"; pantallaApp(); }

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
