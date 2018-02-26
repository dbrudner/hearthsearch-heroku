var filter = (text) => {

	text = text.split("")

	for (i=0; i<text.length; i++) {
		if (text[i] === "\\") {
			text[i] = "<br/>"
			text[i+1] = ""
		}

	}

	return text.join('').trim();
}

console.log(filter("<b>Hero Power</b>\nGain 2 Armor."))