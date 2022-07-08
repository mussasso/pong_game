
// changer le backgroundImage pour avoir plusieur terrain 

let random = Math.floor(Math.random()*7)
let background = document.getElementsByTagName('canvas')[0]
let joueur = document.getElementsByTagName('select')[0]
let difficulte = document.getElementsByTagName('select')[1]




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
        background.setAttribute('class' , 'myback')

        break;
}


let canvas = document.getElementById('game')
let context= canvas.getContext('2d'),
    width = window.innerWidth ,
    height = window.innerHeight,
    ratio = window.devicePixelRatio ;

    canvas.width = width * ratio
    canvas.height = height * ratio
    canvas.style.width = width + "px"
    canvas.style.height = height + "px"
    context.scale(ratio, ratio)

    class Ball{
        constructor(vx, vy)
        {
            this.x= width/2
            this.y= height/2
            this.vx= vx;
            this.vy= vy;
            
        }
        update()
        {
            this.edges()
            this.x += this.vx
            this.y += this.vy
            

            this.r = 15 
        }
        edges(){
            if (this.y + this.r > height) {
                this.vy *= -1
            }
            else if (this.y - this.r< 0) {
                this.vy *= -1
            }
            if (this.x + this.r > width) {
                Restartgame()
                p1.score++
                
                if (p1.score == 10) {
                    alert('le joueur 1 a gagner')
                    p1.score = 0
                }
            }
            else if (this.x - this.r < 0) {
                Restartgame()
                p2.score++
                if (p2.score == 10) {
                    alert('le joueur 1 a gagner')
                    p2.score = 0
                }
                
            }
        }
        players(player)
        {
            let left = this.x - this.r ,
                right = this.x+ this.r ,
                top = this.y - this.r ,
                bottom = this.y + this.r 

            let pleft= player.x - player.w / 2,
                pright= player.x + player.w / 2,
                ptop = player.y - player.h / 2,
                pbottom = player.y + player.h / 2

            if (left < pright && right> pleft && top < pbottom && bottom > ptop) 
            {
                this.vx *= -1
                
            }
        }
        show()
        {
            context.beginPath()
            context.arc(this.x , this.y, 15 , 0 , 2*Math.PI)
            context.fill()
        }
    }
    class Player{
        constructor(x, xscore)
        {
            this.x = x
            this.y = height/2
            this.w = 10
            this.h = 100
            this.score= 0
            this.xscore= xscore
        }
        show()
        {
            let top = this.y - this.h / 2,
                left = this.x - this.w / 2
                
                context.fillText("Score: " + this.score ,  this.xscore , 30)
                context.font= ("30px Arial")
                context.fillRect(left , top , this.w , this.h)
        }
    }
    let random1= Math.floor(Math.random()*10+1)
    let random2= Math.floor(Math.random()*2)
    let hazard;
    switch (random2) {
        case 0:
            hazard=random1
            break;
        case 1:
            hazard=(random1) * (-1)
            console.log(hazard);
            break;
    
        default:
            break;
    }
    
    let ball = new Ball(hazard , random1)
    let p1 = new Player(20 , 250 )
    let p2 = new Player(width-20 , width - 400)
    let bot = new Player(width-20 , width - 400)
    
    addEventListener('mousemove' ,function(e){
        p1.y = e.clientY
    })
    addEventListener('keydown' , function(e){
        if (e.keyCode==38) 
        {
            p2.y -= 50
        } 
        else if (e.keyCode==40) {
            p2.y += 50
        }
    })
    function Restartgame() 
    {
        ball.x = width/2   
        ball.y = height/2   
    }
    animate()
    function animate()
    {
        context.clearRect( 0 , 0 , width , height)

        context.beginPath()
        context.moveTo(width / 2,0)
        context.lineTo(width / 2, height)
        context.stroke()
  
        if (joueur.value == "deuxieme jouer") {
            ball.players(p1)
            ball.players(p2)
            ball.update()
            ball.show()
            p1.show()
            p2.show()
            requestAnimationFrame(animate)
            
        } else if (joueur.value == "ai") {
            switch (difficulte.value) {
                case 'easy':
                bot.y += ((ball.y - (bot.y + bot.h/2)))*0.1;
                    
                    break;
                case 'medium':
                bot.y += ((ball.y - (bot.y + bot.h/2)));
                    
                    break;
                case 'hard':
                bot.y += ((ball.y - (bot.y + bot.h/2)))*1.3;
                    
                    break;
            
                default:
                bot.y += ((ball.y - (bot.y + bot.h/2)));

                    break;
            }
            ball.players(p1)
            ball.players(bot)
            ball.update()
            ball.show()
            p1.show()
            bot.show()
            requestAnimationFrame(animate)
            
        }

    }