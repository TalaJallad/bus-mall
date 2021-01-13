'use strict';
function restoreResults() {
    //console.log(arrayOfObjects);
    if (localStorage.length > 0) {
        arrayOfObjects = JSON.parse(localStorage.getItem('results'));
        //return arrayOfObjects
    }
    console.log('tala');
}


var arrayOfObjects = [];
var jpgImages = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon',
    'pen', 'pet-sweep', 'scissors', 'shark', 'water-can', 'wine-glass', 'tauntaun', 'unicorn'];

restoreResults();

function Products(productName, imgUrl) {
    this.name = productName;
    this.url = 'img/' + imgUrl;
    this.counter = 0;
    this.showtTimes = 0;
    arrayOfObjects.push(this);

}
///////////////////////////////////////////////////////////////
//create objects//////////////////////////
for (var i = 0; i < jpgImages.length; i++) {
    new Products(jpgImages[i], jpgImages[i] + '.jpg');
};

new Products('usb', 'usb.gif');
new Products('sweep', 'sweep.png');
/////////////////////////////////////////

//////////////////////////////////////////////////
//link to html///////////////////////////////////////////////
var productsSection = document.getElementById('productsImages');
var leftImage = document.getElementById('left-img');
var middleImage = document.getElementById('mid-img');
var rightImage = document.getElementById('right-img');
var leftImageText = document.getElementById('left-img-name');
var middleImageText = document.getElementById('mid-img-name');
var rightImageText = document.getElementById('right-img-name');
//var chartButton= document.getElementById('showreRults');
//////////////////////////////////////////////////////////////

//choose 3 random images + display name/////////////////////////
var shownImages = []
function randomImg() { // this generates random index


    do {
        var leftChoice = Math.round(Math.random() * (arrayOfObjects.length - 1));
        var midChoice = Math.round(Math.random() * (arrayOfObjects.length - 1));
        var rightChoice = Math.round(Math.random() * (arrayOfObjects.length - 1));

    } while ((leftChoice === midChoice || leftChoice === rightChoice || midChoice === rightChoice ||
        shownImages.includes(arrayOfObjects[leftChoice]) || shownImages.includes(arrayOfObjects[midChoice]) ||
        shownImages.includes(arrayOfObjects[rightChoice])));


    shownImages = [];

    shownImages.push(
        arrayOfObjects[leftChoice],
        arrayOfObjects[midChoice],
        arrayOfObjects[rightChoice])

    renderImg(leftChoice, midChoice, rightChoice);
}

function renderImg(leftChoice, midChoice, rightChoice) { //this is to get the imge with the random index
    leftImage.setAttribute('src', arrayOfObjects[leftChoice].url);
    middleImage.setAttribute('src', arrayOfObjects[midChoice].url);
    rightImage.setAttribute('src', arrayOfObjects[rightChoice].url);

    leftImageText.textContent = arrayOfObjects[leftChoice].name; //this shows name under img
    middleImageText.textContent = arrayOfObjects[midChoice].name;
    rightImageText.textContent = arrayOfObjects[rightChoice].name;

}

randomImg();
/////////////////////////////////////////////////////////
/////////////restoreItems////////////////////////



//////////////////////////////////////
//click count///////////////////////////////////////
productsImages.addEventListener('click', checkProducts);
//////////////////////////////////////

var trials = 10;

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
    }
    else {
        productsImages.removeEventListener('click', checkProducts);
        var showResultsButton = document.createElement('button');
        showResultsButton.innerHTML = "View Results";
        productsSection.appendChild(showResultsButton);
        showResultsButton.addEventListener("click", viewResult);

        localStorage.setItem('results', JSON.stringify(arrayOfObjects));



    }




    //console.log("tala");
}




///////create chart///////////////////////////////////////////
var resultsCanvas = document.getElementById('resultsChart').getContext('2d');


