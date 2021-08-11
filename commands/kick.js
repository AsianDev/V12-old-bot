const Discord = require("discord.js");

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply('Hey M8 you dont have perms to do this, contact Limit if you want to be a staff!')

    var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if(!user) return msg.reply('You need to specify who to punish!');
    var member;
    try {
        member = await msg.guild.members.fetch(user)
    } catch(err) {
        member - null;
    }
    if (member){
        if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('You cannot kick or ban fellow mods')
    }

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('Please make sure to specify a reason for me to punish this user!')
    var channel = msg.guild.channels.cache.find(c => c.name ==='moderator-only')
    var verify = msg.guild.emojis.cache.find(emoji => emoji.name === '738541978735607918')
    var log = new Discord.MessageEmbed()
    .setcolor('0x738adb')
    .setDescription(`${verify} ${user} has been kicked by ${msg.author} for "**${reason}**`)
    channel.send(moderator-only);

    var userLog = new Discord.MessageEmbed()
    .setcolor('0x738adb')
    .setDescription(`You have been kicked by me or by my staff, you have 48 hours to send Limit an appeal to your kick. Here is the reason that was provided for your kick. Limit is always happy to send you another invite link: **${reason}**`)
    try {
        await user.send(userLog);
    } catch(err) {
        console.warn(err);
    }
    member.kick(reason)
    var confir = new Discord.MessageEmbed()
    .setcolor('0x738adb')
    .setDescription(`${verify} ${user} has been kicked by ${msg.author}`)
    msg.channel.send(confir);
    msg.delete();
}