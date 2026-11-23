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
      trPorto: "L'hi portem nosaltres", trLloc: "Ens veiem al lloc", trNecessita: "Necessita que algú el porti", trSol: "Hi va pel seu compte", trPortoN: "M'hi porten els meus pares", trNecessitaN: "Necessito que algú em porti", trSolN: "Hi vaig pel meu compte", convSiN: "✅ Sí, hi vaig", convNoN: "❌ No puc venir", convVasN: "Hi aniràs?", convDinarN: "Et quedes a dinar?",
      convPlaces: "Places lliures al cotxe per a altres nedadors", convDinar: "Es queda a dinar?", dSi: "Sí", dNo: "No",
      convNota: "Nota per al Jaime (opcional)", convDesar: "Enviar la resposta", convCanviar: "Canviar la resposta", convDesat: "Fet ✅ Resposta enviada. Només la veu l'equip tècnic.",
      convFaltaResp: "Contesta si hi va, l'anada i la tornada.", convFaltaDinar: "Contesta si es queda a dinar.", convProvaAdmin: "Mode prova (admin): no s'ha desat res.",
      convPares: "Ho confirmaran els teus pares des del seu compte.", convPerNed: "📣 {n} ha respost: {r}. Si no hi esteu d'acord, podeu canviar-ho aquí.", convPerPare: "Els teus pares han canviat la resposta.", convAvisPares: "Els teus pares veuran la teva resposta.", convNedResp: "📣 {n} ha respost", convPrivat: "Les respostes només les veu l'equip tècnic.",
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
      tmManual: "M = cronometratge manual", tecCerca: "Cerca un nedador…", wmeu: "El meu wellness", wmTit: "El meu wellness", wmPriv: "🔒 Només ho veus tu i l'equip tècnic. Les respostes no es poden canviar.", wmBuit: "Encara no hi ha respostes de les últimes setmanes.", wmSense: "El teu perfil encara no està connectat al wellness. Parla amb el Jaime.", wmMissatge: "💬 Missatge del Jaime", wm4: "Últimes 4 setmanes", wmFets: "Wellness fets", wmSon: "Son (mitjana)", wmDesc: "Descans", wmTrobes: "Com et trobes", wmAigua: "Duresa aigua", wmSec: "Duresa sec", wmDolor: "Dies amb dolor", wmOn: "On t'ha fet mal", wmDies: "dies", wmToca: "Toca un dia per veure què vas respondre.", wmLlegB: "Bé", wmLlegR: "Regular", wmLlegM: "Fluix", wmLlegD: "Dolor", wmGraf: "Dia a dia", wmTecnic: "Per veure el wellness d'un nedador, tria'l a dalt.", botigaTit: "La botiga del club", botigaTxt: "Roba i material del Club Natació Navàs: fotos, descripció i talles. Aviat també hi podràs fer comandes.", botigaObrir: "Obrir la botiga", botigaSense: "Aviat hi trobaràs l'enllaç a la botiga.", tecMeu: "el teu fill/a", tmMarques: "Marques", tmMinimes: "Mínimes", tmMinProx: "Pròximament · Consulta-ho amb l'entrenador.", tmMinCap: "Ara mateix no hi ha cap competició amb mínimes per a tu.", tmAssol: "mínimes aconseguides", tmDe: "de", tmMinA: "Mín. 50 m", tmMinB: "Mín. 25 m", tmTeva: "Tu:", tmOk: "✅ Mínima!", tmFalten: "Falten {s} s", tmSense: "Sense marca", tmSup: "Competició de categoria superior: es compara amb l'any {a} de la taula.", tmMarquesDes: "Marques vàlides del {d} al {f}.", tmMinTxt: "Cada marca es compara amb la taula de la seva piscina. El manual suma 0,29 s (50 m) o 0,19 s (100 m o més).", tmP: "Piscina", tmTxt: "Marques oficials de competició. Si en falta alguna, parla amb el Jaime.",
      entrenoTit: "Entreno", sessioCanviada: "Aquesta sessió s'ha actualitzat. Torna-la a tocar.", avuiMin: "Avui", sessioN: "Sessió", sessioPdf: "Sessió en PDF",
      veureCom: "Veure com…", veientCom: "Veient com", sortirVC: "Sortir", triaPerfil: "Tria un perfil per veure l'app com la veu aquella persona. Només per mirar: no es pot canviar res.",
      canviObligat: "Tria una contrasenya nova per continuar. A «Contrasenya actual» escriu la que t'han donat (la provisional). Mínim 8 caràcters (12 si ets administrador).",
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
comEtDiemEq: "És el nom que veuran els teus companys a l'apartat Equip (màx. 25 lletres).", calTots: "Tots", cancel: "Cancel·lar", eqReptes: "Reptes", eqXat: "Xat", eqGent: "Equip", rpBuit: "Encara no hi ha cap repte. Proposa'n un! 😉", rpObert: "Obert fins", rpTancat: "Tancat", rpTria: "Vot d'avui (1 vot al dia fins que es tanqui):", rpConfirma: "Toca un altre cop per confirmar el vot d'avui.", rpAvui: "Avui has votat:", rpDema: "Demà pots tornar a votar!", rpMeus: "Vots que has fet en aquest repte", rpPesTec: "(els vots de l'equip tècnic valen la meitat)", rpCanvia: "Ja has votat. Pots canviar el vot fins que es tanqui.", rpVotat: "Vot desat ✅", rpVots: "Vots", rpSenseVots: "Ningú no ha votat.", rpNomesTec: "👀 Resultats en directe: només els veu l'equip tècnic.", rpRegles: "Els reptes són per riure i fer equip, mai per fer mal. Tot queda registrat i els entrenadors ho revisen.", rpProposa: "Proposa un repte", rpPropTxt: "El Jaime el revisarà abans de publicar-lo.", rpPregunta: "La pregunta", rpExemple: "Qui ha estat el/la més fort/a aquesta setmana?", rpQui: "Es vota entre…", rpCompanys: "Companys", rpEntrenadors: "Entrenadors", rpOpcions: "Opcions", rpOps: "Opcions (separades amb ;)", rpOpsEx: "Pizza; Hamburguesa; Sushi", rpEnviar: "Enviar la proposta", rpEnviat: "Enviada ✅ El Jaime la revisarà.", rpPublicat: "Publicat ✅", xatAvis: "Xat del grup. Tot el que s'hi escriu queda registrat i ho poden veure els entrenadors. Respecte sempre: si algú et fa sentir malament, toca ⚠️ o parla amb un entrenador.", xatEscriu: "Escriu un missatge…", xatEnviar: "Enviar", xatBuit: "Encara no hi ha missatges. Saluda! 👋", xatAvisar: "Avisar d'aquest missatge", xatAvisarQ: "Vols avisar els entrenadors d'aquest missatge?", xatSegur: "Avisar? ⚠️", xatAmagar: "Amagar el missatge", xatMostrar: "Tornar a mostrar", xatAmagat: "amagat", pushTit: "Avisos al mòbil", pushQuins: "Què vols que t'avisi?", pushQuinsTxt: "Toca per activar 🔔 o silenciar 🔕 cada tipus d'avís.", pushDesat: "Desat ✅", pushTxt: "Activa'ls i rebràs un avís quan hi hagi una convocatòria nova, el recordatori del wellness o un avís del club.", pushIOS: "A l'iPhone, els avisos només funcionen si l'app està a la pantalla d'inici: toca Compartir ⬆️ › «Afegir a la pantalla d'inici» i obre l'app des d'aquella icona.", pushActivar: "Activar els avisos", pushAraNo: "Ara no", pushNoPerm: "No has donat permís. Si canvies d'opinió, torna-ho a provar des de ☰ › Avisos al mòbil.", pushErr: "No s'han pogut activar. Torna-ho a provar d'aquí a una estona.", pushActiu: "✅ Els avisos estan activats en aquest mòbil.", pushBloq: "Has bloquejat els avisos d'aquesta app. Per activar-los, ves a la configuració del navegador o del mòbil › Notificacions › CN Navàs.", pushNoSup: "Aquest navegador no permet avisos. Prova-ho amb Chrome (Android) o amb l'app afegida a la pantalla d'inici (iPhone).", pushProvar: "Enviar-me un avís de prova", pushProvat: "Fet ✅ T'hauria d'arribar en uns segons.", pushDesactivar: "Desactivar els avisos en aquest mòbil", pushQue: "Els avisos només diuen que hi ha alguna cosa nova (mai dades privades). Si comparteixes el mòbil, en sortir de l'app es desactiven.", pfStaff: "Tu també surts a Equip, a l'apartat de l'equip tècnic. Els nedadors veuran el teu nom i les respostes per conèixer-nos.", eqStaff: "Equip tècnic", pfProva: "👁️ Mode prova: així ho veu un nedador. No es desa res.", pfConeixerTxt: "Una pregunta per casella. Respon les que vulguis.", pfIntro: "Totes les preguntes són opcionals: respon només el que vulguis. Ho pots canviar sempre que vulguis.", pfSecJo: "📏 Sobre tu", pfSecAigua: "🏊 A l'aigua", pfSecTu: "🎯 Com ets i què esperes", pfSecConeixer: "😄 Per conèixer-nos", pfNomesTec: "🔒 Només ho veu l'equip tècnic", pfEquipVeu: "👥 Ho veuran els teus companys a Equip", pfTriaVaries: "Pots triar-ne més d'un.", pfDesar: "Desar el perfil", pfDesat: "Fet ✅ Perfil desat.", pf_alcada: "Alçada (cm)", pf_pes: "Pes (kg)", pf_estilFav: "Estil preferit", pf_prova: "Prova preferida", pf_estilPitjor: "L'estil que menys t'agrada", pf_treball: "El treball que més t'agrada", pf_paraules: "Com et definiries en 3 paraules?", pf_objEsport: "Què esperes del final de temporada a la piscina?", pf_objFora: "I fora de la natació, què t'agradaria aconseguir aquest any?", pf_riure: "Què és el que més et fa riure o gaudir de la natació?", pf_llibre: "Llibre preferit", pf_peli: "Pel·lícula o sèrie preferida", pf_canco: "Cançó o grup preferit", pf_color: "Color preferit", pf_numero: "Número preferit", pf_menjar: "Menjar preferit", pf_superpoder: "Si tinguessis un superpoder, quin seria?", eqTxt: "L'equip! Toca un company o companya per conèixer-lo una mica més.", eqTxtTec: "Nedadors amb compte a l'app. Tu veus també la part privada del perfil.", eqBuit: "Encara no hi ha ningú.", eqTu: "tu", eqSense: "Encara no ha omplert el perfil.", eqRes: "No ha respost les preguntes per conèixer-nos.", eqAct: "Actualitzat:", eq_riure: "Li fa riure", eq_llibre: "Llibre", eq_peli: "Peli o sèrie", eq_canco: "Música", eq_color: "Color", eq_numero: "Número", eq_menjar: "Menjar", eq_superpoder: "Superpoder",
            elMeuPerfil: "El meu perfil", comEtDiem: "Com vols que et diguem?", comEtDiemAj: "Pots posar el teu nom, un mot o com t'agradi (màx. 25 lletres). Només canvia com et saluda l'app.", nomDesat: "Fet ✅ A partir d'ara et direm així.", desarNom: "Desar el nom", canviContra: "Canviar contrasenya",
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
        noCoincideixen: "Les contrasenyes no coincideixen.", contrasenya_admin: "La contrasenya d'administrador ha de tenir com a mínim 12 caràcters.", permis: "No tens permís per fer això.", sense_entreno: "Aquest apartat no està actiu per a tu.", tutor: "Escriu el nom complet del pare, mare o tutor i marca l'autorització.", privacitat: "Cal acceptar la informació de privacitat.", sense_consentiment: "Per fer el wellness a l'app, primer cal el teu permís (menú ☰ › Privacitat).", sense_perfil: "El teu perfil encara no està connectat al wellness. Parla amb el Jaime.", ja_fet: "Ja has fet el wellness d'aquesta sessió. Gràcies!", dades: "Falta alguna resposta. Revisa-ho.", nom_llarg: "Massa llarg: màxim 25 lletres.", ja_votat: "Avui ja has votat. Torna demà!", tancat: "Aquest repte ja està tancat.", massa_propostes: "Ja tens 3 propostes pendents. Espera que el Jaime les revisi.", massa_llarg: "Massa llarg (màxim 300 caràcters).", massa_rapid: "Espera uns segons abans d'enviar un altre missatge."
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
      trPorto: "Lo llevamos nosotros", trLloc: "Nos vemos allí", trNecessita: "Necesita que alguien lo lleve", trSol: "Va por su cuenta", trPortoN: "Me llevan mis padres", trNecessitaN: "Necesito que alguien me lleve", trSolN: "Voy por mi cuenta", convSiN: "✅ Sí, voy", convNoN: "❌ No puedo ir", convVasN: "¿Irás?", convDinarN: "¿Te quedas a comer?",
      convPlaces: "Plazas libres en el coche para otros nadadores", convDinar: "¿Se queda a comer?", dSi: "Sí", dNo: "No",
      convNota: "Nota para Jaime (opcional)", convDesar: "Enviar la respuesta", convCanviar: "Cambiar la respuesta", convDesat: "Hecho ✅ Respuesta enviada. Solo la ve el equipo técnico.",
      convFaltaResp: "Contesta si va, la ida y la vuelta.", convFaltaDinar: "Contesta si se queda a comer.", convProvaAdmin: "Modo prueba (admin): no se ha guardado nada.",
      convPares: "Lo confirmarán tus padres desde su cuenta.", convPerNed: "📣 {n} ha respondido: {r}. Si no estáis de acuerdo, podéis cambiarlo aquí.", convPerPare: "Tus padres han cambiado la respuesta.", convAvisPares: "Tus padres verán tu respuesta.", convNedResp: "📣 {n} ha respondido", convPrivat: "Las respuestas solo las ve el equipo técnico.",
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
      tmManual: "M = cronometraje manual", tecCerca: "Busca un nadador…", wmeu: "Mi wellness", wmTit: "Mi wellness", wmPriv: "🔒 Solo lo ves tú y el equipo técnico. Las respuestas no se pueden cambiar.", wmBuit: "Todavía no hay respuestas de las últimas semanas.", wmSense: "Tu perfil todavía no está conectado al wellness. Habla con Jaime.", wmMissatge: "💬 Mensaje de Jaime", wm4: "Últimas 4 semanas", wmFets: "Wellness hechos", wmSon: "Sueño (media)", wmDesc: "Descanso", wmTrobes: "Cómo te encuentras", wmAigua: "Dureza agua", wmSec: "Dureza seco", wmDolor: "Días con dolor", wmOn: "Dónde te ha dolido", wmDies: "días", wmToca: "Toca un día para ver qué respondiste.", wmLlegB: "Bien", wmLlegR: "Regular", wmLlegM: "Flojo", wmLlegD: "Dolor", wmGraf: "Día a día", wmTecnic: "Para ver el wellness de un nadador, elígelo arriba.", botigaTit: "La tienda del club", botigaTxt: "Ropa y material del Club Natació Navàs: fotos, descripción y tallas. Pronto también podrás hacer pedidos.", botigaObrir: "Abrir la tienda", botigaSense: "Pronto encontrarás aquí el enlace a la tienda.", tecMeu: "tu hijo/a", tmMarques: "Marcas", tmMinimes: "Mínimas", tmMinProx: "Próximamente · Consúltalo con el entrenador.", tmMinCap: "Ahora mismo no hay ninguna competición con mínimas para ti.", tmAssol: "mínimas conseguidas", tmDe: "de", tmMinA: "Mín. 50 m", tmMinB: "Mín. 25 m", tmTeva: "Tú:", tmOk: "✅ ¡Mínima!", tmFalten: "Faltan {s} s", tmSense: "Sin marca", tmSup: "Competición de categoría superior: se compara con el año {a} de la tabla.", tmMarquesDes: "Marcas válidas del {d} al {f}.", tmMinTxt: "Cada marca se compara con la tabla de su piscina. El manual suma 0,29 s (50 m) o 0,19 s (100 m o más).", tmP: "Piscina", tmTxt: "Marcas oficiales de competición. Si falta alguna, habla con Jaime.",
      entrenoTit: "Entreno", sessioCanviada: "Esta sesión se ha actualizado. Vuelve a tocarla.", avuiMin: "Hoy", sessioN: "Sesión", sessioPdf: "Sesión en PDF",
      veureCom: "Ver como…", veientCom: "Viendo como", sortirVC: "Salir", triaPerfil: "Elige un perfil para ver la app como la ve esa persona. Solo para mirar: no se puede cambiar nada.",
      canviObligat: "Elige una contraseña nueva para continuar. En «Contraseña actual» escribe la que te han dado (la provisional). Mínimo 8 caracteres (12 si eres administrador).",
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
comEtDiemEq: "Es el nombre que verán tus compañeros en el apartado Equipo (máx. 25 letras).", calTots: "Todos", cancel: "Cancelar", eqReptes: "Retos", eqXat: "Chat", eqGent: "Equipo", rpBuit: "Todavía no hay ningún reto. ¡Propón uno! 😉", rpObert: "Abierto hasta", rpTancat: "Cerrado", rpTria: "Voto de hoy (1 voto al día hasta que se cierre):", rpConfirma: "Toca otra vez para confirmar el voto de hoy.", rpAvui: "Hoy has votado:", rpDema: "¡Mañana puedes volver a votar!", rpMeus: "Votos que has hecho en este reto", rpPesTec: "(los votos del equipo técnico valen la mitad)", rpCanvia: "Ya has votado. Puedes cambiar el voto hasta que se cierre.", rpVotat: "Voto guardado ✅", rpVots: "Votos", rpSenseVots: "Nadie ha votado.", rpNomesTec: "👀 Resultados en directo: solo los ve el equipo técnico.", rpRegles: "Los retos son para reír y hacer equipo, nunca para hacer daño. Todo queda registrado y los entrenadores lo revisan.", rpProposa: "Propón un reto", rpPropTxt: "Jaime lo revisará antes de publicarlo.", rpPregunta: "La pregunta", rpExemple: "¿Quién ha estado más fuerte esta semana?", rpQui: "Se vota entre…", rpCompanys: "Compañeros", rpEntrenadors: "Entrenadores", rpOpcions: "Opciones", rpOps: "Opciones (separadas con ;)", rpOpsEx: "Pizza; Hamburguesa; Sushi", rpEnviar: "Enviar la propuesta", rpEnviat: "Enviada ✅ Jaime la revisará.", rpPublicat: "Publicado ✅", xatAvis: "Chat del grupo. Todo lo que se escribe queda registrado y lo pueden ver los entrenadores. Respeto siempre: si alguien te hace sentir mal, toca ⚠️ o habla con un entrenador.", xatEscriu: "Escribe un mensaje…", xatEnviar: "Enviar", xatBuit: "Todavía no hay mensajes. ¡Saluda! 👋", xatAvisar: "Avisar de este mensaje", xatAvisarQ: "¿Quieres avisar a los entrenadores de este mensaje?", xatSegur: "¿Avisar? ⚠️", xatAmagar: "Ocultar el mensaje", xatMostrar: "Volver a mostrar", xatAmagat: "oculto", pushTit: "Avisos en el móvil", pushQuins: "¿De qué quieres que te avise?", pushQuinsTxt: "Toca para activar 🔔 o silenciar 🔕 cada tipo de aviso.", pushDesat: "Guardado ✅", pushTxt: "Actívalos y recibirás un aviso cuando haya una convocatoria nueva, el recordatorio del wellness o un aviso del club.", pushIOS: "En el iPhone, los avisos solo funcionan si la app está en la pantalla de inicio: toca Compartir ⬆️ › «Añadir a la pantalla de inicio» y abre la app desde ese icono.", pushActivar: "Activar los avisos", pushAraNo: "Ahora no", pushNoPerm: "No has dado permiso. Si cambias de opinión, vuelve a probarlo desde ☰ › Avisos en el móvil.", pushErr: "No se han podido activar. Vuelve a probarlo dentro de un rato.", pushActiu: "✅ Los avisos están activados en este móvil.", pushBloq: "Has bloqueado los avisos de esta app. Para activarlos, ve a la configuración del navegador o del móvil › Notificaciones › CN Navàs.", pushNoSup: "Este navegador no permite avisos. Pruébalo con Chrome (Android) o con la app añadida a la pantalla de inicio (iPhone).", pushProvar: "Enviarme un aviso de prueba", pushProvat: "Hecho ✅ Te debería llegar en unos segundos.", pushDesactivar: "Desactivar los avisos en este móvil", pushQue: "Los avisos solo dicen que hay algo nuevo (nunca datos privados). Si compartes el móvil, al salir de la app se desactivan.", pfStaff: "Tú también sales en Equipo, en el apartado del equipo técnico. Los nadadores verán tu nombre y las respuestas para conocernos.", eqStaff: "Equipo técnico", pfProva: "👁️ Modo prueba: así lo ve un nadador. No se guarda nada.", pfConeixerTxt: "Una pregunta por casilla. Responde las que quieras.", pfIntro: "Todas las preguntas son opcionales: responde solo lo que quieras. Puedes cambiarlo siempre que quieras.", pfSecJo: "📏 Sobre ti", pfSecAigua: "🏊 En el agua", pfSecTu: "🎯 Cómo eres y qué esperas", pfSecConeixer: "😄 Para conocernos", pfNomesTec: "🔒 Solo lo ve el equipo técnico", pfEquipVeu: "👥 Lo verán tus compañeros en Equipo", pfTriaVaries: "Puedes elegir más de uno.", pfDesar: "Guardar el perfil", pfDesat: "Hecho ✅ Perfil guardado.", pf_alcada: "Estatura (cm)", pf_pes: "Peso (kg)", pf_estilFav: "Estilo preferido", pf_prova: "Prueba preferida", pf_estilPitjor: "El estilo que menos te gusta", pf_treball: "El trabajo que más te gusta", pf_paraules: "¿Cómo te definirías en 3 palabras?", pf_objEsport: "¿Qué esperas del final de temporada en la piscina?", pf_objFora: "Y fuera de la natación, ¿qué te gustaría conseguir este año?", pf_riure: "¿Qué es lo que más te hace reír o disfrutar de la natación?", pf_llibre: "Libro preferido", pf_peli: "Película o serie preferida", pf_canco: "Canción o grupo preferido", pf_color: "Color preferido", pf_numero: "Número preferido", pf_menjar: "Comida preferida", pf_superpoder: "Si tuvieras un superpoder, ¿cuál sería?", eqTxt: "¡El equipo! Toca un compañero o compañera para conocerle un poco más.", eqTxtTec: "Nadadores con cuenta en la app. Tú ves también la parte privada del perfil.", eqBuit: "Todavía no hay nadie.", eqTu: "tú", eqSense: "Todavía no ha rellenado el perfil.", eqRes: "No ha respondido las preguntas para conocernos.", eqAct: "Actualizado:", eq_riure: "Le hace reír", eq_llibre: "Libro", eq_peli: "Peli o serie", eq_canco: "Música", eq_color: "Color", eq_numero: "Número", eq_menjar: "Comida", eq_superpoder: "Superpoder",
            elMeuPerfil: "Mi perfil", comEtDiem: "¿Cómo quieres que te llamemos?", comEtDiemAj: "Puedes poner tu nombre, un mote o lo que te guste (máx. 25 letras). Solo cambia cómo te saluda la app.", nomDesat: "Hecho ✅ A partir de ahora te llamaremos así.", desarNom: "Guardar el nombre", canviContra: "Cambiar contraseña",
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
        noCoincideixen: "Las contraseñas no coinciden.", contrasenya_admin: "La contraseña de administrador debe tener como mínimo 12 caracteres.", permis: "No tienes permiso para hacer esto.", sense_entreno: "Este apartado no está activo para ti.", tutor: "Escribe el nombre completo del padre, madre o tutor y marca la autorización.", privacitat: "Hay que aceptar la información de privacidad.", sense_consentiment: "Para hacer el wellness en la app, primero hace falta tu permiso (menú ☰ › Privacidad).", sense_perfil: "Tu perfil todavía no está conectado al wellness. Habla con Jaime.", ja_fet: "Ya has hecho el wellness de esta sesión. ¡Gracias!", dades: "Falta alguna respuesta. Revísalo.", nom_llarg: "Demasiado largo: máximo 25 letras.", ja_votat: "Hoy ya has votado. ¡Vuelve mañana!", tancat: "Este reto ya está cerrado.", massa_propostes: "Ya tienes 3 propuestas pendientes. Espera a que Jaime las revise.", massa_llarg: "Demasiado largo (máximo 300 caracteres).", massa_rapid: "Espera unos segundos antes de enviar otro mensaje."
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
    pestanya: (function () { try { var q = new URLSearchParams(location.search).get("p"); return ["avui", "setmana", "calendari", "temps", "equip", "wmeu", "assistencia", "botiga"].indexOf(q) >= 0 ? q : "avui"; } catch (e) { return "avui"; } })(),
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
    estat.inici = { nom: r.nom, alies: r.alies || "", rol: r.rol, moduls: r.moduls || {}, avisos: r.avisos || [], wellness: r.wellness || null, sessions: r.sessions || [], faltes: r.faltes || [], fills: r.fills || [], privacitat: r.privacitat || null, botigaUrl: r.botigaUrl || "", pushActiu: !!r.pushActiu };
    escriu("inici", JSON.stringify(estat.inici));
    estat.inici.convs = r.convs || [];   // les convocatòries no es desen al mòbil
  }

  function carregaInici() {
    if (!estat.token) { pantallaAlta(); return; }
    if (estat.veureCom) {
      pinta(el("div", { class: "carrega", text: t("carregant") }));
      crida("inici", { token: estat.token, veureCom: estat.veureCom.id }).then(function (r) {
        if (r.ok) { estat.dadesVC = { nom: r.nom, alies: r.alies || "", rol: r.rol, moduls: r.moduls || {}, avisos: r.avisos || [], convs: r.convs || [], botigaUrl: r.botigaUrl || "" }; pantallaApp(); }
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
        refrescaPush();
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
        el("div", { class: "nom", text: t("hola") + ", " + (d.alies || String(d.nom || "").split(" ")[0]) }),
        el("h1", { text: t(pes) })
      ]),
      el("button", { type: "button", class: "ham", "aria-label": t("menu"), text: "☰", onclick: obreMenu })
    ]);
    var cos = el("div", { class: "cos" });

    if (pes === "avui") {
      var tp = targetaPush(); if (tp) cos.appendChild(tp);
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
        if (veuWmeu(d)) fills.push(el("button", { type: "button", class: "btn3", text: "📈 " + t("wmTit"), onclick: function () { estat.pestanya = "wmeu"; apunta("wmeu"); pantallaApp(); } }));
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
    } else if (pes === "wmeu" && veuWmeu(d)) {
      if (estatModul("wmeu") !== "on") cos.appendChild(el("div", { class: "caixa gris", text: t("ocultModul") }));
      cos.appendChild(vistaWellnessMeu());
    } else if (pes === "botiga" && (estatModul("botiga") === "on" || ((d.rol === "ADMIN" || d.rol === "TECNIC") && estatModul("botiga") !== "no"))) {
      if (estatModul("botiga") !== "on") cos.appendChild(el("div", { class: "caixa gris", text: t("ocultModul") }));
      cos.appendChild(el("div", { class: "caixa botiga" }, [
        el("div", { class: "botiga-ic", "aria-hidden": "true", text: "🛍️" }),
        el("h2", { text: t("botigaTit") }),
        el("p", { class: "gris", text: t("botigaTxt") }),
        d.botigaUrl ? el("a", { href: d.botigaUrl, target: "_blank", rel: "noopener noreferrer", class: "btn", text: t("botigaObrir") })
          : el("div", { class: "gris", text: t("botigaSense") })
      ]));
    } else if (pes === "temps" && (estatModul("temps") === "on" || ((d.rol === "ADMIN" || d.rol === "TECNIC") && estatModul("temps") !== "no"))) {
      if (estatModul("temps") !== "on") cos.appendChild(el("div", { class: "caixa gris", text: t("ocultModul") }));
      cos.appendChild(vistaTemps());
    } else if (pes === "equip" && (estatModul("equip") === "on" || ((d.rol === "ADMIN" || d.rol === "TECNIC") && estatModul("equip") !== "no"))) {
      if (estatModul("equip") !== "on") cos.appendChild(el("div", { class: "caixa gris", text: t("ocultModul") }));
      cos.appendChild(vistaEquipTot());
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
  function datesConv(c) { return c.fi && c.fi !== c.data ? dataLlarga(c.data) + " – " + dataLlarga(c.fi) : dataLlarga(c.data); }
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
      if (r._orig) r = r._orig;   // les vistes tornen a cridar dibuixa amb la còpia filtrada
      var rr = r;
      if (r.fills && r.fills.length > 1) {
        var sel = r.fills.some(function (f) { return f.id === estat.calFill; }) ? estat.calFill : "";
        var noms = {}; r.fills.forEach(function (f) { noms[f.id] = f.nom; });
        cont.appendChild(el("div", { class: "cal-zoom as-sel" }, [{ id: "", nom: t("calTots") }].concat(r.fills).map(function (f) {
          return el("button", { type: "button", class: f.id === sel ? "on" : "", "aria-pressed": f.id === sel ? "true" : "false", text: f.nom, onclick: function () { estat.calFill = f.id; dibuixa(r); } });
        })));
        rr = Object.assign({}, r, { _orig: r, evs: r.evs.filter(function (e) { return !sel || !e.per || e.per.indexOf(sel) >= 0; }).map(function (e) {
          if (sel || !e.per) return e;
          return Object.assign({}, e, { cat: (e.cat ? e.cat + " · " : "") + e.per.map(function (id) { return noms[id] || id; }).join(" + ") });
        }) });
      }
      cont.appendChild(selector(rr));
      if (zoom === "temp") vistaTemp(rr); else if (zoom === "dia") vistaDia(rr); else vistaMes(rr);
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

  // ---------- Selector de nedador per a l'equip tècnic ----------
  var recarregaTec = null;
  function selectorTecnic(r, redibuixa) {
    var actual = (r.nedadors[0] && r.nedadors[0].id) || estat.tecSel;
    var nomA = (r.llista.filter(function (x) { return x.id === actual; })[0] || {}).nom || "—";
    var caixa = el("div", { class: "cal" });
    var obre = !!estat.tecObr;
    caixa.appendChild(el("button", { type: "button", class: "tm-sel", "aria-expanded": obre ? "true" : "false", onclick: function () { estat.tecObr = !obre; redibuixa(); } },
      [el("span", { text: "👤 " + nomA }), el("span", { class: "tm-sel-f", text: obre ? "▴" : "▾" })]));
    if (obre) {
      var cerca = el("input", { type: "search", class: "tec-cerca", placeholder: t("tecCerca"), "aria-label": t("tecCerca") });
      var llista = el("div", { class: "tm-opcions tec-llista", role: "listbox" });
      function omple() {
        llista.textContent = "";
        var q = cerca.value.trim().toLowerCase();
        r.llista.filter(function (x) { return !q || x.nom.toLowerCase().indexOf(q) >= 0; }).forEach(function (x) {
          llista.appendChild(el("button", { type: "button", role: "option", class: "tm-op" + (x.id === actual ? " on" : ""),
            onclick: function () { estat.tecSel = x.id; estat.tecObr = false; if (recarregaTec) recarregaTec(); } },
            [el("span", { text: x.nom }), x.meu ? el("span", { class: "tm-op-n", text: t("tecMeu") }) : null]));
        });
      }
      cerca.addEventListener("input", omple);
      omple();
      caixa.appendChild(cerca);
      caixa.appendChild(llista);
    }
    return caixa;
  }

  // ---------- El meu wellness ----------
  function veuWmeu(d) {
    if (!d || d.rol === "PARE" || (d.wellness && d.wellness.no)) return false;
    var e = estatModul("wmeu");
    return e === "on" || ((d.rol === "ADMIN" || d.rol === "TECNIC") && e !== "no");
  }
  function numW(v) { var n = parseFloat(String(v === undefined ? "" : v).replace(",", ".")); return isNaN(n) ? null : n; }
  function vistaWellnessMeu() {
    var cont = el("div", { class: "cal" }, [el("div", { class: "carrega", text: t("carregant") })]);
    function mitjana(l, k) { var x = l.map(function (o) { return numW(o[k]); }).filter(function (n) { return n !== null; }); return x.length ? x.reduce(function (a, b) { return a + b; }, 0) / x.length : null; }
    function fmt1(n) { return n === null ? "—" : (Math.round(n * 10) / 10).toString().replace(".", ","); }
    function colorDia(o) {
      var v = numW(o.trobes); if (v === null) v = numW(o.arribat);
      if (v === null) return "as-av";
      return v >= 4 ? "as-ok" : (v >= 3 ? "as-t" : "as-no");
    }
    function teDolor(o) { return o.dolor && !/^no/i.test(String(o.dolor)); }
    function dibuixa(r) {
      cont.textContent = "";
      if (!r.ok) { cont.appendChild(el("div", { class: "caixa gris", text: terr(r.error) })); return; }
      if (r.tecnic) { cont.appendChild(el("div", { class: "caixa gris", text: t("wmTecnic") })); return; }
      if (r.llista) cont.appendChild(selectorTecnic({ llista: r.llista, nedadors: r.id ? [{ id: r.id }] : [] }, function () { dibuixa(r); }));
      cont.appendChild(el("div", { class: "gris", text: t("wmPriv") }));
      var rs = r.resums || (r.resum ? [r.resum] : []);
      if (rs.length) {
        var sel = rs.filter(function (x) { return x.mes === estat.wmResum; })[0] || rs[0];
        var nomMes = function (k) { return MESOS[estat.idioma][Number(k.slice(5, 7)) - 1] + " " + k.slice(0, 4); };
        var cx = el("div", { class: "caixa avis" }, [el("div", { class: "tit", text: t("wmMissatge") })]);
        if (rs.length > 1) cx.appendChild(el("div", { class: "wm-mesos" }, rs.map(function (x) {
          return el("button", { type: "button", class: "wm-mes" + (x.mes === sel.mes ? " on" : ""), text: nomMes(x.mes), onclick: function () { estat.wmResum = x.mes; dibuixa(r); } }); })));
        else cx.appendChild(el("div", { class: "gris", text: nomMes(sel.mes) }));
        cx.appendChild(el("div", { class: "txt", text: sel.text }));
        cont.appendChild(cx);
      }
      if (r.sensePerfil) { cont.appendChild(el("div", { class: "caixa gris", text: t("wmSense") })); return; }
      var dies = r.dies || [];
      if (!dies.length) { cont.appendChild(el("div", { class: "caixa gris", text: t("wmBuit") })); return; }
      // Últimes 4 setmanes
      var ara = new Date(), lim = new Date(ara.getTime() - 27 * 864e5);
      var limK = lim.getFullYear() + "-" + ("0" + (lim.getMonth() + 1)).slice(-2) + "-" + ("0" + lim.getDate()).slice(-2);
      var l4 = dies.filter(function (o) { return o.dia >= limK; });
      var ambDolor = l4.filter(teDolor);
      var kpi = [[t("wmFets"), String(l4.length)], [t("wmSon"), fmt1(mitjana(l4, "hores")) + " h"], [t("wmDesc"), fmt1(mitjana(l4, "descansat")) + "/5"],
        [t("wmTrobes"), fmt1(mitjana(l4, "trobes")) + "/5"], [t("wmAigua"), fmt1(mitjana(l4, "duresaAigua")) + "/10"], [t("wmDolor"), String(ambDolor.length)]];
      cont.appendChild(el("h2", { class: "cal-mes", text: t("wm4") }));
      cont.appendChild(el("div", { class: "wm-kpi" }, kpi.map(function (k) { return el("div", { class: "as-n" }, [el("strong", { text: k[1] }), el("span", { class: "gris", text: k[0] })]); })));
      // Gràfics dia a dia (28 dies)
      var dies28 = [];
      for (var i = 27; i >= 0; i--) { var d0 = new Date(ara.getTime() - i * 864e5); dies28.push(d0.getFullYear() + "-" + ("0" + (d0.getMonth() + 1)).slice(-2) + "-" + ("0" + d0.getDate()).slice(-2)); }
      var perDia = {}; dies.forEach(function (o) { perDia[o.dia] = o; });
      var graf = el("div", { class: "caixa" }, [el("h2", { text: t("wmGraf") })]);
      [["hores", t("wmSon"), 10], ["descansat", t("wmDesc"), 5], ["trobes", t("wmTrobes"), 5], ["duresaAigua", t("wmAigua"), 10], ["duresaSec", t("wmSec"), 10]].forEach(function (g) {
        var barres = el("div", { class: "wm-barres", "aria-hidden": "true" });
        dies28.forEach(function (k) {
          var v = perDia[k] ? numW(perDia[k][g[0]]) : null;
          var b = el("span", { class: "wm-b" + (v === null ? " buit" : "") });
          b.style.height = v === null ? "3px" : Math.max(6, Math.min(100, v / g[2] * 100)) + "%";
          barres.appendChild(b);
        });
        graf.appendChild(el("div", { class: "wm-g" }, [el("div", { class: "conv-h" }, [el("span", { text: g[1] }), el("strong", { text: fmt1(mitjana(l4, g[0])) })]), barres]));
      });
      cont.appendChild(graf);
      // On fa mal
      if (ambDolor.length) {
        var zones = {};
        ambDolor.forEach(function (o) { String(o.on || "").split(/\s*,\s*/).filter(Boolean).forEach(function (z) { zones[z] = (zones[z] || 0) + 1; }); });
        var zl = Object.keys(zones).sort(function (a, b) { return zones[b] - zones[a]; });
        if (zl.length) cont.appendChild(el("div", { class: "caixa" }, [el("h2", { text: t("wmOn") })].concat(zl.map(function (z) {
          return el("div", { class: "conv-h" }, [el("span", { text: z }), el("strong", { text: zones[z] + " " + t("wmDies") })]); }))));
      }
      // Calendari
      var mesos = [];
      dies.slice().reverse().forEach(function (o) { var k = o.dia.slice(0, 7); if (mesos.indexOf(k) < 0) mesos.push(k); });
      if (!estat.wmMes || mesos.indexOf(estat.wmMes) < 0) estat.wmMes = mesos[0];
      var mk = estat.wmMes, y = Number(mk.slice(0, 4)), m = Number(mk.slice(5, 7)), ix = mesos.indexOf(mk);
      cont.appendChild(el("div", { class: "cal-nav" }, [
        el("button", { type: "button", class: "cal-fl", "aria-label": "‹", text: "‹", disabled: ix >= mesos.length - 1, onclick: function () { estat.wmMes = mesos[ix + 1]; estat.wmDia = null; dibuixa(r); } }),
        el("strong", { text: MESOS[estat.idioma][m - 1] + " " + y }),
        el("button", { type: "button", class: "cal-fl", "aria-label": "›", text: "›", disabled: ix <= 0, onclick: function () { estat.wmMes = mesos[ix - 1]; estat.wmDia = null; dibuixa(r); } })
      ]));
      var g2 = el("div", { class: "cal-graella" });
      (estat.idioma === "es" ? ["L", "M", "X", "J", "V", "S", "D"] : ["DL", "DT", "DC", "DJ", "DV", "DS", "DG"]).forEach(function (n) { g2.appendChild(el("div", { class: "cal-gcap", text: n })); });
      var off = (new Date(y, m - 1, 1).getDay() + 6) % 7, nd = new Date(y, m, 0).getDate();
      for (var b0 = 0; b0 < off; b0++) g2.appendChild(el("div", { class: "cal-gbuit" }));
      for (var dd = 1; dd <= nd; dd++) (function (dd) {
        var k = mk + "-" + ("0" + dd).slice(-2), o = perDia[k];
        var cel = el("button", { type: "button", class: "cal-gdia " + (o ? colorDia(o) : "") + (k === estat.wmDia ? " sel" : ""), disabled: !o, "aria-label": k,
          onclick: function () { estat.wmDia = k; dibuixa(r); } }, [el("span", { text: String(dd) })]);
        if (o && teDolor(o)) cel.appendChild(el("span", { class: "cal-punt wm-dolor" }));
        g2.appendChild(cel);
      })(dd);
      cont.appendChild(g2);
      cont.appendChild(el("div", { class: "as-lleg gris" }, [["as-ok", t("wmLlegB")], ["as-t", t("wmLlegR")], ["as-no", t("wmLlegM")]].map(function (x) {
        return el("span", {}, [el("span", { class: "as-q " + x[0] }), x[1]]); }).concat([el("span", {}, [el("span", { class: "cal-punt wm-dolor" }), t("wmLlegD")])])));
      var od = estat.wmDia && perDia[estat.wmDia];
      if (od) {
        var det = el("div", { class: "caixa" }, [el("h2", { text: dCurt(od.dia) + " " + MESOS[estat.idioma][Number(od.dia.slice(5, 7)) - 1] })]);
        Object.keys(r.titols || {}).forEach(function (k) {
          if (od[k] === undefined || od[k] === "") return;
          det.appendChild(el("div", { class: "wm-r" }, [el("span", { class: "gris", text: r.titols[k] }), el("strong", { text: String(od[k]) })]));
        });
        cont.appendChild(det);
      } else cont.appendChild(el("div", { class: "gris", text: t("wmToca") }));
    }
    function carrega() {
      crida("wellnessMeu", { token: estat.token, veureCom: estat.veureCom ? estat.veureCom.id : null, idCnn: estat.tecSel || null }).then(function (r) {
        if (estat.pestanya === "wmeu" && cont.isConnected) dibuixa(r);
      });
    }
    recarregaTec = carrega;
    carrega();
    return cont;
  }

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
      var obre = !!estat.tmLlistaObr;
      cont.appendChild(el("button", { type: "button", class: "tm-sel" + (obre ? " obert" : ""), "aria-expanded": obre ? "true" : "false",
        onclick: function () { estat.tmLlistaObr = !obre; dibuixa(r); } }, [el("span", { text: c.nom || c.clau }), el("span", { class: "tm-sel-f", text: obre ? "▴" : "▾" })]));
      if (obre) cont.appendChild(el("div", { class: "tm-opcions", role: "listbox" }, n.minimes.map(function (x) {
        return el("button", { type: "button", role: "option", class: "tm-op" + (x.clau === c.clau ? " on" : ""), "aria-selected": x.clau === c.clau ? "true" : "false",
          onclick: function () { estat.tmComp = x.clau; estat.tmLlistaObr = false; dibuixa(r); } }, [
          el("span", { text: x.nom || x.clau }),
          n.veuProp && x.assolides !== null ? el("span", { class: "tm-op-n", text: x.assolides + "/" + x.proves.length }) : null]);
      })));
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
      if (r.llista) cont.appendChild(selectorTecnic(r, function () { dibuixa(r); }));
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
    function carrega() {
      crida("temps", { token: estat.token, veureCom: estat.veureCom ? estat.veureCom.id : null, idCnn: estat.tecSel || null }).then(function (r) {
        if (estat.pestanya === "temps" && cont.isConnected) dibuixa(r);
      });
    }
    recarregaTec = carrega;
    carrega();
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
      if (r.llista) cont.appendChild(selectorTecnic(r, function () { dibuixa(r); }));
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
    function carrega() {
      crida("assistencia", { token: estat.token, veureCom: estat.veureCom ? estat.veureCom.id : null, idCnn: estat.tecSel || null }).then(function (r) {
        if (estat.pestanya === "assistencia" && cont.isConnected) dibuixa(r);
      });
    }
    recarregaTec = carrega;
    carrega();
    return cont;
  }

  // ---------- Convocatòries ----------
  function clauNom(x) { return String(x || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9]+/g, " ").trim(); }
  function convDe(e) {
    var cs = ((dades() || {}).convs || []).filter(function (c) { return c.data <= e.fi && (c.fi || c.data) >= e.inici; });
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
    var perNed = (dades() || {}).rol === "PARE" ? (c.meus || []).filter(function (m) { return m.resposta && m.resposta.per === "NEDADOR"; }) : [];
    var fills = [
      el("h2", { text: "📣 " + t("convTit") + " · " + c.fase }),
      el("strong", { text: c.nom }),
      el("span", { class: "gris", text: datesConv(c) + (c.sede ? " · " + c.sede : "") + (c.hConv ? " · " + c.hConv : "") }),
      c.noPublicada ? el("span", { class: "gris", text: t("convNoPub") }) : null,
      (c.meus || []).length ? el("span", { class: pendents ? "conv-pend" : "ok", text: pendents ? t("convFalta") : ((c.meus || []).some(function (m) { return m.resposta; }) ? t("convRespost") : "") }) : null,
      perNed.length ? el("span", { class: "conv-pend", text: perNed.map(function (m) { return t("convNedResp").replace("{n}", String(m.nom).split(" ")[0]) + ": " + (m.resposta.va === "Sí" ? t("convSi") : t("convNo")); }).join(" · ") }) : null,
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
    f.push(el("div", { class: "conv-cap" }, [el("span", { class: "conv-fase", text: c.fase }), el("span", { class: "gris", text: datesConv(c) + (c.franja ? " · " + c.franja : "") })]));
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
      else if (m.potRespondre) {
        var rolJo = (dades() || {}).rol, rr = m.resposta;
        if (rr && rolJo === "PARE" && rr.per === "NEDADOR")
          bloc.push(el("div", { class: "caixa avis" }, [el("div", { class: "txt", text: t("convPerNed").replace("{n}", String(m.nom).split(" ")[0]).replace("{r}", rr.va === "Sí" ? t("convSi") : t("convNo")) })]));
        if (rr && rolJo === "NEDADOR" && rr.per === "PARE") bloc.push(el("div", { class: "gris", text: t("convPerPare") }));
        bloc.push(formResposta(c, m));
        if (rolJo === "NEDADOR") bloc.push(el("div", { class: "gris", text: t("convAvisPares") }));
      }
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
    var jo = (dades() || {}).rol === "NEDADOR";
    var tn = function (k) { return jo && T[estat.idioma][k + "N"] ? t(k + "N") : t(k); };
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
      var trs = [["porto", tn("trPorto")], ["lloc", tn("trLloc")], ["necessita", tn("trNecessita")], ["sol", tn("trSol")]];
      caixa.appendChild(el("div", { class: "wq-t", text: tn("convVas") }));
      caixa.appendChild(botons([["si", tn("convSi")], ["no", tn("convNo")]], "va"));
      if (s.va === "si") {
        caixa.appendChild(el("div", { class: "wq-t", text: t("convAnada") })); caixa.appendChild(botons(trs, "anada"));
        caixa.appendChild(el("div", { class: "wq-t", text: t("convTornada") })); caixa.appendChild(botons(trs, "tornada"));
        if (s.anada === "porto" || s.tornada === "porto") {
          caixa.appendChild(el("div", { class: "wq-t", text: t("convPlaces") }));
          var pl = el("div", { class: "conv-places" });
          ["0", "1", "2", "3", "4"].forEach(function (n) { pl.appendChild(el("button", { type: "button", class: "wbtn" + (String(s.places) === n ? " on" : ""), text: n === "4" ? "4+" : n, onclick: function () { s.places = n; dibuixa(); } })); });
          caixa.appendChild(pl);
        }
        if (c.dinar) { caixa.appendChild(el("div", { class: "wq-t", text: tn("convDinar") })); caixa.appendChild(botons([["si", t("dSi")], ["no", t("dNo")]], "dinar")); }
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
      veuWmeu(dades() || {}) ? item("📈", t("wmTit"), function () { estat.pestanya = "wmeu"; apunta("wmeu"); pantallaApp(); }) : null,
      modul("botiga", "🛍️", t("botiga")),
      modul("reunions", "🤝", t("reunio")),
      modul("quotes", "💶", t("quotes")),
      el("hr"),
      estat.veureCom ? item("👁️", t("sortirVC") + " · " + t("veureCom"), surtVeureCom) : null,
      !estat.veureCom && estat.inici && estat.inici.rol === "ADMIN" ? item("👁️", t("veureCom"), pantallaPerfils) : null,
      (!estat.veureCom || (dades() && dades().rol === "NEDADOR")) ? item("🙂", t("elMeuPerfil"), function () { pantallaContrasenya(false); }) : null,
      estat.veureCom ? null : item("🔔", t("pushTit"), pantallaAvisos),
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

  // ---------- El meu perfil ----------
  function desaAliesLocal(al) {
    if (!estat.inici) return;
    estat.inici.alies = al || "";
    try { var cp = {}; for (var k in estat.inici) if (k !== "convs") cp[k] = estat.inici[k]; escriu("inici", JSON.stringify(cp)); } catch (e) {}
  }
  function formPerfil(cont) {
    var prova = !!(estat.veureCom && dades() && dades().rol === "NEDADOR");
    var esNed = (estat.inici && estat.inici.rol === "NEDADOR" && !estat.veureCom) || prova;
    var esStaff = !estat.veureCom && estat.inici && (estat.inici.rol === "ADMIN" || estat.inici.rol === "TECNIC");
    function pinta_(r) {
      cont.textContent = "";
      var camps = (r && r.camps) || {};
      var vals = {}, valsR = {};
      var nm = el("input", { id: "nm", type: "text", autocomplete: "nickname", maxlength: "25" });
      nm.value = (r && r.ok) ? (r.alies || r.nom || "") : ((estat.inici && (estat.inici.alies || String(estat.inici.nom || "").split(" ")[0])) || "");
      cont.appendChild(el("label", { for: "nm", text: t("comEtDiem") }));
      cont.appendChild(el("div", { class: "gris", text: (esNed || esStaff) ? t("comEtDiemEq") : t("comEtDiemAj") }));
      cont.appendChild(nm);

      function text_(k, max, opts) {
        opts = opts || {};
        var inp = el(opts.llarg ? "textarea" : "input", opts.llarg ? { id: "pf-" + k, maxlength: String(max), rows: "3", class: "pf-ta" } : { id: "pf-" + k, type: "text", inputmode: opts.num ? (opts.dec ? "decimal" : "numeric") : null, maxlength: String(max) });
        inp.value = camps[k] || "";
        vals[k] = function () { return inp.value; };
        return [el("label", { for: "pf-" + k, text: t("pf_" + k) }), inp];
      }
      function tria_(k, opcions, multi) {
        var sel = multi ? String(camps[k] || "").split(",").map(function (x) { return x.trim(); }).filter(Boolean) : (camps[k] ? [camps[k]] : []);
        var caixa = el("div", { class: "pf-chips", role: "group", "aria-label": t("pf_" + k) });
        function dib() {
          caixa.textContent = "";
          opcions.forEach(function (o) {
            var on = sel.indexOf(o) >= 0;
            caixa.appendChild(el("button", { type: "button", class: "wm-mes pf-chip" + (on ? " on" : ""), "aria-pressed": on ? "true" : "false", text: o,
              onclick: function () {
                if (multi) { if (on) sel = sel.filter(function (x) { return x !== o; }); else sel.push(o); }
                else sel = on ? [] : [o];
                dib();
              } }));
          });
        }
        dib();
        vals[k] = function () { return sel.join(", "); };
        return [el("label", { text: t("pf_" + k) }), multi ? el("div", { class: "gris", text: t("pfTriaVaries") }) : null, caixa];
      }
      function seccio_(tit, nota, fills) {
        var s = el("div", { class: "pf-sec" }, [el("h2", { text: tit }), el("div", { class: "pf-nota", text: nota })]);
        fills.forEach(function (f) { if (f) s.appendChild(f); });
        cont.appendChild(s);
      }
      var ambR = (esNed || esStaff) && r && r.ok;
      if (ambR && esStaff) cont.appendChild(el("div", { class: "caixa gris", text: t("pfStaff") }));
      if (ambR) {
        if (esNed) {
        if (prova) cont.appendChild(el("div", { class: "caixa avis", text: t("pfProva") }));
        cont.appendChild(el("div", { class: "caixa gris", text: t("pfIntro") }));
        seccio_(t("pfSecJo"), t("pfNomesTec"), [].concat(text_("alcada", 3, { num: 1 }), text_("pes", 5, { num: 1, dec: 1 })));
        seccio_(t("pfSecAigua"), t("pfNomesTec"), [].concat(tria_("estilFav", r.estils || []), text_("prova", 40), tria_("estilPitjor", r.estils || []), tria_("treball", r.treballs || [], true)));
        seccio_(t("pfSecTu"), t("pfNomesTec"), [].concat(text_("paraules", 60), text_("objEsport", 300, { llarg: 1 }), text_("objFora", 300, { llarg: 1 })));
        }
        var resp = camps.r || {};
        var fR = [el("div", { class: "gris", text: t("pfConeixerTxt") })];
        (r.preguntes || []).forEach(function (q) {
          var inp = el("input", { id: "pq-" + q.clau, type: "text", maxlength: "120" });
          inp.value = resp[q.clau] || "";
          valsR[q.clau] = function () { return inp.value; };
          fR.push(el("label", { for: "pq-" + q.clau, text: (q.icona ? q.icona + " " : "") + (estat.idioma === "es" ? q.es : q.ca) }), inp);
        });
        seccio_(t("pfSecConeixer"), t("pfEquipVeu"), fR);
      }
      var errN = el("div", { class: "err", role: "alert" });
      var btN = el("button", { type: "button", class: "btn", text: ambR ? t("pfDesar") : t("desarNom") });
      btN.addEventListener("click", function () {
        if (prova) { errN.className = "err"; errN.textContent = t("pfProva"); return; }
        errN.className = "err"; errN.textContent = "";
        var v = nm.value.replace(/\s+/g, " ").trim();
        if (v.length > 25) { errN.textContent = terr("nom_llarg"); nm.focus(); return; }
        var cs = null, rs = null;
        if (ambR) { if (esNed) { cs = {}; for (var k in vals) cs[k] = vals[k](); } rs = {}; for (var q in valsR) rs[q] = valsR[q](); }
        btN.disabled = true;
        crida("desarPerfil", { token: estat.token, alies: v, camps: cs, respostes: rs }).then(function (x) {
          btN.disabled = false;
          if (x.ok) { desaAliesLocal(x.alies); errN.className = "ok"; errN.textContent = cs ? t("pfDesat") : (rs ? t("pfDesat") : t("nomDesat")); }
          else if (x.error === "sessio") { oblida(); pantallaEntrar(); }
          else { errN.textContent = terr(x.error); }
        });
      });
      cont.appendChild(errN); cont.appendChild(btN);
    }
    if (!esNed && !esStaff) { pinta_(null); return; }
    crida("perfil", { token: estat.token, prova: prova || null }).then(function (r) {
      if (r.error === "sessio") { oblida(); pantallaEntrar(); return; }
      pinta_(r);
    });
  }

  // ---------- Equip interactiu: reptes + xat ----------
  function vistaEquipTot() {
    var cont = el("div", { class: "eq" });
    var tab = estat.eqTab || "reptes";
    var sel = el("div", { class: "cal-zoom" }, [["reptes", "🏆 " + t("eqReptes")], ["xat", "💬 " + t("eqXat")], ["equip", "👥 " + t("eqGent")]].map(function (x) {
      return el("button", { type: "button", class: x[0] === tab ? "on" : "", "aria-pressed": x[0] === tab ? "true" : "false", text: x[1], onclick: function () { estat.eqTab = x[0]; pantallaApp(); } });
    }));
    cont.appendChild(sel);
    if (estat.xatTimer) { clearInterval(estat.xatTimer); estat.xatTimer = null; }
    if (tab === "xat") cont.appendChild(vistaXat());
    else if (tab === "equip") cont.appendChild(vistaEquip());
    else cont.appendChild(vistaReptes());
    return cont;
  }

  function vistaReptes() {
    var cont = el("div", { class: "eq" }, [el("div", { class: "carrega", text: t("carregant") })]);
    function carrega() { crida("equipReptes", { token: estat.token }).then(function (r) { if (r.error === "sessio") { oblida(); pantallaEntrar(); return; } dibuixa(r); }); }
    function dibuixa(r) {
      cont.textContent = "";
      if (!r.ok) { cont.appendChild(el("div", { class: "caixa gris", text: terr(r.error) })); return; }
      if (!r.reptes.length) cont.appendChild(el("div", { class: "caixa gris", text: t("rpBuit") }));
      r.reptes.forEach(function (x) {
        var fills = [el("div", { class: "rp-est", text: x.obert ? "🟢 " + t("rpObert") + " " + x.fi : "🏁 " + t("rpTancat") }), el("h2", { text: x.pregunta })];
        if (x.obert && x.pot) {
          var msg = el("div", { class: "ok", role: "status" });
          var llista = el("div", { class: "pf-chips" });
          x.cand.forEach(function (c) {
            llista.appendChild(el("button", { type: "button", class: "wm-mes pf-chip", text: c.nom, onclick: function (ev) {
              var b = ev.currentTarget;
              if (!b.getAttribute("data-segur")) {   // primer toc: confirmar (només 1 vot al dia)
                Array.prototype.forEach.call(llista.children, function (e) { e.removeAttribute("data-segur"); e.className = "wm-mes pf-chip"; e.textContent = e.getAttribute("data-nom"); });
                b.setAttribute("data-segur", "1"); b.className = "wm-mes pf-chip on"; b.textContent = c.nom + " ✓?"; msg.className = "gris"; msg.textContent = t("rpConfirma"); return;
              }
              Array.prototype.forEach.call(llista.children, function (e) { e.disabled = true; });
              crida("equipVotar", { token: estat.token, repte: x.id, vot: c.k }).then(function (v) {
                if (v.ok) { x.avui = c.k; x.avuiNom = c.nom; x.pot = false; x.meusVots++; dibuixa(r); }
                else { Array.prototype.forEach.call(llista.children, function (e) { e.disabled = false; }); msg.className = "err"; msg.textContent = terr(v.error); }
              });
            } }));
            llista.lastChild.setAttribute("data-nom", c.nom);
          });
          fills.push(el("div", { class: "gris", text: t("rpTria") + (x.staffVot ? " " + t("rpPesTec") : "") }), llista, msg);
        } else if (x.obert) {
          fills.push(el("div", { class: "ok", text: "✅ " + t("rpAvui") + " " + x.avuiNom + ". " + t("rpDema") }));
        }
        if (x.obert && x.meusVots) fills.push(el("div", { class: "gris", text: t("rpMeus") + ": " + x.meusVots }));
        if (x.res) {
          var max = x.res.length ? x.res[0].n : 1;
          if (!x.res.length) fills.push(el("div", { class: "gris", text: t("rpSenseVots") }));
          x.res.forEach(function (o, i) {
            fills.push(el("div", { class: "rp-res" }, [
              el("span", { class: "rp-nom", text: (i === 0 && !x.obert ? "🏆 " : "") + o.nom }),
              el("span", { class: "rp-barra" }, [el("span", { style: "width:" + Math.round(100 * o.n / max) + "%" })]),
              el("span", { class: "rp-n", text: String(o.n) })]));
          });
          if (x.obert) fills.push(el("div", { class: "gris", text: t("rpNomesTec") }));
        }
        cont.appendChild(el("div", { class: "caixa" + (x.obert ? "" : " gris") }, fills));
      });
      if (r.potProposar) cont.appendChild(formProposta(carrega));
      cont.appendChild(el("p", { class: "gris", text: t("rpRegles") }));
    }
    carrega();
    return cont;
  }

  function formProposta(fet) {
    var obert = false;
    var caixa = el("div", { class: "caixa" });
    function pinta() {
      caixa.textContent = "";
      if (!obert) { caixa.appendChild(el("button", { type: "button", class: "btn2", text: "➕ " + t("rpProposa"), onclick: function () { obert = true; pinta(); } })); return; }
      var preg = el("input", { id: "rp-p", type: "text", maxlength: "140", placeholder: t("rpExemple") });
      var tipus = "Companys";
      var ops = el("input", { id: "rp-o", type: "text", maxlength: "300", placeholder: t("rpOpsEx") });
      var lblOps = el("label", { for: "rp-o", text: t("rpOps") });
      var tria = el("div", { class: "pf-chips" });
      function dibTria() {
        tria.textContent = "";
        [["Companys", t("rpCompanys")], ["Entrenadors", t("rpEntrenadors")], ["Opcions", t("rpOpcions")]].forEach(function (o) {
          tria.appendChild(el("button", { type: "button", class: "wm-mes pf-chip" + (tipus === o[0] ? " on" : ""), text: o[1], onclick: function () { tipus = o[0]; dibTria(); lblOps.style.display = ops.style.display = tipus === "Opcions" ? "" : "none"; } }));
        });
      }
      dibTria(); lblOps.style.display = ops.style.display = "none";
      var err = el("div", { class: "err", role: "alert" });
      var bt = el("button", { type: "button", class: "btn", text: t("rpEnviar") });
      bt.addEventListener("click", function () {
        err.className = "err"; err.textContent = "";
        bt.disabled = true;
        crida("equipProposar", { token: estat.token, pregunta: preg.value, tipus: tipus, opcions: ops.value }).then(function (r) {
          bt.disabled = false;
          if (r.ok) { obert = false; pinta(); caixa.appendChild(el("div", { class: "ok", text: r.aprovat ? t("rpPublicat") : t("rpEnviat") })); if (r.aprovat) fet(); }
          else err.textContent = terr(r.error);
        });
      });
      caixa.appendChild(el("h2", { text: "➕ " + t("rpProposa") }));
      caixa.appendChild(el("div", { class: "gris", text: t("rpPropTxt") }));
      [el("label", { for: "rp-p", text: t("rpPregunta") }), preg, el("label", { text: t("rpQui") }), tria, lblOps, ops, err, bt,
       el("button", { type: "button", class: "btn3", text: t("cancel"), onclick: function () { obert = false; pinta(); } })].forEach(function (e) { caixa.appendChild(e); });
    }
    pinta();
    return caixa;
  }

  function vistaXat() {
    var cont = el("div", { class: "eq" });
    var avis = el("div", { class: "caixa avis xat-avis", text: "🔒 " + t("xatAvis") });
    var llista = el("div", { class: "xat-llista", role: "log", "aria-live": "polite" }, [el("div", { class: "carrega", text: t("carregant") })]);
    var inp = el("textarea", { id: "xat-t", class: "pf-ta xat-in", maxlength: "300", rows: "2", placeholder: t("xatEscriu"), "aria-label": t("xatEscriu") });
    var err = el("div", { class: "err", role: "alert" });
    var bt = el("button", { type: "button", class: "btn", text: t("xatEnviar") });
    var darrer = "";
    function hora(ms) { var d = new Date(ms); return nomDia(d.toISOString().slice(0, 10)).split(" ")[0].slice(0, 3) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
    function carrega(baixa) {
      crida("xat", { token: estat.token }).then(function (r) {
        if (r.error === "sessio") { oblida(); pantallaEntrar(); return; }
        if (!r.ok) { llista.textContent = ""; llista.appendChild(el("div", { class: "caixa gris", text: terr(r.error) })); return; }
        var sig = r.msgs.length + "|" + (r.msgs.length ? r.msgs[r.msgs.length - 1].k + "|" + r.msgs.filter(function (m) { return m.amagat; }).length : "");
        if (sig === darrer) return;
        darrer = sig;
        var abaix = baixa || (llista.scrollHeight - llista.scrollTop - llista.clientHeight < 80);
        llista.textContent = "";
        if (!r.msgs.length) llista.appendChild(el("div", { class: "gris", text: t("xatBuit") }));
        r.msgs.forEach(function (m) {
          var accions = null;
          if (r.staff) accions = el("button", { type: "button", class: "xat-acc", "aria-label": m.amagat ? t("xatMostrar") : t("xatAmagar"), text: m.amagat ? "👁️" : "🗑️", onclick: function () {
            crida("xatAmagar", { token: estat.token, k: m.k, amagar: !m.amagat }).then(function () { darrer = ""; carrega(); }); } });
          else if (!m.jo) accions = el("button", { type: "button", class: "xat-acc", "aria-label": t("xatAvisar"), text: "⚠️", onclick: function (ev) {
            var b = ev.currentTarget;
            if (!b.getAttribute("data-segur")) { b.setAttribute("data-segur", "1"); b.textContent = t("xatSegur"); b.className = "xat-acc segur"; return; }
            b.disabled = true;
            crida("xatAvisar", { token: estat.token, k: m.k }).then(function (x) { b.textContent = x.ok ? "✅" : "⚠️"; }); } });
          llista.appendChild(el("div", { class: "xat-m" + (m.jo ? " jo" : "") + (m.staff ? " staff" : "") + (m.amagat ? " amagat" : "") }, [
            el("div", { class: "xat-cap" }, [el("strong", { text: (m.staff ? "🧢 " : "") + (m.jo ? t("eqTu") : m.nom) }), el("span", { class: "gris", text: hora(m.t) + (m.amagat ? " · " + t("xatAmagat") : "") }), accions]),
            el("div", { class: "xat-txt", text: m.text })]));
        });
        if (abaix) llista.scrollTop = llista.scrollHeight;
      });
    }
    bt.addEventListener("click", function () {
      var v = inp.value.trim();
      err.textContent = "";
      if (!v) return;
      bt.disabled = true;
      crida("xatEnviar", { token: estat.token, text: v }).then(function (r) {
        bt.disabled = false;
        if (r.ok) { inp.value = ""; carrega(true); } else err.textContent = terr(r.error);
      });
    });
    cont.appendChild(avis); cont.appendChild(llista); cont.appendChild(inp); cont.appendChild(err); cont.appendChild(bt);
    carrega(true);
    estat.xatTimer = setInterval(function () { if (document.body.contains(llista)) carrega(); else { clearInterval(estat.xatTimer); estat.xatTimer = null; } }, 20000);
    return cont;
  }

  function vistaEquip() {
    var cont = el("div", { class: "eq" }, [el("div", { class: "carrega", text: t("carregant") })]);
    var obert = {};
    var PRIV = ["alcada", "pes", "estilFav", "prova", "estilPitjor", "treball", "paraules", "objEsport", "objFora"];
    function dibuixa(r) {
      cont.textContent = "";
      if (!r.ok) { cont.appendChild(el("div", { class: "caixa gris", text: terr(r.error) })); return; }
      cont.appendChild(el("div", { class: "caixa gris", text: r.tecnic ? t("eqTxtTec") : t("eqTxt") }));
      if (!r.llista.length) { cont.appendChild(el("div", { class: "caixa gris", text: t("eqBuit") })); return; }
      var capStaff = false;
      r.llista.forEach(function (n, i) {
        if (n.staff && !capStaff) { capStaff = true; cont.appendChild(el("h2", { class: "eq-sec", text: "🧢 " + t("eqStaff") })); }
        var linies = [];
        (r.preguntes || []).forEach(function (q) {
          var v = n.r && n.r[q.clau];
          if (v) linies.push(el("div", { class: "eq-l" }, [el("span", { class: "eq-ic", "aria-hidden": "true", text: q.icona || "•" }), el("span", {}, [el("strong", { text: (estat.idioma === "es" ? q.ees : q.eca) + ": " }), el("span", { text: v })])]));
        });
        var priv = [];
        if (r.tecnic) PRIV.forEach(function (k) {
          if (n[k]) priv.push(el("div", { class: "eq-l" }, [el("span", {}, [el("strong", { text: t("pf_" + k) + " " }), el("span", { text: n[k] })])]));
        });
        var obre = !!obert[i];
        var cap = el("button", { type: "button", class: "eq-cap", "aria-expanded": obre ? "true" : "false", onclick: function () { obert[i] = !obre; dibuixa(r); } }, [
          el("span", { class: "eq-nom", text: n.nom + (n.jo ? " · " + t("eqTu") : "") }),
          r.tecnic && n.real ? el("span", { class: "gris eq-real", text: n.real }) : null,
          el("span", { class: "tm-sel-f", text: obre ? "▴" : "▾" })
        ]);
        var cos = null;
        if (obre) {
          cos = el("div", { class: "eq-cos" });
          if (!linies.length && !priv.length) cos.appendChild(el("div", { class: "gris", text: n.fet ? t("eqRes") : t("eqSense") }));
          linies.forEach(function (x) { cos.appendChild(x); });
          if (priv.length) {
            cos.appendChild(el("div", { class: "pf-nota", text: t("pfNomesTec") }));
            priv.forEach(function (x) { cos.appendChild(x); });
          }
          if (r.tecnic && n.actualitzat) cos.appendChild(el("div", { class: "gris", text: t("eqAct") + " " + n.actualitzat }));
        }
        cont.appendChild(el("div", { class: "caixa eq-t" + (n.jo ? " jo" : "") }, [cap, cos]));
      });
    }
    crida("equip", { token: estat.token, veureCom: estat.veureCom ? estat.veureCom.id : null }).then(function (r) {
      if (r.error === "sessio") { oblida(); pantallaEntrar(); return; }
      dibuixa(r);
    });
    return cont;
  }

  // ---------- Notificacions push (Firebase) ----------
  var FB = { apiKey: "AIzaSyAv70MQt1issIzoUJFp-oi2kBe21ldpikQ", authDomain: "cnn-app-aab6a.firebaseapp.com", projectId: "cnn-app-aab6a",
    storageBucket: "cnn-app-aab6a.firebasestorage.app", messagingSenderId: "696295294635", appId: "1:696295294635:web:ba2d65f00c6973a62699ee" };
  var FB_VAPID = "BGa9_-a4L9cmxCPMgmd3QgcQDNjOAIJxj1jEfG_hF3P-RIwuBqyA1Zal7Y-dAYkSehkl704Ae1A74dMX9lUb8hE";
  var FB_SDK = "https://www.gstatic.com/firebasejs/13.4.0/";
  function esIOS() { return /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); }
  function esInstal() { return window.navigator.standalone === true || (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches); }
  function pushEstat() {
    if (!("serviceWorker" in navigator)) return "nosuport";
    if (!("PushManager" in window) || !("Notification" in window)) return (esIOS() && !esInstal()) ? "ios" : "nosuport";
    if (Notification.permission === "denied") return "bloquejat";
    if (Notification.permission === "granted" && llegeix("push")) return "actiu";
    return "inactiu";
  }
  function fbMessaging() {
    return Promise.all([import(FB_SDK + "firebase-app.js"), import(FB_SDK + "firebase-messaging.js")]).then(function (m) {
      var a = m[0].getApps().length ? m[0].getApp() : m[0].initializeApp(FB);
      return { m: m[1], msg: m[1].getMessaging(a) };
    });
  }
  function pushToken() {
    return navigator.serviceWorker.ready.then(function (reg) {
      return fbMessaging().then(function (x) { return x.m.getToken(x.msg, { vapidKey: FB_VAPID, serviceWorkerRegistration: reg }); });
    });
  }
  function nomDispositiu() {
    var ua = navigator.userAgent;
    return esIOS() ? "iPhone/iPad" : (/Android/.test(ua) ? "Android" : (/Windows/.test(ua) ? "Windows" : (/Mac/.test(ua) ? "Mac" : "Altres")));
  }
  function desaPush(tk) {
    return crida("pushGuardar", { token: estat.token, push: tk, disp: nomDispositiu() }).then(function (r) {
      if (r.ok) { escriu("push", tk); escriu("pushData", String(Date.now())); escriu("pushOff", null); if (estat.inici) estat.inici.pushActiu = true; }
      return r;
    });
  }
  function activarPush() {
    return Notification.requestPermission().then(function (perm) {
      if (perm !== "granted") return { ok: false, error: "push_no" };
      return pushToken().then(function (tk) { if (!tk) return { ok: false, error: "push_err" }; return desaPush(tk); });
    }).catch(function () { return { ok: false, error: "push_err" }; });
  }
  function desactivarPush() {
    var tk = llegeix("push");
    escriu("push", null); escriu("pushData", null); escriu("pushOff", "1");
    if (!tk) return Promise.resolve({ ok: true });
    fbMessaging().then(function (x) { return x.m.deleteToken(x.msg); }).catch(function () {});
    return estat.token ? crida("pushTreure", { token: estat.token, push: tk }) : Promise.resolve({ ok: true });
  }
  // Un cop per setmana es renova el token en silenci
  function refrescaPush() {
    try {
      if (estat.veureCom || llegeix("pushOff") || !("Notification" in window) || Notification.permission !== "granted" || !("PushManager" in window)) return;
      // Permís ja donat però el mòbil no recorda el token (p. ex. després de sortir): es torna a registrar en silenci
      if (llegeix("push") && Date.now() - Number(llegeix("pushData") || 0) < 7 * 864e5) return;
      pushToken().then(function (tk) { if (tk) desaPush(tk); }).catch(function () {});
    } catch (e) {}
  }
  function targetaPush() {
    if (estat.veureCom) return null;
    if (estat.inici && estat.inici.pushActiu) return null;   // ja els té activats en algun dispositiu (es poden activar aquí des de ☰ › Avisos)
    var e = pushEstat();
    if (e === "actiu" || e === "nosuport" || e === "bloquejat") return null;
    if (Date.now() - Number(llegeix("pushNo") || 0) < 14 * 864e5) return null;
    var res = el("div", { class: "err", role: "alert" });
    var fills = [el("h2", { text: "🔔 " + t("pushTit") }), el("span", { class: "gris", text: e === "ios" ? t("pushIOS") : t("pushTxt") })];
    if (e === "inactiu") {
      var bt = el("button", { type: "button", class: "btn", text: t("pushActivar") });
      bt.addEventListener("click", function () {
        bt.disabled = true; res.textContent = "";
        activarPush().then(function (r) { bt.disabled = false; if (r.ok) pantallaApp(); else res.textContent = t(r.error === "push_no" ? "pushNoPerm" : "pushErr"); });
      });
      fills.push(bt);
    }
    fills.push(res, el("button", { type: "button", class: "btn3", text: t("pushAraNo"), onclick: function () { escriu("pushNo", String(Date.now())); pantallaApp(); } }));
    return el("div", { class: "caixa" }, fills);
  }
  function pantallaAvisos() {
    var e = pushEstat();
    var res = el("div", { class: "err", role: "alert" });
    var txt = { actiu: t("pushActiu"), inactiu: t("pushTxt"), ios: t("pushIOS"), bloquejat: t("pushBloq"), nosuport: t("pushNoSup") }[e];
    var fills = [el("div", { class: "caixa" + (e === "actiu" ? "" : " gris"), text: txt })];
    function boto(text, cls, fn) { var b = el("button", { type: "button", class: cls, text: text }); b.addEventListener("click", function () { b.disabled = true; res.className = "err"; res.textContent = ""; fn(b); }); return b; }
    if (e === "inactiu") fills.push(boto(t("pushActivar"), "btn", function (b) { activarPush().then(function (r) { b.disabled = false; if (r.ok) pantallaAvisos(); else res.textContent = t(r.error === "push_no" ? "pushNoPerm" : "pushErr"); }); }));
    if (e === "actiu") {
      fills.push(boto(t("pushProvar"), "btn", function (b) {
        crida("pushProva", { token: estat.token }).then(function (r) { b.disabled = false; if (r.ok && r.enviats) { res.className = "ok"; res.textContent = t("pushProvat"); } else res.textContent = t("pushErr"); });
      }));
      fills.push(boto(t("pushDesactivar"), "btn2", function () { desactivarPush().then(function () { pantallaAvisos(); }); }));
    }
    fills.push(res);
    if (e === "actiu" && !estat.veureCom) {
      var pref = el("div", { class: "pf-sec" }, [el("h2", { text: t("pushQuins") }), el("div", { class: "carrega", text: t("carregant") })]);
      fills.push(pref);
      crida("pushPrefs", { token: estat.token }).then(function (r) {
        pref.textContent = "";
        pref.appendChild(el("h2", { text: t("pushQuins") }));
        if (!r.ok || !r.tipus) { pref.appendChild(el("div", { class: "gris", text: terr(r.error) })); return; }
        pref.appendChild(el("div", { class: "gris", text: t("pushQuinsTxt") }));
        var estatT = {};
        r.tipus.forEach(function (x) { estatT[x.k] = x.on; });
        var msg = el("div", { class: "ok", role: "status" });
        function desa() {
          var sil = Object.keys(estatT).filter(function (k) { return !estatT[k]; });
          msg.textContent = "";
          crida("pushPrefsDesar", { token: estat.token, silenciats: sil }).then(function (x) { msg.className = x.ok ? "ok" : "err"; msg.textContent = x.ok ? t("pushDesat") : terr(x.error); });
        }
        r.tipus.forEach(function (x) {
          var b = el("button", { type: "button", class: "pf-tg" + (x.on ? " on" : ""), role: "switch", "aria-checked": x.on ? "true" : "false" }, [
            el("span", { class: "pf-tg-t", text: x.nom }), el("span", { class: "pf-tg-s", "aria-hidden": "true", text: x.on ? "🔔" : "🔕" })]);
          b.addEventListener("click", function () {
            estatT[x.k] = !estatT[x.k];
            b.className = "pf-tg" + (estatT[x.k] ? " on" : ""); b.setAttribute("aria-checked", estatT[x.k] ? "true" : "false");
            b.lastChild.textContent = estatT[x.k] ? "🔔" : "🔕";
            desa();
          });
          pref.appendChild(b);
        });
        pref.appendChild(msg);
      });
    }
    fills.push(el("p", { class: "gris", text: t("pushQue") }));
    pantallaSimple("🔔 " + t("pushTit"), fills);
  }

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
    var blocNom = null;
    if (!obligat) {
      var pc = el("div", { class: "pf" }, [el("div", { class: "carrega", text: t("carregant") })]);
      formPerfil(pc);
      blocNom = [pc, el("h2", { class: "pf-h", text: t("canviContra") })];
      if (estat.veureCom) { pantallaSimple(t("elMeuPerfil"), [pc]); return; }
    }
    var fills = [obligat ? el("div", { class: "caixa", text: t("canviObligat") }) : null];
    if (blocNom) fills = fills.concat(blocNom);
    pantallaSimple(obligat ? t("perfil") : t("elMeuPerfil"), fills.concat([
      el("label", { for: "a", text: t("antiga") }), a,
      el("label", { for: "n", text: t("nova") }), n,
      el("label", { for: "n2", text: t("repeteix") }), n2,
      err, bt
    ]));
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
    try { var pk = llegeix("push"); if (pk && tk) crida("pushTreure", { token: tk, push: pk }); escriu("push", null); escriu("pushData", null); } catch (e) {}
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
    navigator.serviceWorker.addEventListener("message", function (ev) {
      var p = ev.data && ev.data.obre;
      if (p && estat.token && ["avui", "setmana", "calendari", "temps", "equip", "wmeu", "assistencia", "botiga"].indexOf(p) >= 0) { estat.pestanya = p; estat.veureCom = null; estat.dadesVC = null; carregaInici(); }
    });
  }
  if (estat.token) carregaInici(); else pantallaAlta();
})();
