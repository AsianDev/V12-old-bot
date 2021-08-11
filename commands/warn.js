const Discord = require('Discord.js')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESAGE')) return;
    var user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0]);
    if(!user) return msg.reply('You didnt specify who to punish!')

    var member;
    try { 
        member = await msg.guild.members.fetch(user);
    }   catch(err) { 
            member = null;
    }
    if(!member) return msg.reply('The user you have told doesnt exist in this server!');

    var reason =  args.splice(1).join(' ');
    if(!reason) return msg.reply('You have forgotten to include a reason!');
    if(msg.author.id ===user.id) return msg.reply('Are you okay, why are you warning yourself?')

    var warnEmbed = new Discord.messageEmbed()
    .setcolor('ff0000')
    .setDiscription('${user} has been succesfully warned by ${msg.author}!')
    .setfooter('This message will auto delete after 10 seconds!')
    var sendEmbed = await msg.channel.send(warnEmbed);
    msg.delete();
    
    SetTimeout(() => {
        sendEmbed.delete()
    },10000);

    var embed = new Discord.messageEmbed()
    .setcolour('ff0000')
    .setTitle('You were warned by Limitz **Utilities**!')
    .setDiscription('Server:**Limitz World**')
    .addField('reason:', reason)

    try { 
        user.send(embed);
    } catch(err) { 
        console.warn(err)
    }

}
