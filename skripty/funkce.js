function nacteno() {
  //akce po načtení stránky
  if (!localStorage.hst_postava_hotova) {
    //pokud žádná postava není uložena zapíšu otazníky do tabulky nebo ji schovám - není potřeba oboje
    p_jmeno.innerHTML = "Tvoje postava";
    p_SIL.innerHTML = "?";
    p_OBR.innerHTML = "?";
    p_CHY.innerHTML = "?";
    b_CHY.innerHTML = "?";
    b_SIL.innerHTML = "?";
    b_OBR.innerHTML = "?";
    p_povolani.innerHTML = "?";
    //tabulka_postava.style.visibility = "hidden";
  } else {
    //nějaká postava už je uložena, nabídka nové postavy nebo začátku hry
    central.innerHTML =  
      '<h1> Intro </h1>';
    central.innerHTML += 
      '<p> Postavu už máš, tak vzhůru za dobrodružstvím!</p>';  
    central.innerHTML += 
      '<input type="button" value="To nejsem já! (nová postava)" onclick="zapomenout()" class="tlacitko">';
    if (!localStorage.hst_save) {localStorage.hst_save="poz_00";}
    central.innerHTML += 
      '<input type="button" value="OK, pokračujem!" onclick="'+localStorage.hst_save+'()" class="tlacitko">';
  }  
  //vykreslení avatara
  if (!localStorage.hst_avatar) {
    p_avatar.innerHTML = '<img src="../img/prazdny.png">';
  } else {
    p_avatar.innerHTML = '<img src="../img/'+localStorage.hst_avatar+'.png">';
  }
  
}

function tvorba_postavy() {
  //základní info k vlastnostem postavy
  central.innerHTML =  
    '<h1> Tvorba postavy </h1>';
  central.innerHTML += 
    '<p> Co zvládneš a co ne ovlivňují tři základní vlastnosti: </p><ul><li>Síla - útok, odolnost, počet životů, ...</li><li>Obratnost - obrana, lukostřelba, pasti, ... </li><li>Chytrost - kouzla, přesvědčování, ...</li></ul>';
  central.innerHTML += 
    '<p> Tvé vlastnosti ti určil při narození osud. Zjisti jak jsi silný, obratný a chytrý!</p>';  
  central.innerHTML += 
    '<input type="button" value="Poznat svůj osud" onclick="tvorba_jmeno()" class="tlacitko">';  
  localStorage.hst_SIL = Math.floor(Math.random()*8+6);
  localStorage.hst_OBR = Math.floor(Math.random()*8+6);
  localStorage.hst_CHY = Math.floor(Math.random()*8+6);
}

function tvorba_jmeno() {
//výpis do tabulky z tvorba_postavy()
  p_SIL.innerHTML = localStorage.hst_SIL;
  p_OBR.innerHTML = localStorage.hst_OBR;
  p_CHY.innerHTML = localStorage.hst_CHY;
//formulář na jméno a pohlaví
  central.innerHTML =  
    '<h2> Tvorba postavy - jméno </h2>';
  central.innerHTML += 
    '<p> Své základní vlastnosti vidíš v tabulce vlevo, ale ještě zbývá zjistit pár drobností o tvém původu.</p>';
  central.innerHTML += 
    '<p> První důležitá otázka: Jak se jmenuješ?</p>';
  central.innerHTML += 
    '<input type="text" oninput="localStorage.hst_jmeno=this.value;"><br><br>';
  central.innerHTML += 
    '<input type="radio" name="pohlavi" value="M">&nbsp;Muž (síla +1)<br>';
  central.innerHTML += 
    '<input type="radio" name="pohlavi" value="Z">&nbsp;Žena (obratnost +1)<br><br>';
  central.innerHTML += 
    '<input type="button" value="Pokračovat" onclick="tvorba_rasa()" class="tlacitko">';
}

