const express = require("express");
const path = require("node:path");
const { Client, Events, GatewayIntentBits ,SlashCommandBuilder } = require('discord.js');
const { REST, Routes } = require('discord.js');
const app = express(); 
require("dotenv").config();

const  token = process.env.TOKEN; 
const clientId = process.env.clientId ; 
const guildId = process.env.guildId;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const rest = new REST().setToken(token);

const cmd = require("./commands/utility/ping");

const commands = []
commands.push(cmd.data.toJSON());
const dat = new SlashCommandBuilder()
.setName('hii')
.setDescription('greet');
commands.push(dat.toJSON());

(async () => {
	try {
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body:  commands},
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();


client.on(Events.InteractionCreate, async (interaction) => {
    console.log(interaction.isChatInputCommand());
    if (!interaction.isChatInputCommand()) return;
   
    if(interaction.commandName == 'ping'){
        await interaction.reply(`pong | ${interaction.user.username}`);
    }
    if(interaction.commandName == "hii"){
        await interaction.reply(`Hii ! ${interaction.user.username} k xa vai`);
    }
})


// client.commands = new Collection();
const command = require('./commands/utility/ping');
client.login(token);




app.listen(4000 , () => {
    console.log(`Server started at port 3000`);
})

app.get("/", (req , res) => {
    res.send("hello world")
})