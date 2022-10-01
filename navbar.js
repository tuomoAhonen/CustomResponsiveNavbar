function navbaropen() {
    var y = document.getElementById("navbuttons");
    if (y.style.display === "block") {
        y.style.display = "none";
    } else {
        y.style.display = "block";
    }
}

function navbarmobileclose() {
    var x = document.getElementsByClassName("navigation-bar-button");
    x[0].style.display = "none";
    x[1].style.display = "none";
    x[2].style.display = "none";
    x[3].style.display = "none";
}