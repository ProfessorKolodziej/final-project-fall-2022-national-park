// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)
function buildCard(post) {
    const card = document.createElement('li'),
       title = document.createElement('h5'),
       excerpt = document.createElement('p'),
       image = document.createElement('img'),
       link = document.createElement('a');
 
    title.innerHTML = "Park Name";
    excerpt.innerHTML = "Park Description";
    image.innerHTML = "Park Image";
    link.innerHTML = "Park Website";
 
    card.appendChild(title);
    card.appendChild(excerpt);
    card.appendChild(link);
 
    return card;
 }
 
 const $postsContainer = document.querySelector("#posts");
 const testCard = buildCard();
 $postsContainer.appendChild(testCard);