let training_data = [{
  inputs: [0, 1],
  targets: [1]
},
{
  inputs: [1, 0],
  targets: [1]
},
{
  inputs: [0, 0],
  targets: [0]
},
{
  inputs: [1, 1],
  targets: [0]
}
];

var nn = new NeuralNetwork(2, 6, 1, 0.05);
const frameRateText = document.getElementById("frameRate");

var DIM = 100;
var CanvasSize = 800;
var TileSize = CanvasSize / DIM;

function setup() 
{
  createCanvas(CanvasSize, CanvasSize);
  frameRate(100);
}

function draw() 
{
  frameRateText.textContent = Math.round((1000/deltaTime) * 2)/2;
  background(0);
  for (let i = 0; i < 400; i++) 
  {
    let data = random(training_data);
    nn.train(data.inputs, data.targets);
  }

  for (let x = 0; x < DIM; x++) 
  {
    for (let y = 0; y < DIM; y++) 
    {
      let nnX = map(x, 0, DIM, 0, 1);
      let nnY = map(y, 0, DIM, 0, 1);
      let color = nn.feedForward([nnX, nnY]);
      noStroke();
      fill(color[0] * 200);
      rect(x * TileSize, y * TileSize, TileSize, TileSize);
    }

  }
}

