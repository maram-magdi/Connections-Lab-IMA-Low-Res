let data;
let color1;
let dataset;
let blueC = 0;
// let emotion2;

function preload() {
  fetch('lamp-dataset-2.json')
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData;
      console.log(data);
      dataset = data.Results;
      // emotion2 = dataset.Emotion2;
      for (let i = 0; i < dataset.length; i++) {
        if (dataset[i].Color1 === "Blue") {
          blueC++;
          // color1 = "#F0852D";
          color1 = "#0073cf"
        };
      };

      // starts ChatGPT ////////////////////////////

      function countOccurrences(arr, property) {
        let keywordCounts = {};
      
        arr.forEach(obj => {
          const keyword = obj[property];
          if (keyword) {
            if (keywordCounts[keyword]) {
              keywordCounts[keyword]++;
            } else {
              keywordCounts[keyword] = 1;
            }
          }
        });
      
        return keywordCounts;
      }
      
      const keywordCounts = countOccurrences(dataset, 'Emotion2');
      
      // Display the counts for all unique keywords
      for (const keyword in keywordCounts) {
        console.log(`The keyword "${keyword}" appears ${keywordCounts[keyword]} times.`);
      }

      //ends ChatGPT ///////////////////////////////


      console.log(blueC);
      console.log(color1);
    })
    .catch(err => console.log(err))
}


// window.addEventListener("load", ()=> {
//   fetch('lamp-dataset-2.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);

//     let dataset = data.Results;
//     let color1 = dataset[4].Color1;
//     console.log(color1);
//     // draw(color1);

//   })
//   .catch(err => console.log(err))
// }) 

let pageNo = 1;

let statsButton = document.getElementById('statistics');
let yourLampButton = document.getElementById('your-lamp');
let feelingP = document.getElementById('feeling-p');
let emotion1 = document.getElementById('emotion-1');
let slider1 = document.createElement('input')


statsButton.addEventListener("click", () => {
  pageNo = 1;
  statsButton.classList.add("button-style-active");
  yourLampButton.classList.remove("button-style-active");

  feelingP.innerHTML = "";
})

yourLampButton.addEventListener("click", () => {
  pageNo = 2;
  statsButton.classList.remove("button-style-active");
  yourLampButton.classList.add("button-style-active");

  
  feelingP.innerHTML = "How are you feeling today?"
  emotion1.appendChild(slider1);
  slider1.setAttribute("type", "range");
  slider1.setAttribute("value", "0");

})


function setup() {
  let myCanvas = createCanvas(520, 520);
  myCanvas.parent('lamp-image');

}

function draw() {
  background(220);
  fill(color1);
  ellipse(200, 200, 50);

}