function viewResult() {

    var arrayOfProductsNames = [];
    var arrayOfClicks = [];
    var arrayOfShowTimes = [];

    for (var index = 0; index < arrayOfObjects.length; index++) {
        arrayOfProductsNames.push(arrayOfObjects[index].name);
        arrayOfClicks.push(arrayOfObjects[index].counter);

        arrayOfShowTimes.push(arrayOfObjects[index].showtTimes);

    }

    var resultsChart = new Chart(resultsCanvas, {
        type: 'bar',
        data: {
            labels: arrayOfProductsNames,
            datasets: [
                {
                    label: '# of Product Clicks',
                    data: arrayOfClicks,
                    backgroundColor: [
                        'rgba((205,92,92,0.2)',
                        'rgba(240,128,128, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255,215,0, 0.2)',
                        'rgba(218,165,32, 0.2)',
                        'rgba(220,20,60, 0.2)',
                        'rgba(154,205,50, 0.2)',
                        'rgba(124,252,0, 0.2)',
                        'rgba(144,238,144, 0.2)',
                        'rgba(0,255,127, 0.2)',
                        'rgba(32,178,170, 0.2)',
                        'rgba(47,79,790, 0.2)',
                        'rgba(0,255,255, 0.2)',
                        'rgba(25,25,112, 0.2)',
                        'rgba(138,43,226, 0.2)',
                        'rgba(139,0,139, 0.2)',
                        'rgba(238,130,238, 0.2)',
                        'rgba(160,82,45, 0.2)',
                        'rgba(244,164,96, 0.2)',
                        'rgba(119,136,153, 0.2)'

                    ],
                    borderColor: [
                        'rgba((205,92,92,1)',
                        'rgba(240,128,128, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255,215,0, 1)',
                        'rgba(218,165,32, 1)',
                        'rgba(220,20,60, 1)',
                        'rgba(154,205,50, 1)',
                        'rgba(124,252,0, 1)',
                        'rgba(144,238,144, 1)',
                        'rgba(0,255,127, 1)',
                        'rgba(32,178,170, 1)',
                        'rgba(47,79,790, 1)',
                        'rgba(0,255,255, 1)',
                        'rgba(25,25,112, 1)',
                        'rgba(138,43,226, 1)',
                        'rgba(139,0,139, 1)',
                        'rgba(238,130,238, 1)',
                        'rgba(160,82,45, 1)',
                        'rgba(244,164,96, 1)',
                        'rgba(119,136,153, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: '# of Times Shown',
                    data: arrayOfShowTimes,
                    backgroundColor: [
                        'rgba((205,92,92,0.2)',
                        'rgba(240,128,128, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255,215,0, 0.2)',
                        'rgba(218,165,32, 0.2)',
                        'rgba(220,20,60, 0.2)',
                        'rgba(154,205,50, 0.2)',
                        'rgba(124,252,0, 0.2)',
                        'rgba(144,238,144, 0.2)',
                        'rgba(0,255,127, 0.2)',
                        'rgba(32,178,170, 0.2)',
                        'rgba(47,79,790, 0.2)',
                        'rgba(0,255,255, 0.2)',
                        'rgba(25,25,112, 0.2)',
                        'rgba(138,43,226, 0.2)',
                        'rgba(139,0,139, 0.2)',
                        'rgba(238,130,238, 0.2)',
                        'rgba(160,82,45, 0.2)',
                        'rgba(244,164,96, 0.2)',
                        'rgba(119,136,153, 0.2)'
                    ],
                    borderColor: [
                        'rgba((205,92,92,1)',
                        'rgba(240,128,128, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255,215,0, 1)',
                        'rgba(218,165,32, 1)',
                        'rgba(220,20,60, 1)',
                        'rgba(154,205,50, 1)',
                        'rgba(124,252,0, 1)',
                        'rgba(144,238,144, 1)',
                        'rgba(0,255,127, 1)',
                        'rgba(32,178,170, 1)',
                        'rgba(47,79,790, 1)',
                        'rgba(0,255,255, 1)',
                        'rgba(25,25,112, 1)',
                        'rgba(138,43,226, 1)',
                        'rgba(139,0,139, 1)',
                        'rgba(238,130,238, 1)',
                        'rgba(160,82,45, 1)',
                        'rgba(244,164,96, 1)',
                        'rgba(119,136,153, 1)'
                    ],
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    //console.log(arrayOfShowTimes);

}
////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////
//create results list for lab 11 //
// var resultsList = document.getElementById('Results');
// function viewResult() {
//     for (var i = 0; i < arrayOfObjects.length; i++) {
//         var imageResult = document.createElement('ul');
//         resultsList.appendChild(imageResult);
//         imageResult.textContent = arrayOfObjects[i].name + ':'
//         var counterTotal = document.createElement('li');
//         imageResult.appendChild(counterTotal);
//         counterTotal.textContent = 'Clicks = ' + arrayOfObjects[i].counter
//         var showTotal = document.createElement('li');
//         imageResult.appendChild(showTotal);
//         showTotal.textContent = 'Showingtimes = ' + arrayOfObjects[i].showtTimes;

//     }
// }
////////////////////////////////////////////////////////////////////


