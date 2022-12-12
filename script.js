const newQuoteBtn = document.querySelector("#js-new-quote");
const textField = document.querySelector("#js-quote-text");
const authorField = document.querySelector(".author");
const link = document.querySelector(".link");
const spinner = document.querySelector(".sk-chase");
const twitterBtn = document.querySelector("#js-tweet");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "89d201395amsh5479e74e041dfc5p16e973jsnc99da6c680dc",
    "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
  },
};

const getQuote = async function () {
  spinner.classList.remove("hidden");
  newQuoteBtn.disabled = true;
  try {
    const response = await fetch(
      "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en",
      options
    );

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const data = await response.json();

    renderQuote(data.content, data.originator.name);
    setTweetBtn(data.content, data.originator.name);

    link.innerText = "Source";
    link.setAttribute("href", data.url);
  } catch (err) {
    console.error(err);
    alert("Failed to fetch new quote");
  }
  newQuoteBtn.disabled = false;
  spinner.classList.add("hidden");
};

newQuoteBtn.addEventListener("click", getQuote);

const renderQuote = function (quote, author) {
  textField.textContent = quote;
  authorField.textContent = author;
};

const setTweetBtn = function (quote, author) {
  twitterBtn.setAttribute(
    "href",
    `https://twitter.com/share?text=${quote} - ${author}`
  );
};

getQuote();
