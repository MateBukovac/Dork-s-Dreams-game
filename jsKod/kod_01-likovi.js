3//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

class Animal extends Sprite {
  constructor(x, y, layer) {

    super(x + 4, y + 4, 64 - 8, 64 - 8);

    this.frame_sets = {};

    this.layer = layer;
    this.visible = true;

    if (this.constructor == Animal) {
      throw new Error("Animal se ne može instancirati");
    }
  }

  jump(h = 50) {

    if (!this.jumping) {

      this.jumping = true;
      this.velocity_y -= h;

    }
  }
}

class Dino extends Animal {
  #zivoti;
  #bodovi;
  constructor(layer,z=4, b=0) {
    super(0, 0, layer);

    this.frame_sets = {
      "up": [0],
      "walk-up": [0],
      "right": [0],
      "walk-right": [0,1,2,3,4],
      "down": [0],
      "walk-down": [0],
      "left": [7],
      "walk-left": [ 7, 8, 9, 10,]
    };
    this.okvir = false;
    this.#bodovi = b;
    this.#zivoti = z;
  }

  get zivoti() {
    return this.#zivoti;
  }
  set zivoti(z) {
    if (z <= 0) {
      this.#zivoti = 0;
      btnGame.dispatchEvent(gameoverEvent);
      console.log("GAME OVER:" +this.bodovi);
      btnStop.click();
    }
    else {
      this.#zivoti = z;
    }
  }
   get bodovi(){
     return this.#bodovi;
   }
   set bodovi(b)
   {
     this.#bodovi=b;
     if(b==100)
     {
       GameSettings.output("Sakupili ste sve bodove!");
     }
   }

  start() {
    this.visible=false;
    this.x = 3* 64;
    this.y = 18* 64;
    this.visible=true;
    console.log("Broj života: "+this.zivoti);
    GameSettings.output("Broj života: "+this.zivoti);
  }

  jump(h = 50) {

    if (!this.jumping) {

      this.jumping = true;
      this.velocity_y -= h;

    }
  }

  pucaj(p){
    if(this.direction==90)
        {
          p.put = 0;
          p.x = this.x;
          p.y = this.y;
          p.visible = true;
          p.move = true; 
        }
        else if(this.direction==270)
        {
          p.put = 0;
          p.x = this.x;
          p.y = this.y;
          p.visible = true;
          p.moveL = true;
        }
  }

  collect(c) {
    c.visible=false;
    this.bodovi += c.vrij;
    GameSettings.output(this.bodovi);
  }

  stanje(){
    if(this.bodovi==100){
      return true;
    }
    else{
      return false;
    }
  }

  micanje(c)
  {
    if(this.d==true)
    {
      this.d=false;
      if(this.direction==270)
      {
        c.moveLeft();
        if(this.velocity_x>c.velocity_x)
        {
          c.velocity_x=this.velocity_x;
        }
      }
      else if(this.direction==90)
      {
        c.moveRight();
        if(this.velocity_x>c.velocity_x)
        {
          c.velocity_x=this.velocity_x;
        }
      }
    }
  }
}

class Collectable extends Item {

  constructor(layer) {
    super(layer);

    if (this.constructor == Collectable) {
      throw new Error("Collectable se ne može instancirati");
    }
  }
  getType() {
    return this.constructor.name;
  }
}


class Cilj extends Collectable
{
  constructor(layer) {
    super(layer);
  }
}

class Blokovi extends Item
{
  constructor(layer)
  {
    super(layer);
    this.visible = true;
  }
}

class Projektil extends Item {
  #put;
  constructor(layer) {
    super(layer);
    this.visible = false;
    this.#put = 0;
    this.move = true;
    this.moveL=true;
    this.width=64-32;
    this.height=64-32;
  }

  start(a,b){
      this.x=a;
      this.y=b;
      
  }
  
  get put() {
    return this.#put;
  }
  set put(v) {
    if (v >= 200) {
      this.#put = 0;
      this.move = false;
      this.moveL=false;
      this.visible = false;
    }
    else {
      this.#put = v;
    }
  }

  updatePosition()
  {
    if (this.move ) {
        this.x += 20;
        this.put += 10;
    }
    if(this.moveL)
    {
      this.x-=20;
      this.put+=10;
    }
  }
  stop() {
    this.visible = false;
    this.move = false;
  }
}

class Pauk extends Item
{
  constructor(layer)
  {
    super(layer);
    this.do=true;
  }
  moveUp(brz=0.5) {
    this.direction = 0;
    this.velocity_y -= brz;
  }

  moveDown(brz=0.5) {
    this.direction = 180;
    this.velocity_y += brz;
  }
  
  updatePosition(gravity = 0, friction = 0) {
    this.x_old = this.x;
    this.y_old = this.y;
    this.velocity_y += gravity;
    this.x += this.velocity_x;
    this.y += this.velocity_y;

    this.velocity_x *= friction;
    this.velocity_y *= friction;
  }

  jump(h=80){
    if(!this.jumping){
      this.jumping=true;
      this.velocity_y-=h;
    }
  }

  jump2(h=100){
    if(!this.jumping){
      this.jumping=true;
      this.velocity_y+=h;
    }
  }
}

class Neprijatelji extends Item
{
  constructor(layer,l,r,brz =2)
  {
    super(layer);
    this.dodir=true;
    this.lj=l;
    this.ra=r;
    this.brz=brz;
  }
  moveRight(bz=2) {
    this.direction = 90;
    this.velocity_x += bz;
  }

  moveLeft(bz=2) {
    this.direction = 270;
    this.velocity_x -= bz;
  }
  
  updatePosition(gravity = 0, friction = 0) {
    this.x_old = this.x;
    this.y_old = this.y;
    this.velocity_y += gravity;
    this.x += this.velocity_x;
    this.y += this.velocity_y;

    this.velocity_x *= friction;
    this.velocity_y *= friction;
    if(this.dodir)
    {
      if(this.x<=this.ra)
      {
        this.moveRight(this.brz);
      }
      else
      {
        this.dodir=false;
      }
    }
    else
    {
      if(this.x>=this.lj)
      {
        this.moveLeft(this.brz); 
      }
      else
      {
        this.dodir=true;
      }
    }
  }
}
class Voce extends Item{
  constructor(layer){
    super(layer);
    this.vrij=25;
  }
  updatePosition(friction=0){
    this.x_old = this.x;
    this.y_old = this.y;
    this.x += this.velocity_x;
    this.y += this.velocity_y;

    this.velocity_x *= friction;
    this.velocity_y *= friction;
  }
}

class Super extends Item{
  constructor(layer){
    super(layer);
  }
  updatePosition(friction=0){
    this.x_old = this.x;
    this.y_old = this.y;
    this.x += this.velocity_x;
    this.y += this.velocity_y;

    this.velocity_x *= friction;
    this.velocity_y *= friction;
  }
}

