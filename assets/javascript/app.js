$(document).ready(function() {
  var places = [
    "London",
    "Paris",
    "Holland",
    "Scotland",
    "Spain",
    "Rome",
    "New York",
    "Chicago",
    "Germany",
    "Australia"
  ];

  // A function to render the buttons to the page from the original places array:
  function renderButtons() {
    // clear the view so to render to a clear page
    $("#buttons-view").empty();
    // loop through the places array
    for (var i = 0; i < places.length; i++) {
      console.log("show me", places[i]);
      // for each append a button into the buttons-view div, add on data-name:
      var button = $("<button>");
      button.addClass("place btn btn-primary");
      button.text(places[i]);
      $("#buttons-view").append(button);
    }
  }
  renderButtons();

  // add a new button using the input/submit button
  $("#addButton").on("click", function(event) {
    event.preventDefault();
    console.log("typed", $("#text").val());
    places.push($("#text").val());
    // run through the renderButtons function and clear the text input
    renderButtons();
    $("#text").val("");
  });

  // on clicks for rendered buttons

  $(document).on("click", ".place", function() {
    console.log("added buttons clicking", $(this).text());
    var place = $(this).text();
    $(".display").empty();
    fetchURL(place);
  });

  // display 10 gifs when buttons pushed

  function fetchURL(query) {
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=yXwYPNZJXVMrFo2YiZNtQ3MHiENiBMyz&q=" +
      query +
      "&limit=10&offset=0&rating=&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response.data);

      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifAni = results[i].images.fixed_width.url;
        var rating = results[i].rating;
        renderGifs(gifAni, rating);
      }
    });
  }

  function renderGifs(gifAni, rating) {
    var gifDiv = $("<div>");

    var p = $("<p>").text("Rating: " + rating);

    var image = $("<img>");
    image.attr("src", gifAni);
    image.addClass("gif");

    gifDiv.prepend(p);
    gifDiv.prepend(image);

    $(".display").prepend(gifDiv);
  }

  // start and stop animate the gifs when clicked on

  $(document).on("click", ".gif", function() {
    console.log("this is my gif!!", $(this).data());
  });

  if ($(this).data().state === "still") {
    console.log("GO MAKE IT ANIMATED!!!");
    $(this).data().state = "animated";
    $(this).attr("src", $(this).data().animate);
  } else if ($(this).data().state === "animated") {
    console.log("MAKE IT STILL!!");
    $(this).data().state = "still";
    $(this).attr("src", $(this).data().still);
  }
});
