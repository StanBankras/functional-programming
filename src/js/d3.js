import * as d3 from "d3";

const loader = document.querySelector('#loader');
const body = document.querySelector('body');

export default function useData(data) {
  // Clear loader
  loader.parentNode.removeChild(loader);
  body.classList.remove('loading');
  
  const text = document.createElement('p');
  text.textContent = data.length;
  body.appendChild(text);    
}