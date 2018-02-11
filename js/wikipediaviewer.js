var apiUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=";

function setLink(value) {
  if (value == "") {
    $("#search-link").show();
    $("#search-list").hide();
    $("#wiki-image").show();
    $("#wiki-image-alter").hide();
  }
}

$("#search-field").keyup(function (event) {
  if (event.keyCode === 13) {
    var value = $("#search-field").val();
    var requestUrl = apiUrl + value;
    $(".list-item").parent().empty();
    $(".div-link").parent().empty();
    sendRequest(requestUrl);
  }
});

function sendRequest(requestUrl) {
  $.ajax({
    url: requestUrl,
    dataType: 'jsonp',
    success: function (response) {
      for (i = 0; i < response.query.search.length; i++) {
        $("#wiki-image").hide();
        $("#wiki-image-alter").show();
        $("#search-link").hide();
        $("#search-list").show();
        $("#search-list").append("<a target='_blank' class='div-link' href='https://en.wikipedia.org/wiki/" + response.query.search[i].title + "'><div class='list-item px-3 pt-2'><p class='item-title' id='item-title" + i + "'></p><p id='item-snippet" + i + "'></p></div></a><br>");
        $("#item-title" + i).text(response.query.search[i].title);
        $("#item-snippet" + i).html(response.query.search[i].snippet);
      }
    }
  });
}