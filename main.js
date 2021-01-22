$("#searchButton").on("click", function(){

    var searchTerm = $("#searchTerm").val();
    var numRecords = $("#numRecords").val();
    var startYear = $("#startYear").val();
    var endYear = $("#endYear").val();
  
    startYear = startYear + "0101";
    endYear = endYear + 1231;
  
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "03ad496441174c67bad382311c6f254d",
      'q': searchTerm,
      'begin_date': startYear,
      'end_date': endYear
      // 'fl': "web_url, pub_date, headline, byline",
      // 'page': 0,
      // 'facet_field': "section_name"
    });
  
  
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(response) {
      console.log(response);
    for (var i = 0; i < numRecords; i++) {
      var newDiv = $("<div>");
  
      var title = response.response.docs[i].headline.main;
      var h2 = $("<h2>").text(title);
  
      var byline = response.response.docs[i].byline.original;
      if (byline === null) {
        byline = "null"
      }
      var by = $("<p>").text(byline);
  
      var section = response.response.docs[i].section_name;
      if (section === undefined) {
        section = "undefined"
      }
      var sec = $("<p>").text("Section: " + section);
  
      var pubdate = response.response.docs[i].pub_date;
      var pub = $("<p>").text(pubdate); 
  
      var link = response.response.docs[i].web_url;
      var weblink = $("<a>").attr("href", link).text(link);
  
      newDiv.append(h2, by, sec, pub, weblink);
  
      $("#searchResults").append(newDiv);
    }
  
    })
  });
  
  
  
  
  $("#clearButton").on("click", function() {
    $("#searchTerm").val("");
    // $("#numRecords").empty();
    $("#startYear").val("");
    $("#endYear").val("");
    $("#searchResults").empty();
  });
  
  
  /*
  <!-- listeners for search term, #records, begin year, end year
  search button
  q
  begin_date
  end_date
   -->*/
  /*
  search
  numRecords
  startYear
  endYear
  searchButton
  clearButton
  */