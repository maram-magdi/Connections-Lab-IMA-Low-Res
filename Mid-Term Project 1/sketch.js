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


function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  fill(color1);
  ellipse(200, 200, 50);

}

