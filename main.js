// remove screen
document
  .querySelector(".control-buttons span")
  .addEventListener("click", () => {
    let yourName = prompt("What is your name ?");
    if (yourName == null || yourName == "") {
      document.querySelector(".name span").innerHTML = "unknown";
    } else {
      document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
  });

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

// let range = [...Array(blocks.length).keys()]; #1
let range = Array.from(Array(blocks.length).keys());

// random order
shfflle(range);

blocks.forEach((block, index) => {
  block.style.order = range[index];
  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

function flipBlock(block) {
  block.classList.add("is-flipped");
  let flippedNumber = blocks.filter((block) =>
    block.classList.contains("is-flipped")
  );
  if (flippedNumber.length == 2) {
    checkMacthed(flippedNumber[0], flippedNumber[1]);
    stopClicking();
  } else {
  }
}

function stopClicking() {
  setTimeout(() => {
    blocksContainer.classList.add("no-clicking");
  }, 100);

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMacthed(frist, second) {
  let tries = document.querySelector(".tries span");
  if (frist.dataset.technology == second.dataset.technology) {
    console.log("goood");
    frist.classList.remove("is-flipped");
    second.classList.remove("is-flipped");
    frist.classList.add("has-match");
    second.classList.add("has-match");
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      frist.classList.remove("is-flipped");
      second.classList.remove("is-flipped");
    }, duration);
  }
}

// shuffling method
function shfflle(arr) {
  let cur = arr.length - 1,
    temp,
    random;
  while (cur >= 0) {
    random = Math.floor(Math.random() * cur);
    // start swap
    temp = arr[random];
    arr[random] = arr[cur];
    arr[cur] = temp;
    //end swap
    cur--;
  }
  return arr;
}
