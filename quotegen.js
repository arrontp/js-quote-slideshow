//Run on server for JSON response (Xampp).

var request = new XMLHttpRequest();
request.open("GET", "./quotes.json", true);
request.send(null);
request.onreadystatechange = function() {
  if ( request.readyState === 4 && request.status === 200 ) {
    var my_JSON = JSON.parse(request.responseText);
    var quotes = my_JSON.quote;
    quoteSlideshow(quotes);
  }
}

function quoteSlideshow(quotes){
  var qLen = quotes.length;
  var i = 0;
  var load = 0;
  
  window.onLoad = displayQuote();
  
  function displayQuote(){
      var quote = document.getElementById("q_quote");
      quote.innerHTML = quotes[i];
      var count = (i == qLen -1) ? i = 0 : i++;
      count;
      loadProgress();
  }
  
  function loadProgress(){
      load = 1;
      var button = document.getElementById("button");
      buttonClicked = button.addEventListener("click", function(){
        load = 0;
        });
      var loadBar = document.getElementById("loadBar");
      var loadWidth = 0;  
      var frameId = setInterval(frame, 50);

      function frame() {  
        if(loadWidth < 100 && load === 0){
            clearInterval(frameId);
            return displayQuote();
        }
        if(loadWidth >= 100) {
            clearInterval(frameId);
            load = 0;
            displayQuote();
        }else {
          loadWidth++;
          loadBar.style.width = loadWidth + "%";
        }
      }
  }
}