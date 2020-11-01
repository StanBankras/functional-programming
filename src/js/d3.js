export default function useData(data) {
  const body = document.querySelector('body');
  const text = document.createElement('p');
  text.textContent = data.length;
  body.appendChild(text);    
}