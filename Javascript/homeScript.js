window.onload = function() {
	buttonPress();
}

function buttonPress() {
	document.getElementById("rulesBTN").addEventListener("click", showRules);
	document.getElementById("closeBTN").addEventListener("click", closeRules);
}

function showRules() {
	var rulesPopup = document.getElementById("rules_box");
	rulesPopup.style.display = "flex";
	document.getElementById("ruleBTN_container").style.display = "block";
}

function closeRules() {
	var rulesPopup = document.getElementById("rules_box");
	rulesPopup.style.display = "none";
	document.getElementById("ruleBTN_container").style.display = "none";
}