function tvorba_rasa() {
//zpracování dat z tvorba_jmeno()
    var sil = parseInt(localStorage.hst_SIL);
    var obr = parseInt(localStorage.hst_OBR);
    var fpohlavi=document.getElementsByName("pohlavi"); //pole hodnot fpohlavi=[value="M"; value="Z"]
    var pohlavi="";
    for (var i=0; i<fpohlavi.length; i++) {
      if (fpohlavi[i].checked) {   //zatrženo Muž -> ok
        pohlavi=fpohlavi[i].value; //pohlavi="M"
        localStorage.hst_pohlavi = pohlavi;
      }
    }
    if (pohlavi=="M") {
      sil += 1;
    } else if (pohlavi == "Z") {
      obr +=1;
    } else {
      alert("Vyber pohlaví!");
      this.call(tvorba_jmeno());
    }
  
  localStorage.hst_SIL = sil;
  localStorage.hst_OBR = obr;
  
//výpis do tabulky
  p_jmeno.innerHTML = localStorage.hst_jmeno;
  p_SIL.innerHTML = localStorage.hst_SIL;
  p_OBR.innerHTML = localStorage.hst_OBR;
  p_CHY.innerHTML = localStorage.hst_CHY;
//formulář na rasu
  central.innerHTML =  
    '<h2> Tvorba postavy - rasa </h2>';
  central.innerHTML += 
    '<p> Ke kterému z národů Všezemě patříš?</p>';
  central.innerHTML += 
    '<input type="radio" name="rasa" value="clovek_horal">&nbsp;Člověk - horal (síla +1)<br>';
  central.innerHTML += 
    '<input type="radio" name="rasa" value="clovek_vesnican">&nbsp;Člověk - vesničan (obratnost +1)<br>';
  central.innerHTML += 
    '<input type="radio" name="rasa" value="clovek_mestan">&nbsp;Člověk - měšťan (chytrost +1)<br><br>';
  central.innerHTML += 
    '<input type="radio" name="rasa" value="barbar">&nbsp;Barbar (síla +3, obratnost -1, chytrost -1)<br><br>';
  central.innerHTML += 
    '<input type="radio" name="rasa" value="elf_svetly">&nbsp;Světlý elf (síla -1, chytrost +2)<br>';
  central.innerHTML += 
    '<input type="radio" name="rasa" value="elf_lesni">&nbsp;Lesní elf (síla -1, obratnost +2)<br><br>';
  central.innerHTML += 
    '<input type="radio" name="rasa" value="trp_horsky">&nbsp;Horský trpaslík (síla +2, chytrost -1)<br>';
  central.innerHTML += 
    '<input type="radio" name="rasa" value="trp_cerveny">&nbsp;Červený trpaslík (síla +2, obratnost -1)<br><br>';
  central.innerHTML += 
    '<input type="radio" name="rasa" value="dzin">&nbsp;Džin (síla -1, obratnost-1, chytrost +3)<br><br>';
  central.innerHTML += 
    '<input type="radio" name="rasa" value="faun">&nbsp;Faun (síla -1, obratnost +3, chytrost -1)<br><br>';            
  central.innerHTML += 
    '<input type="button" value="Pokračovat" onclick="tvorba_povolani()" class="tlacitko">';
}

