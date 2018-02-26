import React from 'react'

export default function CardText(props) {

		var filter = (text) => {

			text = text.replace(/_/g, " ")
			text = text.replace(/\[x\]/g, " ")
			text = text.replace(/\$/g, "").trim()


			if (text) {
				text = text.split("")

				for (var i=0; i<text.length; i++) {
					if (text[i] === "\\") {
						text[i] = "<br/>"
						text[i+1] = ""
					}

				}

				return text.join('').trim();
			}
			
		}

		if (props.text) {
			return (
					<div className='card-text'><div className="card-text" dangerouslySetInnerHTML={{__html:filter(props.text)}} /></div>
			)
		}

		return (
			
				<div className='card-text'><strong>Text: </strong>No text found.</div>
			
		)
}