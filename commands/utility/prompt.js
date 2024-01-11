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
		
		const scrapeGoogleImages =  require("../../imageScrapper");

		const results = await scrapeGoogleImages(query, 4);
		console.log('Image URLs:', results);
	

		const embeds0 = new EmbedBuilder().setURL('https://youtube.com').setImage(results[0]);
		const embeds1 = new EmbedBuilder().setURL('https://youtube.com').setImage(results[1]);
		const embeds2 = new EmbedBuilder().setURL('https://youtube.com').setImage(results[2]);
		const embeds3 = new EmbedBuilder().setURL('https://youtube.com').setImage(results[3]);
		
		await interaction.editReply({embeds:[embeds0 , embeds1 ,embeds2 , embeds3]});
	},

}