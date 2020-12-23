//MODAL BOX 

//Think about how to do it do we have one modal attached to all the cards or do we have seperate modals created with each card. 
//Modal-trigger is the current target when testing this, this will become the card div
function getRecipeIndex(){

}

function getURL(recipeObj){
    return recipeObj.url
}


//TODO: Function creating the Modal HTML components dynamically with jQuery
function populateModal(recipeObj){
    let modal = $(".modal-header")
    modal.text("");
    //TODO: Standard elements of Modal containing the following
    //Header div
    let headerDiv = $("<div>");
    
    //Recipe Name header
    let nameHeader = $("<h4>")
    nameHeader.text(recipeObj.label);
    
    //cautions listed in subscript
    let cautionsSub = $("<span>")
    cautionsSub.addClass("subscript")
    if (recipeObj.cautions.length === 0){
    }
    else {
        let cautions = ""
        for(let i = 0; i < recipeObj.cautions.length ; i ++){
            cautions = cautions + " " + recipeObj.cautions[i];
        }
        cautionsSub.text("Warning this may contain" + cautions);
    }
    headerDiv.append(nameHeader)
    headerDiv.append(cautionsSub);
    
    //About/Nutitional Info toggle
    let toggleDiv =  $("<div>");
    let aboutDiv = $("<div>");
    let nutInfoDiv = $("<div>"); 

    //Add text
    aboutDiv.text("About")
    nutInfoDiv.text("Nutritional Info")

    //Add classes
    toggleDiv.addClass("toggle-recipe row")
    aboutDiv.addClass("about-recipe col s3 offset-s3")
    nutInfoDiv.addClass("nutInfo-recipe col s3")

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
    servesDiv.text("Serves: " + recipeObj.yield);

    //Cooking Time
    let cookingTimeDiv = $("<div>");
    cookingTimeDiv.text("Cooking Time: " + recipeObj.totalTime + " minutes");

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

function populateMethod(recipeObj) {
    let modal = $(".modal-content")

    let methodDiv = $("<div>");
    let methodPara = $("<p>");
    methodPara.text(recipeObj.instructions)
    
    methodDiv.append(methodPara)
    modal.append(methodDiv);


}

function populateNutInfo(recipeObj){
    let modal = $(".modal-content")
    modal.text("");
    //TODO: Nutritional info modal containing the following (Total, per serve and % daily)
    //Creating the table header items
    let tableDiv = $("<table>");
    let tableHeader = $("<thead>");
    let tableHrow = $("<tr>");
    //Header for the column names
    let typeHeader = $("<th>");
    typeHeader.text("Type");

    let totalNutrients = $("<th>");
    totalNutrients.text("Total Nutrients")

    let perServe = $("<th>");
    perServe.text("Nutrients Per Serve")

    let percentIntake = $("<th>");
    percentIntake.text("Daily Percentage")

    tableHrow.append(typeHeader);
    tableHrow.append(totalNutrients);
    tableHrow.append(perServe);
    tableHrow.append(percentIntake);

    tableHeader.append(tableHrow);
    tableDiv.append(tableHeader);

    //Creating the table body items
    let tableBody = $("<tbody>");
    //Energy
    // let energyRow = 


    
    let Energy = $("<li>");
    Energy.text("Energy: " + recipeObj.totalNutrients.Energy);
    // recipeObj.totalNutrients
    


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
const spoonacularAPI = "59b7c5b4387043649860e827d13b1445"

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
    // let recipeURL = response.hits[0].recipe.url;
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

    let recipeURL = "https://api.spoonacular.com/recipes/extract?apiKey=" + spoonacularAPI + "&url=" + getURL(response.hits[0].recipe);

    console.log(recipeURL)

    populateModal(response.hits[0].recipe)
    populateAbout(response.hits[0].recipe)

    //AJAX call to the spoonacular API...
    $.ajax({
        url: recipeURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        populateMethod(response);

    });

    $.ajax({
        url: recipeURL,
        method: "GET"
    }).catch(function(error) { 
        console.log(error)
    });



});

$.ajax({
    url: URL,
    method: "GET"
}).catch(function(error) { 
    console.log(error)
});


//TODO: Funciton that uses AJAX to call the nutritional API to populate information

//TODO: Onclick event listener that retrieves the recipe name from the card display

