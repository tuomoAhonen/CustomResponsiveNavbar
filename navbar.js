function navbaropen() {
    var y = document.getElementById("navbuttons");

    var comparebuttons = document.getElementsByClassName("navigation-bar-button");
    var compareindicators = document.getElementsByClassName("page-indicator-text");
    var comparebuttonid = "";

    if (y.style.display === "block") {
        y.style.display = "none";
    } else {
        y.style.display = "block";

        for (var i=0; i<comparebuttons.length; i++) {
            comparebuttons[i].style.display = "block";
            comparebuttonid = comparebuttons[i].id.slice(13);
            if (compareindicators[0].id==comparebuttonid) {
                comparebuttons[i].style.display = "none";
            }
        }
    }

}

function navbarmobileclose() {
    var x = document.getElementById("navbuttons");
    x.style.display = "none";
}


