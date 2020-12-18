//MODAL BOX 

//Think about how to do it do we have one modal attached to all the cards or do we have seperate modals created with each card. 
//Modal-trigger is the current target when testing this, this will become the card div

//TODO: Function creating the Modal HTML components dynamically with jQuery
function populateModal(recipeObj){
    let modal = $(".modal-content")
    modal.text("");
    //TODO: Standard elements of Modal containing the following
    //Recipe Name header
    let nameHeader = $("<h4>")
    nameHeader.text(recipeObj.label);
    
    //cautions listed in subscript
    let cautionsSub = $("<span>")
    if (recipeObj.cautions.length === 0){
    }
    else {
        let cautions = ""
        for(let i = 0; i < recipeObj.cautions.length ; i ++){
            cautions = cautions + " " + recipeObj.cautions[i];
        }
        cautionsSub.text("Warning this may contain" + cautions);
    }
    nameHeader.append(cautionsSub);
    
    //About/Nutitional Info toggle
    let toggleDiv =  $("<div>");
    let aboutDiv = $("<div>");
    let nutInfoDiv = $("<div>"); 

    //Add text
    aboutDiv.text("About")
    nutInfoDiv.text("Nutritional Info")

    //Add classes
    toggleDiv.addClass("toggle-recipe")
    aboutDiv.addClass("about-recipe")
    nutInfoDiv.addClass("nutInfo-recipe")

    //Append to toggle div
    toggleDiv.append(aboutDiv);
    toggleDiv.append(nutInfoDiv);

    //Append elements to the modal 
    modal.append(nameHeader);
    modal.append(toggleDiv);
    
}
function populateAbout(recipeObj){
    let modal = $(".modal-content")
    modal.text("");
    //TODO: About modal containing the following
    //Photo
    let imageDiv = $("<img>");
    imageDiv.attr("src", recipeObj.image)
    
    //Serves 
    let servesDiv = $("<div>");
    servesDiv.text("Serves" + recipeObj.yield);

    //Cooking Time
    let cookingTimeDiv = $("<div>");
    cookingTimeDiv.text(recipeObj.totalTime + " minutes");

    //Ingredient List 
    let ingredientsDiv = $("<ul>");
    let item;
    for (let i = 0 ; i < recipeObj.ingredientLines.length ; i ++) {
        item = $("<li>");
        item.text(recipeObj.ingredientLines[i]);
        ingredientsDiv.append(item);
    }

    //Link to recipe method
    let recipeURL = $("<div>");
    recipeURL.text("Link to recipe: " + recipeObj.url)

    //Append all of the above
    modal.append(imageDiv);
    modal.append(servesDiv);
    modal.append(cookingTimeDiv);
    modal.append(ingredientsDiv);
    modal.append(recipeURL);
}

function populateNutInfo(recipeObj){
    let modal = $(".modal-content")
    modal.text("");
    //TODO: Nutritional info modal containing the following (Total, per serve and % daily)
    //Recipe Name header
    //cautions listed in subscript
    //About/Nutitional Info toggle
    //Energy
    //Protein
    //Fat (total and saturated)
    //Carbs 
    // Sugars
    //Fibre 
    //Salt/Sodium
}

//TODO: Function that uses AJAX to call the recipe API to populate recipe information
const recipeSearchID = "9afc53dc"
const recipeSearchKey = "9de69f6f33f4366cb31afc3e05b864ea"

let URL = "https://api.edamam.com/search?q=chicken&app_id=" + recipeSearchID + "&app_key=" + recipeSearchKey;

$.ajax({
    url: URL,
    method: "GET"
}).then(function(response) {
    console.log(response)
    //Declaring recipe info
    let recipeName = response.hits[0].recipe.label
    let ingredients = response.hits[0].recipe.ingredientLines; //Array 
    let imageSrc = response.hits[0].recipe.image;
    let recipeURL = response.hits[0].recipe.url;
    let recipeCautions = response.hits[0].recipe.cautions;
    let serves = response.hits[0].recipe.yield
    let cookingTime = response.hits[0].recipe.totalTime

    console.log(ingredients);
    console.log(ingredients.length);
    console.log(imageSrc);

    //Declaring nutritional info
    let dailyValObj = response.hits[0].recipe.totalDaily;
    let nutrientObj = response.hits[0].recipe.totalNutrients;

    console.log(nutrientObj);

    populateModal(response.hits[0].recipe)
    populateAbout(response.hits[0].recipe)


});

$.ajax({
    url: URL,
    method: "GET"
}).catch(function(error) { 
    console.log(error)
});

//TODO: Funciton that uses AJAX to call the nutritional API to populate information

//TODO: Onclick event listener that retrieves the recipe name from the card display

