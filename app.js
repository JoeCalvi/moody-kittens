let kittens = []

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let name = form.name.value

  if (findKittenByName(name)) {
    alert("Name already in use!")
    return
  }

  let kitten = {
    id: generateId(),
    name: name,
    affection: 5
  }

  setKittenMood(kitten)

  kittens.push(kitten)
  saveKittens()
  form.reset()

  drawKittens()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData) {
    kittens = kittensData
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {

  let kittensElement = document.getElementById("kitten")

  let kittensTemplate = ""

  kittens.forEach(kitten => {
    kittensTemplate += `
    <div class="p-2 kitten ${kitten.mood}">
      <div id="kittens" class="d-flex align-items-center flex-wrap">
        <img src="White_Kitten_Transparent_PNG_Clipart.png" alt="kitten" class="kitten">
      </div>
      <div>
      <p>Name: ${kitten.name}</p>
      <p>Mood: ${kitten.mood}</p>
      <p>Affection: ${kitten.affection}</p>
        <button class="btn-cancel" onclick="pet(${kitten.id})">Pet</button>
        <button onclick="catnip(${kitten.id})">Catnip</button>
      </div>
    </div>
    `
  })

  kittensElement.innerHTML = kittensTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {

  const result = kittens.find(kitten => kitten.id == id)
  return result;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenByName(name) {

  const result = kittens.find(kitten => kitten.name.toLowerCase() == name.toLowerCase())
  return result;
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {

  let kitten = findKittenById(id)

  let randomNumber = Math.random()

  if (randomNumber > .5) {
    if (kitten.affection < 10) {
      kitten.affection++
    }
  }
  else {
    if (kitten.affection > 0) {
      kitten.affection--
    }
  }

  setKittenMood(kitten)
  saveKittens()
  drawKittens()
}



/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {

  let kitten = findKittenById(id)

  if (kitten.affection < 5) {
    kitten.affection = 5
  }

  setKittenMood(kitten)
  saveKittens()
  drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {

  if (kitten.affection == 0) {
    kitten.mood = "gone"
  } else if (kitten.affection < 5) {
    kitten.mood = "angry"
  } else if (kitten.affection == 5) {
    kitten.mood = "tolerant"
  } else if (kitten.affection > 5) {
    kitten.mood = "happy"
  }
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {

  kittens = []
  saveKittens()
  drawKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();

  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) // + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
getStarted();