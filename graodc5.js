//var cards = ["ciri.png","geralt.png","jaskier.png","jaskier.png","iorweth.png","triss.png","geralt.png","yen.png","ciri.png","triss.png", "yen.png", "iorweth.png"];
var losowanie = ["ciri.png","geralt.png","jaskier.png","jaskier.png","iorweth.png","triss.png","geralt.png","yen.png","ciri.png","triss.png", "yen.png", "iorweth.png"];
var cards = new Array(12);
var numberr=-1;
var help = new Array();
var czy_ok=true;
for(i=0; i<12; i++)
{	
    numberr = Math.floor(Math.random()*12);
	for(j=0; j<help.length; j++)
	{
		if(help[j]==numberr)
		{
			czy_ok=false;
			break;
		}
	}
	if(czy_ok == false)
	{
		i--;
		czy_ok=true;
	}
	else
	{
		help[i] = numberr;
		cards[i] = losowanie[numberr];
	}
}
//wyzej losujemy co gre pozycje kart.
//alert(cards[4]);

var c0=document.getElementById('c0');
var c1=document.getElementById('c1');
var c2=document.getElementById('c2');
var c3=document.getElementById('c3');

var c4=document.getElementById('c4');
var c5=document.getElementById('c5');
var c6=document.getElementById('c6');
var c7=document.getElementById('c7');

var c8=document.getElementById('c8');
var c9=document.getElementById('c9');
var c10=document.getElementById('c10');
var c11=document.getElementById('c11');

c0.addEventListener("click",function() {revealCard(0); }); //nasluchuje zdarzenia, przy kliknieciu danej karty wywolywana jest funkcja revealCard dla karty 0, itd dla pozostalych.
c1.addEventListener("click",function() {revealCard(1); });
c2.addEventListener("click",function() {revealCard(2); });
c3.addEventListener("click",function() {revealCard(3); });

c4.addEventListener("click",function() {revealCard(4); });
c5.addEventListener("click",function() {revealCard(5); });
c6.addEventListener("click",function() {revealCard(6); });
c7.addEventListener("click",function() {revealCard(7); });

c8.addEventListener("click",function() {revealCard(8); });
c9.addEventListener("click",function() {revealCard(9); });
c10.addEventListener("click",function() {revealCard(10); });
c11.addEventListener("click",function() {revealCard(11); });

var oneVisible=false;
var turnCounter=0;
var visible_nr=-1;
var lock=false;
var pairsLeft=6;

function revealCard(nr)
	{
		var opacityValue = $('#c'+nr).css('opacity');
		//alert('opacity: '+opacityValue);
		//alert(nr);
		
		if(opacityValue!=0 && lock==false && nr!=visible_nr)//tutaj do poprawy było wzgledem filmiku "&& nr!=visible_nr"  . Bo jak bez tego w cudzyslowiu to blad jest tylko ze klikajac 2 razy jedną karte liczy sie jako para i psuje mega całą gre potem i nie dziala jak powinna i zle sie konczy. takze essa, Pan Mirek nie był świadom takiego błędu.
		{
			lock=true;
			var obraz="url(img/"+cards[nr]+")";  //47:05 zaczynamy jQuery
		 
		 $('#c'+nr).css('background-image',obraz);
		 $('#c'+nr).addClass('cardactive');
		 $('#c'+nr).removeClass('card');
		 
		 if(oneVisible==false)
		 {
			 //1karta
			 oneVisible=true;
			 visible_nr=nr;
			 lock=false;
		 }
		 else
		 {
			 //2karta
			 
			 if(cards[visible_nr] == cards[nr])
			 {
				 //alert("para");
				 setTimeout(function() {hide2Cards(nr, visible_nr)},750);
				 
			 }
			 else
			 {
				 //alert("para nie");
				 setTimeout(function() {restore2Cards(nr, visible_nr)},1000);
			 }
			 turnCounter++;
			 $('.score').html('Turn counter: '+turnCounter);
			 oneVisible=false;
		 }
		}
	
	 
}

function hide2Cards(nr1,nr2)
{
	$('#c'+nr1).css('opacity', '0');
	$('#c'+nr2).css('opacity', '0');
	pairsLeft--;
	
	if(pairsLeft==0)
	{
		$('.board').html('<h1>YOU WIN!</br>Done in '+turnCounter+' turns</h1> <br /><br /> <span class="reload" onclick="location.reload()">Try Again!</span>');
	}
	lock=false;
}
function restore2Cards(nr1,nr2)
{
	$('#c'+nr1).css('background-image','url(img/karta.png)');
	$('#c'+nr1).addClass('card');
	$('#c'+nr1).removeClass('cardactive');
	$('#c'+nr2).css('background-image','url(img/karta.png)');
	$('#c'+nr2).addClass('card');
	$('#c'+nr2).removeClass('cardactive');
	
	visible_nr=-1;	
	lock=false;
}

