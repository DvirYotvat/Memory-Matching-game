
function initModule() {
  $("#cmdNewGame").click(makeNewGame);
}
// function that make a new game
function makeNewGame() {
  let imgArr = [];
  let numCheck;
  let temp;
  let cellCounter = 0;
  let rightCounter = 0;
  let clickcount = 0;
  let fliped = ["", ""];
  let matchcount = 0;

  $("#matchesCounter").text(matchcount);
  $("#movesCounter").text(clickcount);

  for (let i = 1; i <= 30; i++) imgArr[i] = i;

  let str = "<table id = 'tbCards'>";
  str += "<tr>";

  // check how many images you use and scrumbeld in table
  while (1) {
    // get random number
    numCheck = getRandNumber(31);
    cellCounter = 0;

    // use an array to know if we use the image already
    if (imgArr[numCheck] != null) {
        // in case we have 15 images (in total 30 same images*2)
      if (numCheck > 15) {
        imgArr[numCheck] = null;
        numCheck = numCheck - 15;
      } 
      else 
        imgArr[numCheck] = null;

      rightCounter++;
      // add image to the table
      temp = "<img src='images/backCard.png' id=images/" + numCheck.toString() + " class='card'>";
      str += "<td>" + temp + "</td>";
    }
    // get down in the table after 5 images 
    if (rightCounter == 5) {
      rightCounter = 0;
      str += "</tr>";
      str += "<tr>";
    }

    // check if we used all the images
    for (let i = 1; i < imgArr.length + 1; i++) {
      if (imgArr[i] == null) 
        cellCounter++;
    }

    // exsit the loop if we enter all the images to the table
    if (cellCounter >= imgArr.length) {
      break;
    }
  }

  // close the table
  str += "</tr>";

  // check click on the image
  $(".board:first").html(str);
  $(".card").click((e) => {
    let nottemp = $(e.target);
    // case the images already show return
    if (nottemp.hasClass("flip")) 
        return;
    clickcount += 1;

    // case we click on 3rd image and thay are not match flipe over  
    if ($(".flip").size() == 2) {
      console.log($(".flip").size());
      $(".flip").attr("src", "images/backCard.png");
      $(".flip").toggleClass("flip");
    }

    // case we click on the first image in the smae move
    if (clickcount % 2 == 1) {
      nottemp.toggleClass("flip");
      // enter the id to array
      fliped[0] = nottemp.attr("id");
      nottemp.attr("src", `${nottemp.attr("id")}.png`);
      return;
    }

    // case we click on the second image in the smae move
    if (clickcount % 2 == 0) {
      nottemp.toggleClass("flip");
      fliped[1] = nottemp.attr("id");
      nottemp.attr("src", `${nottemp.attr("id")}.png`);
      $("#movesCounter").text(clickcount / 2);
    }
    console.log(fliped);
    console.log(fliped[0] === fliped[1]);

    // case the 2 images have the same id
    if (fliped[0] == fliped[1]) {
        // not leting the image flipe over again
      $(".flip").unbind();
      $(".flip").toggleClass("flip");
      matchcount += 1;
      $("#matchesCounter").text(matchcount);

    }
      // case we have 15 match the game end
    if (matchcount == 15)
      alert(`you won!!!! it's only took you ${clickcount / 2} move. your the king of the under world!`);
  });
}

// get a random number between 1 to max
function getRandNumber(max) {
  var x = Math.floor(Math.random() * max + 1);
  return x;
}

// function that make you wait
function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(initModule);
