let options = {
  quoteArray: [],
  index: 0,
  textPosition: 0,
  flag: true,
  destination: document.querySelector("#typedtext"),
};

window.addEventListener("load", typeWrirer);

function loadQuote() {
  const url = `https://api.quotable.io/random`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log(response.status);
      }
    })

    .then((data) => {
      options.quoteArray[options.index] = data.content;
    });
}

function typeWrirer() {
  if (options.flag) {
    loadQuote();
    options.quoteArray[options.index] += " ";
    options.flag = false;
  }

  options.destination.innerHTML =
    options.quoteArray[options.index].substring(0, options.textPosition) +
    "<span>\u25AE</span>";

  if (options.textPosition++ != options.quoteArray[options.index].length) {
    setTimeout("typeWrirer()", 100);
  } else {
    options.quoteArray[options.index] = " ";
    setTimeout("typeWrirer()", 3000);
    options.textPosition = 0;
    options.flag = true;
  }
}
