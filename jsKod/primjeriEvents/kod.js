let b = document.getElementById("btnPrvi");

b.addEventListener("click", poruka);

b.addEventListener("click", ispis);

function poruka() {
    alert("Klik!");
}

function ispis(ev) {
    console.log(ev);
}

//---

let myEvent = new Event("pozdrav");

let b2 = document.getElementById("btnDrugi");
b2.addEventListener("pozdrav", ispisPozdrava);

function ispisPozdrava() {
    console.log("Dobar dan");
}

b2.dispatchEvent(myEvent);

//---

const catFound = new CustomEvent('animalfound', {
    detail: {
        name: 'cat'
    }
});
const dogFound = new CustomEvent('animalfound', {
    detail: {
        name: 'dog'
    }
});

b2.addEventListener("animalfound", zivotinja);

function zivotinja(ev) {
    console.log(ev.detail.name);
}

b2.dispatchEvent(catFound);
b2.dispatchEvent(dogFound);

