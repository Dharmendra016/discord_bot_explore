const {SlashCommandBuilder} =  require("discord.js");

module.exports = {
    data:new SlashCommandBuilder()
    .setName('hii')
    .setDescription('greet'),

    async execute(interaction) {
        const message = await interaction.reply({ content: `Hii ! ${interaction.user.username} k xa vai`, fetchReply: true });
        // await interaction.reply(`Hii ! ${interaction.user.username} k xa vai`);
        message.react('❤');
        message.react('😍');
        message.react('💕');
        message.react('🌹');

    }
};
