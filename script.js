	
     var button = document.getElementById('load');
     button.addEventListener('click', myLoader, false)
     
     var capital="";
     var output = document.getElementById('output');

     var flag = 3;
     var gameplay = false;
     var rightGuesses=0;

     function init(options,country){
 		document.querySelector('#question span').innerHTML=country;
     	var html="";
     	for(var i=0; i<options.length; i++){
     		html += '<li><a class="opt" onclick="checkAnswer()" href="javascript:;" data-value="'+options[i]+'">'+options[i]+'</a></li>';
     	}
     	document.getElementById('options').innerHTML = html;
     	
     }

     function shuffleArray(arr) {
        for (var x = arr.length - 1; x > 0; x--) {
            var holder = Math.floor(Math.random() * (x + 1));
            var temp = arr[x];
            arr[x] = arr[holder];
            arr[holder] = temp;
        }
        return arr;
    }

     function myLoader(){
     	button.classList.add('hide');

     	var xHR = new XMLHttpRequest();
     	xHR.open('get','https://restcountries.eu/rest/v2/all',true);
     	xHR.send();

     	xHR.onload = requestOutput;
     }

     function requestOutput(){
     	document.getElementById('question').classList.remove('hide');
     	document.getElementById('heart-block').classList.remove('hide');
     	gameplay=true;

     	output.innerHTML=" ";
     	countriesObj = JSON.parse(this.responseText);
     	//console.log(countriesObj);

     	var randomPick;
     	var randomOpts="";
     	var randomCapitals="";
     	var opts=[];
     	var country = "";

     	randomPick = Math.floor(Math.random()*countriesObj.length);
     	country = countriesObj[randomPick].name;
     	capital = countriesObj[randomPick].capital
     	if(!capital.length || capital.length===0 || capital==null || capital==""){
     			capital="It does not have one";
     			opts.push(capital);
     		}
     	else{
     		opts.push(capital);
     	}
     	//console.log(country+'-'+capital);

     	for(var x=0; x<3;x++){
     		randomOpts = Math.floor(Math.random()*countriesObj.length);
     		randomCapitals = countriesObj[randomOpts].capital;
     		if(!randomCapitals.length || randomCapitals.length===0 || randomCapitals==null || randomCapitals==""){
     			randomCapitals="It does not have one";
     			opts.push(randomCapitals);
     		}
     		else{
     			opts.push(randomCapitals);
     		}
     	}
     	//console.log(opts);
     	shuffleArray(opts);
     	init(opts,country);
     }

     function checkAnswer(){
     	if(gameplay){
     		event.target.classList.add('active');
	     	var guess = event.target.dataset.value;
	     	var output = document.getElementById('output');
	     	var hearts = document.querySelectorAll('#heart-block > div');
	     	
	     	
	     	if(guess==capital){
	     		output.innerHTML = "<h4>You're right!</h4>";
	     		rightGuesses++;
	     		window.setTimeout(myLoader, 2000);
	     	}
	     	else{
	     		output.innerHTML = "<h4>You're wrong, it's "+capital+"</h4>";
	     		flag--;
	     		hearts[flag].classList.add('grey');
	     		if(flag==0){
	     			if(rightGuesses>1){
	     				output.innerHTML += "<h3>You got "+rightGuesses+" capital right</h3>"
	     			}
	     			else{
	     				output.innerHTML += "<h3>You got "+rightGuesses+" capitals right</h3>"
	     			}
	     			
	     			output.innerHTML += "<br><h4 class='blink'>Game over</h4>";
	     			button.value='Restart';
	     			button.classList.remove('hide');

	     			for(var x=0; x<hearts.length; x++){
	     				hearts[x].classList.remove('grey');
	     			}
	     			document.getElementById('heart-block').classList.add('hide');
	     			flag=3;
	     			rightGuesses=0;
	     			gameplay=false;
	     		}
	     		else {
	     			window.setTimeout(myLoader, 2000);
	     		}
	     	}
     	}	

     }



	