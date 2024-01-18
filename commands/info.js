const Discord = require('discord.js');
const fetch = require('node-fetch');

const client = new Discord.Client();
const TOKEN = 'MTE0NjcxMjg3MTAxNTgyOTUyNQ.GW3pcC.aHrNLrlez1viLwCjcZAqQObdvJtlE6HuGyc-6s';
const SERVER_IP = '5.135.172.146';
const SERVER_PORT = '40120';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
    if (msg.content === '+info') {
        try {
            const players = await getPlayers();
            const onlinePlayers = players.filter(player => player.online);
            const offlinePlayers = players.filter(player => !player.online);

            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Joueurs du serveur FiveM')
                .addField('Joueurs en ligne', onlinePlayers.length.toString(), true)
                .addField('Joueurs hors ligne', offlinePlayers.length.toString(), true);

            if (onlinePlayers.length > 0) {
                embed.addField('Joueurs en ligne', onlinePlayers.map(player => player.name).join('\n'), false);
            }

            if (offlinePlayers.length > 0) {
                embed.addField('Joueurs hors ligne', offlinePlayers.map(player => player.name).join('\n'), false);
            }

            msg.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
            msg.reply('Une erreur s\'est produite lors de la récupération des informations.');
        }
    }
});

async function getPlayers() {
    const response = await fetch(`http://5.135.172.146:40120/players.json`);
    const data = await response.json();
    return data;
}

client.login(TOKEN);
