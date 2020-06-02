//skripty pro soubojové okno

window.onclick = function(event) {
  if (event.target == prekryti) {
    prekryti.style.display = "none";
  }
} 

function boj(potvora_jmeno,
             potvora_hpmax,
             potvora_SIL,
             potvora_OBR,
             potvora_CHY,
             potvora_loot,
             boj_vyhra,
             boj_utek) {
  //vypočítá údaje pro souboj a zobrazí soubojové okno
  var pomtext = "SIL "+potvora_SIL+", OBR "+potvora_OBR+", CHY "+potvora_CHY;
  var pomcislo = Math.floor((potvora_SIL+potvora_OBR)/5);
  var pomtext2 = "<br /><input type='button' class='tlacitko' onclick='prekryti.style.display = \"none\";poz_" + boj_vyhra + "();' value='To beru.'><br />";

  sessionStorage.hst_pjmeno = potvora_jmeno;
  sessionStorage.hst_psil = potvora_SIL;
  sessionStorage.hst_pobr = potvora_OBR;
  sessionStorage.hst_pchy = potvora_CHY;
  sessionStorage.hst_ptext = pomtext;
  sessionStorage.hst_phpmax = potvora_hpmax;
  sessionStorage.hst_phpaktual = potvora_hpmax;
  sessionStorage.hst_ploot = potvora_loot;
  sessionStorage.hst_pxp = pomcislo;
  sessionStorage.hst_vyhra = pomtext2;

  sessionStorage.hst_utoku = 0;
  sessionStorage.hst_obran = 0;
 
  souboj_jmeno.innerHTML = sessionStorage.hst_pjmeno;
  souboj_text.innerHTML = sessionStorage.hst_ptext;
  souboj_hp.innerHTML = "životů: "+sessionStorage.hst_phpaktual+" / "+sessionStorage.hst_phpmax;
  prekryti.style.display = "block";
}

function souboj_utok() {
  var utoku = parseInt(sessionStorage.hst_utoku);
  utoku += 1;
  var energie = Math.pow(2, utoku-1);
  if (energie > parseInt(localStorage.hst_epakt)) {
    souboj_info.innerHTML += "<p>Jsi vyčerpaný, nemůžeš útočit. Zvol obranu nebo odpočinek.</p>";
    return;
  } else {
    zmena_ep(-energie);
  }

  //hráč provádí utok
  sessionStorage.hst_utoku = utoku;
  sessionStorage.hst_obran = 0;
  //sessionStorage.hst_phpaktual -= 1;
  var kolo1 = Math.round(parseInt(localStorage.hst_SILbonus) + Math.random()*6 - parseInt(bonus(sessionStorage.hst_pobr)) - Math.random()*6);
  var kolo2 = Math.round(0-parseInt(localStorage.hst_OBRbonus) - Math.random()*6 + parseInt(bonus(sessionStorage.hst_psil)) + Math.random()*6); 
  
  souboj_info.innerHTML += "<p>";
  if (kolo1>0) {
    sessionStorage.hst_phpaktual -= kolo1;
    souboj_info.innerHTML += "Zasáhl jsi za "+ kolo1 + " HP. ";
  } else {
    souboj_info.innerHTML += "Minul jsi! ";
  }
  if (kolo2>0) {
    zmena_hp(-kolo2);
    souboj_info.innerHTML += "Byl jsi zraněn za "+ kolo2 + " HP. ";
  } else {
    souboj_info.innerHTML += "Uhnul jsi! ";
  }           

  if (sessionStorage.hst_phpaktual <= 0) {
    souboj.innerHTML = "<h3>Zvítězil jsi v boji! </h3> Získáváš:<br>zkušenost: +"+ sessionStorage.hst_pxp + "<br>" + sessionStorage.hst_ploot;
    inv_pridej(sessionStorage.hst_ploot);
    souboj.innerHTML += sessionStorage.hst_vyhra;
  }
  souboj_hp.innerHTML = "životů: "+sessionStorage.hst_phpaktual+" / "+sessionStorage.hst_phpmax;
  souboj.reload(true);
  souboj_info.innerHTML += "</p>"; 
}

function souboj_obrana() {
  var obran = parseInt(sessionStorage.hst_obran);
  obran += 1;
  var energie = obran;
  if (energie > parseInt(localStorage.hst_epakt)) {
    souboj_info.innerHTML += "<p>Jsi vyčerpaný, nemůžeš se bránit. Zvol útok nebo odpočinek.</p>";
    return;
  } else {
    zmena_ep(-energie);
  }

  //hráč se brání
  sessionStorage.hst_utoku = 0;
  sessionStorage.hst_obran = obran;

  var kolo1 = Math.round(parseInt(localStorage.hst_SILbonus) + Math.random()*3 - parseInt(bonus(sessionStorage.hst_pobr)) - Math.random()*6);
  var kolo2 = Math.round(0-parseInt(localStorage.hst_OBRbonus) - Math.random()*12 + parseInt(bonus(sessionStorage.hst_psil)) + Math.random()*6); 

  souboj_info.innerHTML += "<p>";
  if (kolo1>0) {
    sessionStorage.hst_phpaktual -= kolo1;
    souboj_info.innerHTML += "Protiútok zasáhl za "+ kolo1 + " HP. ";
  } else {
    souboj_info.innerHTML += "Bráníš se. ";
  }
  if (kolo2>0) {
    zmena_hp(-kolo2);
    souboj_info.innerHTML += "Byl jsi zraněn za "+ kolo2 + " HP. ";
  } else {
    souboj_info.innerHTML += "Uhnul jsi! ";
  }            
  
  if (sessionStorage.hst_phpaktual <= 0) {
    souboj.innerHTML = "<h3>Zvítězil jsi v boji! </h3> Získáváš:<br>zkušenost: +"+ sessionStorage.hst_pxp + "<br>" + sessionStorage.hst_ploot;
    inv_pridej(sessionStorage.hst_ploot);
    souboj.innerHTML += sessionStorage.hst_vyhra;
  }
  souboj_hp.innerHTML = "životů: "+sessionStorage.hst_phpaktual+" / "+sessionStorage.hst_phpmax;
  souboj_info.innerHTML += "</p>";
  souboj.reload(true); 
}

function souboj_cekani() {
//hráč čeká, obnov energii
zmena_ep(7);
  souboj_info.innerHTML += "<p> Odpočíváš, obnovil jsi energii.";
var kolo2 = Math.round(0-parseInt(localStorage.hst_OBRbonus) - Math.random()*3 + parseInt(bonus(sessionStorage.hst_psil)) + Math.random()*6); 
if (kolo2>0) {
  zmena_hp(-kolo2);
  souboj_info.innerHTML += "Byl jsi zraněn za "+ kolo2 + " HP. ";
} else {
  souboj_info.innerHTML += "Uhnul jsi! ";
}  
souboj_info.innerHTML += "</p>";
souboj.reload(true); 
}

function souboj_utek() {
  alert("Z boje se neutíká, zbabělče!");
}

function testsouboj() {
  var h = testpotvora.value.split(",");
  boj(h[0],h[1],h[2],h[3],h[4],h[5],h[6],h[7]);
}