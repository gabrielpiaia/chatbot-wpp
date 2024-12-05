const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, Buttons, List, MessageMedia } = require('whatsapp-web.js');
const path = require('path');

const client = new Client({
    authStrategy: new LocalAuth()
});

// Serviço de leitura do QR code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Mensagem quando o WhatsApp estiver pronto
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função para delay entre ações

// Armazenamento de estados de conversa
const userStates = {}; // Armazenar os estados das conversas por número de telefone

// Funil de mensagens
client.on('message', async msg => {
    const chat = await msg.getChat();
    const userId = msg.from;
    const userState = userStates[userId] || { menu: 'main' }; // Estado inicial como menu principal

    // Resposta inicial ao receber uma mensagem com palavras chave
    if (msg.body.match(/(menu|Menu|oi|Oi|Olá|olá|ola|Ola|suporte|Lift Detox)/i) && msg.from.endsWith('@c.us')) {
        await delay(2000);
        await chat.sendStateTyping(); // Simulando digitação
        await delay(2000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, `Olá, {nomeCliente}! Vi que você se interessou pelo nosso tratamento natural encapsulado para emagrecimento. 😊 Nosso produto é 100% natural, aprovado pela Anvisa, e ajuda na perda de peso de forma saudável e eficaz.`);
        await delay(2000);
        await client.sendMessage(msg.from, `Dê uma olhada em alguns depoimentos de quem já experimentou e aprovou! 👇`);
        await delay(3000);
        const media = MessageMedia.fromFilePath(path.join(__dirname, '/images/1pote.jpg'));
        await client.sendMessage(msg.from, media);
        await delay(3000);
        await client.sendMessage(msg.from, `Acredito que faça sentido para você investir um baixo custo para alcançar um corpo saudável e ter mais bem-estar. 🧐`);
        
        await client.sendMessage(msg.from, `O que você deseja fazer agora? Escolha uma das opções:

1️⃣ Comprar o Lift Detox Black
2️⃣ Informações sobre o Lift Detox Black
3️⃣ Rastrear pedido
9 Falar com atendente`);

        // Atualiza o estado para o menu principal
        userStates[userId] = { menu: 'main' };
    }

    // colocar verificação de tempo e caso não responda mandar 3 tentativas de  "oi voce está ai? senão voltar ao menu inicial e aguardar uma nova interação"
    // Se o usuário escolher o menu 1 (Links para compra)

    if (msg.body === '1' && userState.menu === 'main') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Qual opção de compra?:
1️⃣ 1 pote: Ideal para 1 mês de tratamento. (R$137,00)
2️⃣ 2 potes + 1 grátis (Recomendado): Ideal para 3 meses de tratamento. (R$237,00)
3️⃣ 3 potes + 2 grátis: Ideal para 5 meses de tratamento. (R$337,00)`);
        
        // Atualiza o estado para a escolha do kit de compra
        userStates[userId] = { menu: 'purchase' };
    }

    // Se o usuário escolher a opção de potes
    if (msg.body === '1' && userState.menu === 'purchase') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Compre 1 Ideal para um mes de tratamento. Veja a imagem do produto: 👇`);
        await delay(2000);
        const media = MessageMedia.fromFilePath(path.join(__dirname, '/images/1pote.jpg'));
        await client.sendMessage(msg.from, media);
        await delay(2000);
        await client.sendMessage(msg.from, `Oque deseja fazer?
1 - Finalizar compra
2 - Voltar ao inicio
3 - Falar com atendente`);
        
        // Atualiza o estado para a opção selecao de potes
        userStates[userId] = { menu: 'selectPurchase1' };
    }

    if (msg.body === '2' && userState.menu === 'purchase') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Compre 2 potes e ganhe 1 grátis! Ideal para 5 meses de tratamento. Veja a imagem do produto: 👇`);
        await delay(2000);
        const media = MessageMedia.fromFilePath(path.join(__dirname, '/images/3potes.jpg'));
        await client.sendMessage(msg.from, media);
        await delay(2000);
        await client.sendMessage(msg.from, `Oque deseja fazer?
