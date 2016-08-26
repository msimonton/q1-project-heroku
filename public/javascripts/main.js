$(document).ready(()=> {
    var findLyrics =""
  var corsAnywhere="https://cors-anywhere.herokuapp.com/"
  var urlSearch="http://api.genius.com/search?q="


  $('#lyricButton').click(function()  {
    $('#search').css('display', 'block')
  })

  $('#quoteButton').click(function(){
    $('#quotes').css('display','block')
})


  $('#anyTextButton').click(function(){
    $("#search").css('display','none')
    $('#search_return').empty()
    $('#hiddenInput').delay(10000).css({
    'display': 'inline-block',
    'float':'left',
    'margin': 'auto'}).fadeIn(2000);
    $('#lyricInstructions').css('display','none')
    $('html, body').animate({
      scrollTop: $("#userInputs").offset().top
    }, 2000);


  })
  $('#changeInput').click(function(even){
  $('#input_texts').append($('#userInputs').val());
  $("#inputWords").css({
  'display': 'block'
  })


  })

  $('#quoteWordButton').submit(function()  {
    event.preventDefault();
    $.ajax({
      url:corsAnywhere+"http://api.forismatic.com/api/1.0/",
      format:'json',
      method:"GET",
      error:function(errs)  {
        console.log(errs)
      },
      success: function(quoteResults) {
        console.log(quoteResults)
      }
    })

  })


  $('#search_form').submit(function(even){
    event.preventDefault();
    var searchItems = $('#main_search').val();




    $.ajax({
      url:corsAnywhere+urlSearch+searchItems,
      error:function(err) {
        console.log(err)
      },
      beforeSend: function setHeader(xhr) {
        xhr.setRequestHeader('Authorization', "Bearer clQq5XgB3u6rHDYG3k7zN904TwsDX68DU2LHC6dHEGa532bI15yk41VxV2CNhC8J");
      },

      method:'GET',
      success:function(searchResults)    {

      console.log(searchResults)
      $('#search_return').empty()

      for(var i=0; i<9;i++){
        $('#search_return').append('<div class="divResults" resultDivs id="'+(i+1)+'"><a href="'+searchResults.response.hits[i].result.url+'" target="_blank"><img class="artistPics" src="'+searchResults.response.hits[i].result.header_image_thumbnail_url+'"</a><h3 class="songNames">'+searchResults.response.hits[i].result.title+'</h3> ' +
        '<span class ="artistNames"><strong>Artist:</strong> '+
        searchResults.response.hits[i].result.primary_artist.name+'</span></div>')

      }
      for(var j=0;j<9;j++) {
        $('#resultdivs'+[j]+'').css('background-image',""+searchResults.response.hits[j].result.header_image_thumbnail_url+"");
      }




      }})
        $('#hiddenInput').delay(10000).css({
        'display': 'inline',
        "align-item":"center",

        'margin': 'auto'}).fadeIn(500)

        $('html, body').animate({
          scrollTop: $("#changeInput").offset().top
        }, 2000);
  })
  $('#changeInput').click(function(even){
    $('#input_texts').append($('#userInputs').val());
    $("#userWords").css({
      'display': 'block',
      "margin":"auto"
    })
    $('#resultTitle').css('display','block')

    $('html, body').animate({
        scrollTop: $("#userWords").offset().top
    }, 2000);
  })

  $('#userWordsSubmit').click(function(){


    $('html, body').animate({
        scrollTop: $("#tagged_text").offset().top
    }, 2000);





          $("#tagged_text").empty();
          $('#input_texts').attr('id',"input_text")

          var adjValues=$("input[name='adjectives\\[\\]']").map(function(){
            return $(this).val();}).get();
          var nounValues=$("input[name='nouns\\[\\]']").map(function(){
            return $(this).val();}).get();
          var verbValue=$("input[name='verbs\\[\\]']").map(function(){
            return $(this).val();}).get();

            var words = new Lexer().lex(document.getElementById("input_text").innerHTML);
            var taggedWords = new POSTagger().tag(words);
            var result = "";
            var m=0;
            console.log(nounValues)

            for (i in taggedWords) {
            var taggedWord = taggedWords[i];
              for(var j=0;j<taggedWords.length;j+=3)  {
              if(taggedWords[j][1]==="NN")  {
               taggedWords[j][0]=nounValues
              }
              else if(taggedWords[j][1]==="VBD")  {
               taggedWords[j][0]=verbValue
              }
              else if(taggedWords[j][1]==="JJ")  {
               taggedWords[j][0]=adjValues
              }
              }
              var word = taggedWord[0];
              var tag = taggedWord[1];

              result += (word +" ");
          }
          console.log(word)
          $("#tagged_text").append('<p id="finalResults">'+result+'</p>')
});

  })
