function navbaropen() {
    var y = document.getElementById("navbuttons");
    if (y.style.display === "block") {
        y.style.display = "none";
    } else {
        y.style.display = "block";
    }
}

function navbarmobileclose() {
    var x = document.getElementById("navbuttons");
    x.style.display = "none";
}