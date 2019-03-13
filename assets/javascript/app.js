// $(document).ready(function() {

var places = [
  "London",
  "Paris",
  "Amsterdam",
  "Edinburgh",
  "Madrid",
  "Rome",
  "New York",
  "Chicago",
  "Berlin",
  "Sydney"
];

var place;
var queryURL =
  "https://api.giphy.com/v1/gifs/search?api_key=yXwYPNZJXVMrFo2YiZNtQ3MHiENiBMyz&q=" +
  place +
  "&limit=10&offset=0&rating=&lang=en";

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
    button.data("data-name", places[i]);
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
  // run throught the renderButtons function and clear the text input
  renderButtons();
  $("#text").val("");
});

// on clicks for rendered buttons

$(document).on("click", "#buttons-view", function() {
  console.log("added buttons clicking", $(this).data("data-name"));
});
// display 10 gifs when buttons pushed

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response.data);

  var results = response.data;
  for (var i = 0; i < results.length; i++) {
    var gifDiv = $("<div>");

    var rating = results[i].rating;
    var p = $("<p>").text("Rating: " + rating);

    var image = $("<img>");
    image.attr("src", results[i].images.fixed_height.url);

    gifDiv.prepend(p);
    gifDiv.prepend(image);

    $(".display").prepend(gifDiv);
  }
});

// start and stop animate the gifs when clicked on

$(".display").on("click", function() {
  console.log("this is my gif!!", $(this).data());

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
