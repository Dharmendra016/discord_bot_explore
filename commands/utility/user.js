const {SlashCommandBuilder} =  require("discord.js");

module.exports = {
    data:new SlashCommandBuilder()
    .setName('hii')
    .setDescription('greet'),

    async execute(interaction) {
        await interaction.reply(`Hii ! ${interaction.user.username} k xa vai`);
    }
};
