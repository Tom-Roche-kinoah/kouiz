// localstorage

// uninquement des string

// Comment on enregistre qqchose dans localstorage
const key = 'clé';
const value = 'valeur';
localStorage.setItem(key, value);

// récupérer la valeur d'une clé une valeur
const locvalue = localStorage.getItem(key);
console.log(locvalue);

localStorage.removeItem(key);