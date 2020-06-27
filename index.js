const Discord = require('discord.js');
const {
    Client,
    Attachment,
    MessageEmbed
} = require('discord.js');
const bot = new Client();
const ping = require('minecraft-server-util')
const PREFIX = '!';
const usedCommandRecently = new Set();
const Embed = new MessageEmbed()
const ytdl = require("ytdl-core");
var servers = {};








bot.on('ready', () => {
    console.log('This bot is online ');
    bot.user.setActivity('!help');

})
bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");
    if (message.content === "ip") {
        const Embed2 = new MessageEmbed()
        .setTitle('اي بي السيرفر')
        .setColor(0x3498DB)
        .setDescription('```185.114.224.105:25565```')
        .setAuthor("AM Craft")
        .setThumbnail('https://i.imgur.com/4CJ1TaY.png')
        message.channel.send(Embed2)
        message.react("✅")
    }
    if (message.content === '!servers') {
    const Embed3 = new MessageEmbed()
    .setColor(0x248f30)
    .setTitle('اي بي اشهر السيرفرات')
    .addFields(
        { name: '```Hypixle```', value: 'mc.hypixel.net \n [Hypixel Weblink](https://hypixel.net/)'},
        { name: '```HiveMc```', value: 'hivemc.com \n [HiveMc Weblink](https://hivemc.com/)' },
        { name: '```BlocksMc```', value: 'blocksmc.com \n [BlocksMc Weblink](https://blocksmc.com/store)' },
        { name: '```CubeCraft```', value: 'play.cubecraft.net \n [vubeCraft Weblink](https://www.cubecraft.net/)' },
        { name: '```Mineplex```', value: 'us.mineplex.com \n [Mineplex Weblink](https://www.mineplex.com/home/)' },)
        .setImage('https://i.imgur.com/7HHVAxS.png')
        .setThumbnail('https://i.imgur.com/4CJ1TaY.png')
     
    message.channel.send(Embed3)
    }
    
   
    
    
    
    switch (args[0]) {
       
        case 'clear':
            if (!args[1]) return message.channel.bulkDelete(100).then(message.channel
                .send("``` 100 Messages have been Cleared!```").then(message.react('✅')));
                
            break;


            case 'mc':
 
                if(!args[1]) return message.channel.send('You must type a minecraft server ip')
                if(!args[2]) return message.channel.send('You must type a minecraft server port')
     
                ping(args[1], parseInt(args[2]), (error, reponse) =>{
                    if(error) throw error
                    const Embed = new MessageEmbed()
                    .setColor(0x661894)
                    .setTitle('حالة السيرفر ')
                    .addField('اي بي السيرفر ', reponse.host)
                    .addField('تحديث السيرفر', reponse.version)
                    .addField('اللاعبون المتصلين', reponse.onlinePlayers)
                    .addField('اقصى عدد لاعبين', reponse.maxPlayers)
                   
                    message.channel.send(Embed)
                })
            break;

            case 'help':
                const Embed4 = new MessageEmbed()
                .setColor(0x1b9294)
                .setTitle('شرح اوامر البوت ')
                .addFields(
                    {name:'```ip```', value:'اي بي سيرفر Am craft'},
                    {name:'```!servers```', value:'اشهر 5 سيرفرات مع الايبي و مواقعهم'},
                    {name:'```!clear```', value:'مسح اخر 100 رسالة'},
                    {name:'```!mc```', value:'عند كتابة هذا الكود لازم تكون كذا \n !mc {البورت غالبا 25565} {اي بي السيرفر}\n !mc mc.hypixel.net 25565 \n هذا الكود يعطيك معلومات عامة عن السيرفر'},
                )
                .setFooter('Made by: 𝐊𝐞𝐮𝐭𝐢𝐨𝐧™ 🌹#0001')
                .setTimestamp()
                message.channel.send(Embed4)
                break;
        
        
        



        /*case 'help':
            const Embed = new MessageEmbed()
                .setTitle("Commands For K-bot")
                .setColor(0x3498DB)
                .setAuthor('K-Bot')
                .setFooter('Made by: ♥ keution#0001')
                .setTimestamp()
                .setThumbnail(message.author.avatarURL)
                .setDescription("`Clear`  for clearing the messages  \n `Hello` if you were alone this will help you \n `Kick` [someone] for kicking someone just mention him after the word kick \n  `Play` still working on it...");
            message.react('✅')
            message.author.send(Embed)
            break;


        

        case 'kick':
            message.react("✖")
            if (!message.member.roles.cache.find(r => r.name === "BOSS")) return message.reply('YOU DONT HAVE PERMISSION')
                .then(message => message.delete({
                    timeout: 2000
                    
                }));

            if (!args[1]) message.channel.send('You need to specify a Player!')
            const user = message.mentions.users.first();
            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.kick('You got kicked From the server!').then(() => {
                        message.reply(`Successfully kicked ${user.tag}`);

                    }).catch(err => {
                        message.reply('I was unable to kick the member');
                        console.log(err);
                    });

                } else {
                    message.reply("that user isn\'t in this server")
                }
            } else {
                message.reply('that user isn\'t in the guild')

            }

            break;

        case 'play':

            function play(connection, message) {
                var servers = servers[message.guild.id];
                server.dsipathcer = connection.play(ytdl(server.queue[0], {
                    filter: "audioonly"
                }));
                server.queue.shift();
                server.dsipathcer.on("end", function () {
                    if (server.queue[0]) {
                        play(connection, message);

                    } else {
                        connection.disconnect();
                    }
                });
            }



            if (!args[1]) {
                message.channel.send('you need to provide a link')
                return;
            }

            if (!message.member.voice.channel) {
                message.channel.send("you're not in a voice channel!");
                return;
            }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.member.voice.connection) message.member.voice.channel.join().then(function (connection) {
                play(connection, message);

            })



            break;*/

            






    }
})

bot.login(process.env.token);