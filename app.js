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
      privTit: "Privacitat", privLlegir: "Llegir la informació completa", privAmagar: "Amagar la informació",
      privAccepto: "He llegit la informació de privacitat i accepto les normes del club",
      privWellness: "Autoritzo que l'equip tècnic tracti el meu wellness (inclou dades de salut) només per al seguiment esportiu. Puc retirar-ho quan vulgui. (opcional)",
      privFamilia: "He llegit la informació de privacitat. Entenc que veuré la informació esportiva dels meus fills, però no el seu wellness",
      privMenorAvis: "👨‍👩‍👧 Aquest compte és d'un nedador o nedadora menor de 14 anys. L'ha d'activar el pare, mare o tutor.",
      tutorNom: "Nom i cognoms del pare, mare o tutor",
      tutorAccepto: "Soc el pare, mare o tutor legal. He llegit la informació de privacitat i autoritzo que el meu fill o filla tingui un compte a l'app del club",
      tutorWellness: "Autoritzo que l'equip tècnic tracti el wellness del meu fill o filla (inclou dades de salut) només per al seguiment esportiu. Entenc que és privat del nedador i de l'equip tècnic. (opcional)",
      privActualitzat: "Hem actualitzat la informació de privacitat de l'app. Llegeix-la i accepta-la per continuar.",
      cwTit: "Permís per al wellness", cwDonat: "✅ Has donat el permís per al wellness.", cwNoDonat: "No has donat el permís per al wellness.",
      cwTxt: "El wellness inclou dades de salut. Només el veus tu i l'equip tècnic, mai la teva família.", cwDonar: "Donar el permís", cwRetirar: "Retirar el permís",
      cwRetirarSeg: "Si retires el permís, no podràs fer el wellness a l'app. Continuar?", cwCal: "Per fer el wellness a l'app, primer cal el teu permís.",
      calTemp: "Temporada", calMes: "Mes", calDia: "Dia", calVeureLlista: "Veure en llista", calVeureGraella: "Veure el calendari de la temporada", calProxima: "Propera competició", calLlegComp: "competició", calLlegFest: "festiu", calMesBuit: "Aquest mes no hi ha competicions.", calDiaBuit: "Aquest dia no hi ha res apuntat.",
      calPassades: "Veure competicions passades", calProperes: "← Tornar a les properes", calBuit: "No hi ha res al calendari.", calAra: "Ara!", calDema: "Demà", calFalten: "Falten {n} dies", senseCategoria: "El teu perfil encara no té categoria. Parla amb el Jaime.",
      convTit: "Convocatòria", convVeure: "Veure la convocatòria", convFalta: "⚠️ Falta respondre", convRespost: "✅ Respost",
      convHores: "Horaris", convHConv: "Convocatòria", convHEscalf: "Escalfament", convHInici: "Inici de la competició",
      convAvisos: "Avisos", convMaps: "📍 Com arribar", convLlistat: "📄 Llistat de sortides", convResultats: "🏁 Resultats",
      convProves: "Proves", convProva: "Prova", convHora: "Hora", convNum: "Nº", convSerie: "Sèrie", convCarrer: "Carrer",
      convPreAvis: "És una preconvocatòria: les hores, sèries i carrers encara poden canviar.",
      convLlista: "Llista de convocats", convLlistaTxt: "Del més petit al més gran. Toca un nom per veure què neda i quan.",
      convVas: "Hi anirà?", convSi: "✅ Sí, hi va", convNo: "❌ No pot venir", convAnada: "Anada", convTornada: "Tornada",
      trPorto: "L'hi portem nosaltres", trLloc: "Ens veiem al lloc", trNecessita: "Necessita que algú el porti", trSol: "Hi va pel seu compte",
      convPlaces: "Places lliures al cotxe per a altres nedadors", convDinar: "Es queda a dinar?", dSi: "Sí", dNo: "No",
      convNota: "Nota per al Jaime (opcional)", convDesar: "Enviar la resposta", convCanviar: "Canviar la resposta", convDesat: "Fet ✅ Resposta enviada. Només la veu l'equip tècnic.",
      convFaltaResp: "Contesta si hi va, l'anada i la tornada.", convFaltaDinar: "Contesta si es queda a dinar.", convProvaAdmin: "Mode prova (admin): no s'ha desat res.",
      convPares: "Ho confirmaran els teus pares des del seu compte.", convPrivat: "Les respostes només les veu l'equip tècnic.",
      convResum: "Respostes (només equip tècnic)", convVan: "Hi van", convNoVan: "No poden", convSense: "Sense resposta", convNecessiten: "Necessiten transport", convPlacesOf: "Places ofertes", convDinen: "Dinen",
      convLlic: "Llicència", convVCForm: "👁️ Aquí la família veu el formulari per respondre (hi va, anada, tornada, places al cotxe). En «Veure com…» no es pot respondre: és només per mirar.",
      convNoPub: "👁️ No publicada: només la veus tu. Marca «Publicar a l'app» a la hoja.", convCap: "Ara mateix no hi ha cap convocatòria.",
      assistencia: "Assistència", asTecnic: "Per veure l'assistència d'un nedador, fes servir ☰ › Veure com… i tria el seu compte o el dels pares.",
      asBuit: "Encara no hi ha cap entreno marcat aquesta temporada.", asMajors: "A partir dels 18 anys, l'assistència només la veu el mateix nedador.",
      asMes: "Aquest mes", asTemp: "Temporada", asDe: "de", asTard: "Arribades tard", asAbans: "Marxes abans", asVeure: "📊 Veure l'assistència",
      asPresent: "✅ Present", asFalta: "❌ No hi era", asFaltaAv: "📩 No hi era (avisat)", asMesBtn: "Veure mesos anteriors", asLlista: "Llista", asTardC: "Tard / abans", asToca: "Toca un dia per veure'n el detall.",
      asTxt: "Ho marquen els monitors a cada entreno. Si veus algun error, parla amb el Jaime.",
      pTard: "⏰ Arriba tard", pAbans: "↩️ Marxa abans", pTardAbans: "⏰ Tard i marxa abans",
      tmFitxa: "Llicència", tmCat: "Categoria", tmAny: "Any", tmMillors: "Millors marques", tmToca: "Toca una prova per veure com ha anat evolucionant.",
      tmUltimes: "Últimes competicions", tmTests: "Els meus tests", tmTestsTxt: "Només els veus tu.", tmBuit: "Encara no hi ha cap marca oficial.",
      tmTecnic: "Per veure els temps d'un nedador, fes servir ☰ › Veure com…", tmMajors: "A partir dels 18 anys, els temps només els veu el mateix nedador.",
      tmManual: "M = cronometratge manual", tmMarques: "Marques", tmMinimes: "Mínimes", tmMinProx: "Pròximament · Consulta-ho amb l'entrenador.", tmMinCap: "Ara mateix no hi ha cap competició amb mínimes per a tu.", tmAssol: "mínimes aconseguides", tmDe: "de", tmMinA: "Mín. 50 m", tmMinB: "Mín. 25 m", tmTeva: "Tu:", tmOk: "✅ Mínima!", tmFalten: "Falten {s} s", tmSense: "Sense marca", tmSup: "Competició de categoria superior: es compara amb l'any {a} de la taula.", tmMarquesDes: "Marques vàlides del {d} al {f}.", tmMinTxt: "Cada marca es compara amb la taula de la seva piscina. El manual suma 0,29 s (50 m) o 0,19 s (100 m o més).", tmP: "Piscina", tmTxt: "Marques oficials de competició. Si en falta alguna, parla amb el Jaime.",
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
        noCoincideixen: "Les contrasenyes no coincideixen.", contrasenya_admin: "La contrasenya d'administrador ha de tenir com a mínim 12 caràcters.", permis: "No tens permís per fer això.", sense_entreno: "Aquest apartat no està actiu per a tu.", tutor: "Escriu el nom complet del pare, mare o tutor i marca l'autorització.", privacitat: "Cal acceptar la informació de privacitat.", sense_consentiment: "Per fer el wellness a l'app, primer cal el teu permís (menú ☰ › Privacitat).", sense_perfil: "El teu perfil encara no està connectat al wellness. Parla amb el Jaime.", ja_fet: "Ja has fet el wellness d'aquesta sessió. Gràcies!", dades: "Falta alguna resposta. Revisa-ho."
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
      privTit: "Privacidad", privLlegir: "Leer la información completa", privAmagar: "Ocultar la información",
      privAccepto: "He leído la información de privacidad y acepto las normas del club",
      privWellness: "Autorizo que el equipo técnico trate mi wellness (incluye datos de salud) solo para el seguimiento deportivo. Puedo retirarlo cuando quiera. (opcional)",
      privFamilia: "He leído la información de privacidad. Entiendo que veré la información deportiva de mis hijos, pero no su wellness",
      privMenorAvis: "👨‍👩‍👧 Esta cuenta es de un nadador o nadadora menor de 14 años. La tiene que activar el padre, madre o tutor.",
      tutorNom: "Nombre y apellidos del padre, madre o tutor",
      tutorAccepto: "Soy el padre, madre o tutor legal. He leído la información de privacidad y autorizo que mi hijo o hija tenga una cuenta en la app del club",
      tutorWellness: "Autorizo que el equipo técnico trate el wellness de mi hijo o hija (incluye datos de salud) solo para el seguimiento deportivo. Entiendo que es privado del nadador y del equipo técnico. (opcional)",
      privActualitzat: "Hemos actualizado la información de privacidad de la app. Léela y acéptala para continuar.",
      cwTit: "Permiso para el wellness", cwDonat: "✅ Has dado el permiso para el wellness.", cwNoDonat: "No has dado el permiso para el wellness.",
      cwTxt: "El wellness incluye datos de salud. Solo lo ves tú y el equipo técnico, nunca tu familia.", cwDonar: "Dar el permiso", cwRetirar: "Retirar el permiso",
      cwRetirarSeg: "Si retiras el permiso, no podrás hacer el wellness en la app. ¿Continuar?", cwCal: "Para hacer el wellness en la app, primero hace falta tu permiso.",
      calTemp: "Temporada", calMes: "Mes", calDia: "Día", calVeureLlista: "Ver en lista", calVeureGraella: "Ver el calendario de la temporada", calProxima: "Próxima competición", calLlegComp: "competición", calLlegFest: "festivo", calMesBuit: "Este mes no hay competiciones.", calDiaBuit: "Este día no hay nada apuntado.",
      calPassades: "Ver competiciones pasadas", calProperes: "← Volver a las próximas", calBuit: "No hay nada en el calendario.", calAra: "¡Ahora!", calDema: "Mañana", calFalten: "Faltan {n} días", senseCategoria: "Tu perfil todavía no tiene categoría. Habla con Jaime.",
      convTit: "Convocatoria", convVeure: "Ver la convocatoria", convFalta: "⚠️ Falta responder", convRespost: "✅ Respondido",
      convHores: "Horarios", convHConv: "Convocatoria", convHEscalf: "Calentamiento", convHInici: "Inicio de la competición",
      convAvisos: "Avisos", convMaps: "📍 Cómo llegar", convLlistat: "📄 Listado de salidas", convResultats: "🏁 Resultados",
      convProves: "Pruebas", convProva: "Prueba", convHora: "Hora", convNum: "Nº", convSerie: "Serie", convCarrer: "Calle",
      convPreAvis: "Es una preconvocatoria: las horas, series y calles todavía pueden cambiar.",
      convLlista: "Lista de convocados", convLlistaTxt: "Del más pequeño al más mayor. Toca un nombre para ver qué nada y cuándo.",
      convVas: "¿Irá?", convSi: "✅ Sí, va", convNo: "❌ No puede ir", convAnada: "Ida", convTornada: "Vuelta",
      trPorto: "Lo llevamos nosotros", trLloc: "Nos vemos allí", trNecessita: "Necesita que alguien lo lleve", trSol: "Va por su cuenta",
      convPlaces: "Plazas libres en el coche para otros nadadores", convDinar: "¿Se queda a comer?", dSi: "Sí", dNo: "No",
      convNota: "Nota para Jaime (opcional)", convDesar: "Enviar la respuesta", convCanviar: "Cambiar la respuesta", convDesat: "Hecho ✅ Respuesta enviada. Solo la ve el equipo técnico.",
      convFaltaResp: "Contesta si va, la ida y la vuelta.", convFaltaDinar: "Contesta si se queda a comer.", convProvaAdmin: "Modo prueba (admin): no se ha guardado nada.",
      convPares: "Lo confirmarán tus padres desde su cuenta.", convPrivat: "Las respuestas solo las ve el equipo técnico.",
      convResum: "Respuestas (solo equipo técnico)", convVan: "Van", convNoVan: "No pueden", convSense: "Sin respuesta", convNecessiten: "Necesitan transporte", convPlacesOf: "Plazas ofrecidas", convDinen: "Comen",
      convLlic: "Licencia", convVCForm: "👁️ Aquí la familia ve el formulario para responder (va, ida, vuelta, plazas en el coche). En «Ver como…» no se puede responder: es solo para mirar.",
      convNoPub: "👁️ No publicada: solo la ves tú. Marca «Publicar a l'app» en la hoja.", convCap: "Ahora mismo no hay ninguna convocatoria.",
      assistencia: "Asistencia", asTecnic: "Para ver la asistencia de un nadador, usa ☰ › Ver como… y elige su cuenta o la de los padres.",
      asBuit: "Todavía no hay ningún entreno marcado esta temporada.", asMajors: "A partir de los 18 años, la asistencia solo la ve el propio nadador.",
      asMes: "Este mes", asTemp: "Temporada", asDe: "de", asTard: "Llegadas tarde", asAbans: "Salidas antes", asVeure: "📊 Ver la asistencia",
      asPresent: "✅ Presente", asFalta: "❌ No estaba", asFaltaAv: "📩 No estaba (avisado)", asMesBtn: "Ver meses anteriores", asLlista: "Lista", asTardC: "Tarde / antes", asToca: "Toca un día para ver el detalle.",
      asTxt: "Lo marcan los monitores en cada entreno. Si ves algún error, habla con Jaime.",
      pTard: "⏰ Llega tarde", pAbans: "↩️ Se va antes", pTardAbans: "⏰ Tarde y se va antes",
      tmFitxa: "Licencia", tmCat: "Categoría", tmAny: "Año", tmMillors: "Mejores marcas", tmToca: "Toca una prueba para ver cómo ha ido evolucionando.",
      tmUltimes: "Últimas competiciones", tmTests: "Mis tests", tmTestsTxt: "Solo los ves tú.", tmBuit: "Todavía no hay ninguna marca oficial.",
      tmTecnic: "Para ver los tiempos de un nadador, usa ☰ › Ver como…", tmMajors: "A partir de los 18 años, los tiempos solo los ve el propio nadador.",
      tmManual: "M = cronometraje manual", tmMarques: "Marcas", tmMinimes: "Mínimas", tmMinProx: "Próximamente · Consúltalo con el entrenador.", tmMinCap: "Ahora mismo no hay ninguna competición con mínimas para ti.", tmAssol: "mínimas conseguidas", tmDe: "de", tmMinA: "Mín. 50 m", tmMinB: "Mín. 25 m", tmTeva: "Tú:", tmOk: "✅ ¡Mínima!", tmFalten: "Faltan {s} s", tmSense: "Sin marca", tmSup: "Competición de categoría superior: se compara con el año {a} de la tabla.", tmMarquesDes: "Marcas válidas del {d} al {f}.", tmMinTxt: "Cada marca se compara con la tabla de su piscina. El manual suma 0,29 s (50 m) o 0,19 s (100 m o más).", tmP: "Piscina", tmTxt: "Marcas oficiales de competición. Si falta alguna, habla con Jaime.",
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
        noCoincideixen: "Las contraseñas no coinciden.", contrasenya_admin: "La contraseña de administrador debe tener como mínimo 12 caracteres.", permis: "No tienes permiso para hacer esto.", sense_entreno: "Este apartado no está activo para ti.", tutor: "Escribe el nombre completo del padre, madre o tutor y marca la autorización.", privacitat: "Hay que aceptar la información de privacidad.", sense_consentiment: "Para hacer el wellness en la app, primero hace falta tu permiso (menú ☰ › Privacidad).", sense_perfil: "Tu perfil todavía no está conectado al wellness. Habla con Jaime.", ja_fet: "Ya has hecho el wellness de esta sesión. ¡Gracias!", dades: "Falta alguna respuesta. Revísalo."
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
        err.textContent = t("carregant");
        crida("mirarCodi", { codi: alta.codi }).then(function (r) {
          if (!r.ok) { err.textContent = terr(r.error); return; }
          alta.menor = !!r.menor; alta.rol = r.rol;
          alta.pas = 3; pantallaAlta();
        });
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
      var bt = el("button", { type: "button", class: "btn", text: t("acceptar"), disabled: true });
      var chk = el("input", { type: "checkbox", id: "acc" });
      var chkW = el("input", { type: "checkbox", id: "accw" });
      var inT = el("input", { type: "text", id: "tutor", maxlength: "80", autocomplete: "name" });
      function revisa() { bt.disabled = !(chk.checked && (!alta.menor || inT.value.trim().length >= 5)); }
      chk.addEventListener("change", revisa); inT.addEventListener("input", revisa);
      mig.appendChild(el("h1", { text: t("privTit") }));
      if (alta.menor) mig.appendChild(el("div", { class: "caixa avis-menor", text: t("privMenorAvis") }));
      mig.appendChild(caixaPrivacitat());
      if (alta.menor) {
        mig.appendChild(el("label", { for: "tutor", text: t("tutorNom") }));
        mig.appendChild(inT);
        mig.appendChild(el("label", { class: "check", for: "acc" }, [chk, t("tutorAccepto")]));
        mig.appendChild(el("label", { class: "check", for: "accw" }, [chkW, t("tutorWellness")]));
      } else {
        mig.appendChild(el("label", { class: "check", for: "acc" }, [chk, alta.rol === "PARE" ? t("privFamilia") : t("privAccepto")]));
        if (alta.rol === "NEDADOR") mig.appendChild(el("label", { class: "check", for: "accw" }, [chkW, t("privWellness")]));
      }
      mig.appendChild(err);
      bt.addEventListener("click", function () {
        bt.disabled = true; bt.textContent = t("carregant");
        crida("activar", { codi: alta.codi, usuari: alta.usuari, contrasenya: alta.pw1, privacitat: chk.checked === true,
          wellness: chkW.checked === true, tutorNom: alta.menor ? inT.value.trim() : "", tutorAccepta: alta.menor ? chk.checked === true : false }).then(function (r) {
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
  function guardaInici(r) {
    estat.inici = { nom: r.nom, rol: r.rol, moduls: r.moduls || {}, avisos: r.avisos || [], wellness: r.wellness || null, sessions: r.sessions || [], faltes: r.faltes || [], fills: r.fills || [], privacitat: r.privacitat || null };
    escriu("inici", JSON.stringify(estat.inici));
    estat.inici.convs = r.convs || [];   // les convocatòries no es desen al mòbil
  }

  function carregaInici() {
    if (!estat.token) { pantallaAlta(); return; }
    if (estat.veureCom) {
      pinta(el("div", { class: "carrega", text: t("carregant") }));
      crida("inici", { token: estat.token, veureCom: estat.veureCom.id }).then(function (r) {
        if (r.ok) { estat.dadesVC = { nom: r.nom, rol: r.rol, moduls: r.moduls || {}, avisos: r.avisos || [], convs: r.convs || [] }; pantallaApp(); }
        else { estat.veureCom = null; estat.dadesVC = null; carregaInici(); }
      });
      return;
    }
    if (estat.inici) pantallaApp(); else pinta(el("div", { class: "carrega", text: t("carregant") }));
    crida("inici", { token: estat.token }).then(function (r) {
      if (r.ok) {
        estat.offline = false;
        guardaInici(r);
        if (r.privacitat && r.privacitat.obligatoria && !r.privacitat.acceptada) { pantallaPrivacitat(true); return; }
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
        else if (!w.prova && d.privacitat && d.privacitat.obligatoria && d.rol === "NEDADOR" && !d.privacitat.wellness)
          fills.push(el("span", { class: "gris", text: t("cwCal") }), el("button", { type: "button", class: "btn", text: t("cwDonar"), onclick: function () { pantallaPrivacitat(false); } }));
        else fills.push(el("button", { type: "button", class: "btn", text: w.prova ? t("wellProva") : t("wellFer"), onclick: obreWellness }), w.prova ? null : enllac);
        cos.appendChild(el("div", { class: "caixa" }, fills));
      }
      if (d.sessions && d.sessions.length) {
        cos.appendChild(el("div", { class: "caixa" }, [el("h2", { text: t("entrenoTit") })].concat(d.sessions.map(function (s) { return botoSessio(s, false); }))));
      }
      (d.convs || []).forEach(function (c) { cos.appendChild(targetaConv(c)); });
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
        if (!tecnic && estatModul("assistencia") === "on") fl.push(el("button", { type: "button", class: "btn3", text: t("asVeure"), onclick: function () { estat.pestanya = "assistencia"; apunta("assistencia"); pantallaApp(); } }));
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
    } else if (pes === "temps" && (estatModul("temps") === "on" || ((d.rol === "ADMIN" || d.rol === "TECNIC") && estatModul("temps") !== "no"))) {
      if (estatModul("temps") !== "on") cos.appendChild(el("div", { class: "caixa gris", text: t("ocultModul") }));
      cos.appendChild(vistaTemps());
    } else if (pes === "assistencia" && (estatModul("assistencia") === "on" || ((d.rol === "ADMIN" || d.rol === "TECNIC") && estatModul("assistencia") !== "no"))) {
      if (estatModul("assistencia") !== "on") cos.appendChild(el("div", { class: "caixa gris", text: t("ocultModul") }));
      cos.appendChild(vistaAssistencia());
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
            el("div", { class: "setm-dcap" }, [el("strong", { text: (dd.data ? nomDia(dd.data) : dd.d) + " " + dm }), esAvui ? el("span", { class: "setm-tag", text: t("avuiTag") }) : null]),
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
    var quan = s.data === ka ? t("avuiMin") : nomDia(s.data) + " " + s.data.slice(8, 10) + "/" + s.data.slice(5, 7);
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
  var DSEM_LL = { ca: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"], es: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"] };
  function nomDia(k) { var n = DSEM_LL[estat.idioma][dObj(k).getDay()]; return n.charAt(0).toUpperCase() + n.slice(1); }
  function dCurt(k) { return nomDia(k) + " " + dObj(k).getDate(); }
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
      var cv = convDe(e);
      return el("div", { class: "cal-ev" + (e.inici <= r.avui && e.fi >= r.avui ? " ara" : "") + (e.fi < r.avui ? " passada" : "") + (cv ? " amb-conv" : ""),
        onclick: cv ? function () { pantallaConv(cv.k); } : null }, [
        el("div", { class: "cal-ev-cap" }, [el("strong", { text: quan }), e.cat ? xipCat(e) : null]),
        el("div", { class: "cal-nom", text: e.nom }),
        ambFalten && e.fi >= r.avui ? el("div", { class: "gris cal-falten", text: falten <= 0 ? t("calAra") : (falten === 1 ? t("calDema") : t("calFalten").replace("{n}", falten)) }) : null,
        cv ? el("div", { class: "conv-enll", text: "📣 " + t("convVeure") + " ›" }) : null
      ]);
    }

    function vistaTemp(r) {
      if (!estat.calLlista) return vistaAny(r);
      cont.appendChild(el("button", { type: "button", class: "btn2 cal-tog", text: "🗓️ " + t("calVeureGraella"), onclick: function () { estat.calLlista = false; dibuixa(r); } }));
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

    function vistaAny(r) {
      var tots = r.evs.map(function (e) { return e.inici; }).concat(r.festius.map(function (f) { return f.data; })).sort();
      var ini = tots.length ? tots[0].slice(0, 7) : avuiK.slice(0, 7), fi = tots.length ? r.evs.map(function (e) { return e.fi; }).concat(tots).sort().pop().slice(0, 7) : ini;
      cont.appendChild(el("button", { type: "button", class: "btn2 cal-tog", text: "☰ " + t("calVeureLlista"), onclick: function () { estat.calLlista = true; dibuixa(r); } }));
      // Llegenda de categories que surten
      var cats = {};
      r.evs.forEach(function (e) { if (e.cat && !cats[e.cat]) cats[e.cat] = e.color || "#F1C332"; });
      var lleg = el("div", { class: "any-lleg" });
      Object.keys(cats).forEach(function (c) { var p = el("span", { class: "any-lc" }); p.style.background = cats[c] && cats[c] !== "#ffffff" ? cats[c] : "#F1C332"; lleg.appendChild(el("span", { class: "any-li" }, [p, c])); });
      lleg.appendChild(el("span", { class: "any-li" }, [el("span", { class: "any-lc fest" }), t("festiu")]));
      cont.appendChild(lleg);
      var graella = el("div", { class: "any" });
      var y = Number(ini.slice(0, 4)), m = Number(ini.slice(5, 7)), guard = 0;
      while ((y + "-" + ("0" + m).slice(-2)) <= fi && guard++ < 14) {
        (function (y, m) {
        var mk = y + "-" + ("0" + m).slice(-2);
        var cap = el("button", { type: "button", class: "any-mcap", text: MESOS[estat.idioma][m - 1].slice(0, 3) + " " + String(y).slice(2),
          onclick: function () { mesVist = estat.calMes = mk; zoom = estat.calZoom = "mes"; dibuixa(r); } });
        var g = el("div", { class: "any-g" });
        var off = (new Date(y, m - 1, 1).getDay() + 6) % 7, nd = new Date(y, m, 0).getDate();
        for (var i = 0; i < off; i++) g.appendChild(el("span", { class: "any-b" }));
        for (var d = 1; d <= nd; d++) (function (d) {
          var dk = k(y, m, d), info = delDia(r, dk);
          var c = el("button", { type: "button", class: "any-d" + (info.fest.length ? " fest" : "") + (info.comps.length ? " comp" : "") + (dk === avuiK ? " avui" : "") + (dk < avuiK ? " pass" : ""),
            "aria-label": dk + (info.comps.length ? " · " + info.comps[0].nom : ""), text: info.comps.length || info.fest.length || dk === avuiK ? String(d) : "",
            onclick: function () { diaVist = estat.calDia = dk; zoom = estat.calZoom = "dia"; dibuixa(r); } });
          if (info.comps.length) { var col = info.comps[0].color && info.comps[0].color !== "#ffffff" ? info.comps[0].color : "#F1C332"; c.style.background = col; c.style.color = textSobre(col); }
          g.appendChild(c);
        })(d);
        graella.appendChild(el("div", { class: "any-m" + (mk === avuiK.slice(0, 7) ? " ara" : "") }, [cap, g]));
        })(y, m);
        m++; if (m > 12) { m = 1; y++; }
      }
      cont.appendChild(graella);
      // Pròxima competició
      var prox = r.evs.filter(function (e) { return e.fi >= r.avui; }).sort(function (a, b) { return a.inici.localeCompare(b.inici); })[0];
      if (prox) { cont.appendChild(el("h2", { class: "cal-mes", text: t("calProxima") })); cont.appendChild(targeta(prox, r, true)); }
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
        dies.appendChild(el("button", { type: "button", class: "dia-av" + (s.data === k ? " on" : ""),
          onclick: function () { s.data = k; pinta2(); } }, [el("span", { text: n === 0 ? t("avuiMin") : nomDia(k) }), el("span", { class: "dia-av-n", text: k.slice(8, 10) + "/" + k.slice(5, 7) })]));
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

  var PRIV = {
    ca: [
      ["Qui és el responsable", "Club Natació Navàs (NIF G59519678), Pla d'Alzineta s/n, 08670 Navàs. Correu: cnatacio_navas@hotmail.com."],
      ["Quines dades fa servir", "Compte (nom, usuari, rol i nedadors vinculats; la contrasenya va xifrada), activitat esportiva (planificació, sessions, calendari), wellness (inclou dades de salut; el cicle és opcional), avisos de falta i un registre d'ús sense contingut. Mai mostra telèfons, comptes bancaris ni documents privats."],
      ["Qui ho veu", "Cada nedador veu només el seu. Les famílies veuen la informació esportiva dels seus fills, però mai el wellness. L'equip tècnic (Jaime, Eudald, Ilona) veu el necessari per entrenar. No es compara ningú amb ningú."],
      ["Menors", "Fins als 14 anys, el compte l'activa i l'autoritza el pare, mare o tutor. De 14 a 17, el nedador. Les famílies poden demanar en qualsevol moment que es desactivi el compte d'un menor."],
      ["On es guarda", "En fulls privats del compte de Google del club. La pàgina de l'app (GitHub) no conté dades personals. Accés amb codi personal i contrasenya; bloqueig després de 5 intents."],
      ["Quant de temps", "Compte: mentre estiguis actiu al club. Wellness: aquesta temporada i la següent. Sessions en PDF: 31 dies. Avisos de falta: fins al final de la temporada. Registre d'ús: 12 mesos."],
      ["Els teus drets", "Pots demanar accedir, corregir o esborrar les teves dades, i retirar el permís del wellness quan vulguis (menú ☰ › Privacitat). Per correu al club o en persona. També pots reclamar a l'Agència Espanyola de Protecció de Dades (aepd.es)."]
    ]
  };
  PRIV.es = PRIV.ca;

  // ---------- Temps ----------
  function fmtT(s) {
    s = Number(s); if (!(s > 0)) return "—";
    var m = Math.floor(s / 60), r = (s - m * 60).toFixed(2);
    if (m === 0) return r.replace(".", ",");
    return m + ":" + (r.length < 5 ? "0" + r : r).replace(".", ",");
  }
  function dataCurta(k) { return k.slice(8, 10) + "/" + k.slice(5, 7) + "/" + k.slice(2, 4); }
  var ESTILS = ["lliure", "esquena", "braça", "papallona", "estils"];
  function ordreProva(p) {
    var x = String(p).toLowerCase(), e = 9;
    ESTILS.forEach(function (n, i) { if (x.indexOf(n.slice(0, 4)) >= 0 || (n === "lliure" && x.indexOf("libre") >= 0) || (n === "papallona" && x.indexOf("mariposa") >= 0) || (n === "esquena" && x.indexOf("espalda") >= 0) || (n === "braça" && x.indexOf("braza") >= 0)) e = Math.min(e, i); });
    return e * 10000 + (parseInt(x, 10) || 0);
  }
  function vistaTemps() {
    var cont = el("div", { class: "cal" }, [el("div", { class: "carrega", text: t("carregant") })]);
    var obert = {};

    function vistaMinimes(n, r) {
      if (!n.minimes) { cont.appendChild(el("div", { class: "caixa gris", text: t("tmMinProx") })); return; }
      if (!n.minimes.length) { cont.appendChild(el("div", { class: "caixa gris", text: t("tmMinCap") })); return; }
      var c = n.minimes.filter(function (x) { return x.clau === estat.tmComp; })[0] || n.minimes[0];
      var sel = el("select", { class: "tm-sel", "aria-label": t("tmMinimes") });
      n.minimes.forEach(function (x) { var o = el("option", { value: x.clau, text: x.nom || x.clau }); if (x.clau === c.clau) o.selected = true; sel.appendChild(o); });
      sel.addEventListener("change", function () { estat.tmComp = sel.value; dibuixa(r); });
      cont.appendChild(sel);
      var cap = [el("h2", { text: c.nom || c.clau }), el("span", { class: "gris", text: [c.dates, c.pisc ? t("tmP") + " " + c.pisc : ""].filter(Boolean).join(" · ") })];
      if (n.veuProp) cap.push(el("div", { class: "tm-assol" }, [el("strong", { text: String(c.assolides) }), el("span", { text: t("tmDe") + " " + c.proves.length + " " + t("tmAssol") })]));
      if (c.superior) cap.push(el("span", { class: "gris", text: t("tmSup").replace("{a}", c.anyTaula) }));
      if (n.veuProp && c.des && c.fins) cap.push(el("span", { class: "gris", text: t("tmMarquesDes").replace("{d}", dataCurta(c.des)).replace("{f}", dataCurta(c.fins)) }));
      cont.appendChild(el("div", { class: "caixa" }, cap));
      var l = c.proves.slice();
      if (n.veuProp) l.sort(function (a, b) { return (a.pct === null ? 9 : a.pct) - (b.pct === null ? 9 : b.pct) || ordreProva(a.prova) - ordreProva(b.prova); });
      else l.sort(function (a, b) { return ordreProva(a.prova) - ordreProva(b.prova); });
      var caixa = el("div", { class: "caixa" });
      l.forEach(function (p) {
        var files = [];
        [["minA", "mA", "dA", t("tmMinA")], ["minB", "mB", "dB", t("tmMinB")]].forEach(function (k) {
          if (!p[k[0]]) return;
          files.push(el("div", { class: "tm-h" }, [el("span", { class: "gris", text: k[3] + ": " + fmtT(p[k[0]]) }),
            n.veuProp ? el("span", { class: "tm-hs" }, [el("span", { class: "gris", text: p[k[1]] !== null ? t("tmTeva") + " " + fmtT(p[k[1]]) : "" }),
              p[k[2]] !== null ? el("strong", { class: p[k[2]] <= 0 ? "tm-millor" : "tm-pitjor", text: (p[k[2]] > 0 ? "+" : "") + p[k[2]].toFixed(2).replace(".", ",") }) : null]) : null]));
        });
        var est = !n.veuProp ? null : (p.d === null ? el("span", { class: "as-x as-av", text: t("tmSense") }) :
          (p.d <= 0 ? el("span", { class: "as-x as-ok", text: t("tmOk") }) : el("span", { class: "as-x as-t", text: t("tmFalten").replace("{s}", p.d.toFixed(2).replace(".", ",")) })));
        caixa.appendChild(el("div", { class: "tm-min" + (n.veuProp && p.d !== null && p.d <= 0 ? " tm-ok" : "") }, [el("div", { class: "tm-mc" }, [el("strong", { text: p.prova }), est])].concat(files)));
      });
      cont.appendChild(caixa);
      cont.appendChild(el("div", { class: "gris", text: t("tmMinTxt") }));
    }
    function dibuixa(r) {
      cont.textContent = "";
      if (!r.ok) { cont.appendChild(el("div", { class: "caixa gris", text: terr(r.error) })); return; }
      if (r.tecnic) { cont.appendChild(el("div", { class: "caixa gris", text: t("tmTecnic") })); return; }
      if (!r.nedadors.length) { cont.appendChild(el("div", { class: "caixa gris", text: r.majors ? t("tmMajors") : t("tmBuit") })); return; }
      var n = r.nedadors.filter(function (x) { return x.id === estat.asSel; })[0] || r.nedadors[0];
      if (r.nedadors.length > 1) cont.appendChild(el("div", { class: "cal-zoom as-sel" }, r.nedadors.map(function (x) {
        return el("button", { type: "button", class: x.id === n.id ? "on" : "", text: String(x.nom).split(" ")[0], onclick: function () { estat.asSel = x.id; dibuixa(r); } });
      })));
      cont.appendChild(el("div", { class: "caixa tm-fitxa" }, [
        el("h2", { text: n.nom }),
        el("div", { class: "tm-dades" }, [[t("tmFitxa"), String(n.llicTxt || n.llic).replace(/^(\d{3})(\d{2})(\d{2})$/, "$1 $2 $3")], [t("tmCat"), n.cat], [t("tmAny"), n.any]].filter(function (x) { return x[1]; }).map(function (x) {
          return el("div", {}, [el("span", { class: "gris", text: x[0] }), el("strong", { text: x[1] })]); }))
      ]));
      var vt = estat.tmVista || "marques";
      cont.appendChild(el("div", { class: "cal-zoom as-tog" }, [["marques", "⏱️ " + t("tmMarques")], ["minimes", "🎯 " + t("tmMinimes")]].map(function (z) {
        return el("button", { type: "button", class: vt === z[0] ? "on" : "", text: z[1], onclick: function () { estat.tmVista = z[0]; dibuixa(r); } }); })));
      if (vt === "minimes") { vistaMinimes(n, r); return; }
      if (!n.millors.length) cont.appendChild(el("div", { class: "caixa gris", text: t("tmBuit") }));
      ["25", "50"].forEach(function (pisc) {
        var l = n.millors.filter(function (m) { return String(m.pisc).indexOf(pisc) === 0; }).sort(function (a, b) { return ordreProva(a.prova) - ordreProva(b.prova); });
        if (!l.length) return;
        var caixa = el("div", { class: "caixa" }, [el("h2", { text: t("tmMillors") + " · " + t("tmP") + " " + pisc + " m" }), el("span", { class: "gris", text: t("tmToca") })]);
        l.forEach(function (m) {
          var k = m.prova + "|" + m.pisc;
          var det = el("div", { class: "tm-hist" });
          if (obert[k]) m.hist.slice().reverse().forEach(function (h, i, arr) {
            var ant = arr[i + 1], dif = ant ? h.s - ant.s : null;
            det.appendChild(el("div", { class: "tm-h" }, [
              el("span", { class: "gris", text: dataCurta(h.data) + " · " + h.comp }),
              el("span", { class: "tm-hs" }, [el("strong", { text: fmtT(h.s) + (h.crono ? " M" : "") }),
                dif !== null ? el("span", { class: dif < 0 ? "tm-millor" : "tm-pitjor", text: (dif < 0 ? "▼ " : "▲ ") + Math.abs(dif).toFixed(2).replace(".", ",") }) : null])
            ]));
          });
          caixa.appendChild(el("button", { type: "button", class: "tm-m" + (obert[k] ? " obert" : ""), onclick: function () { obert[k] = !obert[k]; dibuixa(r); } }, [
            el("div", { class: "tm-mc" }, [el("span", { text: m.prova }), el("strong", { class: "tm-t", text: fmtT(m.s) + (m.crono ? " M" : "") })]),
            el("div", { class: "gris tm-sub", text: dataCurta(m.data) + " · " + m.comp + "  " + (obert[k] ? "▴" : "▾") }), det]));
        });
        cont.appendChild(caixa);
      });
      if (n.ultimes.length) {
        var u = el("div", { class: "caixa" }, [el("h2", { text: t("tmUltimes") })]);
        n.ultimes.forEach(function (c) {
          u.appendChild(el("div", { class: "tm-comp" }, [el("strong", { text: c.comp }), el("span", { class: "gris", text: dataCurta(c.data) + (c.pisc ? " · " + c.pisc + " m" : "") })].concat(c.proves.map(function (p) {
            return el("div", { class: "conv-h" }, [el("span", { text: p.prova }), el("strong", { text: fmtT(p.s) + (p.crono ? " M" : "") })]); }))));
        });
        cont.appendChild(u);
      }
      if (n.tests && n.tests.length) {
        var tc = el("div", { class: "caixa" }, [el("h2", { text: "🔒 " + t("tmTests") }), el("span", { class: "gris", text: t("tmTestsTxt") })]);
        n.tests.forEach(function (x) {
          tc.appendChild(el("div", { class: "tm-h" }, [el("span", { class: "gris", text: dataCurta(x.data) + " · " + (x.test || "") }),
            el("span", { class: "tm-hs" }, [el("span", { text: x.prova + (x.pisc ? " (" + x.pisc + ")" : "") }), el("strong", { text: fmtT(x.s) + (x.crono ? " M" : "") })])]));
        });
        cont.appendChild(tc);
      }
      cont.appendChild(el("div", { class: "gris", text: t("tmTxt") + " " + t("tmManual") + "." }));
    }
    crida("temps", { token: estat.token, veureCom: estat.veureCom ? estat.veureCom.id : null }).then(function (r) {
      if (estat.pestanya === "temps" && cont.isConnected) dibuixa(r);
    });
    return cont;
  }

  // ---------- Assistència ----------
  function vistaAssistencia() {
    var cont = el("div", { class: "cal" }, [el("div", { class: "carrega", text: t("carregant") })]);
    var mostraTot = false;
    function estatFila(f) {
      if (f.present) {
        if (/tard i/i.test(f.punt)) return ["as-t", t("pTardAbans")];
        if (/tard/i.test(f.punt)) return ["as-t", t("pTard")];
        if (/abans/i.test(f.punt)) return ["as-t", t("pAbans")];
        return ["as-ok", t("asPresent")];
      }
      return (/avisat/i.test(f.punt) || f.app) ? ["as-av", t("asFaltaAv")] : ["as-no", t("asFalta")];
    }
    function pct(a, b) { return b ? Math.round(a / b * 100) + "%" : "—"; }
    function calAssist(fs, mesos) {
      if (!estat.asMes || mesos.indexOf(estat.asMes) < 0) estat.asMes = mesos[0];
      var mk = estat.asMes, y = Number(mk.slice(0, 4)), m = Number(mk.slice(5, 7));
      var i = mesos.indexOf(mk);
      var l = fs.filter(function (f) { return f.data.slice(0, 7) === mk; });
      function compta(x) { return x.filter(function (f) { return f.present; }).length; }
      cont.appendChild(el("div", { class: "cal-nav" }, [
        el("button", { type: "button", class: "cal-fl", "aria-label": "‹", text: "‹", disabled: i >= mesos.length - 1, onclick: function () { estat.asMes = mesos[i + 1]; estat.asDia = null; dibuixa(ultimaR); } }),
        el("strong", { text: MESOS[estat.idioma][m - 1] + " " + y + " · " + pct(compta(l), l.length) }),
        el("button", { type: "button", class: "cal-fl", "aria-label": "›", text: "›", disabled: i <= 0, onclick: function () { estat.asMes = mesos[i - 1]; estat.asDia = null; dibuixa(ultimaR); } })
      ]));
      var g = el("div", { class: "cal-graella" });
      (estat.idioma === "es" ? ["L", "M", "X", "J", "V", "S", "D"] : ["DL", "DT", "DC", "DJ", "DV", "DS", "DG"]).forEach(function (n) { g.appendChild(el("div", { class: "cal-gcap", text: n })); });
      var off = (new Date(y, m - 1, 1).getDay() + 6) % 7, nd = new Date(y, m, 0).getDate();
      for (var b = 0; b < off; b++) g.appendChild(el("div", { class: "cal-gbuit" }));
      for (var d = 1; d <= nd; d++) (function (d) {
        var dk = mk + "-" + ("0" + d).slice(-2);
        var del = l.filter(function (f) { return f.data === dk; });
        var cls = "";
        if (del.length) {
          var es = del.map(function (f) { return estatFila(f)[0]; });
          cls = es.indexOf("as-no") >= 0 ? "as-no" : (es.indexOf("as-av") >= 0 ? "as-av" : (es.indexOf("as-t") >= 0 ? "as-t" : "as-ok"));
        }
        g.appendChild(el("button", { type: "button", class: "cal-gdia " + cls + (dk === estat.asDia ? " sel" : ""), disabled: !del.length, "aria-label": dk,
          onclick: function () { estat.asDia = dk; dibuixa(ultimaR); } }, [el("span", { text: String(d) })]));
      })(d);
      cont.appendChild(g);
      cont.appendChild(el("div", { class: "as-lleg gris" }, [["as-ok", t("asPresent")], ["as-t", "⏰ " + t("asTardC")], ["as-av", t("asFaltaAv")], ["as-no", t("asFalta")]].map(function (x) {
        return el("span", {}, [el("span", { class: "as-q " + x[0] }), x[1].replace(/^\S+\s/, "")]); })));
      var dia = estat.asDia && estat.asDia.slice(0, 7) === mk ? estat.asDia : null;
      if (dia) {
        var caixa = el("div", { class: "caixa" }, [el("h2", { text: dCurt(dia) + " " + MESOS[estat.idioma][m - 1] })]);
        l.filter(function (f) { return f.data === dia; }).forEach(function (f) {
          var e = estatFila(f);
          caixa.appendChild(el("div", { class: "as-f" }, [el("div", { class: "gris", text: f.grup.replace(/^(Dl|Dt|Dc|Dj|Dv|Ds|Dg)\s+/, "") }), el("span", { class: "as-x " + e[0], text: e[1] })]));
        });
        cont.appendChild(caixa);
      } else cont.appendChild(el("div", { class: "gris", text: t("asToca") }));
    }
    var ultimaR = null;
    function dibuixa(r) {
      ultimaR = r;
      cont.textContent = "";
      if (!r.ok) { cont.appendChild(el("div", { class: "caixa gris", text: terr(r.error) })); return; }
      if (r.tecnic) { cont.appendChild(el("div", { class: "caixa gris", text: t("asTecnic") })); return; }
      if (!r.nedadors.length) { cont.appendChild(el("div", { class: "caixa gris", text: r.majors ? t("asMajors") : t("asBuit") })); return; }
      var sel = r.nedadors.filter(function (n) { return n.id === estat.asSel; })[0] || r.nedadors[0];
      if (r.nedadors.length > 1) cont.appendChild(el("div", { class: "cal-zoom as-sel" }, r.nedadors.map(function (n) {
        return el("button", { type: "button", class: n.id === sel.id ? "on" : "", text: String(n.nom).split(" ")[0], onclick: function () { estat.asSel = n.id; dibuixa(r); } });
      })));
      var fs = sel.files;
      if (!fs.length) { cont.appendChild(el("div", { class: "caixa gris", text: t("asBuit") })); return; }
      var mesK = fs[0].data.slice(0, 7);
      var delMes = fs.filter(function (f) { return f.data.slice(0, 7) === mesK; });
      function compta(l) { return l.filter(function (f) { return f.present; }).length; }
      var tard = fs.filter(function (f) { return f.present && /tard/i.test(f.punt); }).length;
      var abans = fs.filter(function (f) { return f.present && /abans/i.test(f.punt); }).length;
      cont.appendChild(el("div", { class: "as-res" }, [
        el("div", { class: "as-n" }, [el("strong", { text: pct(compta(delMes), delMes.length) }), el("span", { text: t("asMes") }), el("span", { class: "gris", text: compta(delMes) + " " + t("asDe") + " " + delMes.length })]),
        el("div", { class: "as-n" }, [el("strong", { text: pct(compta(fs), fs.length) }), el("span", { text: t("asTemp") }), el("span", { class: "gris", text: compta(fs) + " " + t("asDe") + " " + fs.length })])
      ]));
      if (tard || abans) cont.appendChild(el("div", { class: "caixa" }, [
        el("div", { class: "conv-h" }, [el("span", { text: t("asTard") }), el("strong", { text: String(tard) })]),
        el("div", { class: "conv-h" }, [el("span", { text: t("asAbans") }), el("strong", { text: String(abans) })])]));
      var mesos = [];
      fs.forEach(function (f) { var k = f.data.slice(0, 7); if (mesos.indexOf(k) < 0) mesos.push(k); });
      var vista = estat.asVista || "cal";
      var tog = el("div", { class: "cal-zoom as-tog" }, [["cal", "🗓️ " + t("calendari")], ["llista", "☰ " + t("asLlista")]].map(function (z) {
        return el("button", { type: "button", class: vista === z[0] ? "on" : "", text: z[1], onclick: function () { estat.asVista = z[0]; dibuixa(r); } });
      }));
      cont.appendChild(tog);
      if (vista === "cal") { calAssist(fs, mesos); cont.appendChild(el("div", { class: "gris", text: t("asTxt") })); return; }
      (mostraTot ? mesos : mesos.slice(0, 2)).forEach(function (mk) {
        var l = fs.filter(function (f) { return f.data.slice(0, 7) === mk; });
        var caixa = el("div", { class: "caixa" }, [el("h2", { text: MESOS[estat.idioma][Number(mk.slice(5)) - 1] + " " + mk.slice(0, 4) + " · " + pct(compta(l), l.length) })]);
        l.forEach(function (f) {
          var e = estatFila(f);
          caixa.appendChild(el("div", { class: "as-f" }, [
            el("div", {}, [el("strong", { text: dCurt(f.data) }), el("div", { class: "gris", text: f.grup.replace(/^(Dl|Dt|Dc|Dj|Dv|Ds|Dg)\s+/, "") })]),
            el("span", { class: "as-x " + e[0], text: e[1] })]));
        });
        cont.appendChild(caixa);
      });
      if (!mostraTot && mesos.length > 2) cont.appendChild(el("button", { type: "button", class: "btn3", text: t("asMesBtn"), onclick: function () { mostraTot = true; dibuixa(r); } }));
      cont.appendChild(el("div", { class: "gris", text: t("asTxt") }));
    }
    crida("assistencia", { token: estat.token, veureCom: estat.veureCom ? estat.veureCom.id : null }).then(function (r) {
      if (estat.pestanya === "assistencia" && cont.isConnected) dibuixa(r);
    });
    return cont;
  }

  // ---------- Convocatòries ----------
  function clauNom(x) { return String(x || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9]+/g, " ").trim(); }
  function convDe(e) {
    var cs = ((dades() || {}).convs || []).filter(function (c) { return c.data >= e.inici && c.data <= e.fi; });
    if (!cs.length) return null;
    var ke = clauNom(e.nom);
    var bo = cs.filter(function (c) { var kc = clauNom(c.nom); return kc.indexOf(ke) >= 0 || ke.indexOf(kc) >= 0 ||
      kc.split(" ").filter(function (w) { return w.length > 3 && ke.split(" ").indexOf(w) >= 0; }).length >= 2; });
    return bo[0] || (cs.length === 1 ? cs[0] : null);
  }
  function txtTr(v) { return { porto: t("trPorto"), lloc: t("trLloc"), necessita: t("trNecessita"), sol: t("trSol") }[v] || v || "—"; }
  function dataLlarga(k) { var x = dObj(k); return dCurt(k) + " " + MESOS[estat.idioma][x.getMonth()]; }

  function targetaConv(c) {
    var pendents = (c.meus || []).filter(function (m) { return m.potRespondre && !m.resposta; }).length;
    var fills = [
      el("h2", { text: "📣 " + t("convTit") + " · " + c.fase }),
      el("strong", { text: c.nom }),
      el("span", { class: "gris", text: dataLlarga(c.data) + (c.sede ? " · " + c.sede : "") + (c.hConv ? " · " + c.hConv : "") }),
      c.noPublicada ? el("span", { class: "gris", text: t("convNoPub") }) : null,
      (c.meus || []).length ? el("span", { class: pendents ? "conv-pend" : "ok", text: pendents ? t("convFalta") : ((c.meus || []).some(function (m) { return m.resposta; }) ? t("convRespost") : "") }) : null,
      el("button", { type: "button", class: "btn", text: t("convVeure"), onclick: function () { pantallaConv(c.k); } })
    ];
    return el("div", { class: "caixa conv" }, fills);
  }

  function pantallaConv(k, missatge) {
    var c = ((dades() || {}).convs || []).filter(function (x) { return x.k === k; })[0];
    if (!c) { pantallaApp(); return; }
    apunta("convocatories");
    var y = window.scrollY || 0;
    var f = [];
    f.push(el("div", { class: "conv-cap" }, [el("span", { class: "conv-fase", text: c.fase }), el("span", { class: "gris", text: dataLlarga(c.data) + (c.franja ? " · " + c.franja : "") })]));
    f.push(el("h2", { class: "conv-nom", text: c.nom }));
    if (c.noPublicada) f.push(el("div", { class: "caixa gris", text: t("convNoPub") }));
    if (missatge) f.push(el("div", { class: "ok gran", text: missatge }));
    if (/^pre/i.test(c.fase)) f.push(el("div", { class: "caixa gris", text: t("convPreAvis") }));
    // Lloc
    var lloc = [el("strong", { text: c.sede || "" }), c.adreca ? el("span", { class: "gris", text: c.adreca }) : null];
    if (c.maps) lloc.push(el("a", { href: c.maps, target: "_blank", rel: "noopener noreferrer", class: "btn3", text: t("convMaps") }));
    if (c.sede || c.adreca) f.push(el("div", { class: "caixa" }, lloc));
    // Horaris
    var hs = [[t("convHConv"), c.hConv], [t("convHEscalf"), c.hEscalf], [t("convHInici"), c.hInici]].filter(function (h) { return h[1]; });
    if (hs.length) f.push(el("div", { class: "caixa" }, [el("h2", { text: t("convHores") })].concat(hs.map(function (h) {
      return el("div", { class: "conv-h" }, [el("span", { text: h[0] }), el("strong", { text: h[1] })]); }))));
    if (c.avisos) f.push(el("div", { class: "caixa avis" }, [el("div", { class: "tit", text: "⚠️ " + t("convAvisos") }), el("div", { class: "txt", text: c.avisos })]));
    var enl = [];
    if (c.llistat) enl.push(el("a", { href: c.llistat, target: "_blank", rel: "noopener noreferrer", class: "btn3", text: t("convLlistat") }));
    if (c.resultats) enl.push(el("a", { href: c.resultats, target: "_blank", rel: "noopener noreferrer", class: "btn3", text: t("convResultats") }));
    if (enl.length) f.push(el("div", { class: "caixa" }, enl));
    // Els meus nedadors
    (c.meus || []).forEach(function (m) {
      var bloc = [el("h2", { text: m.nom }), m.llic ? el("span", { class: "gris", text: t("convLlic") + ": " + m.llic }) : null];
      m.proves.forEach(function (p) {
        bloc.push(el("div", { class: "conv-prova" }, [
          el("div", { class: "conv-pl" }, [el("strong", { text: p.prova }), p.hora ? el("span", { class: "conv-hora", text: p.hora }) : null]),
          el("div", { class: "gris", text: [p.num ? t("convNum") + " " + p.num : "", p.serie ? t("convSerie") + " " + p.serie : "", p.carrer ? t("convCarrer") + " " + p.carrer : ""].filter(Boolean).join(" · ") }),
          p.notes ? el("div", { class: "gris", text: "📝 " + p.notes }) : null
        ]));
      });
      if (m.potRespondre && estat.veureCom) bloc.push(el("div", { class: "caixa gris", text: t("convVCForm") }));
      else if (m.potRespondre) bloc.push(formResposta(c, m));
      else if (m.resposta) bloc.push(el("div", { class: "ok", text: t("convRespost") + ": " + (m.resposta.va === "Sí" ? t("convSi") : t("convNo")) }));
      else if (!estat.veureCom && (dades() || {}).rol === "NEDADOR") bloc.push(el("div", { class: "gris", text: t("convPares") }));
      f.push(el("div", { class: "caixa" }, bloc));
    });
    // Resum per a l'equip tècnic
    if (c.resum) {
      var van = c.resum.filter(function (r) { return r.va === "Sí"; }), no = c.resum.filter(function (r) { return r.va === "No"; }), sense = c.resum.filter(function (r) { return !r.va; });
      var nec = van.filter(function (r) { return r.anada === "necessita" || r.tornada === "necessita"; });
      var places = van.reduce(function (s, r) { return s + (Number(r.places) || 0); }, 0);
      var res = [el("h2", { text: t("convResum") }),
        el("div", { class: "conv-h" }, [el("span", { text: t("convVan") }), el("strong", { text: String(van.length) })]),
        el("div", { class: "conv-h" }, [el("span", { text: t("convNoVan") }), el("strong", { text: String(no.length) })]),
        el("div", { class: "conv-h" }, [el("span", { text: t("convSense") }), el("strong", { text: String(sense.length) })]),
        el("div", { class: "conv-h" }, [el("span", { text: t("convNecessiten") }), el("strong", { text: String(nec.length) })]),
        el("div", { class: "conv-h" }, [el("span", { text: t("convPlacesOf") }), el("strong", { text: String(places) })])];
      if (c.dinar) res.push(el("div", { class: "conv-h" }, [el("span", { text: t("convDinen") }), el("strong", { text: String(van.filter(function (r) { return r.dinar === "Sí"; }).length) })]));
      c.resum.forEach(function (r) {
        var det = !r.va ? t("convSense") : (r.va === "No" ? t("convNo") : t("convAnada") + ": " + txtTr(r.anada) + " · " + t("convTornada") + ": " + txtTr(r.tornada) +
          (r.places ? " · 🚗 " + r.places : "") + (r.dinar ? " · 🍽️ " + r.dinar : ""));
        res.push(el("div", { class: "conv-r" + (!r.va ? " sense" : "") }, [el("strong", { text: r.nom }), el("div", { class: "gris", text: det }), r.nota ? el("div", { class: "gris", text: "📝 " + r.nota }) : null]));
      });
      f.push(el("div", { class: "caixa" }, res));
    }
    // Llista completa
    if (c.llista && c.llista.length) {
      f.push(el("div", { class: "caixa" }, [el("h2", { text: t("convLlista") + " (" + c.llista.length + ")" }), el("span", { class: "gris", text: t("convLlistaTxt") })].concat(c.llista.map(function (x) {
        var det = el("div", { class: "conv-ll-det" });
        if (x.llic) det.appendChild(el("div", { class: "conv-ll-p" }, [el("span", { text: t("convLlic") }), el("strong", { text: x.llic })]));
        (x.proves || []).forEach(function (p) {
          det.appendChild(el("div", { class: "conv-ll-p" }, [el("span", { text: p.prova }), el("span", { class: "gris", text: [p.hora, p.serie ? t("convSerie") + " " + p.serie : "", p.carrer ? t("convCarrer") + " " + p.carrer : ""].filter(Boolean).join(" · ") })]));
        });
        var fila = el("button", { type: "button", class: "conv-ll " + (x.sexe === "F" ? "f" : (x.sexe === "M" ? "m" : "")), "aria-expanded": "false" }, [
          el("div", { class: "conv-ll-cap" }, [el("span", { text: x.nom }), el("span", { class: "gris", text: [x.any, x.cat].filter(Boolean).join(" · ") + ((x.proves || []).length ? "  ▾" : "") })]), det]);
        fila.addEventListener("click", function () { var o = fila.classList.toggle("obert"); fila.setAttribute("aria-expanded", o ? "true" : "false"); });
        return fila;
      }))));
    }
    pantallaSimple(t("convTit"), f);
    window.scrollTo(0, missatge ? 0 : y);
  }

  function formResposta(c, m) {
    var r0 = m.resposta || {};
    var s = { va: r0.va === "Sí" ? "si" : (r0.va === "No" ? "no" : null), anada: r0.anada || null, tornada: r0.tornada || null,
              places: r0.places || "0", dinar: r0.dinar === "Sí" ? "si" : (r0.dinar === "No" ? "no" : null) };
    var caixa = el("div", { class: "conv-form" });
    var nota = el("textarea", { class: "wtx", rows: "2", maxlength: "200", placeholder: t("convNota") });
    nota.value = r0.nota || "";
    var err = el("div", { class: "err", role: "alert" });
    function botons(opts, clau) {
      return el("div", { class: "wb" }, opts.map(function (o) {
        return el("button", { type: "button", class: "wbtn" + (s[clau] === o[0] ? " on" : ""), text: o[1], onclick: function () { s[clau] = o[0]; dibuixa(); } });
      }));
    }
    function dibuixa() {
      caixa.textContent = "";
      var trs = [["porto", t("trPorto")], ["lloc", t("trLloc")], ["necessita", t("trNecessita")], ["sol", t("trSol")]];
      caixa.appendChild(el("div", { class: "wq-t", text: t("convVas") }));
      caixa.appendChild(botons([["si", t("convSi")], ["no", t("convNo")]], "va"));
      if (s.va === "si") {
        caixa.appendChild(el("div", { class: "wq-t", text: t("convAnada") })); caixa.appendChild(botons(trs, "anada"));
        caixa.appendChild(el("div", { class: "wq-t", text: t("convTornada") })); caixa.appendChild(botons(trs, "tornada"));
        if (s.anada === "porto" || s.tornada === "porto") {
          caixa.appendChild(el("div", { class: "wq-t", text: t("convPlaces") }));
          var pl = el("div", { class: "conv-places" });
          ["0", "1", "2", "3", "4"].forEach(function (n) { pl.appendChild(el("button", { type: "button", class: "wbtn" + (String(s.places) === n ? " on" : ""), text: n === "4" ? "4+" : n, onclick: function () { s.places = n; dibuixa(); } })); });
          caixa.appendChild(pl);
        }
        if (c.dinar) { caixa.appendChild(el("div", { class: "wq-t", text: t("convDinar") })); caixa.appendChild(botons([["si", t("dSi")], ["no", t("dNo")]], "dinar")); }
      }
      caixa.appendChild(nota);
      caixa.appendChild(err);
      var bt = el("button", { type: "button", class: "btn", text: m.resposta ? t("convCanviar") : t("convDesar"), onclick: function () {
        err.textContent = "";
        if (!s.va || (s.va === "si" && (!s.anada || !s.tornada))) { err.textContent = t("convFaltaResp"); return; }
        if (s.va === "si" && c.dinar && !s.dinar) { err.textContent = t("convFaltaDinar"); return; }
        bt.disabled = true; bt.textContent = t("carregant");
        crida("respondreConv", { token: estat.token, k: c.k, idCnn: m.id, va: s.va, anada: s.anada, tornada: s.tornada, places: s.places, dinar: s.dinar, nota: nota.value }).then(function (r) {
          if (!r.ok) { err.textContent = terr(r.error); bt.disabled = false; bt.textContent = t("convDesar"); return; }
          if (r.prova) { window.alert(t("convProvaAdmin")); bt.disabled = false; bt.textContent = t("convDesar"); return; }
          crida("inici", { token: estat.token }).then(function (r2) {
            if (r2.ok) guardaInici(r2);
            pantallaConv(c.k, t("convDesat"));
          });
        });
      } });
      caixa.appendChild(bt);
      caixa.appendChild(el("div", { class: "gris", text: t("convPrivat") }));
    }
    dibuixa();
    return caixa;
  }

  function caixaPrivacitat() {
    var tot = el("div", { class: "priv-tot" });
    var obert = false;
    var bt = el("button", { type: "button", class: "btn2 priv-mes", text: t("privLlegir") });
    bt.addEventListener("click", function () {
      obert = !obert; tot.textContent = "";
      bt.textContent = obert ? t("privAmagar") : t("privLlegir");
      if (obert) PRIV[estat.idioma].forEach(function (s) { tot.appendChild(el("div", { class: "priv-s" }, [el("strong", { text: s[0] }), el("span", { text: s[1] })])); });
    });
    return el("div", { class: "caixa" }, [
      el("span", { text: t("normesTxt") }),
      el("span", { class: "gris", text: t("wellPrivat") }),
      el("span", { class: "gris", text: t("noDadesPrivades") }),
      bt, tot
    ]);
  }

  function pantallaPrivacitat(gate) {
    var d = estat.inici || {};
    var pr = d.privacitat || {};
    var err = el("div", { class: "err", role: "alert" });
    var fills = [];
    if (gate) fills.push(el("div", { class: "caixa avis-menor", text: t("privActualitzat") }));
    fills.push(caixaPrivacitat());
    if (d.rol === "NEDADOR") {
      var estatW = pr.wellness ? t("cwDonat") : t("cwNoDonat");
      fills.push(el("h2", { text: t("cwTit") }));
      fills.push(el("div", { class: "caixa" }, [el("span", { text: estatW }), el("span", { class: "gris", text: t("cwTxt") })]));
      if (!gate) {
        var inT = el("input", { type: "text", maxlength: "80", placeholder: t("tutorNom") });
        var chT = el("input", { type: "checkbox", id: "cwt" });
        if (!pr.wellness && pr.tutelat) { fills.push(inT); fills.push(el("label", { class: "check", for: "cwt" }, [chT, t("tutorWellness")])); }
        fills.push(el("button", { type: "button", class: pr.wellness ? "btn3" : "btn", text: pr.wellness ? t("cwRetirar") : t("cwDonar"), onclick: function () {
          if (pr.wellness && !window.confirm(t("cwRetirarSeg"))) return;
          crida("consentimentWellness", { token: estat.token, valor: !pr.wellness, tutorNom: inT.value.trim(), tutorAccepta: chT.checked === true }).then(function (r) {
            if (r.ok) carregaInici(); else err.textContent = terr(r.error);
          });
        } }));
      }
    }
    fills.push(err);
    if (gate) {
      var ch = el("input", { type: "checkbox", id: "pga" });
      var chW = el("input", { type: "checkbox", id: "pgw" });
      var bt = el("button", { type: "button", class: "btn", text: t("acceptar"), disabled: true });
      ch.addEventListener("change", function () { bt.disabled = !ch.checked; });
      fills.push(el("label", { class: "check", for: "pga" }, [ch, d.rol === "PARE" ? t("privFamilia") : t("privAccepto")]));
      if (d.rol === "NEDADOR" && !pr.wellness && !pr.tutelat) fills.push(el("label", { class: "check", for: "pgw" }, [chW, t("privWellness")]));
      bt.addEventListener("click", function () {
        bt.disabled = true;
        crida("acceptarPrivacitat", { token: estat.token, wellness: chW.checked === true }).then(function (r) {
          if (r.ok) carregaInici(); else { err.textContent = terr(r.error); bt.disabled = false; }
        });
      });
      fills.push(bt);
      pinta(el("div", { class: "pant" }, [el("div", { class: "mig" }, [el("h1", { text: t("privTit") })].concat(fills))]));
    } else {
      pantallaSimple(t("privTit"), fills);
    }
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
      modul("assistencia", "📊", t("assistencia")),
      modul("botiga", "🛍️", t("botiga")),
      modul("reunions", "🤝", t("reunio")),
      modul("quotes", "💶", t("quotes")),
      el("hr"),
      estat.veureCom ? item("👁️", t("sortirVC") + " · " + t("veureCom"), surtVeureCom) : null,
      !estat.veureCom && estat.inici && estat.inici.rol === "ADMIN" ? item("👁️", t("veureCom"), pantallaPerfils) : null,
      estat.veureCom ? null : item("🔑", t("perfil"), function () { pantallaContrasenya(false); }),
      item("🌐", t("idioma"), function () { canviaIdioma(estat.idioma === "ca" ? "es" : "ca"); }),
      estat.veureCom ? null : item("🔒", t("privTit"), function () { pantallaPrivacitat(false); }),
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
