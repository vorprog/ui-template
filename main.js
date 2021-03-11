function requestListener() {
  console.log(this.responseText);
  const element = document.createElement(`div`);
  element.textContent = this.responseText;
  document.body.appendChild(element);
}

function sendRequest() {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", requestListener);
  oReq.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");
  oReq.send();
}

document.addEventListener(`DOMContentLoaded`, sendRequest);
