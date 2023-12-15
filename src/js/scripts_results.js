// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

 const $postsContainer = document.querySelector("#posts");


 let cacheData = [];
 let sortByItem = 'Alphabet';
 let stateItem = '';
 const API_KEY = 'patS83q6RSl9KNdyZ.d8088ef80bfa94b02c2d37b371772dbbd4ba5abd1705d08b896a0dc02803268f';
 const baseId = 'appDHQmidjTV522ws';
 const tableId = 'tblNNuWsHyOBLQhSX';
 const apiUrl = `https://api.airtable.com/v0/appDHQmidjTV522ws/Projects`;
 
 const theFilters = localStorage.getItem('parkFilters');
    console.log(theFilters)

 async function fetchAndDisplayResults() {
try {
const storedFilters = JSON.parse(localStorage.getItem('parkFilters')) || {};
let orFilters = [];
let andFilters = [];

['Activities', 'Features', 'Popularity'].forEach(category => {
    let categoryFilters = [];
    for (let item in storedFilters[category]) {
        if (storedFilters[category][item]) {
            categoryFilters.push(`FIND('${item}', {${category}})`);
        }
    }
    if (categoryFilters.length) {
        orFilters.push(`OR(${categoryFilters.join(', ')})`);
    }
});

for (let item in storedFilters['LocationClimate']) {
    if (storedFilters['LocationClimate'][item]) {
        andFilters.push(`FIND('${item}', {LocationClimate})`);
    }
}

let requestUrl = apiUrl;
let combinedFilters = [...orFilters, ...andFilters];
if (combinedFilters.length) {
    requestUrl = `${apiUrl}?filterByFormula=AND(${combinedFilters.join(', ')})`;
}

const response = await fetch(requestUrl, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
    },
    method: 'GET',
    mode: 'cors',
});

   if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
}

   const data = await response.json();
   if (data && data.records) {
      cacheData = data.records;
      displayResults({ records: data.records });
  } else {
      console.error('No records found in the response');
  }

data.records.forEach((v) => {
               let popularityVal = v.fields.Popularity[0];

               if (popularityVal == 'Very Popular') {
                   v.popularityVal = 3;
               }
               if (popularityVal == 'Somewhat Popular') {
                   v.popularityVal = 2;
               }
               if (popularityVal == 'Less Crowded') {
                   v.popularityVal = 1;
               }


               })


//asked ChatGPT: in javascript, how do you sort api data by the value


cacheData = data.records;
displayResults({ records: data.records });

} catch (error) {
console.error('Error fetching and displaying results:', error);
}
}

fetchAndDisplayResults();

 function displayResults(data) {
    if (!data || !data.records) {
        console.error('Invalid data for display');
        return;
    }
    const $dataContainer = document.querySelector("#data");
    $('#data').html('');
    data.records.forEach(record => {
       const card = buildCard(record);
       $dataContainer.appendChild(card);
    });
}

 function buildCard(record) {
    const card = document.createElement('li'),
       ParkName = document.createElement('h5'),
       LocationClimate = document.createElement('p'),
       Activities = document.createElement('p'),
       Features = document.createElement('p'),
       Popularity = document.createElement('p'),
       image = document.createElement('img');
    card.classList = "card-item";
    ParkName.innerText = record.fields['ParkName'];
    LocationClimate.innerText = "Location/Climate: " + record.fields['LocationClimate'];
    Activities.innerText = "Activities: " + record.fields['Activities'];
    Features.innerText = "Features: " + record.fields['Features'];
    Popularity.innerText = "Popularity: " + record.fields['Popularity'];
    image.src = record.fields['Image'] ? record.fields['Image'][0].url : '';

    card.appendChild(image);
    let rightDiv = document.createElement('div')
    rightDiv.classList = 'card-right';
    rightDiv.appendChild(ParkName);
    rightDiv.appendChild(LocationClimate);
    rightDiv.appendChild(Activities);
    rightDiv.appendChild(Features);
    rightDiv.appendChild(Popularity);
    card.appendChild(rightDiv);
    return card;
 }

 function applyFilters() {
    let filterData = [];
    if (stateItem == 'No Preference') {
       filterData = cacheData;
    }
    if (stateItem && stateItem !== "No Preference") {
       filterData = cacheData.filter((v) => {
          return v.fields.State == stateItem;
       })
    }

    if(!stateItem){
       filterData = cacheData;
    }

    if (sortByItem == 'Alphabet') {
       filterData = filterData.sort((a, b) => {
          return a.fields.ParkName.localeCompare(b.fields.ParkName);
       })
    }
    if (sortByItem == 'Popularity') {
       filterData = filterData.sort((a, b) => {
          return b.popularityVal - a.popularityVal;
       })
    }
    console.log("filterData = ", filterData)
    displayResults({ records: filterData });
 }
 
 //Reference: https://stackoverflow.com/questions/72584377/javascript-sorting-by-value-if-the-values-are-equal-sorting-between-equal-item

 document.querySelectorAll(".sort-item").forEach(item => {
   item.addEventListener('click', function() {
       console.log("sort = ", this.innerText);
       sortByItem = this.innerText;
       applyFilters();
   })
})

document.querySelectorAll(".dropdown-item").forEach(item => {
   item.addEventListener('click', function() {
       console.log("state = ", this.innerText);
       stateItem = this.innerText;
       applyFilters();
   })
})



