// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

function saveFilters() {
    let filters = {
        LocationClimate: {
            'North (Cooler Climate)': document.getElementById('flexRadioDefault1').checked,
            'South (Warmer Climate)': document.getElementById('flexRadioDefault2').checked,
        },
        Features: {
            'Historic Sites': document.getElementById('f1').checked,
            'Coastal Area': document.getElementById('f2').checked,
            'Fall Foliage': document.getElementById('f3').checked,
            'Caves': document.getElementById('f4').checked,
            'Desert Landscape': document.getElementById('f5').checked,
            'Cultural Education': document.getElementById('f6').checked,
            'Glaciers': document.getElementById('f7').checked,
            'Hot springs': document.getElementById('f8').checked,
            'Volcanoes': document.getElementById('f9').checked,
            'Waterfalls': document.getElementById('f10').checked,

        },
        Activities: {
            'Biking': document.getElementById('CheckboxStretched1').checked,
            'Stargazing': document.getElementById('CheckboxStretched2').checked,
            'Water Activities': document.getElementById('CheckboxStretched3').checked,
            'Wildlife Viewing': document.getElementById('CheckboxStretched4').checked,
            'Snow Activities': document.getElementById('CheckboxStretched5').checked,
            'Hiking': document.getElementById('CheckboxStretched6').checked,
            'Fishing': document.getElementById('CheckboxStretched7').checked,
            'Horseback Riding': document.getElementById('CheckboxStretched8').checked,
            'Climbing': document.getElementById('CheckboxStretched9').checked,
        },
        Popularity: {
            'Very Popular': document.getElementById('1stCheckboxStretched').checked,
            'Somewhat Popular': document.getElementById('2ndCheckboxStretched').checked,
            'Less Crowded': document.getElementById('3rdCheckboxStretched').checked,
        }
    };

    localStorage.setItem('parkFilters', JSON.stringify(filters));
    window.location.href = 'index_results.html';
}