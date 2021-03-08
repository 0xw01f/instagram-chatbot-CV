// You will have to install the insta.js package (npm i @androz2091/insta.js)
const Insta = require('@androz2091/insta.js')
const config = require("./config.json")

const client = new Insta.Client()

client.on('connected', () => {
    client.cache.pendingChats.forEach((chat) => chat.approve());
    client.options.disableReplyPrefix = true

    console.log(`Logged in as ${client.user.fullName} (${client.user.username}).`, `ready`);
    console.log(`Followers: ${client.user.followerCount}`, `ready`);
    console.log(`Following: ${client.user.followingCount}`, `ready`);
    console.log(`Business : ${client.user.isBusiness}`, `ready`);
    console.log(`Verified: ${client.user.isVerified}`, `ready`);
    console.log(`Private: ${client.user.isPrivate}`, `ready`);
    
})


client.on('pendingRequest', chat => {
    console.log('- Incoming chat request.')
    try {
        chat.approve();
        client.cache.pendingChats.forEach((chat) => chat.approve());
    } catch {
        
    }

})

client.on('newFollower', user => {
   console.log("An user follows")
   user.privateChat.sendMessage(`Hello ${user.username} !\nHow can I help you out ? 😃\nYou can type 'help' to get a list of the available commands.`)

})


// Create an event listener for messages
client.on('messageCreate', message => {

    message.markSeen()

    if (message.author.username.toLowerCase() != config.login.BOT_USERNAME.toLowerCase()){
       
        if (message.content != undefined || message.content != 'undefined' || message.content != null) {
            if (message.type === 'text') {
                let msg = message.content.toLowerCase()
                let keys = Object.keys(config.commands)

                for (i = 0; i < keys.length; i++) {
                    let words = msg.split(" ")
                    
                    if (words[0] === keys[i]) {
                        
                        message.reply(config.commands[words[0]])
                        if (words[0] === "cv") {
                            // Send CV as a picture
                            message.chat.sendPhoto("./resources/img/CV.jpg")
                        }
                        break
                    } else {
                        
                    }
                }
            } else if (message.type === 'media') {
                
                if (message.mediaData.isSticker === false) {
                    if (message.mediaData.isAnimated === false) {
                        message.reply("Oh, thank you for that image 😮\nBut I don't have eyes to look at it 😅")
                    } else {
                        message.reply("Oh, thank you for that (probably) awesome GIF 😮")
                        // Send GIF
                        /*
                        let gifLink = 'https://api.giphy.com/v1/gifs/random?api_key=J6RG1aw7oX0Pbp9sBr6tAroFCZWN5rLw&tag=cybersecurity, IT, science, code, hacking&rating=g'
                        request(gifLink, function (error, response, body) {
                            let object = JSON.parse(body)
                            console.log(object.data.images.fixed_height_downsampled.url)
                            message.chat.sendPhoto(object.data.images.fixed_height_downsampled.url)
                        });
                        */
                    }
                   
                } else {
                    message.reply("Oh nice ! A sticker !😲\nHowever... I don't have eyes to look at it 😒")
                }
                
            } else if (message.type === 'story_share') {
                message.reply("Huh ? 🤔\n Thank you ?..😅")
    
            } else if (message.type === 'voice_media') {
                message.reply("You have a nice voice 🙂")
            }

        } else {
            console.log('Message is undefined')
        }

    

    }
})


// Log our bot in using Instagram credentials
client.login(config.login.BOT_USERNAME, config.login.BOT_PASSWORD)