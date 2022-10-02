function navbaropen() {
    var y = document.getElementById("navbuttons");
    var x = document.getElementsByClassName("navigation-bar-button");
    if (y.style.display === "block") {
        y.style.display = "none";
        x[0].style.display = "none";
        x[1].style.display = "none";
        x[2].style.display = "none";
        x[3].style.display = "none";
    } else {
        y.style.display = "block";
        x[0].style.display = "block";
        x[1].style.display = "block";
        x[2].style.display = "block";
        x[3].style.display = "block";
    }
}

function navbarmobileclose() {
    var x = document.getElementsByClassName("navigation-bar-button");
    x[0].style.display = "none";
    x[1].style.display = "none";
    x[2].style.display = "none";
    x[3].style.display = "none";
}