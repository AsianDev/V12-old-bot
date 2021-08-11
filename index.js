const config = require('./config.json');
const Discord = require('discord.js')
const client = new Discord.Client


client.on('ready', async() =>{ 
    console.log('I am online!')

})

client.on('message', async(msg) => {
    if(msg.author.bot) return;
    if(!msg.guild) return;
    if(msg.content.length >= 500) {
        msg.delete();
        msg.channel.send(`${msg.author}, try to keep it under 500 characters. Thanks!`);
    }

    var array = ['Fuck' , 'shit' , 'porn' , 'hentai' , 'dickhead', 'dick' , 'cocksucker' , 'cock' , 'cunt' , 'fvck' , 'fu ck head' , 'fucking' , 'sex' , 'nigger' , 'niggar' , 'shithead']
        

    var prefix = config.prefix;
    if(!msg.content.toLowerCase().startsWith(prefix)) return;

    var args = msg.content.split(' ')
    var cmd = args.shift().slice(prefix.length).toLowerCase();

    try { 
        var file = require(`./commands/${cmd}.js`);
        file.run(client, msg, args);

    }catch(err) { 
        console.warn(err);
    }
})

client.login(config.token);