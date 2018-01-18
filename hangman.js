//------------------declare variables--------------------//
const submitButton = document.querySelector("#input-alphabet-submit-id");
const startButton = document.querySelector("#start");
const blankSpace = document.querySelectorAll(".blank-space");
const inputBox = document.getElementById("input-alphabet-id");
const inputDiv = document.getElementById("input-alphabet");
const theWord = document.querySelectorAll(".the-word-dictionary p");
var	chosenWordDiv = document.getElementById("for-chosen-word");
var	chosenWordDivSpans = chosenWordDiv.children;
const wrongDivSpan = document.getElementById('alphabet-wrong-span');
const guessesLeft = document.getElementById('guesses-left-times')
var wrongAlphabetCount;
var inputAlphabetTextArray=[];
var inputAlphabetCorrectTextArray=[];

//---------------random number generator ----------------//
function gameNumber(){ 
const randomNumber = Math.round(Math.random()*(theWord.length-1));
return randomNumber;
}

//---------------start/ restart Button -----------------// 
// resets to max number of blankspaces to display, 
// resets the div of chosenWord to blank, 
// call gameNumber function to insert a random number,
// append chosenWord into the div of chosenWord
// hide extra blankspaces according to length of chosenWord
// change start button to show restart label
// show inputBox (applicable only when page reloads)

startButton.onclick = function reset(){	
	wrongAlphabetCount = 0;
	wrongDivSpan.innerHTML="";
	for (var i = 0; i < blankSpace.length; i++) {
		blankSpace[i].innerHTML="-";
		blankSpace[i].classList.remove("hidden");
	}

	chosenWordDiv.innerHTML = "";	

	var chosenWord = theWord[gameNumber()];
	var chosenWordAlphabet = chosenWord.children;
	
	for (var a = 0; a < chosenWordAlphabet.length; a++) {
		const clone = chosenWordAlphabet[a].cloneNode(true);
		chosenWordDiv.appendChild(clone);		
	}

	// 3rd added loop k: to remove any extra blankSpace
	for (var k = chosenWordAlphabet.length; k < blankSpace.length; k++) {
		blankSpace[k].classList.add("hidden");
	}

	startButton.innerHTML="restart";
	inputDiv.classList.remove("hidden");
}

//---------------------submitButton------------------------// 
	let matchCount = 0;
	let noMatchCount = 0;
	
	submitButton.onclick = function(event){
		event.preventDefault();

		const inputAlphabetText = document.querySelector("#input-alphabet-id").value;//get userinput value

		//validate user Input
		if (parseInt(inputAlphabetText)) {
			window.alert("Input is not a letter. Please key in again.");
		}
		else if (inputAlphabetText.length>1) {
			window.alert("Please key in one letter only.")
		}
		else if (inputAlphabetTextArray.indexOf(inputAlphabetText)>-1 || inputAlphabetCorrectTextArray.indexOf(inputAlphabetText)>-1){
			window.alert("You have key in the letter previously. Please key in a new letter.")
		}

		else{

			// 2nd loop j: to check player input alphabet matches any alphabet in the word.
			for (var j = 0; j < chosenWordDivSpans.length; j++) {
				const chosenWordDivSpansText = chosenWordDivSpans[j].innerHTML;

				if(inputAlphabetText.toLowerCase()==chosenWordDivSpansText.toLowerCase()){
					
					blankSpace[j].innerHTML=inputAlphabetText.toLowerCase();
					inputAlphabetCorrectTextArray.push(inputAlphabetText);
					
					// for winning condition
					matchCount=matchCount+1;				
					if (matchCount==chosenWordDivSpans.length) {
						window.alert("Win!");				
						matchCount=0;//reset matchCount
					}
				}
				
				else {
					noMatchCount=noMatchCount+1;
					
					if (noMatchCount==chosenWordDivSpans.length) {
						inputAlphabetTextArray.push(inputAlphabetText);
						console.log(inputAlphabetTextArray);
					
						//display wrong guesses
						wrongDivSpan.innerHTML=inputAlphabetTextArray;
						
						//update guesses left
						wrongAlphabetCount=wrongAlphabetCount+1;
						guessesLeft.innerHTML=(8-wrongAlphabetCount);
						//lose game condition
						if (wrongAlphabetCount==8) {
							window.alert("Hang! >.< Please try again.")
						}					
					}	
				}
			}
		}
	//reset before next input
	inputBox.value="";
	noMatchCount=0;
		
	}

//DONE add winning condition
//DONE add lose condition - DONE then update counter - DONE then key in wrong alphabet - DONE show game lost
//DONE reset randomNumber when restart is clicked - reset chosenWord div
//DONE hide chosen words
//check user input
