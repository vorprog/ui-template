const sendRequest = async () => {
  const response = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`);
  const responseText = await response.text();

  console.log(responseText);
  const element = document.createElement(`div`);
  element.textContent = responseText
  document.body.appendChild(element);
}

(async () => {
  document.addEventListener(`DOMContentLoaded`, sendRequest);
})();
