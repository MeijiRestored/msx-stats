$(document).ready(function () {
  loadEvent();
});

/**
 * Check if HTML5 file API is supported
 * @returns {boolean} True if supported, else False
 */
function supportsFileAPI() {
  return window.File && window.FileReader && window.FileList && window.Blob;
}

function loadEvent() {
  var $container = $("#container");
  if (!supportsFileAPI()) {
    $container.html(
      "<div id='error'>This browser does not support the HTML5 file API. Please switch to another browser.</div>"
    );
  } else {
    var $fileIn = $("#input");
    $fileIn.bind("change", loadFile);
    $("#inputLabel").bind("click", function () {
      $fileIn.click();
    });
  }
}

function error(msg) {
  $("#outputSection").html("<div id='error'>" + msg + "</div>");
}

function loadFile(evt) {
  evt = evt.originalEvent || evt;
  var statsfile = evt.target.files[0];
  readFile(statsfile);
}

function readFile(statsFile) {
  var reader = new FileReader();
  reader.onload = (function (theFile) {
    return function (e) {
      $("#outputSection").html("<h3>Loading stats...</h3>");
      var data = e.target.result;
      // Change decimal seperator from comma to point.
      data = data.replaceAll(",", ".");
      // Split data into an array.
      var stats = data.split(/\r?\n/);
      // Remove first line which is just the name of the different stats, and last line that is left empty.
      stats.splice(0, 1);
      stats.splice(stats.length - 1, 1);

      // We now have an array where each value is one minesweeper game. Iterate each one and build up stats.
      // Variables for different stats
      var totalGames = stats.length;
      var diffBeg = 0;
      var diffInt = 0;
      var diffExp = 0;
      var diffCus = 0;
      var playtime = 0;
      var Lclicks = 0;
      var Mclicks = 0;
      var Rclicks = 0;

      for (let i in stats) {
        // Split stats by tab char (U+0009)
        var game = stats[i].split("\t");
        // Check played difficulty
        if (game[0] === "Beg") {
          diffBeg += 1;
        } else if (game[0] === "Int") {
          diffInt += 1;
        } else if (game[0] === "Exp") {
          diffExp += 1;
        } else if (game[0] === "Cus") {
          diffCus += 1;
        }

        // Add playtime
        var gamePlaytime = parseFloat(game[4]);
        playtime += gamePlaytime;

        // Add mouse clicks
        Lclicks += parseInt(game[9]);
        Mclicks += parseInt(game[10]);
        Rclicks += parseInt(game[11]);
      }

      // Calculate average game time.
      var avgTime = playtime / totalGames;

      // Results are ready, print to user.
      $("#outputSection").html("<h3>Stats loaded!</h3>");
      $("#stats").show();
      $("#gamesPlayed").html(
        `Total games played<br><b><font size="7">${totalGames.toString()}</font></b>`
      );
      $("#difficulties").html(
        `Played modes<br><font size="2">Beginner: </font><font color="#33ff00">${diffBeg.toString()}</font><br><font size="2">Intermediate: </font><font color="#ccee00">${diffInt.toString()}</font><br><font size="2">Expert: </font><font color="#ff1100">${diffExp.toString()}</font><br><font size="2">Custom: </font><font color="#db00bd">${diffCus.toString()}</font>`
      );
      var duration = playtime * 1000;
      var milliseconds = parseInt(duration % 1000),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt(duration / (1000 * 60 * 60));

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      if (hours == 0) {
        $("#lifePlaytime").html(
          `Life Playtime<br><b>${minutes.toString()}</b><font size="2"> minutes</font><br><b>${seconds.toString()}</b><font size="2"> seconds</font><br><b>${milliseconds.toString()}</b><font size="2"> milliseconds</font>`
        );
      } else {
        $("#lifePlaytime").html(
          `Life Playtime<br><b>${hours.toString()}</b><font size="2"> hours</font><br><b>${minutes.toString()}</b><font size="2"> minutes</font><br><b>${seconds.toString()}</b><font size="2"> seconds</font><br><b>${milliseconds.toString()}</b><font size="2"> milliseconds</font>`
        );
      }

      var durationAvg = avgTime * 1000;
      var millisecondsAvg = parseInt(durationAvg % 1000),
        secondsAvg = parseInt(durationAvg / 1000);

      $("#averagePlaytime").html(
        `Average time per game<br><br><b>${secondsAvg.toString()}.${millisecondsAvg.toString()}</b><font size="2"> seconds</font>`
      );
      $("#mouseClicks").html(
        `Mouse Clicks<br><b>${Lclicks.toString()}</b><font size="2"> left</font><br><b>${Mclicks.toString()}</b><font size="2"> middle</font><br><b>${Rclicks.toString()}</b><font size="2"> right</font><br><b>${(
          Lclicks +
          Mclicks +
          Rclicks
        ).toString()}</b><font size="2"> total</font>`
      );
    };
  })(statsFile);
  reader.readAsBinaryString(statsFile);
}
