(function (opts) {

    var canvas, backgrounds, icons, iconActive, killer, runner, c;
    var loopId, flag, direction=1;
    var fishes =[];

    var init = function () {
        canvas = document.querySelector(opts.DOMCanvas);
        backgrounds = document.querySelectorAll(opts.DOMBackgrounds);
        icons = document.querySelectorAll(opts.DOMIcons);

        //Events für backgrounds
        for (var i = 0, max = backgrounds.length; i < max; i++) {
            backgrounds[i].addEventListener('click', setBackground);
        }
        //Events für Icons
        for (var i = 0, max = icons.length; i < max; i++) {
            icons[i].addEventListener('click', setIconActive);
        }

        canvas.addEventListener('click', drawIcon);
        initKiller();
        initRunner();
        moveRunner();        
        //loopId = window.setInterval(moveRunner, 16);//ruft in einem bestimmten Intervall moveRunner auf
        window.addEventListener('keydown', moveKiller);
        window.addEventListener('keydown', initRunner);
    };
    setFlag=false;       
    var moveRunner = function(){
        //window.setTimeout(moveRunner, 16);//ruft sich selbst auf
        window.requestAnimationFrame(moveRunner);
        var left = parseInt(css(runner, 'left'));
        var top = parseInt(css(runner, 'top'));
        /*meine Lösung:
         */
        /* if(left>900){
        
          setFlag=true;
        }
        if(left<0){
            setFlag=false;
        }
        if(setFlag===true){
          left-=3;
        }        
        if(setFlag==false){
            left+=3;
            //window.clearInterval(loopId);
            //window.clearTimeout(loopId);
        }
        
         * oder aber Dozent:*/
        left += 3 * direction;
//        top -= 0.8 * direction;
//        if(top <= 0){
//           top +=3;
//        }
        if(left > 900 || left < 0){
            direction *= -1;
        }         
        runner.style.left=left + "px"; 
        runner.style.top=top +"px";
    }
    var moveKiller = function(e){
        //gibt den KeyCode der Tastatur in der Konsole an               
        var keyCode = e.keyCode;
        console.log(keyCode);
        //CSS-Position auslesen
        var left=parseInt(css(killer,'left')); 
        var top=parseInt(css(killer,'top'));         
        switch(keyCode){
            case 37:
              left=left-5;   
              killer.style.transform='rotateY(0deg)';
              break;
            case 38:
              top=top-5; 
              killer.style.transform='rotate(90deg)';
              break;            
            case 39:
              left=left+5;  
              killer.style.transform='rotateY(180deg)';
              break; 
            case 40:
              top=top+5; 
              killer.style.transform='rotate(270deg)';
              break;
            case 46:
              top=top+5;            
              left=left-5;              
              break;
            case 34:
              top=top+5;            
              left=left+5;
              break;
            case 45:
              top=top-5;            
              left=left-5;              
              break;
            case 33:
              top=top-5;            
              left=left+5;              
              break;
            case 36:
              top=top-150;              
              break;
            case 35:
              top=top+150;                                        
              break;
          default:
              break;
        }
        killer.style.left=left +"px";
        killer.style.top= top +"px";
                      
        

    };
    var initRunner = function () {
        runner = document.querySelector(opts.DOMRunner);
        canvas.appendChild(runner);
    };
    var initKiller = function () {
        killer = document.querySelector(opts.DOMKiller);
        canvas.appendChild(killer);
    };



    var css = function (elem,prop) {
        return window.getComputedStyle(elem,null).getPropertyValue(prop);
    };
    
    
    var drawIcon = function (e) {
        c = iconActive.cloneNode();
        canvas.appendChild(c);
        
        var h = parseInt(css(c,'height'));//50px -> 50
        var w = parseInt(css(c,'width'));
        
        c.style.left = e.pageX - canvas.offsetLeft - (w / 2) + 'px';
        c.style.top = e.pageY - canvas.offsetTop - (h / 2) + 'px';
        fishes.push(c);
        checkObject(fishes[0]);
    };
    checkObject = function(fish){
        window.setTimeout(checkObject,50, fish);//rekursiver Aufruf der Funktion mit dem Parameter/Argument am Ende
        var posFish= fish.getBoundingClientRect();
        var posKiller= killer.getBoundingClientRect();
        console.log('fish: '+ posFish.x);
        console.log('killer: '+ posKiller.x);
        if(
                (posKiller.x + posKiller.width)> posFish.x
                && 
                (posKiller.y + posKiller.height) > posFish.y
                 &&
                posKiller.y < (posFish.y + posFish.height)
                 &&
                 posKiller.x < (posFish.x + posFish.width)
                ){
            fish.style.border='1px solid red';
        }
        
    }

    var setIconActive = function () {
        if (iconActive !== undefined) {
            iconActive.classList.remove('active');
        }
        iconActive = this;
        iconActive.classList.add('active');
    };

    var setBackground = function () {
        canvas.style.backgroundImage = 'url("' + this.src + '")';
    };

    window.addEventListener('load', init);

})({
    DOMCanvas: '#myGame > div#canvas',
    DOMBackgrounds: '#myGame > div#backgrounds > img',
    DOMIcons: '#myGame > div#icons > img',
    DOMKiller: '#myGame > div#icons > img[data-role="killer"]',
    DOMRunner: '#myGame > div#icons > img[data-role="runner"]'
});