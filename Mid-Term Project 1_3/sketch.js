let data;
let data2;
let lampFrame;

function preload() {
  lampFrame = loadImage('images/lamp-frame.png');
  fetch('lamp-dataset-3.json')
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData.Sheet1;
      console.log(data);
    })
    .catch(err => console.log(err))

  fetch('lamp-dataset-4.json')
  .then(response => response.json())
  .then (jsonData => {
    data2 = jsonData.Sheet2;
    console.log(data2);
  })
  .catch(err => console.log(err))
}


let pageNo = 1;

let statsButton = document.getElementById('statistics');
let yourLampButton = document.getElementById('your-lamp');
let feelingP = document.getElementById('feeling-p');
let description = document.getElementById('description');

let rightSection = document.getElementById('right-section');
let emotions = [];
let sliders = [];

const slideValues = {
  Anxious: 0,
  Calm: 0,
  Excited: 0,
  Sad: 0,
  Tired: 0,
};


statsButton.addEventListener("click", () => {
  pageNo = 1;
  statsButton.classList.add("button-style-active");
  yourLampButton.classList.remove("button-style-active");

  feelingP.innerHTML = "";
  description.innerHTML = "The visualization below shows the emotions people experienced after viewing the light colors from the lamp, which were limited to red, orange, yellow, green and blue. Based on people's feedback, the lamp's light colors evoked different emotions. The colors shown below represent a weighted averaged color of the lamp's light colors based on recurrence, while the size of the circles represent the number of people. The cooler a color is, the more people felt biased towards the cooler end of the light spectrum, and vice versa.";
  
  for(let i = 0; i < data2.length; i++){
    rightSection.removeChild(rightSection.lastChild);
    slideValues[data2[i].Emotion1] = 0;
  }

  r = 220; g = 220; b = 220;
})

yourLampButton.addEventListener("click", () => {
  pageNo = 2;
  statsButton.classList.remove("button-style-active");
  yourLampButton.classList.add("button-style-active");

  feelingP.innerHTML = "How are you feeling today?"
  //should have analyzed for positive influence of emotions...
  description.innerHTML = "Find out which light color your very own lamp would show you to improve your mood based on how you feel. Resulting color is a combined color determined by your emotion ratio. These colors are based on people's data and feedback. Note that if you input a single emotion, the slider will not have an effect on the resulting color since your emotion ratio signifies one emotion, therefore one unchanging color.";

  for(let i = 0; i < data2.length; i++){

    let emotionSect = document.createElement('section');
    let emotionName = document.createElement('p');
    let slider1 = document.createElement('input');
    slider1.setAttribute("type", "range");
    slider1.setAttribute("value", "0");
    // slider1.setAttribute("style", "background: black;")
    slider1.addEventListener("change", (event) => {
      // console.log(data2[i].Emotion1);
      // console.log(event.target.value);
      count = 0; totalR = 0; totalG = 0; totalB = 0;
      slidersT = 0;
      slideValues[data2[i].Emotion1] = event.target.value;
      console.log(slideValues);
      calculateRGB();
    })

    sliders[i] = slider1;
    emotions.push(data2[i].Emotion1);
    // console.log(sliders[i].value);

    rightSection.appendChild(emotionSect);
    emotionSect.appendChild(emotionName);
    emotionSect.appendChild(sliders[i]);

    emotionName.innerHTML = data2[i].Emotion1;
    
  }
  // console.log(rightSection);
  // console.log(emotions);
  
})



let allCircles = [];
let count = 0;
let slidersT = 0;
let ratio = {
  Anxious: 0,
  Calm: 0,
  Excited: 0,
  Sad: 0,
  Tired: 0,
};
let r = 220, g = 220, b = 220;
let totalR = 0, totalG = 0, totalB = 0;

function mapSliderCal(i){
  slidersT += Number(slideValues[data2[i].Emotion1]);
}

