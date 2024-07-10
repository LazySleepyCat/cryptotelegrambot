const axios = require('axios');
const { Telegraf } = require("telegraf");

// api bybit
const realMarket = 'https://api.bybit.com/v5/market/tickers?category=spot'

// telegram bot token
const bot = new Telegraf("6980108221:AAFpruw1d_zh7lh7yNttK4sjfUFt3qbadnk");

  // Start bot and buttons
  bot.command("start", (ctx) => {
    ctx.reply(`<b>Привет❗️</b> \nДанный бот покажет топ 10 монет по росту и падению❗️ \n\n<b>⬆️ Long</b> — покажет лучших по росту. \n\n<b>⬇️ Short</b> — покажет лучших по падению. \n\n<b>Donate 😉</b> — поддержать автора бота.`, {
      reply_markup: {
        keyboard: [
          [{ text: "⬆️ Long" }, { text: "⬇️ Short" }],
          [{ text: "😉 Donate" }],
        ],
        resize_keyboard: true,        
      },
      parse_mode: 'HTML',
    });
    
  });
  
 // Long button
  bot.hears("⬆️ Long", async (ctx) => {            
    async function getPriceCoints() {    
      try {
        const response = await axios.get(realMarket);
        let arrCoinsPrecent = response.data.result.list;
        arrCoinsPrecent.sort((a, b) => b.price24hPcnt.localeCompare(a.price24hPcnt));              
        let listCoins = arrCoinsPrecent.slice(0,10);        
        let coinSymbol = '';        
        for (let i = 0; i < listCoins.length; i++) {          
          coinSymbol += listCoins[i].symbol + ' ' + '—' + ' ' + '<b>' + (listCoins[i].price24hPcnt * 100) + '</b>' + '\n';          
        };             
        return coinSymbol;
      } catch (error) {
        console.error(error);
      }      
    };  
    let topCoins = await getPriceCoints();
    ctx.reply(topCoins, {
      parse_mode: 'HTML',
    });
  });

  // Short button
  bot.hears("⬇️ Short", async (ctx) => {
    async function getPriceCoints() {    
      try {
        const response = await axios.get(realMarket);
        let arrCoinsPrecent = response.data.result.list;
        arrCoinsPrecent.sort((a, b) => a.price24hPcnt - b.price24hPcnt)            
        let listCoins = arrCoinsPrecent.slice(0,10);        
        let coinSymbol = '';        
        for (let i = 0; i < listCoins.length; i++) {          
          coinSymbol += listCoins[i].symbol + ' ' + '—' + ' ' + '<b>' + (listCoins[i].price24hPcnt * 100) + '</b>' + '\n';          
        };        
        return coinSymbol;
      } catch (error) {
        console.error(error);
      }      
    };  
    let topCoins = await getPriceCoints();
    ctx.reply(topCoins, {
      parse_mode: 'HTML',
    });
  });

  // Donate button
  bot.hears("😉 Donate", (ctx) => {
    ctx.reply(`BTC — <code>15iCnFxYhh2yHXCRzLUSp375rszwrA2dKC</code> \n\nUSDT — <code>TZBn2NsyA32ShmD2QV7NQF5rCoUWJTYcHH</code> \n\nETH — <code>0x920c837D7368A49064eB0D9e6e95654100f14dB8</code>  \n\nСпасибо за поддержку❗️ Вы лучшие❗️`, {
      parse_mode: 'HTML',
    });
  });
  
 
  

  // Start bot
  bot.launch();

