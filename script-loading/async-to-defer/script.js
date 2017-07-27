var button = document.querySelectorAll('.magical-alert-button')[0];
var img = new Image();
img.src = partyParrot;
img.className = "party-parrot";

function startTheParty() {
	document.body.appendChild(img);
}

button.addEventListener('click', startTheParty);