1 - Finalizar compra
2 - Voltar ao inicio
3 - Falar com atendente`);
        
        // Atualiza o estado para a opção selecao de potes
        userStates[userId] = { menu: 'selectPurchase2' };
    }

    if (msg.body === '3' && userState.menu === 'purchase') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Compre 3 potes e ganhe 2 grátis! Ideal para 5 meses de tratamento. Veja a imagem do produto: 👇`);
        await delay(2000);
        const media = MessageMedia.fromFilePath(path.join(__dirname, '/images/5potes.jpg'));
        await client.sendMessage(msg.from, media);
        await delay(2000);
        await client.sendMessage(msg.from, `Oque deseja fazer?
1 - Finalizar compra
2 - Voltar ao inicio
3 - Falar com atendente`);
        
        // Atualiza o estado para a opção selecao de potes
        userStates[userId] = { menu: 'selectPurchase3' };
    }

    // Se o usuário escolher a opção para 1 pote
    if (msg.body === '1' && userState.menu === 'selectPurchase1') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Obrigado pela sua escolha! Vou te enviar o link para pagamento:');
        await client.sendMessage(msg.from, 'https://ev.braip.com/campanhas/cpa/camn7z78z');

        userStates[userId] = { menu: 'compraFinalizada' };
        await delay(3000);
        await client.sendMessage(msg.from, 'Obrigado pela sua escolha!');
        await delay(3000);
        await client.sendMessage(msg.from, 'Digite "Ola" para iniciar um novo atendimento');;
    }


    // Se o usuário escolher a opção 2 Voltar ao inicio
    if (msg.body === '2' && userState.menu.startsWith('selectPurchase')) {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, `O que você deseja fazer agora? Escolha uma das opções:
    
    1️⃣ Comprar o Lift Detox Black  
    2️⃣ Informações sobre o Lift Detox Black  
    3️⃣ Rastrear pedido  
    9️⃣ Falar com atendente`);
    
        // Atualiza o estado para o menu principal
        userStates[userId] = { menu: 'main' };
    }

        // Se o usuário escolher a opção 2 (Falar com atendente)
        if (msg.body === '3' && userState.menu === 'selectPurchase1') {
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, `Aguarde. Em breve a atendente irá entrar em contato com você!`);
            
            // Atualiza o estado para a opção selecao de potes
            
        }

    if (msg.body === '1' && userState.menu === 'selectPurchase2') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Obrigado pela sua escolha! Vou te enviar o link para pagamento:');
        await client.sendMessage(msg.from, 'https://ev.braip.com/campanhas/cpa/camn7z78z');

        userStates[userId] = { menu: 'compraFinalizada' };
        await delay(3000);
        await client.sendMessage(msg.from, 'Obrigado pela sua escolha!');
        await delay(3000);
        await client.sendMessage(msg.from, 'Digite "Ola" para iniciar um novo atendimento');

    }


    // Se o usuário escolher a opção 2 (Falar com atendente)
    if (msg.body === '2' && userState.menu === 'selectPurchase2') {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, `O que você deseja fazer agora? Escolha uma das opções:
    
    1️⃣ Comprar o Lift Detox Black  
    2️⃣ Informações sobre o Lift Detox Black  
    3️⃣ Rastrear pedido  
    9️⃣ Falar com atendente`);
    
        // Atualiza o estado para o menu principal
        userStates[userId] = { menu: 'main' };
    }

    if (msg.body === '3' && userState.menu === 'selectPurchase2') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Aguarde. Em breve a atendente irá entrar em contato com você!`);
        
        // Atualiza o estado para a opção selecao de potes
      
    }

        if (msg.body === '1' && userState.menu === 'selectPurchase3') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Obrigado pela sua escolha! Vou te enviar o link para pagamento:');
        await client.sendMessage(msg.from, 'https://ev.braip.com/campanhas/cpa/camn7z78z');

        userStates[userId] = { menu: 'compraFinalizada' };
        await delay(3000);
        await client.sendMessage(msg.from, 'Obrigado pela sua escolha!');
        await delay(3000);
        await client.sendMessage(msg.from, 'Digite "Ola" para iniciar um novo atendimento');
    }


    if (msg.body === '2' && userState.menu.startsWith('selectPurchase3')) {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, `O que você deseja fazer agora? Escolha uma das opções:
    
    1️⃣ Comprar o Lift Detox Black  
    2️⃣ Informações sobre o Lift Detox Black  
    3️⃣ Rastrear pedido  
    9️⃣ Falar com atendente`);
    
        // Atualiza o estado para o menu principal
        userStates[userId] = { menu: 'main' };
    }

    // Se o usuário escolher a opção 2 (Falar com atendente)
    if (msg.body === '2' && userState.menu === 'selectPurchase3') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Aguarde. Em breve a atendente irá entrar em contato com você!`);
        
        // Atualiza o estado para a opção selecao de potes
        
    }

    // Permitir voltar ao menu principal a qualquer momento

});

// Inicializa o cliente
client.initialize();
