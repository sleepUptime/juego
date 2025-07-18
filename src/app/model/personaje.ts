export class Personaje {

    nombre :string = '';
    clase!:ClasePersonaje ;
    fuerza: number = 0;
    vida: number = 0;
    armadura: number = 0;
    imagen: string = '';
    probabilidadHuida: number = 0;


    constructor(){
        
    }
    
}

export enum ClasePersonaje{
    Barbarian,
    Wizard,
    Ranger,
    Rogue,
    Paladin
}


//    constructor( clasePersonaje :ClasePersonaje){

//         switch (clasePersonaje) {
//             case ClasePersonaje.Barbarian:
//                 this.fuerza=20;
//                 this.vida=1000;
//                 this.armadura=20;
//                 this.imagen = "./assets/barbarian.png"
//                 this.probabilidadHuida= 20;
//                 break;
//             case ClasePersonaje.Wizard:
//                 this.fuerza=15;
//                 this.vida=600;
//                 this.armadura=10;
//                 this.imagen = "./assets/wizard.png"
//                 this.probabilidadHuida= 40;
//                 break;            
//             case ClasePersonaje.Ranger:
//                 this.fuerza=10;
//                 this.vida=500;
//                 this.armadura=10;
//                 this.imagen = "./assets/ranger.png"
//                 this.probabilidadHuida= 60;
//                 break;
//             case ClasePersonaje.Rogue:
//                 this.fuerza=10;
//                 this.vida=400;
//                 this.armadura=10;
//                 this.imagen = "./assets/rogue.png"
//                 this.probabilidadHuida=100;
//                 break;
//             case ClasePersonaje.Paladin:
//                 this.fuerza=20;
//                 this.vida=600;
//                 this.armadura=10;
//                 this.imagen = "./assets/paladin.png"
//                 this.probabilidadHuida=20;
//                 break;
//             default:
//                 break;
//             }
//     }
