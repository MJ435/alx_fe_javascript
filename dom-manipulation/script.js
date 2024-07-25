document.addEventListener("DOMContentLoaded", () => {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');

  const quotes = [
    { text: "The best way to predict the future is to create it.", category: "Inspiration" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "The fact that he allowed you walk his dog doesn't mean he will allow you marry his daughter.", category: "Motivation" }
  ];

  newQuoteButton.addEventListener('click', showRandomQuote);

  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
  }

  window.addQuote = function() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text === "" || category === "") {
      alert("Both fields are required!");
      return;
    }

    quotes.push({ text: text, category: category });

    newQuoteText.value = "";
    newQuoteCategory.value = "";

    alert("Quote added successfully!");
  }
});
