'use strict';

var arrayOfObjects = [];
var jpgImages = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon',
    'pen', 'pet-sweep', 'scissors', 'shark', 'water-can', 'wine-glass', 'tauntaun', 'unicorn'];

function Products(productName, imgUrl) {
    this.name = productName;
    this.url = 'img/' + imgUrl;
    this.counter = 0;
    this.showtTimes = 0
    arrayOfObjects.push(this);
}

//create obects//////////////////////////
for (var i = 0; i < jpgImages.length; i++) {
    new Products(jpgImages[i], jpgImages[i] + '.jpg');
};

new Products('usb', 'usb.gif');
new Products('sweep', 'sweep.png');
/////////////////////////////////////////

//link to html///////////////////////////////////////////////
var productsSection = document.getElementById('productsImages');
var leftImage = document.getElementById('left-img');
var middleImage = document.getElementById('mid-img');
var rightImage = document.getElementById('right-img');
var leftImageText = document.getElementById('left-img-name');
var middleImageText = document.getElementById('mid-img-name');
var rightImageText = document.getElementById('right-img-name');
//////////////////////////////////////////////////////////////

//choose 3 random images + display name/////////////////////////
function randomImg() {
    do {
        var leftChoice = Math.round(Math.random() * (arrayOfObjects.length - 1));
        var midChoice = Math.round(Math.random() * (arrayOfObjects.length - 1));
        var rightChoice = Math.round(Math.random() * (arrayOfObjects.length - 1));
    } while (leftChoice === midChoice || leftChoice === rightChoice || midChoice === rightChoice);
    renderImg(leftChoice, midChoice, rightChoice);

}

function renderImg(leftChoice, midChoice, rightChoice) {
    leftImage.setAttribute('src', arrayOfObjects[leftChoice].url);
    middleImage.setAttribute('src', arrayOfObjects[midChoice].url);
    rightImage.setAttribute('src', arrayOfObjects[rightChoice].url);

    leftImageText.textContent = arrayOfObjects[leftChoice].name;
    middleImageText.textContent = arrayOfObjects[midChoice].name;
    rightImageText.textContent = arrayOfObjects[rightChoice].name;

}

randomImg();
/////////////////////////////////////////////////////////

//image count///////////////////////////////////////
productsImages.addEventListener('click', checkProducts);
var trials = 3;
function objectCounter(objectIndicator) {
    for (var index = 0; index < arrayOfObjects.length; index++) {
        if (arrayOfObjects[index].url === objectIndicator) {
            arrayOfObjects[index].counter++;
            trials--;
            //console.log(arrayOfObjects[index].counter)
        }
    }
}
////////////////////////////////////////////////////////

//check show times://///////////////////////////////////
function showTimesCounter() {
    for (var i = 0; i < arrayOfObjects.length; i++) {
        if (leftImage.getAttribute('src') === arrayOfObjects[i].url || rightImage.getAttribute('src') === arrayOfObjects[i].url || middleImage.getAttribute('src') === arrayOfObjects[i].url) {
            arrayOfObjects[i].showtTimes++;
            //console.log(arrayOfObjects[i].showtTimes);


        }
    }
}
showTimesCounter();
////////////////////////////////////////////////////////////
//call back function//////////////////////////////////////////
function checkProducts(event) {

    var targetId = event.target.id;

    if (trials !== 0) {
        if (targetId === 'left-img' || targetId === 'mid-img' || targetId === 'right-img') {
            var objectIndicator = event.target.getAttribute('src');
            randomImg();
            objectCounter(objectIndicator);
            showTimesCounter();
        }

    } else {
        productsSection.removeEventListener('click', checkProducts);
        var showResultsButton = document.createElement('button');
        showResultsButton.innerHTML = "View Results";
        //showResultsButton.setAttribute('onclick', 'viewResult()');//
        productsSection.appendChild(showResultsButton);
        showResultsButton.addEventListener("click", function () {
            viewResult();
        });



    }
}

//////////////////////////////////////////////////////////////////
//create results list//
var resultsList = document.getElementById('Results');
function viewResult() {
    for (var i = 0; i < arrayOfObjects.length; i++) {
        var imageResult = document.createElement('ul');
        resultsList.appendChild(imageResult);
        imageResult.textContent = arrayOfObjects[i].name + ':'
        var counterTotal = document.createElement('li');
        imageResult.appendChild(counterTotal);
        counterTotal.textContent = 'Clicks = ' + arrayOfObjects[i].counter
        var showTotal = document.createElement('li');
        imageResult.appendChild(showTotal);
        showTotal.textContent = 'Showingtimes = ' + arrayOfObjects[i].showtTimes;

    }
}
////////////////////////////////////////////////////////////////////