document.addEventListener("DOMContentLoaded", () => {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');

  let quotes = loadQuotes();
  newQuoteButton.addEventListener('click', showRandomQuote);

  function showRandomQuote(){
    if (quotes.length === 0){
        quoteDisplay.textContent = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math,random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.textContext = `"${randomQuote.text}" - ${randomQuote.category}`;

    sessionStorage.setItem('lastViewQuote', JSON.stringify(randomQuote));
  }

  window.addQuote = function() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text === "" || category === "") {
      alert("Both fields are required!");
      return;
    }

    quotes.push({ text: text, category: category });
    saveQuotes();

    newQuoteText.value = "";
    newQuoteCategory.value = "";

    alert("Quote added successfully!");
  }

 function saveQuotes() {
     localStorage.setItem('quotes', JSON.stringify(quotes));
   }
 
   function loadQuotes() {
     const storedQuotes = localStorage.getItem('quotes');
     return storedQuotes ? JSON.parse(storedQuotes) : [
       { text: "The best way to predict the future is to create it.", category: "Inspiration" },
       { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
       { text: "The fact that he allowed you walk his dog, doesn't mean he will allow you marry his daughter.", category: "Motivation" }
     ];
   }
 
   window.exportToJsonFile = function() {
     const dataStr = JSON.stringify(quotes);
     const dataBlob = new Blob([dataStr], { type: "application/json" });
     const url = URL.createObjectURL(dataBlob);
 
     const downloadLink = document.createElement("a");
     downloadLink.href = url;
     downloadLink.download = "quotes.json";
     document.body.appendChild(downloadLink);
     downloadLink.click();
     document.body.removeChild(downloadLink);
   }
 
   window.importFromJsonFile = function(event) {
     const fileReader = new FileReader();
     fileReader.onload = function(event) {
       const importedQuotes = JSON.parse(event.target.result);
       quotes.push(...importedQuotes);
       saveQuotes();
       alert('Quotes imported successfully!');
     };
     fileReader.readAsText(event.target.files[0]);
   }
 
   const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
   if (lastViewedQuote) {
     const quote = JSON.parse(lastViewedQuote);
     quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
   }
 });
