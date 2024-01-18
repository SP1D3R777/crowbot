const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!'; // Préfixe pour les commandes

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.author.bot) return; // Ignore les messages des bots
  if (!message.content.startsWith(prefix)) return; // Ignore les messages sans préfixe
  
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ano') {
    const text = args.join(' ');
    
    // Supprime le message de l'utilisateur
    await message.delete();
    
    // Envoie le message anonyme
    const anonymousEmbed = new Discord.MessageEmbed()
      .setColor('#0088ff')
      .setDescription(`🔗 DARKCHAT: ${text}`);
    message.channel.send(anonymousEmbed);
  }
});

// Remplacez 'YOUR_BOT_TOKEN' par votre propre jeton de bot Discord
client.login('MTE0NjcxMjg3MTAxNTgyOTUyNQ.GW3pcC.aHrNLrlez1viLwCjcZAqQObdvJtlE6HuGyc-6s');


