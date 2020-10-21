import * as json from '../data/survey.json';
import * as kleuren from '../data/kleuren.json';
import * as huisdieren from '../data/huisdieren.json';
import isColor from 'is-color';
import rgbHex from 'rgb-hex';

const data = Object.values(json);
const colors = kleuren.default;
const animals = huisdieren.default;

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
    if(pets.toLowerCase().includes('geen')) return petsArray.push({});
    if(pets === 'N>V>T>') return;

    // Split strings into substrings
    pets = pets.split(' ').join('');
    pets = pets.split(',').join('.').split(':').join('.').split('.');
    pets = pets.filter(x => x !== '');

    // Separate pet given names and real animal type name
    const animalNames = pets.slice().filter(y => animals.includes(y.toLowerCase()));
    const names = pets.slice().filter(y => !animals.includes(y.toLowerCase()));

    const combinations = [];

    // Combine pet given names and pet names in objects
    animalNames.forEach((animal, index) => {
      if(!names[index]) return combinations.push({ name: null, pet: animal });
      combinations.push({ name: names[index], pet: animal });
    });

    petsArray.push(combinations);
  })
  return petsArray;
}