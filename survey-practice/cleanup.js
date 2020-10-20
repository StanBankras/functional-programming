import * as json from '../data/survey.json';
import * as kleuren from '../data/kleuren.json';
import isColor from 'is-color';
import rgbHex from 'rgb-hex';

// ============================
// Clean up 'Kleur ogen' column
// ============================

const data = Object.values(json);
const colors = Object.values(kleuren.default);
const validColors = [];

export function cleanEyeColor() {
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
      oogKleur.split('.').join(',');
      oogKleur = '#' + rgbHex(oogKleur);
    }
  
    if(colors.find(y => y.name === oogKleur.toLowerCase())) oogKleur = colors.find(y => y.name === oogKleur.toLowerCase()).hex;
  
    if(!isColor(oogKleur)) return console.log('niet ' + oogKleur);
  
    validColors.push(oogKleur);
  });
  
  return validColors;
}

// ============================
// Clean up 'Kleur ogen' column
// ============================