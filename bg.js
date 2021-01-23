const body = document.querySelector("body");
const IMAGE_NUM = 5;

function genNumber() {
  return Math.floor(Math.random() * IMAGE_NUM) + 1;
}

function paintImg(imgNum) {
  const img = new Image();
  img.src = `/img/${imgNum}.jpg`;
  img.classList.add("bgImage");
  body.appendChild(img);
}
function init() {
  const imgNum = genNumber();
  paintImg(imgNum);
}

init();
