const {SlashCommandBuilder , EmbedBuilder} = require("discord.js");

module.exports = {
    data:new SlashCommandBuilder()
    .setName('prompt')
    .setDescription('Give prompt')
    .addStringOption(option =>
    	option.setName('text')
    		.setDescription('The prompt text')
    		.setRequired(true)
    ),
    async execute(interaction) {
		await interaction.deferReply();

		const {options} = interaction; 
		const query = options.getString("text");

		
		var Scraper = require('images-scraper');

		const google = new Scraper({
		  puppeteer: {
			headless: true,
		  },
		});
	
		const results = await google.scrape(query, 4);
		console.log('results', results);
      

		const embeds0 = new EmbedBuilder().setURL('https://youtube.com').setImage(results[0].url);
		const embeds1 = new EmbedBuilder().setURL('https://youtube.com').setImage(results[1].url);
		const embeds2 = new EmbedBuilder().setURL('https://youtube.com').setImage(results[2].url);
		const embeds3 = new EmbedBuilder().setURL('https://youtube.com').setImage(results[3].url);
		
		await interaction.editReply({embeds:[embeds0 , embeds1 ,embeds2 , embeds3]});
	},

}