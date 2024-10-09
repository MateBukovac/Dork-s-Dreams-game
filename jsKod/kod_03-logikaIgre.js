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
/// <reference path="kod_02-postavke.js"/>

/**
 * Promjena stanja likova - interakcije
 */

function update_main() {

  if (GAME.activeWorldMap.name == "LEVEL_1")
    LEVEL_1();
  else if (GAME.activeWorldMap.name == "LEVEL_2"){
    LEVEL_2();
  }
  
  GAME.update();
};

function LEVEL_1() {
  
  if (SENSING.left.active) {
    Postavke.glavni.moveLeft();

    for(i=0;i<Postavke.blokovi.length;i++)
    {
      if(Postavke.glavni.touching(Postavke.blokovi[i]))
      {
        if(SENSING.keyA.active){
          Postavke.blokovi[i].moveLeft();
        }
      }
    }
  }

  if (SENSING.right.active) {
    Postavke.glavni.moveRight();

    for(i=0;i<Postavke.blokovi.length;i++)
    {
      if(Postavke.glavni.touching(Postavke.blokovi[i]))
      {
        if(SENSING.keyA.active){
          Postavke.blokovi[i].moveRight();
        }
      }
    }
  }

  if (SENSING.up.active) {
    for(i=0;i<Postavke.skok.length;i++){
      let j=Postavke.skok[i];
      if(Postavke.glavni.touching(j)){
        //j.visible=false;
        Postavke.glavni.jump(150);
      }
    }
    Postavke.glavni.jump();
  }

  if(Postavke.cilj!=null){
    if(Postavke.glavni.touching(Postavke.cilj)){
      if(Postavke.glavni.stanje()==true){
        btnGame.dispatchEvent(levelup);
      }
      else{
        GameSettings.output("Morate skupiti svo voće da bi prešli level!");
      }
    }
  }

  for(i=0;i<Postavke.pauk.length;i++){
    let j=Postavke.pauk[i];
    if(Postavke.glavni.touching(j)){
      Postavke.glavni.zivoti--;
      Postavke.glavni.start();
    }
  }
  if(Postavke.glavni.touching(Postavke.neprijatelji[2])){
    Postavke.glavni.zivoti--;
    Postavke.glavni.start();
  }

  if(Postavke.pauk[0].do){
    if(Postavke.pauk[0].y>=220){
      Postavke.pauk[0].jump();
    }
    else{
      Postavke.pauk[0].do=false;
    }
  }
  if(Postavke.pauk[0].do==false){
    if(Postavke.pauk[0].y<=220){
      Postavke.pauk[0].jump2();
    }
    else{
      Postavke.pauk[0].do=true;
    }
  }

  if(Postavke.pauk[1].do){
    if(Postavke.pauk[1].y>=220){
      Postavke.pauk[1].jump(150);
    }
    else{
      Postavke.pauk[1].do=false;
    }
  }
  if(Postavke.pauk[1].do==false){
    if(Postavke.pauk[1].y<=220){
      Postavke.pauk[1].jump2();
    }
    else{
      Postavke.pauk[1].do=true;
    }
  }

  for(i=0;i<Postavke.voce.length;i++){
    let j=Postavke.voce[i];
    if(Postavke.glavni.touching(j)){
      Postavke.glavni.collect(j);
    }
  }
}


function LEVEL_2() {

  if (SENSING.left.active) {
    Postavke.glavni.moveLeft();

    for(i=0;i<Postavke.blokovi.length;i++)
    {
      if(Postavke.glavni.touching(Postavke.blokovi[i]))
      {
        if(SENSING.keyA.active){
          Postavke.blokovi[i].moveLeft();
        }
      }
    }
  }

  if (SENSING.right.active) {
    Postavke.glavni.moveRight();

    for(i=0;i<Postavke.blokovi.length;i++)
    {
      if(Postavke.glavni.touching(Postavke.blokovi[i]))
      {
        if(SENSING.keyA.active){
          Postavke.blokovi[i].moveRight();
        }
      }
    }
  }
  if (SENSING.up.active) {
    Postavke.glavni.jump();
  }

  if(SENSING.keyD.active)
  {
    Postavke.glavni.pucaj(Postavke.projektil);
  }

  for(i=0;i<Postavke.neprijatelji.length;i++){
    let j=Postavke.neprijatelji[i];
    if(Postavke.projektil.touching(j)){
      Postavke.neprijatelji[i].visible=false;
      Postavke.projektil.stop();
    }
  }

  if(Postavke.cilj!=null)
    {
      if(Postavke.glavni.touching(Postavke.cilj))
    {
      if(Postavke.glavni.stanje()==true){
        btnGame.dispatchEvent(levelup);
      }
      else{
        GameSettings.output("Morate skupiti svo voće da bi prešli level!");
      }
    }
  }

  for(i=0;i<Postavke.neprijatelji.length;i++){
    let j=Postavke.neprijatelji[i];
    if(Postavke.glavni.touching(j)){
      Postavke.glavni.zivoti--;
      Postavke.glavni.start();
    }
  }

  for(i=0;i<Postavke.voce.length;i++){
    let j=Postavke.voce[i];
    if(Postavke.glavni.touching(j)){
      Postavke.glavni.collect(j);
    }
  }
}
  
  