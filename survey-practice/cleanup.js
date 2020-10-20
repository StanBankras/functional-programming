import * as json from '../data/survey.json';
import * as kleuren from '../data/kleuren.json';
import isColor from 'is-color';
import rgbHex from 'rgb-hex';

const data = Object.values(json);
const colors = kleuren.default;

export function cleanEyeColor() {
  const validColors = [];

  data.forEach(async (x) => {
    let oogKleur = x.oogKleur;
  
    if(!oogKleur) return;
  
    // Remove spaces
    oogKleur = oogKleur.split(' ').join('');
  
    // Hex codes without # get #
    if(!oogKleur.startsWith('#')) {
      if(oogKleur.length === 6) oogKleur = '#' + oogKleur;
    }
  
    // Replace rgb color with Hex
    if(oogKleur.startsWith('rgb')) {
      oogKleur = '#' + rgbHex(oogKleur);
    }
  
    if(!!colors[oogKleur.toLowerCase()]) oogKleur = colors[oogKleur.toLowerCase()];
  
    if(!isColor(oogKleur)) return console.log('niet ' + oogKleur);
  
    validColors.push(oogKleur);
  });
  
  return [validColors, validColors.length];
}

export function cleanPets() {
  const petsArray = [];

  data.forEach(x => {
    let pets = x.huisDieren;

    // Remove wrong values
    if(!pets) return;
    if(pets.toLowerCase().includes('geen')) return;
    if(pets.length < 2) return;
    if(pets === 'N>V>T>') return;

    // Split strings into substrings
    pets = pets.split(' ').join('');
    pets = pets.split(',').join('.').split(':').join('.').split('.');
    pets = pets.filter(x => x !== '');

    if(pets.length === 1) pets = { name: null, pet: pets[0] };
    if(pets.length === 2) pets = { name: pets[0], pet: pets[1] };


    petsArray.push(pets);
  })
  return [petsArray, petsArray.length];
}