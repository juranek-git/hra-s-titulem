//skripty jednotlivých lokací, texty, tlačítka, souboje, ...

function poz_00() {
  localStorage.hst_save="poz_00";
  central.innerHTML =
    '<h1>Začátek dobrodružství</h1>';
  central.innerHTML +=
    '<p>Tady začíná tvá pouť po světě Všezemě.</p>';
  central.innerHTML +=
    "<input type='button' class='tlacitko' onclick='poz_01();' value='Už se nemůžu dočkat.' id='tl_01'><br>";
}

function poz_01() {
  localStorage.hst_save="poz_01";
  central.innerHTML = 
    "Vzbudil ses ve své rodné chaloupce. Můžeš se podívat, co tu najdeš, nebo se ještě na chvíli natáhnout na postel.<br>";
  central.innerHTML +=
    "<input type='button' class='tlacitko' onclick='poz_02();' value='Kouknu se kolem.' id='tl_02'><br>";
  central.innerHTML +=
    "<input type='button' class='tlacitko' onclick='poz_03();' value='Nejdřív dáme dvacet!' id='tl_03'><br>";
}

function poz_02() {
  localStorage.hst_save="poz_02";
  central.innerHTML = 
    "Vedle dveří je opřená hůl a na polici leží kus starého chleba.<br>";
  central.innerHTML +=
    "<input type='button' class='tlacitko' onclick='poz_05();' value='Vezmu si hůl.' id='tl_05'><br>";
  central.innerHTML +=
    "<input type='button' class='tlacitko' onclick='poz_06();' value='Sním kus chleba.' id='tl_06'><br>";
  central.innerHTML +=
    "<input type='button' class='tlacitko' onclick='poz_10();' value='Nic z toho mě nezajímá, jdu ven.' id='tl_10'><br>";
}

function poz_03() {
  localStorage.hst_save="poz_03";
  central.innerHTML = 
    "Chrrrr ... chrrr ...<br>";
  central.innerHTML +=
    "<br><input type='button' class='tlacitko' onclick='poz_01();' value='Tak to by stačilo, vstáváme!' id='tl_01'><br>";
  central.innerHTML +=
    "<br><input type='button' class='tlacitko' onclick='poz_04();' value='Nerušit, spím dál.' id='tl_04'><br>";
}

function poz_04() {
  localStorage.hst_save="poz_04";
  central.innerHTML = 
    "Chrrrr ... písk ... uhmpf ... chrrr ...<br>";
  central.innerHTML +=
    "<br><input type='button' class='tlacitko' onclick='poz_01();' value='Tak to by stačilo, vstáváme!' id='tl_01'><br>";
  central.innerHTML +=
    "<br><input type='button' class='tlacitko' onclick='poz_03();' value='Nerušit, spím dál.' id='tl_03'><br>";
}

function poz_05() {
  localStorage.hst_save="poz_05";
  central.innerHTML = 
    "Vzal sis hůl. Hezká, pádná, bude se hodit. <br>";
  inv_pridej("Hůl");
  central.innerHTML +=
    "<br><input type='button' class='tlacitko' onclick='poz_10();' value='Jdu ven' id='tl_10'><br>";
}

function poz_06() {
  localStorage.hst_save="poz_06";
  central.innerHTML = 
    "Snědl jsi kus chleba. Je tvrdej jak... jak starej chleba. Schovám si kus na horší časy... <br>";
  inv_pridej("Chleba");
  central.innerHTML +=
    "<br><input type='button' class='tlacitko' onclick='poz_10();' value='Jdu ven' id='tl_10'><br>";
}

function poz_10() {
  localStorage.hst_save="poz_10";
  central.innerHTML = 
    "Konečně venku! Ale kdo se to na tebe žene? Že by to byl tygr? Asi ne, málo pruhů, bude to jen nějaký vzteklý pes.";
  central.innerHTML +=
    "<br><input type='button' class='tlacitko' onclick='boj(\"Vzteklý pes\",6,10,10,7,\"Vlčí zub\",11,10);' value='Bojuj!' id='tl_boj'><br>";
  if (inv_obsahuje2("Chleba")) {
    central.innerHTML +=
      "<br><input type='button' class='tlacitko' onclick='poz_12()' value='Hoď mu chleba!' id='tl_chleba'><br>";
  }

  }

function poz_11() {
  localStorage.hst_save="poz_11";
  central.innerHTML = 
    "<p>Porazil jsi příšeru, která terorizovala celé okolí stovky let. Získáváš královský titul a princeznu za ženu. Gratulují ti všichni tví noví poddaní. Hurá!</p> <h1> <strong>KONEC HRY</h1>";
}

function poz_12() {
  localStorage.hst_save="poz_nn"
  if (!localStorage.hst_pastsklapla) {
    central.innerHTML =
      "šlápl jsi do medvědí pasti";
    var nova_sila = parseInt(localStorage.hst_SIL) -2;
    localStorage.hst_SIL = nova_sila;
    p_SIL.innerHTML = localStorage.hst_SIL;
    localStorage.hst_SILbonus = bonus(localStorage.hst_SIL);
    b_SIL.innerHTML = localStorage.hst_SILbonus;
    localStorage.hst_pastsklapla = true;
    } else {
    central.innerHTML =
      "Tvou nohu pořád ještě svírají čelisti medvědí pasti.";
    } 
}
function poz_nn(){
  central.innerHTML="<p>Ale ne, co se te děje. Svět kolem tebe nějak tmavne. Že by se tak rychle stmívalo? Ale ne, to už se na tebe zubí zubatá. Všechno jednou končí. Někdo se narodí, jiný zemře. Tvým podsledním přáním je, aby někdo z těch narozených dokončil tvé dobrodružtví, abys mohl svůj úkol předat dál.</p>"
  central.innerHTML +=
    "<br><input type='button' class='tlacitko' onclick='zapomenout();' value='Předat úkol' id='tl_zemrit'><br>";
}