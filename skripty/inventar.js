//skripty pro práci s inventářem

if (!localStorage.hst_inv) {
  //inicializace inventáře
  localStorage.hst_inv = "nic";
}

function inv_pridej(item) {
  //přidá prvek do inventáře
  localStorage.hst_inv += ("," + item);
  inv_vypis(); 
}

function pridej() {
  //načítání položek které se mají přidat - pouze pro testování
  inv_pridej(pole_pridej.value );
}

function inv_array() {
  //vytvoří z textového řetězce v inventáři pole
  var inventar = localStorage.hst_inv; //string
  var pole = inventar.split(",");     //array
  return pole;  
}

function inv_vypis() {
  //vypíše prvky inventáře do tabulky
  var pole = inv_array(); //pole položek v inventáři
  i_polozky.innerHTML = "";
  for (i=1;i<pole.length;i++) {
    i_polozky.innerHTML+= pole[i]+"<br>";
  }
}

function inv_vysyp() {
  //vymaže všechny prvnky v inventáři
  localStorage.hst_inv = "nic";
  inv_vypis();
}

function inv_seber(item) {
  //odebere prvek z inventáře
  var pole = inv_array(); //pole položek v inventáři
  if (pole.includes(item) ) {
    var i = pole.indexOf(item);
    pole.splice(i,1);
    localStorage.hst_inv = pole;
    central.innerHTML +=
      "<input type=\"button\" value=\"sebrat "+item+"\" onclick=\"inv_pridej(\'"+item+"'\);\" class=\"tlacitko\">";
  }
  else {
    alert("V inventáři není položka "+item);
  }
  inv_vypis(); 
}

function inv_obsahuje(item) {
  var pole = inv_array();
  for (i=1;i<pole.length;i++) {
    if (pole[i] == item) {
      return true;
    }
  }
  return false;
}

function inv_obsahuje2(item) {
  var pole = inv_array();
  for (i in pole) {
    if (pole[i] == item) {
      return true;
    }
  }
  return false;
}


//pomocné funkce pro testování na stránce test apod

function seber() {
  inv_seber(pole_seber.value );
}