function calculateRGB (){
  for (let i = 0; i < data2.length; i++){
    if (slideValues[data2[i].Emotion1] > 0 && pageNo === 2){
      count++;
    };
    mapSliderCal(i);
  }
  console.log("Count: " + count);
  console.log("Total percentage of sliders: " + slidersT);

  for(let i = 0; i < data2.length; i++){
    ratio[data2[i].Emotion1] = Number(slideValues[data2[i].Emotion1])/slidersT;
  }
  console.log(ratio);

  for(let i = 0; i < data2.length; i++){
    totalR += data2[i].CalculatedR * ratio[data2[i].Emotion1];
    totalG += data2[i].CalculatedG * ratio[data2[i].Emotion1];
    totalB += data2[i].CalculatedB * ratio[data2[i].Emotion1];
  }
  console.log("Total R value after ratio calculation: " + totalR);

  if (count === 0){
    r = 220; g = 220; b = 220;
  } else{
    r = totalR;
    g = totalG;
    b = totalB;
  }
  console.log("R value is: " + r);
}

function setup() {
  // let myCanvas = createCanvas(0.75 * windowHeight, 0.75 * windowHeight);
  let myCanvas = createCanvas(700, 700);
  myCanvas.parent('lamp-image');

  for(let i = 0; i < data.length; i++){
    let d = 40 * data[i].TotalPpl;
    let x = random(100 + (d/2), 597 - (d/2));
    let y = random(110 + (d/2), 610 - (d/2));
    let r = data[i].CalculatedR;
    let g = data[i].CalculatedG;
    let b = data[i].CalculatedB;
    let e = data[i].Emotion2;
    // console.log(e);
    allCircles[i] = new Circle(x, y, d, r, g, b, e);
  }

}

function draw() {
  background(220);
  // fill("blue");
  // ellipse(200, 200, 50);
  image(lampFrame, 0, 0, width, height);

  if(pageNo === 1){
    count = 0;
    totalR = 0;
    totalG = 0;
    totalB = 0;

    for(let i = 0; i < allCircles.length; i++){
      push();
      // fill(data[i].CalculatedR, data);
      // ellipse(width/2, height/2, 50);
      allCircles[i].show();
      allCircles[i].move();
      allCircles[i].hover();
      pop();
    }
  } else if (pageNo === 2){
    
    let alpha = random (210, 225);
    fill(r, g, b, alpha);
    noStroke();

    for(let ix = 123; ix <= width-126; ix +=45){
      for(let iy = 135; iy <= height-100; iy +=45){
        ellipse(ix, iy, 40);
      }
    }
  };
  
}

// function windowResized() {
//   resizeCanvas(0.75*windowHeight, 0.75*windowHeight);
// }

class Circle {
  constructor(x, y, d, r, g, b, e, xv = 0.5, yv = 0.75){
    this.x = x;
    this.y = y;
    this.d = d;
    this.r = r;
    this.g = g;
    this.b = b;
    this.e = e;
    this.xv = xv;
    this.yv = yv;
  }

  show(){
    fill(this.r, this.g, this.b, 100);
    noStroke();
    ellipse(this.x, this.y, this.d);
  }

  move(){

    if (this.x > 597 - (this.d/2) || this.x < 100 + (this.d/2)) {
      this.xv = this.xv * -1;
    }

    if (this.y > 610 - (this.d/2)|| this.y < 110 + (this.d/2)){
      this.yv = this.yv * -1;
    }

    this.x = this.x + this.xv;
    this.y = this.y + this.yv;
  }

  hover(){
    if(mouseX < this.x +(this.d/2) && mouseX > this.x - (this.d/2) && mouseY < this.y + (this.d/2) && mouseY > this.y - (this.d/2)){
      fill(40);
      textSize(this.d/5);
      textFont("CENTURY GOTHIC");
      textAlign(CENTER, CENTER);
      text(this.e, this.x, this.y);
    }
  }
}