function tvorba_povolani() {
//zpracování dat z tvorba_rasa()
    var sil = parseInt(localStorage.hst_SIL);
    var obr = parseInt(localStorage.hst_OBR);
    var chy = parseInt(localStorage.hst_CHY);
    var frasa=document.getElementsByName("rasa");
    var rasa="";
    for (var i=0; i<frasa.length; i++) {
      if (frasa[i].checked) {
        rasa=frasa[i].value;
      }
    }
    if (rasa=="clovek_horal") {
      sil += 1;
      localStorage.hst_rasa = "člověk";
      localStorage.hst_skin = "black";
    } else if (rasa=="clovek_vesnican") {
      obr += 1;
      localStorage.hst_rasa = "člověk";
      localStorage.hst_skin = "brown";
    } else if (rasa=="clovek_mestan") {
      chy += 1;
      localStorage.hst_rasa = "člověk";
      localStorage.hst_skin = "white";
    } else if (rasa=="barbar") {
      sil += 3; obr -= 1; chy -= 1;
      localStorage.hst_rasa = "barbar";
      localStorage.hst_skin = "brown";
    } else if (rasa=="elf_svetly") {
      sil -= 1; chy += 2;
      localStorage.hst_rasa = "elf";
      localStorage.hst_skin = "white";
    } else if (rasa=="elf_lesni") {
      sil -= 1; obr +=2;
      localStorage.hst_rasa = "elf";
      localStorage.hst_skin = "red";
    } else if (rasa=="trp_horsky") {
      sil += 2; chy -= 1;
      localStorage.hst_rasa = "trpaslík";
      localStorage.hst_skin = "black";
    } else if (rasa=="trp_cerveny") {
      sil += 2; obr -= 1;
      localStorage.hst_rasa = "trpaslík";
      localStorage.hst_skin = "red";
    } else if (rasa=="dzin") {
      sil -= 1; obr -= 1; chy += 3;
      localStorage.hst_rasa = "džin";
      localStorage.hst_skin = "red";
    } else if (rasa=="faun") {
      sil -= 1; obr += 3; chy -= 1;
      localStorage.hst_rasa = "faun";
      localStorage.hst_skin = "brown";
    } else {
      alert("Rasa nevybrána - osud ti určil být člověkem (bez bonusu)");
      localStorage.hst_rasa = "člověk ";
      localStorage.hst_skin = "blue";
    }
  
    localStorage.hst_SIL = sil;
    localStorage.hst_OBR = obr;
    localStorage.hst_CHY = chy;

//výpis do tabulky
  p_povolani.innerHTML = localStorage.hst_rasa;
  p_SIL.innerHTML = localStorage.hst_SIL;
  p_OBR.innerHTML = localStorage.hst_OBR;
  p_CHY.innerHTML = localStorage.hst_CHY;
//formulář na povolání
  central.innerHTML =  
    '<h2> Tvorba postavy - povolání </h2>';
  central.innerHTML += 
    '<p> Jaké povolání si zvolíš?</p>';
  central.innerHTML += 
    '<input type="radio" name="povolani" value="válečník">&nbsp;Válečník (síla +3)<br>';
  central.innerHTML += 
    '<input type="radio" name="povolani" value="bojovník">&nbsp;Bojovník (síla +2, obratnost+1)<br>';
  central.innerHTML += 
    '<input type="radio" name="povolani" value="rytíř">&nbsp;Rytíř (síla +2, chytrost +1)<br><br>';
  central.innerHTML += 
    '<input type="radio" name="povolani" value="hraničář">&nbsp;Hraničář (síla +1, obratnost +2)<br>';
  central.innerHTML += 
    '<input type="radio" name="povolani" value="lovec">&nbsp;Lovec (obratnost +3)<br>';
  central.innerHTML += 
    '<input type="radio" name="povolani" value="druid">&nbsp;Druid (obratnost +2, chytrost +1)<br><br>';
  central.innerHTML += 
    '<input type="radio" name="povolani" value="alchymista">&nbsp;Alchymista (síla +1, chytrost +2)<br>';
  central.innerHTML += 
    '<input type="radio" name="povolani" value="léčitel">&nbsp;Léčitel (obratnost +1, chytrost +2)<br>';
  central.innerHTML += 
    '<input type="radio" name="povolani" value="kouzelník">&nbsp;Kouzelník (chytrost +3)<br><br>';
  central.innerHTML += 
    '<input type="button" value="Pokračovat" onclick="tvorba_trenink()" class="tlacitko">';
}

