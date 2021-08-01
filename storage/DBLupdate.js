const fetch = require("node-fetch")
const logger = require("./../logger.js")
const { botId } = require("./../config.json")

class get {
    constructor(auth) {
        if (!auth) throw new Error("Missing authorization token.")
        this.auth = auth
    }
    async post(server_count, user_count) {

        let body = { 'guilds': server_count, 'users': user_count }
        await fetch(`https://discordbotlist.com/api/v1/bots/${botID}/stats`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json', 'authorization': this.auth },
        }).then(async (res) => {
            if ( res.status === 200) { logger.info('Posted stats to discord bot list') }
            else { logger.error(res.statusText); logger.error(res.error) }
        })
    }
}

module.exports = {
    get
}