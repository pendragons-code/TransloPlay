const axios = require("axios")
const { db } = require("../loaders/dataBase.js")
const env = require("dotenv").config()
let key = process.env.transloAPIKey
module.exports = {
	name: "translateRequest",
	async execute(Input, socket, io) {
		const keyEngine = await db.get("RequestCounter")
		if(keyEngine == 10000) return socket.emit("res", { error: "We hit the activity limit! Please try again later!" })
		if(keyEngine >= 5000) key = process.env.transloAPIKeySecondary
		const encodedParams = new URLSearchParams()
		let fromFinal = Input.from
		if(Input.from === "auto") {
			let detectLangOptions = {
				method: "GET",
				url: 'https://translo.p.rapidapi.com/api/v3/detect',
				params: {text: Input.text},
				headers: {
					"X-RapidAPI-Key": key,
					"X-RapidAPI-Host": "translo.p.rapidapi.com"
				}

			}
			try{
				let detectLangResponse = await axios.request(detectLangOptions)
				if(!detectLangResponse) return socket.emit("res", { error: "This service not available now, please try again later!" })
				if(!detectLangResponse.data.ok) return socket.emit("res", { error: "Invalid fields provided!" })
				await db.add("RequestCounter", 1)
				fromFinal = detectLangResponse.data.lang
			} catch(e) {
				return socket.emit("res", "AN ERROR OCCURED!!!")
			}
		}
		encodedParams.append("from", fromFinal)
		encodedParams.append("to", Input.to)
		encodedParams.append("text", Input.text)
		const options = {
			method: "POST",
			url: "https://translo.p.rapidapi.com/api/v3/translate",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"X-RapidAPI-Key": key,
				"X-RapidAPI-Host": "translo.p.rapidapi.com"
			},
			data: encodedParams
		}
		try{
			let response = await axios.request(options)
			if(!response) return socket.emit("res", { error: "This service not available now, please try again later!" })
			if(!response.data.ok) return socket.emit("res", { error: "Invalid fields provided!" })
			await db.add("RequestCounter", 1)
			return socket.emit("res", response.data)
		} catch(e) {
			return socket.emit("res", { error: "Invalid fields provided!" })
		}
	}
}