function tvorba_trenink() {
//zpracování dat z tvorba_povolani()
    var sil = parseInt(localStorage.hst_SIL);
    var obr = parseInt(localStorage.hst_OBR);
    var chy = parseInt(localStorage.hst_CHY);
    var fpovolani=document.getElementsByName("povolani");
    var povolani="";
    for (var i=0; i<fpovolani.length; i++) {
      if (fpovolani[i].checked) {
        povolani=fpovolani[i].value;
        localStorage.hst_povolani = povolani;
      }
    }
    if (povolani=="válečník") {
      sil += 3;
      localStorage.hst_avatar = "valecnik";
    } else if (povolani=="bojovník") {
      sil += 2; obr += 1;
      localStorage.hst_avatar = "valecnik";
    } else if (povolani=="rytíř") {
      sil += 2; chy += 1;
      localStorage.hst_avatar = "valecnik";
    } else if (povolani=="hraničář") {
      sil += 1; obr += 2;
      localStorage.hst_avatar = "hranicar";
    } else if (povolani=="lovec") {
      obr += 3;
      localStorage.hst_avatar = "hranicar";
    } else if (povolani=="druid") {
      obr += 2; chy +=1;
      localStorage.hst_avatar = "hranicar";
    } else if (povolani=="alchymista") {
      sil += 1; chy +=2;
      localStorage.hst_avatar = "kouzelnik";
    } else if (povolani=="léčitel") {
      obr += 1; chy += 2;
      localStorage.hst_avatar = "kouzelnik";
    } else if (povolani=="kouzelník") {
      chy += 3;
      localStorage.hst_avatar = "kouzelnik";
    } else {
      alert("Povolání nevybráno - je z tebe žebrák (postih k vlastnostem -2)");
      sil -= 2; obr -= 2; chy -= 2;
      localStorage.hst_povolani = "žebrák";
      localStorage.hst_avatar = "zebrak";
    }
    if (localStorage.hst_pohlavi == "Z") {
      localStorage.hst_avatar += "w";
    }
  localStorage.hst_SIL = sil;
  localStorage.hst_OBR = obr;
  localStorage.hst_CHY = chy;
  
//výpis do tabulky
  p_povolani.innerHTML += " " + localStorage.hst_povolani;
  p_SIL.innerHTML = localStorage.hst_SIL;
  p_OBR.innerHTML = localStorage.hst_OBR;
  p_CHY.innerHTML = localStorage.hst_CHY;
//formulář na trénink
  central.innerHTML =  
    '<h2> Tvorba postavy - vlastnosti </h2>';
  central.innerHTML += 
    '<p> Kterou svou vlastnost jsi trénoval nejvíc?</p>';
  central.innerHTML += 
    '<input type="radio" name="trenink" value="SIL">&nbsp;Sílu (síla +2)<br>';
  central.innerHTML += 
    '<input type="radio" name="trenink" value="OBR">&nbsp;Obratnost (obratnost +2)<br>';
  central.innerHTML += 
    '<input type="radio" name="trenink" value="CHY">&nbsp;Chytrost (chytrost +2)<br><br>';
  central.innerHTML += 
    '<input type="button" value="Hotovo!" onclick="osud()" class="tlacitko">';
}

function bonus(stat) {
  if (stat > 9) {
    return "+"+ Math.round(Math.abs(stat-11)/2-0.1);
  } else {
    return 0-Math.round(Math.abs(stat-11)/2-0.1);
  }
}

function osud() {
//zpracování dat z tvorba_trenink()
    var sil = parseInt(localStorage.hst_SIL);
    var obr = parseInt(localStorage.hst_OBR);
    var chy = parseInt(localStorage.hst_CHY);
    var ftrenink=document.getElementsByName("trenink");
    var trenink="";
    for (var i=0; i<ftrenink.length; i++) {
      if (ftrenink[i].checked) {
        trenink=ftrenink[i].value;;
      }
    }
    if (trenink=="SIL") {
      sil += 2;
    } else if (trenink=="OBR") {
      obr += 2;
    } else if (trenink=="CHY") {
      chy += 2;
    } else {
      alert("Netrénoval jsi nic (bez bonusu)");
    }
  
  localStorage.hst_SIL = sil;
  localStorage.hst_OBR = obr;
  localStorage.hst_CHY = chy;
  
  
//výpočet bonusů
  p_povolani.innerHTML += " " + localStorage.hst_povolani;
  localStorage.hst_SILbonus = bonus(sil);
  localStorage.hst_OBRbonus = bonus(obr);
  localStorage.hst_CHYbonus = bonus(chy);
//výpočet hodnot hp, mp, ep
  localStorage.hst_hpmax = 10 + Math.floor(Math.random()*6) + parseInt(localStorage.hst_SILbonus);
  localStorage.hst_hpakt = localStorage.hst_hpmax;
  localStorage.hst_mpmax = 10 + Math.floor(Math.random()*6) + parseInt(localStorage.hst_CHYbonus);
  localStorage.hst_mpakt = localStorage.hst_mpmax;
  localStorage.hst_epmax = 10 + Math.floor(Math.random()*6) + parseInt(localStorage.hst_OBRbonus);
  localStorage.hst_epakt = localStorage.hst_epmax;
  //zapamatuji si, že postava už je vytvořena a obnovím stránku
  localStorage.hst_postava_hotova="true";
  location.reload(true);  
}

