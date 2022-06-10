let sequence = [];
let barWidth = 15;

let states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  sequence = new Array(floor(width / barWidth));
  for (let i = 0; i < sequence.length; i++) {
    sequence[i] = random(height);
    states[i] = 0;
  }

  bubbleSort(sequence, sequence.length);
}

async function bubbleSort(arr, n) {
  for (let i = 1; i < n; ++i) {
    let key = arr[i];
    let j = i - 1;
    states[i] = 1;

    while (j >= 0 && arr[j] > key) {
      states[j] = 2;
      await Promise.all([(arr[j + 1] = arr[j]), sleep(100)]);
      states[j] = 0;
      j--;
    }
    states[i] = 0;
    arr[j + 1] = key;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function draw() {
  background(0);

  for (let i = 0; i < sequence.length; i++) {
    if (states[i] == 1) fill("#00FF00");
    else if (states[i] == 2) fill("#FF0000");
    else fill(255);
    rect(i * barWidth, height - sequence[i], barWidth, sequence[i]);
  }
}
