let addToy = false;
const url = `http://localhost:3000/toys`
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const collection = document.querySelector('div#toy-collection')


document.addEventListener("DOMContentLoaded", () => {
  
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

  

function renderAllToys() {
  return fetch(url)
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => renderOneToy(toy))
    // console.log(toy)
})
}

function renderOneToy (toy){
  const card = document.createElement('div')
  card.className = 'toy-card'
  card.dataset.id = toy.id
  let image = document.createElement(`img`)
  image.setAttribute('src', toy.image)
  card.innerHTML =`
  <div class="card">
    <h2${toy.name}</h2>
    <img src=${toy.image} class='toy-avatar' </>
    <p> ${toy.likes}</p>
    <button class="like-btn">Like<3</button>
  </div> `

collection.append(card)
}
renderAllToys()