function zapomenout() {
  //vymazání obsahu úložiště a obnovení stránky
  localStorage.clear();
  location.reload(true);
}

function nastav_ulozeni() {
  //TEST pole pro přechod na konkrétní lokaci.
  var poz = testlokace.value;
  localStorage.hst_save = poz;
}

function hptest() {
  //TEST funkce pro nastavení hodnot HP
  var hodnota = parseInt(testhodnota.value);
  zmena_hp(hodnota);
  zmena_mp(hodnota);
  zmena_ep(hodnota);
}

function zmena_hp(hodnota) {
  //zkontroluje, jestli změna HP nepřesáhne maximum nebo nezpůsobí smrt
  //vykreslí a vypíše hodnotu HP do tabulky
  var hpakt=parseInt(localStorage.hst_hpakt);
  var hpmax=parseInt(localStorage.hst_hpmax);
  //alert("Měním HP "+hodnota);
  if(hpakt+hodnota>hpmax) {
    hpakt=hpmax;
    localStorage.hst_hpakt = hpakt;
  } else if (hpakt+hodnota<=0) {
    hpakt=0;
    localStorage.hst_hpakt = 0;
    smrt();
  } else {
    hpakt+=hodnota;
    localStorage.hst_hpakt = hpakt;
  }
  var zobraz=(hpakt/hpmax)*100; //poměr životů v procentech
  hp_bar.style.width=zobraz.toString()+"%"; //například na "75%"
  //alert(zobraz.toString()+"%");
  hp_bar.innerHTML = "&nbsp;HP&nbsp;"+localStorage.hst_hpakt+"/"+localStorage.hst_hpmax;
}

function zmena_mp(hodnota) {
  //zkontroluje, jestli změna MP nepřesáhne maximum, neměla by se snížit pod nulu
  //vykreslí a vypíše hodnotu MP do tabulky
  var mpakt=parseInt(localStorage.hst_mpakt);
  var mpmax=parseInt(localStorage.hst_mpmax);
  if(mpakt+hodnota>mpmax) {
    mpakt=mpmax;
    localStorage.hst_mpakt = mpakt;
  } else if (mpakt+hodnota<=0) {
    mpakt=0;
    localStorage.hst_mpakt = 0;
    alert("Málo many");
  } else {
    mpakt+=hodnota;
    localStorage.hst_mpakt = mpakt;
  }
  var zobraz=(mpakt/mpmax)*100;
  mp_bar.style.width=zobraz.toString()+"%";
  mp_bar.innerHTML = "&nbsp;MP&nbsp;"+localStorage.hst_mpakt+"/"+localStorage.hst_mpmax;
}

function zmena_ep(hodnota) {
  //zkontroluje, jestli změna EP nepřesáhne maximum, neměla by se snížit pod nulu
  //vykreslí a vypíše hodnotu EP do tabulky
  var epakt=parseInt(localStorage.hst_epakt);
  var epmax=parseInt(localStorage.hst_epmax);
  if(epakt+hodnota>epmax) {
    epakt=epmax;
    localStorage.hst_epakt = epakt;
  } else if (epakt+hodnota<0) {
    epakt=0;
    localStorage.hst_epakt = 0;
    alert("Málo skillu");
  } else {
    epakt+=hodnota;
    localStorage.hst_epakt = epakt;
  }
  var zobraz=(epakt/epmax)*100;
  ep_bar.style.width=zobraz.toString()+"%";
  ep_bar.innerHTML = "&nbsp;EP&nbsp;"+localStorage.hst_epakt+"/"+localStorage.hst_epmax;
}

function smrt(){
  //sníží HP na nulu a oznámí konec hry
  localStorage.hst_hpakt = 0;
  alert("To je konec...");
  central.innerHTML = "<h1> Konec </h1><p>Na své cestě k titulu jsi bídně zhynul.</p>";
}
