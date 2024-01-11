const express = require("express");
const path = require("node:path");
const { Client, EmbedBuilder, Events, GatewayIntentBits ,SlashCommandBuilder } = require('discord.js');
const { REST, Routes } = require('discord.js');
const app = express(); 
const router = express.Router() ; 
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
let dat = new SlashCommandBuilder()
.setName('hii')
.setDescription('greet');
commands.push(dat.toJSON());

dat = new SlashCommandBuilder()
.setName('prompt')
.setDescription('Give prompt')
.addStringOption(option =>
	option.setName('text')
		.setDescription('The prompt text')
		.setRequired(true)
);
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

// let tex ;
// async function getImageUlr(prompt){
// const sdk =  require("./imageGenerator");
//  tex = await sdk(prompt);
// console.log(tex);
// }


client.on(Events.InteractionCreate, async (interaction) => {
    console.log(interaction.isChatInputCommand());
    if (!interaction.isChatInputCommand()) return;

    if(interaction.commandName == 'ping'){
        await interaction.reply(`pong | ${interaction.user.username}`);
    }
    if(interaction.commandName == "hii"){
        await interaction.reply(`Hii ! ${interaction.user.username} k xa vai`);
    }
	if(interaction.commandName == "prompt"){
		await interaction.deferReply();

		const {options} = interaction; 
		const query = options.getString("text");
		
		const scrapeGoogleImages = require('./imageScrapper');
		const results = await scrapeGoogleImages(query, 4);
		console.log('Image URLs:', results);
	

		const embeds0 = new EmbedBuilder().setURL('https://youtube.com').setImage(results[0]);
		const embeds1 = new EmbedBuilder().setURL('https://youtube.com').setImage(results[1]);
		const embeds2 = new EmbedBuilder().setURL('https://youtube.com').setImage(results[2]);
		const embeds3 = new EmbedBuilder().setURL('https://youtube.com').setImage(results[3]);
		
		await interaction.editReply({embeds:[embeds0 , embeds1 ,embeds2 , embeds3]});
		
	}
})


// client.commands = new Collection()
const command = require('./commands/utility/ping');
const internal = require("node:stream");
client.login(token);




app.listen(4000 , () => {
    console.log(`Server started at port 3000`);
})


// router.post('https://api.edenai.run/v2/image/generation', sdkGen());


app.get("/", (req , res) => {
    res.send("hello world")
})