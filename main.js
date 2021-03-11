const sendRequest = async () => {
  const response = await fetch({
    method: `GET`,
    url: `https://api.coindesk.com/v1/bpi/currentprice.json`
  })
  
  console.log(response);
  const element = document.createElement(`div`);
  element.textContent = response;
  document.body.appendChild(element);
}

(async () => {
  document.addEventListener(`DOMContentLoaded`, sendRequest);
})();
