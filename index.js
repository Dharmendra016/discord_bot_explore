const express = require("express");
const path = require("node:path");
const fs = require('node:fs');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const app = express(); 
require("dotenv").config();

const  token = process.env.TOKEN; 

const client = new Client({ intents: [GatewayIntentBits.Guilds , GatewayIntentBits.GuildMessages , GatewayIntentBits.MessageContent , GatewayIntentBits.GuildPresences , GatewayIntentBits.GuildMembers] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('ready' , async (guild) => {
	const avatarURL = "https://media.licdn.com/dms/image/D5603AQHM8YgBjr12EQ/profile-displayphoto-shrink_800_800/0/1681134839551?e=1712188800&v=beta&t=VjGsOufAYXOtx2cn3WQksii4xGbAG_3vP-9rkSQYbKw"

	
	// 1111892480741347361
	 // Replace with your guild ID
	const userId = '975748526975889448'; // Replace with the user ID of the target user


	const user = await client.users.fetch(userId);
	
	if(user){
		// if (user.presence.status === 'online') {
			console.log(`${user.displayName} is now online.`);
			console.log("User founded");
			if (user.presence?.status === 'online') {
				console.log(`${user.displayName} is now online.`);
				const channel = client.channels.cache.get('1111892481374699592');
				channel.send(`${user.displayName} is now online.`);
			}
			
		// }
		

	}else{
		console.log("Not founded"); 
	}


	if (client.user) {
    client.user.setAvatar(avatarURL)
        .then(() => console.log('Avatar set successfully'))
        .catch(error => console.error('Error setting avatar:', error));

	client.user.setActivity('coding');
	} else {
		console.error('Client user is null or undefined');
	}

})

const commands_deploy = require("./commands_deploy");
commands_deploy


client.on(Events.InteractionCreate, async (interaction) => {
    console.log(interaction.isChatInputCommand());
    if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

})

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.includes("Like")) {
        await message.react("❤");
    }

	if (message.content.toLowerCase() === '!getguildid') {
        message.reply(`The ID of this server is: ${message.guild.id}`);
    }
});

client.on("guildMemberAdd" , (oldmember , newmember) => {

	const channel = client.channels.get("1111892481374699592"); 
	channel.send(`Hello Welcome to My Discord Channel ${newmember.user}`)

})


client.login(token);

app.listen(4000 , () => {
    console.log(`Server started at port 3000`);
})

app.get("/", (req , res) => {
    res.send("hello world")
})