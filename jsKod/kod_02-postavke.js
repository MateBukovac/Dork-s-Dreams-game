//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion
/// <reference path="kod_01-likovi.js"/>

//------------- events -------------
const btnGame=document.getElementById("btnGame");
const gameoverEvent=new Event("gameover");
btnGame.addEventListener("gameover",kraj);

const levelup=new Event("levelup");
btnGame.addEventListener("levelup",prijelaz);


function kraj(ev)
{
  btnStop_click();
  if(Postavke.glavni.zivoti>=1)
  {
    alert("pobjeda");
  }
  else
  {
    alert("izgubili ste");
    setupLevel1();
  }
}

function prijelaz(){
  if(GAME.activeWorldMap.name=="LEVEL_1"){
    alert("Prešli ste prvi level!");
    setupLevel2();
  }
  else if(GAME.activeWorldMap.name=="LEVEL_2"){
    alert("PREŠLI STE IGRICU!");
    setupLevel1();
  }
}

//------------- events -------------
let btnSetupGame = document.getElementById("btnSetupGame");
btnSetupGame.addEventListener("click", setup);


function setup() {

  GAME.clearSprites();

  let odabrana = GAME.activeWorldMap.name;
  GameSettings.output(odabrana);

  switch (odabrana) {
    case "LEVEL_1":
      setupLevel1();
      break;
      case "LEVEL_2":
        setupLevel2();
        break;

    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  }

  render_main();
}

/* LEVELS */

function setupLevel1() {

  btnStop_click();
  GAME.setActiveWorldMap("LEVEL_1");
  GAME.clearSprites();
  GAME.activeWorldMap.setCollisions("platforme");

  Postavke.glavni = new Dino(GAME.getSpriteLayer("lik"));
  Postavke.glavni.start();
  GAME.addSprite(Postavke.glavni);

  let naziv=["pauk1","pauk2", "crv"];
  Postavke.pauk[0]=new Pauk(GAME.getSpriteLayer(naziv[0]),490,15);
  Postavke.pauk[0].visible=true;
  GAME.addSprite(Postavke.pauk[0]);

  Postavke.pauk[1]=new Pauk(GAME.getSpriteLayer(naziv[1]),490,15);
  Postavke.pauk[1].visible=true;
  GAME.addSprite(Postavke.pauk[1]);

  Postavke.neprijatelji[2]=new Neprijatelji(GAME.getSpriteLayer(naziv[2]),590,1220);
  Postavke.neprijatelji[2].visible=true;
  GAME.addSprite(Postavke.neprijatelji[2]);

  let nazivi = ["blok1", "blok2", "blok3", "blok4", "blok5", "blok6"];
  for (let i = 0; i < nazivi.length; i++) {
    const n = nazivi[i];
    Postavke.blokovi[i]= new Blokovi(GAME.getSpriteLayer(n));
    Postavke.blokovi[i].visible = true;
    GAME.addSprite(Postavke.blokovi[i]);
    GAME.activeWorldMap.setCollisions(nazivi[i]);
  }
  GAME.activeWorldMap.setCollisions("platforme");

  let v=["jabuka1", "jabuka2", "jabuka3", "jabuka4"];
  for(i=0;i<v.length;i++){
    const n=v[i];
    Postavke.voce[i]=new Voce(GAME.getSpriteLayer(n));
    Postavke.voce[i].visible=true;
    GAME.addSprite(Postavke.voce[i]);
  }

  let l=["limun"];
  for(i=0;i<l.length;i++){
    const n=l[i];
    Postavke.skok[i]=new Voce(GAME.getSpriteLayer(n));
    Postavke.skok[i].visible=true;
    GAME.addSprite(Postavke.skok[i]);
  }

  Postavke.cilj=new Cilj(GAME.getSpriteLayer("cilj"));
  Postavke.cilj.visible=true;
  GAME.addSprite(Postavke.cilj);
}


function setupLevel2() {

  btnStop_click();
  GAME.setActiveWorldMap("LEVEL_2");
  GAME.clearSprites();
  GAME.activeWorldMap.setCollisions("platforme", "blokovi");

  let z;
  if(Postavke.glavni!=null){
    z=Postavke.glavni.zivoti;
  }
  else{
    z=4;
  }
  
  Postavke.glavni = new Dino(GAME.getSpriteLayer("lik"),z);
  Postavke.glavni.start();
  GAME.addSprite(Postavke.glavni);

  Postavke.projektil = new Projektil(GAME.getSpriteLayer("metak"));
  Postavke.projektil.start();
  GAME.addSprite(Postavke.projektil);

  let naziv=["pauk","pauk2","sismis","pauk1","pauk3","pauk4", "pauk5", "pauk6"];
  Postavke.neprijatelji[0]=new Neprijatelji(GAME.getSpriteLayer(naziv[0]),0,260);
  Postavke.neprijatelji[0].visible=true;
  GAME.addSprite(Postavke.neprijatelji[0]);

  Postavke.neprijatelji[1]=new Neprijatelji(GAME.getSpriteLayer(naziv[1]),1300,1840);
  Postavke.neprijatelji[1].visible=true;
  GAME.addSprite(Postavke.neprijatelji[1]);

  Postavke.neprijatelji[2]=new Neprijatelji(GAME.getSpriteLayer(naziv[2]),485,1800);
  Postavke.neprijatelji[2].visible=true;
  GAME.addSprite(Postavke.neprijatelji[2]);

  Postavke.neprijatelji[3]=new Neprijatelji(GAME.getSpriteLayer(naziv[3]),10,140);
  Postavke.neprijatelji[3].visible=true;
  GAME.addSprite(Postavke.neprijatelji[3]);

  Postavke.neprijatelji[4]=new Neprijatelji(GAME.getSpriteLayer(naziv[4]),445,640);
  Postavke.neprijatelji[4].visible=true;
  GAME.addSprite(Postavke.neprijatelji[4]);

  Postavke.neprijatelji[5]=new Neprijatelji(GAME.getSpriteLayer(naziv[5]),780,1660);
  Postavke.neprijatelji[5].visible=true;
  GAME.addSprite(Postavke.neprijatelji[5]);

  Postavke.neprijatelji[6]=new Neprijatelji(GAME.getSpriteLayer(naziv[6]),900,900);
  Postavke.neprijatelji[6].visible=true;
  GAME.addSprite(Postavke.neprijatelji[6]);

  Postavke.neprijatelji[7]=new Neprijatelji(GAME.getSpriteLayer(naziv[7]),465,630);
  Postavke.neprijatelji[7].visible=true;
  GAME.addSprite(Postavke.neprijatelji[7]);

  let nazivi = ["blok1", "blok2", "blok3", "blok4"];
  for (let i = 0; i < nazivi.length; i++) {
    const n = nazivi[i];
    Postavke.blokovi[i]= new Blokovi(GAME.getSpriteLayer(n));
    Postavke.blokovi[i].visible = true;
    GAME.addSprite(Postavke.blokovi[i]);
    GAME.activeWorldMap.setCollisions(nazivi[i]);
  }
  GAME.activeWorldMap.setCollisions("platforme", "blokovi");

  let v=["voce1", "voce2", "voce3", "voce4"];
  for(i=0;i<v.length;i++){
    const n=v[i];
    Postavke.voce[i]=new Voce(GAME.getSpriteLayer(n));
    Postavke.voce[i].visible=true;
    GAME.addSprite(Postavke.voce[i]);
  }

  Postavke.cilj=new Cilj(GAME.getSpriteLayer("cilj"));
  Postavke.cilj.visible=true;
  GAME.addSprite(Postavke.cilj);
}

