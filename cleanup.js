import * as json from './data/survey.json';
import * as kleuren from './data/kleuren.json';
import * as huisdieren from './data/huisdieren.json';
import { replaceOccurences, replaceMultipleOccurences } from './utils';
import isColor from 'is-color';
import rgbHex from 'rgb-hex';

const data = Object.values(json);
const colors = kleuren.default;
const animals = huisdieren.default;

function eyeColor() {
  return data.map(x => x.oogKleur).filter(x => !!x).map(oogKleur => {
    // Remove spaces
    oogKleur = replaceOccurences(oogKleur, ' ', '')
  
    // Hex codes without # get #
    if(!oogKleur.startsWith('#')) {
      if(oogKleur.length === 6) oogKleur = '#' + oogKleur;
    }
  
    // Replace rgb color with Hex
    if(oogKleur.startsWith('rgb')) {
      oogKleur = '#' + rgbHex(oogKleur);
    }
  
    if(!!colors[oogKleur.toLowerCase()]) oogKleur = colors[oogKleur.toLowerCase()];
  
    if(!isColor(oogKleur)) return;
  
    return oogKleur;
  });
}

function pets() {
  return data.map(x => x.huisDieren).filter(x => !!x).map(pets => {
    if(pets.toLowerCase().includes('geen')) return [];
    if(pets === 'N>V>T>') return [];

    // Split strings into substrings
    pets = replaceMultipleOccurences(pets, [',', '.', ':', ' '], '.').split('.');

    // Separate pet given names and real animal type name
    const animalNames = pets.filter(y => animals.includes(y.toLowerCase()));
    const names = pets.filter(y => !animals.includes(y.toLowerCase()));

    const combinations = [];

    // Combine pet given names and pet names in objects
    animalNames.forEach((animal, index) => names[index] ? combinations.push({ name: names[index], pet: animal }) : combinations.push({ name: null, pet: animal }));

    return combinations;
  });
}

export default { eyeColor, pets };