const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
  document.getElementById("inputSection").classList.toggle("dark-theme");
  document.getElementById("gamesPlayed").classList.toggle("dark-theme");
  document.getElementById("difficulties").classList.toggle("dark-theme");
  document.getElementById("lifePlaytime").classList.toggle("dark-theme");
  document.getElementById("averagePlaytime").classList.toggle("dark-theme");
  document.getElementById("mouseClicks").classList.toggle("dark-theme");
  document.getElementById("gamesWon").classList.toggle("dark-theme");
  document.getElementById("winRate").classList.toggle("dark-theme");
  document.getElementById("winStreak").classList.toggle("dark-theme");
  document.getElementById("personalBest").classList.toggle("dark-theme");
} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
  document.getElementById("inputSection").classList.toggle("light-theme");
  document.getElementById("gamesPlayed").classList.toggle("light-theme");
  document.getElementById("difficulties").classList.toggle("light-theme");
  document.getElementById("lifePlaytime").classList.toggle("light-theme");
  document.getElementById("averagePlaytime").classList.toggle("light-theme");
  document.getElementById("mouseClicks").classList.toggle("light-theme");
  document.getElementById("gamesWon").classList.toggle("light-theme");
  document.getElementById("winRate").classList.toggle("light-theme");
  document.getElementById("winStreak").classList.toggle("light-theme");
  document.getElementById("personalBest").classList.toggle("light-theme");
}

btn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    document.getElementById("inputSection").classList.toggle("light-theme");
    document.getElementById("gamesPlayed").classList.toggle("light-theme");
    document.getElementById("difficulties").classList.toggle("light-theme");
    document.getElementById("lifePlaytime").classList.toggle("light-theme");
    document.getElementById("averagePlaytime").classList.toggle("light-theme");
    document.getElementById("mouseClicks").classList.toggle("light-theme");
    document.getElementById("gamesWon").classList.toggle("light-theme");
    document.getElementById("winRate").classList.toggle("light-theme");
    document.getElementById("winStreak").classList.toggle("light-theme");
    document.getElementById("personalBest").classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-theme");
    document.getElementById("inputSection").classList.toggle("dark-theme");
    document.getElementById("gamesPlayed").classList.toggle("dark-theme");
    document.getElementById("difficulties").classList.toggle("dark-theme");
    document.getElementById("lifePlaytime").classList.toggle("dark-theme");
    document.getElementById("averagePlaytime").classList.toggle("dark-theme");
    document.getElementById("mouseClicks").classList.toggle("dark-theme");
    document.getElementById("gamesWon").classList.toggle("dark-theme");
    document.getElementById("winRate").classList.toggle("dark-theme");
    document.getElementById("winStreak").classList.toggle("dark-theme");
    document.getElementById("personalBest").classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});
