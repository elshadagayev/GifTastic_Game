(function($){
  var animals = ['dog','cat','rabbit','hamster','skunk','goldfish','bird','ferret','turtle','sugar glider','chinchilla','hedgehog','hermit crab','gerbil','pygmy goat','chicken','capybara','teacup pig','serval','salamander','frog'];
  var api_key = 'dc6zaTOxFJmzC';

  createButtons();

  $('.add-animal-btn').on('click', function(e){
    e.preventDefault();

    var animalName = $('#add_animal_inp').val().trim();
    if(!animalName) {
      alert("Type animal name");
      $('#add_animal_inp').val('');
      return;
    }

    if(animals.indexOf(animalName.toLowerCase()) !== -1) {
      alert(animalName + " exists already");
      $('#add_animal_inp').val('');
      return;
    }

    $('#add_animal_inp').val('');
    animals.push(animalName);
    createButtons();
  });

  function createButtons () {
    $('.btn-wrapper').empty();
    for(var i = 0; i < animals.length; i++) {
      createButton(animals[i]);
    }
  }

  function createButton (animalName) {
    var btn = $('<button>');
    btn.addClass('btn btn-primary');
    btn.text(animalName);
    btn.data('animal', animalName);
    btn.on('click', onBtnClickCallBack);
    $('.btn-wrapper').append(btn);
  }

  function onBtnClickCallBack (){
    var q = $(this).data("animal");
    var url = "https://api.giphy.com/v1/gifs/search";
    var data = {q,api_key}
    var method = "GET";
    $.ajax({
      url,
      method,
      data
    }).then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class='gif'>");
        animalDiv.data('still-url', results[i].images.downsized_still.url);
        animalDiv.data('animated-url', results[i].images.fixed_height.url);
        animalDiv.data('state', 'still');

        var p = $("<p>").text("Rating: " + results[i].rating);
        var animalImage = $("<img>");
        animalDiv.on('click', function(){
          var stillUrl = $(this).data('still-url');
          var animatedUrl = $(this).data('animated-url');
          var state = $(this).data('state');

          switch(state) {
            case "still":
              $(this).data('state', 'animated');
              $(this).find('img').attr('src', animatedUrl);
              break;
            case "animated":
              $(this).data('state', 'still');
              $(this).find('img').attr('src', stillUrl);
              break;
          }
        });
        
        animalImage.attr('src', results[i].images.original_still.url);
        animalDiv.append(p);
        animalDiv.append(animalImage);
        $(".gifs-wrapper").prepend(animalDiv);
      }
    });
  }
})(jQuery);