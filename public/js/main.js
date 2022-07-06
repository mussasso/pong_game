
// changer le backgroundImage pour avoir plusieur terrain 

let random = Math.floor(Math.random()*7)
let background = document.getElementsByTagName('body')[0]
let p1= document.getElementById('block1')
console.log(p1);

switch (random) {
    case 1:
        background.style.backgroundImage = "url(./public/image/1.png)"
        console.log("url(./public/image/1.png)");
        break;
    case 2:
        background.style.backgroundImage = "url(./public/image/2.png)"
        break;
    case 3:
        background.style.backgroundImage = "url(./public/image/3.png)"
        break;
    case 4:
        background.style.backgroundImage = "url(./public/image/4.png)"
        break;
    case 5:
        background.style.backgroundImage = "url(./public/image/5.jpeg)"
        break;
    case 6:
        background.style.backgroundImage = "url(./public/image/6.jpeg)"
        break;

    default:
        background.style.backgroundImage = "url(./public/image/2.png)"

        break;
}

