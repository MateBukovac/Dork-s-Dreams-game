class Postavke {

  constructor() {
    if (this instanceof Postavke) {
      throw new Error("Statička klasa nema instance!");
    }
  }
  /** @type {Dino} */
  static glavni = null;

   /** @type {Cilj} */
   static cilj = null;

   /** @type {Pauk} */
   static pauk=[];

   /** @type {Neprijatelji} */
   static neprijatelji=[];

   /** @type {Voce} */
   static voce=[];
     
   /** @type {Super} */
   static skok=[];

   /** @type {Projektil} */
   static projektil;

   static blokovi=[];

  static random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}