const express = require('express');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const app = express();
const bot = new Telegraf(process.env.TG_BOT_TOKEN);

// Middleware
app.use(express.json());

// Telegram бот
bot.start((ctx) => ctx.reply('🧮 Добро пожаловать в MathBattle!\n\nИспользуйте /help для списка команд'));

bot.command('help', (ctx) => {
  ctx.reply(`📋 Доступные команды:
/start - Начать игру
/train - Тренировка
/tournaments - Список турниров
/profile - Мой профиль`);
});

// HTTP сервер для webhook
app.get('/', (req, res) => {
  res.send('MathBattle Server is running! 🚀');
});

// Запуск
const PORT = process.env.PORT || 3000;
bot.launch().then(() => {
  console.log('✅ Bot started');
});

app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
