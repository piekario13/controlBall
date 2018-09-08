// $("body").keydown(function (zdarzenie) {
//     console.log(zdarzenie.keyCode);
// }); 

// var nazwyKlawiszy = {
//     32: "spacja",
//     37: "lewa",
//     38: "góra",
//     39: "prawa",
//     40: "dół"
// };

// $("body").keydown(function (zdarzenie) {
//     console.log(nazwyKlawiszy[zdarzenie.keyCode]);
// }); 

var płótno = document.getElementById("plotno");
var kontekst = płótno.getContext("2d");
var szerokość = płótno.width;
var wysokość = płótno.height;

var okrąg = function (x, y, promień, wypełnijOkrąg) {
    kontekst.beginPath();
    kontekst.arc(x, y, promień, 0, Math.PI * 2, false);
    if (wypełnijOkrąg) {
        kontekst.fill();
    }   else {
        kontekst.stroke();
    }
};

var Piłka = function () {
    this.x = szerokość / 2;
    this.y = wysokość / 2;
    this.xSzybkość = 5;
    this.ySzybkość = 0;
};

Piłka.prototype.przesuwaj = function () {
    this.x += this.xSzybkość;
    this.y += this.ySzybkość;

    if (this.x < 0) {
        this.x = szerokość;
    }   else if (this.x > szerokość) {
        this.x = 0;
    }   else if (this.y < 0) {
        this.y = wysokość;
    }   else if (this.y > wysokość) {
        this.y = 0;
    }
};

Piłka.prototype.rysuj = function() {
    okrąg(this.x, this.y, 10, true);
};

Piłka.prototype.ustawKierunek = function (kierunek) {
    if (kierunek === "góra") {
        this.xSzybkość = 0;
        this.ySzybkość = -5;
    }   else if (kierunek === "dół") {
        this.xSzybkość = 0;
        this.ySzybkość = 5;
    }   else if (kierunek === "lewa") {
        this.xSzybkość = -5;
        this.ySzybkość = 0;
    }   else if (kierunek === "prawa") {
        this.xSzybkość = 5;
        this.ySzybkość = 0;
    }   else if (kierunek === "stop") {
        this.xSzybkość = 0;
        this.ySzybkość = 0;
    }
};

var piłka = new Piłka();

var działaniaKlawiszy = {
    32: "stop",
    37: "lewa",
    38: "góra",
    39: "prawa",
    40: "dół"
};

$("body").keydown(function (zdarzenie) {
    var kierunek = działaniaKlawiszy[zdarzenie.keyCode];
    piłka.ustawKierunek(kierunek);
});

setInterval(function () {
    kontekst.clearRect(0, 0, szerokość, wysokość);

    piłka.rysuj();
    piłka.przesuwaj();

    kontekst.strokeRect(0, 0, szerokość, wysokość);
}, 30);