let appID = 'de24e9f5';
let appKEY = '808b4ecac7df60930d1456576a2afadc';
let ingredients = "";

function getIngredientsList(){
    let ingredientsList = $('.ingredient-list');
    let ingredientsArray = [];
    for(let j = 0; j < ingredientsList.length; j++){
        let text = $(ingredientsList[j]).text();
        ingredientsArray.push(text);
    }
    ingredients = ingredientsArray.join();
}

function searchRecipes (){
    getIngredientsList();
    let getRecipesURL = `https://api.edamam.com/search?q=${ingredients}&app_id=${appID}&app_key=${appKEY}&to=12`
    $.ajax({
        url : getRecipesURL,
        method : "GET"
    }).then(function(response){
        console.log(response);
        for(let i = 0; i < response.hits.length; i++){
            // console.log(response.hits[i].recipe);
            // console.log(response.hits[i].recipe.label);
            // console.log(response.hits[i].recipe.image);
            // console.log(response.hits[i].recipe.shareAs);
            // console.log(response.hits[i].recipe.totalTime);
            let recipesList = $('#recipes-list');
            let divOne      = $('<div>').attr({'class':'col s12 m6 l4 xl3',});
                recipesList.append(divOne)
            let divTwo      = ($('<div>').attr({'class':'card small','data-url': `${response.hits[i].recipe.url}`}));
                divOne.append(divTwo);
            let divThree    = ($('<div>').attr({'class':'card-image'}));
                divTwo.append(divThree);
            let divFour     = ($('<div>').attr({'class':'card-content'}));
                divTwo.append(divFour);
            let imgElement  = ($('<img>').attr({'src': `${response.hits[i].recipe.image}`}));
                divThree.append(imgElement)
            let spanElement = divFour.append($('<span>').attr({'class':'card-title', 'id':'card-title'}).text(`${response.hits[i].recipe.label}`));
            // let pElement    = divFour.append($('<p>').attr({'class':'card-text'}).text(`Total Time: ${response.hits[i].recipe.totalTime}`));          
        }
        $(`.card.small`).on('click',function(event){
            event.preventDefault();
            console.log(event);
            console.log($(event.currentTarget).attr('data-url'));
        })
    })
}

$('#get-recipe-button').on('click', function(event){
    event.preventDefault();
    console.log(event);
    searchRecipes();
})



