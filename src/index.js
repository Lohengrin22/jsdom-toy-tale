let addToy = false;
const url = `http://localhost:3000/toys`
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const collection = document.querySelector('div#toy-collection')
const form = document.querySelector('form')

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

collection.addEventListener('click', function(e){
  const toyLikes = e.target.offsetParent.childElementCount
  if (e.target === 'like-btn') {
    console.log('Like button clicked!!')
    toyLikes ++
    // likesDisplay.textContent = `${likes + 1} likes` // optimistic rendering

    fetch(url, {
          method: 'PATCH',
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
            body: JSON.stringify({
              "likes": likes + 1
            })
        })
        .then(res => res.json())
        .then((likes) => {
          e.target.offsetParent.childElementCount.innerText = `${toylikes}`

        })
}

// function increaseLikes(e){
//   fetch(url, {
//     method: 'PATCH',
//     headers:
//     {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//       body: JSON.stringify({
//         "likes": likes + 1
//       })
//   })
//   .then(res => res.json())
//   .then((likes) => {
//   })
// }


function addNewToy(toy_info){
  fetch (url, {
    method: 'POST',
    headers:
    {
      'Content-Type': "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy_info.name.value,
      "image": toy_info.image.value,
      "likes": 0
    })
  }) 
  .then(res => res.json())
  .then((toyForm) => {
    let newToy = renderOneToy(toyForm)
    collection.append(newToy)
    form.reset
  })
  }


form.addEventListener('submit', function(e){
  e.preventDefault()
  addNewToy(e.target)
  form.reset
  // document.getElementById("myForm").reset()
})

  
  function renderAllToys() {
    return fetch(url)
    .then(res => res.json())
    .then(toys => {
      toys.forEach(toy => renderOneToy(toy))
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


