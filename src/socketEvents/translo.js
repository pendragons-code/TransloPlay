const axios = require("axios")
const env = require("dotenv").config()
// ok here is the thing, I know this is probably a bad method, but dynamic
module.exports = {
	name: "translateRequest",
	async execute(Input, socket, io) {
		const encodedParams = new URLSearchParams()
		encodedParams.append("from", Input.from)
		encodedParams.append("to", Input.to)
		encodedParams.append("text", Input.text)
		const options = {
			method: "POST",
			url: "https://translo.p.rapidapi.com/api/v3/translate",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"X-RapidAPI-Key": process.env.transloAPIKey,
				"X-RapidAPI-Host": "translo.p.rapidapi.com"
			},
			data: encodedParams
		}
		try{
			let response = await axios.request(options)
			if(!response) return socket.emit("res", { error: "This service not available now, please try again later!" })
			if(!response.data.ok) return socket.emit("res", { error: "Invalid fields provided!" })
			return socket.emit("res", response.data)
		} catch(e) {
			return socket.emit("res", { error: "Invalid fields provided!" })
		}
		//should use the json file from assets and do a .includes check, but im too lazy now.
	}
}
