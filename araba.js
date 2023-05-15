let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");


var yol = new Image();                      // Resimleri tanımlama
yol.src = "yol.png";

var sariaraba = new Image();
sariaraba.src = "sariaraba.png";

var ikiliaraba = new Image();
ikiliaraba.src = "ikiliaraba.png";

var kirmiziaraba = new Image();
kirmiziaraba.src = "kirmiziaraba.png";

var gap = 190;        // İki araba arasındaki boşluk + ikili arabanın genişliği 
var ax = 150;         // Sarı arabanın başlangıç koordinatları
var ay = 90;
var score = 0;


document.addEventListener("keydown", function(event) {  // Klavye tuşlarına basıldığında çalışacak fonksiyon
    switch(event.keyCode) {
      case 37: // Sol ok tuşu
        ax -= 10;   // Sarı arabanın x koordinatını azaltma
        break;
      case 38: // Yukarı ok tuşu
        ay -= 10;   // Sarı arabanın y koordinatını azaltma
        break;
      case 39: // Sağ ok tuşu
        ax += 10;   // Sarı arabanın x koordinatını arttırma
        break;
      case 40: // Aşağı ok tuşu
        ay += 10;   // Sarı arabanın y koordinatını arttırma
        break;
    }
  });


var araba=[];       // Arabaların koordinatlarını tutan dizi
araba[0] = {        // Arabaların başlangıç koordinatları
    y:550,
    x:0
}


function draw() {                               // Oyunun çalıştığı fonksiyon
    context.drawImage(yol, 0, 0, 300, 700);         // Yol resmini çizdirme
    context.drawImage(sariaraba, ax, ay, 50, 100);      // Sarı araba resmini çizdirme
    for(var i=0; i<araba.length; i++){          // Arabaları çizdirme
        context.drawImage(ikiliaraba, araba[i].x, araba[i].y, 140, 140);           // İkili araba resmini çizdirme    
        context.drawImage(kirmiziaraba, araba[i].x+gap, araba[i].y, 120, 120);      // Kırmızı araba resmini çizdirme
        araba[i].y--;                    // Arabaların y koordinatını azaltma
        
        if(araba[i].y == 10){           // Arabaların y koordinatı 10'a ulaştığında yeni araba oluşturma
            araba.push({                // Yeni araba oluşturma
                x:Math.floor(Math.random()*100),        // Arabanın x koordinatını rastgele belirleme
                y:550                            // Arabanın y koordinatını belirleme
            });
            score++;            // Skoru arttırma
        }

        if((ax < 0 || ay < 0 || ax > 250 || ay > 590) 
        || (ay+75 >= araba[i].y && ay <= araba[i].y+140 && ax >= araba[i].x-25 && ax <= araba[i].x+125)            // Arabaların çarpışma durumlarını kontrol etme
        || (ay+75 >= araba[i].y && ay <= araba[i].y+140 && ax >= araba[i].x+185 && ax <= araba[i].x+290)){
            location.reload();          // Oyun bittiğinde sayfayı yenileme
        }

    }
    
    context.font = "30px Arial";                // Skoru yazdırma
    context.fillStyle = "yellow";
    context.fillText("Score: " + score, 20, 80);
    
    requestAnimationFrame(draw);        // Oyunu sürekli çalıştırma
}

draw();     // Oyunu çalıştırma