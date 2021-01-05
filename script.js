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
    //Div to store info 2 cols 
    let row = $("<div>");
    row.addClass("row")
    //Photo
    let imageDiv = $("<img>");
    imageDiv.addClass("recipe-image col s6")
    imageDiv.attr("src", recipeObj.image)
    
    //div for the below
    let infoDiv = $("<div>");
    infoDiv.addClass("info-div-parent col s6")
    //Serves 
    let servesDiv = $("<div>");
    servesDiv.addClass("info-div");
    servesDiv.text("Serves: " + recipeObj.yield);

    //Cooking Time
    let cookingTimeDiv = $("<div>");
    cookingTimeDiv.addClass("info-div");
    cookingTimeDiv.text("Cooking Time: " + recipeObj.totalTime + " minutes");

    //Ingredient List 
    let ingredientsHeader = $("<div>");
    ingredientsHeader.addClass("ingr-header-div")
    let ingredientsDiv = $("<ul>");
    ingredientsDiv.addClass("info-div");
    let item;
    for (let i = 0 ; i < recipeObj.ingredientLines.length ; i ++) {
        item = $("<li>");
        item.text(recipeObj.ingredientLines[i]);
        ingredientsDiv.append(item);
    }

    //Link to recipe method
    let recipeURL = $("<a>");
    recipeURL.addClass("info-div");

    recipeURL.attr("href",  recipeObj.url)
    recipeURL.text("Link to recipe:")

    //Append all of the above
    infoDiv.append(servesDiv);
    infoDiv.append(cookingTimeDiv);
    infoDiv.append(ingredientsDiv);
    infoDiv.append(recipeURL);
    row.append(imageDiv)
    row.append(infoDiv);
    modal.append(row);
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
    let energyRow = $("<tr>");

    let energy = $("<td>");
    energy.text("Energy:")

    let energyTN = $("<td>");
    energyTN.text(Math.round(recipeObj.totalNutrients.ENERC_KCAL.quantity) + " " + recipeObj.totalNutrients.ENERC_KCAL.unit)

    let energyPS = $("<td>");
    let energyPSval = Math.round(recipeObj.totalNutrients.ENERC_KCAL.quantity/recipeObj.yield);
    energyPS.text(energyPSval + " " + recipeObj.totalNutrients.ENERC_KCAL.unit);

    let energyDP = $("<td>");
    let energyDPval = Math.round(recipeObj.totalDaily.ENERC_KCAL.quantity)
    energyDP.text(energyDPval + " " + recipeObj.totalDaily.ENERC_KCAL.unit);

    energyRow.append(energy);
    energyRow.append(energyTN);
    energyRow.append(energyPS);
    energyRow.append(energyDP);
    
    //Protein
    let proteinRow = $("<tr>");

    let protein = $("<td>");
    protein.text("Protein:")

    let proteinTN = $("<td>");
    proteinTN.text(Math.round(recipeObj.totalNutrients.PROCNT.quantity) + " " + recipeObj.totalNutrients.PROCNT.unit)

    let proteinPS = $("<td>");
    let proteinPSval = Math.round(recipeObj.totalNutrients.PROCNT.quantity/recipeObj.yield);
    proteinPS.text(proteinPSval + " " + recipeObj.totalNutrients.PROCNT.unit);

    let proteinDP = $("<td>");
    let proteinDPval = Math.round(recipeObj.totalDaily.PROCNT.quantity)
    proteinDP.text(proteinDPval + " " + recipeObj.totalDaily.PROCNT.unit);

    proteinRow.append(protein);
    proteinRow.append(proteinTN);
    proteinRow.append(proteinPS);
    proteinRow.append(proteinDP);

    //Fat (total and saturated)
    let fatRow = $("<tr>");

    let fat = $("<td>");
    fat.text("fat:")

    let fatTN = $("<td>");
    fatTN.text(Math.round(recipeObj.totalNutrients.FAT.quantity) + " " + recipeObj.totalNutrients.FAT.unit)

    let fatPS = $("<td>");
    let fatPSval = Math.round(recipeObj.totalNutrients.FAT.quantity/recipeObj.yield) ;
    fatPS.text(fatPSval + " " + recipeObj.totalNutrients.FAT.unit);

    let fatDP = $("<td>");
    let fatDPval = Math.round(recipeObj.totalDaily.FAT.quantity)
    fatDP.text(fatDPval + " " + recipeObj.totalDaily.FAT.unit);

    fatRow.append(fat);
    fatRow.append(fatTN);
    fatRow.append(fatPS);
    fatRow.append(fatDP);
    
    //Carbs 
    let carbsRow = $("<tr>");

    let carbs = $("<td>");
    carbs.text("carbs:")

    let carbsTN = $("<td>");
    carbsTN.text(Math.round(recipeObj.totalNutrients.CHOCDF.quantity) + " " + recipeObj.totalNutrients.CHOCDF.unit)

    let carbsPS = $("<td>");
    let carbsPSval = Math.round(recipeObj.totalNutrients.CHOCDF.quantity/recipeObj.yield);
    carbsPS.text(carbsPSval + " " + recipeObj.totalNutrients.CHOCDF.unit);

    let carbsDP = $("<td>");
    let carbsDPval = Math.round(recipeObj.totalDaily.CHOCDF.quantity)
    carbsDP.text(carbsDPval + " " + recipeObj.totalDaily.CHOCDF.unit);

    carbsRow.append(carbs);
    carbsRow.append(carbsTN);
    carbsRow.append(carbsPS);
    carbsRow.append(carbsDP);
    
    // Sugars
    let sugarRow = $("<tr>");

    let sugar = $("<td>");
    sugar.text("sugar:")

    let sugarTN = $("<td>");
    sugarTN.text(Math.round(recipeObj.totalNutrients.SUGAR.quantity) + " " + recipeObj.totalNutrients.SUGAR.unit)

    let sugarPS = $("<td>");
    let sugarPSval = Math.round(recipeObj.totalNutrients.SUGAR.quantity/recipeObj.yield);
    sugarPS.text(sugarPSval + " " + recipeObj.totalNutrients.SUGAR.unit);

    let sugarDP = $("<td>");
    let sugarDPval = 0
    sugarDP.text(sugarDPval);

    sugarRow.append(sugar);
    sugarRow.append(sugarTN);
    sugarRow.append(sugarPS);
    sugarRow.append(sugarDP);
    
    //Fibre 
    let fibreRow = $("<tr>");

    let fibre = $("<td>");
    fibre.text("fibre:")

    let fibreTN = $("<td>");
    fibreTN.text(Math.round(recipeObj.totalNutrients.FIBTG.quantity) + " " + recipeObj.totalNutrients.FIBTG.unit)

    let fibrePS = $("<td>");
    let fibrePSval = Math.round(recipeObj.totalNutrients.FIBTG.quantity/recipeObj.yield);
    fibrePS.text(fibrePSval + " " + recipeObj.totalNutrients.FIBTG.unit);

    let fibreDP = $("<td>");
    let fibreDPval = Math.round(recipeObj.totalDaily.FIBTG.quantity)
    fibreDP.text(fibreDPval + " " + recipeObj.totalDaily.FIBTG.unit);

    fibreRow.append(fibre);
    fibreRow.append(fibreTN);
    fibreRow.append(fibrePS);
    fibreRow.append(fibreDP);
    
    //Salt/Sodium
    let saltRow = $("<tr>");

    let salt = $("<td>");
    salt.text("salt:")

    let saltTN = $("<td>");
    saltTN.text(Math.round(recipeObj.totalNutrients.NA.quantity) + " " + recipeObj.totalNutrients.NA.unit)

    let saltPS = $("<td>");
    let saltPSval = Math.round(recipeObj.totalNutrients.NA.quantity/recipeObj.yield);
    saltPS.text(saltPSval + " " + recipeObj.totalNutrients.NA.unit);

    let saltDP = $("<td>");
    let saltDPval = Math.round(recipeObj.totalDaily.NA.quantity)
    saltDP.text(saltDPval + " " + recipeObj.totalDaily.NA.unit);

    saltRow.append(salt);
    saltRow.append(saltTN);
    saltRow.append(saltPS);
    saltRow.append(saltDP);

    //append rows to table body 
    tableBody.append(energyRow);
    tableBody.append(proteinRow);
    tableBody.append(fatRow);
    tableBody.append(carbsRow);
    tableBody.append(sugarRow);
    tableBody.append(fibreRow);
    tableBody.append(saltRow);

    tableDiv.append(tableBody);
    modal.append(tableDiv);
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
    // let recipeName = response.hits[0].recipe.label
    // let ingredients = response.hits[0].recipe.ingredientLines; //Array 
    // let imageSrc = response.hits[0].recipe.image;
    // // let recipeURL = response.hits[0].recipe.url;
    // let recipeCautions = response.hits[0].recipe.cautions;
    // let serves = response.hits[0].recipe.yield
    // let cookingTime = response.hits[0].recipe.totalTime


    let recipeURL = "https://api.spoonacular.com/recipes/extract?apiKey=" + spoonacularAPI + "&url=" + getURL(response.hits[0].recipe);
    debugger;
    console.log(recipeURL)
    populateModal(response.hits[0].recipe)
    populateAbout(response.hits[0].recipe)
    

    $(".about-recipe").on("click", function(){
        populateAbout(response.hits[0].recipe);

    });

    $(".nutInfo-recipe").on("click", function(){
        populateNutInfo(response.hits[0].recipe);

    });

    //AJAX call to the spoonacular API...
    $.ajax({
        url: recipeURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        populateMethod(response);

        $(".about-recipe").on("click", function(){
            populateMethod(response);
    
        });

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





