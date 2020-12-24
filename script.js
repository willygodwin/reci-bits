
jQuery(document).ready(function($){
  
  //Global variables
  var app_id = "162e19a1";  // Naresh Poudel's id
  var app_key = "fe05c44c9c6d25ab689401e22f62cae9"; // Naresh Poudel's Key

  var endpointURL = "https://api.edamam.com/search?";
  

// when the add button is clicked, the item will be added to the search box
$("#btnadd").click(function(){
  var theitems=$("#ad").val();
  var searchitems=$("#q").val();
  //alert(theitems)
  $("#q").val(searchitems+" "+theitems);
  $("#ad").val("");
 
  
})

  //if enter key on the recipe search box is pressed (or the search button clicked),  recipe serching function runs:
  $('form').submit(function(event){
    
    requestAPI();
        event.preventDefault();
  });
  
  //function to send request to API
 function requestAPI(){

   
    var q = $('#q').val();
    var requestURL = endpointURL + 'q=' + q + '&app_id=' + app_id + '&app_key=' + app_key + '&from=0&to=12';
      clearData();
    dataFromAPI(requestURL);
    
}

//making the actual request
function dataFromAPI(requestURL){
  
    
    $.ajax( {
      url : requestURL,
      dataType : "jsonp",
      success : function(data) { 
       
       var results = data.hits;

//generating the results and displaying
results.forEach( function (item){
  //declaring variables
    var title = item.recipe.label;
    var image = item.recipe.image;
    var link = item.recipe.url; // URL for the detail recipe
    var howMany = item.recipe.ingredientLines.length;//how many ingredient
    var calQty = item.recipe.calories;// calories count
    var serves = item.recipe.yield;
    var fatQty = item.recipe.totalNutrients.FAT.quantity;
    var fatUnit = item.recipe.totalNutrients.FAT.unit;
    var fatDaily = item.recipe.totalDaily.FAT.quantity;
    var sugQty = item.recipe.totalNutrients.SUGAR.quantity;
    var sugUnit = item.recipe.totalNutrients.SUGAR.unit;
    var calClass = '';
    var fatClass = '';
    var sugClass = '';  
  
  //shortening a title if that is too long
  if (title.length > 20){
    title = title.substring(0,19) + '..'
  };
  
  //computing FAT per serving or portion 

  fatQty = fatQty / serves;
  //changing the number to a string for significance ( to shorten it)
  var fat = fatQty.toString();
  //reducing the excess digits from the fat value (2 or certain decimal places)
  if (fatQty < 100){
    fat = fat.substring(0,4)
  }
  else{
    fat = fat.substring(0,5)
  };
  
    //changing the colour of the fat div based on daily recommendation (%)
  if (fatDaily > 55) {
    fatClass= 'red';
  }
  else if (fatDaily > 35) {
   fatClass= 'red';
  }
  else{fatClass= 'green';
  };

  //computing CALORIES per serving or portion
  calQty = calQty / serves;
  //changing the number to a string for significance ( to shorten it)
  var cal = calQty.toString();
  //reducing the excess digits from the calories value (2 or certain decimal places)
  if (calQty < 1000){
    cal = cal.substring(0,5)
  }
  else{
    cal = cal.substring(0,6)
  };

  //changing the colour of the div based on the recommendation 
  if (calQty > 800) {
    calClass= 'red';
  }
  else if (calQty > 400) {
   calClass= 'orange';
  }
  else{
    calClass= 'green';
  };
  
  //calculating SUGAR per portion
  sugQty = sugQty / serves;
  //changing the number to a string for significance ( to shorten it)
  var sugStr = sugQty.toString();
  //reducing the excess digits from the sugar value (2 or certain decimal places)
  if (sugQty < 100){
    sugStr = sugStr.substring(0,4)
  }
  else{
    sugStr = sugStr.substring(0,5)
 };
  
  //changing the colour of the sugar div based on the recommendation
  if (sugQty > 55) {
    sugClass= 'red';
  }
  else if (sugQty > 30) {
   sugClass= 'orange';
  }
  else{
    sugClass= 'green';
  };
 
  //fixes broken image links or the case sensitive file extensions cases
    if( image.indexOf('.jpg')<0){
      if(image.indexOf('.JPG')<0){
        if(image.indexOf('.png')<0){
          if(image.indexOf('.PNG')<0){
      image = 'https://www.edamam.com/web-img/f32/f32bb6d8980d49b54c11e1a3dd51a16d.jpg';
        }
       }
      }
     }
  
  //The results
   $('.results').append('<div class="recipe"><a target="_blank" href="' 
    + link + '"><h2 class="title">'
    + title + '</h2></a><div class="box"><a target="_blank" href="' 
    + link + '"><img class="pic" src="' 
    + image + '"></a><div class ="infoBox"><div class="info">Serves <b>' 
    + serves + '</b></div><div class="caloryInfo ' 
    + calClass + '"><b>' + cal + '</b> kcal</div><div class="fatinfo '
    + fatClass +'">Fat: <b>' + fat + '</b> ' 
    + fatUnit + '</div><div class="suginfo '
    + sugClass +'">Sugar: <b>' + sugStr + '</b> ' 
    + sugUnit + '</div><div class="info">Uses <b>' 
    + howMany + '</b> ingredients</div></div></div></div>');

});
      },
      error: function(){
        alert('Error getting data from API');
      }
    } );
    
  }
  
  function clearData(){
    $('.results').empty();
    
  }
 
});