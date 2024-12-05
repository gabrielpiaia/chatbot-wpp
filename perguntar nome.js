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
    const userState = userStates[userId] || { menu: 'askName' }; // Estado inicial: perguntar nome

    // Verifica se o nome foi solicitado
    if (userState.menu === 'askName') {
        if (!userState.nomeCliente) {
            // Pergunta o nome do cliente
            await client.sendMessage(msg.from, 'Olá, qual é o seu nome?');
            userStates[userId] = { menu: 'awaitingName' }; // Atualiza estado para aguardando o nome
        }
        return;
    }

    // Salva o nome do cliente e responde
    if (userState.menu === 'awaitingName') {
        const nomeCliente = msg.body.trim();
        userStates[userId] = { menu: 'main', nomeCliente }; // Armazena o nome e muda para o menu principal
        await client.sendMessage(msg.from, `Muito prazer, ${nomeCliente}! Como posso te ajudar hoje?`);
        await client.sendMessage(msg.from, `Escolha uma das opções abaixo:\n1️⃣ Links para compra\n2️⃣ Falar com atendente`);
        return;
    }

    // Exemplo de uso do nome em outras mensagens
    if (msg.body === '1' && userState.menu === 'main') {
        const nomeCliente = userState.nomeCliente;
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Ótimo, ${nomeCliente}! Aqui estão as opções de compra disponíveis:`);
        await client.sendMessage(msg.from, `1️⃣ 1 pote\n2️⃣ 2 potes`);
        userStates[userId] = { menu: 'purchase', nomeCliente };
    }

    // Adicione outras opções e lógicas aqui, utilizando `userState.nomeCliente` onde necessário.

    // Permitir voltar ao menu principal a qualquer momento
    if (msg.body === '0') {
        const nomeCliente = userState.nomeCliente;
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Voltando ao menu principal, ${nomeCliente}...`);
        userStates[userId] = { menu: 'main', nomeCliente };
        await client.sendMessage(msg.from, `Como posso te ajudar hoje? Escolha uma das opções abaixo:\n1️⃣ Links para compra\n2️⃣ Falar com atendente`);
    }
});

// Inicializa o cliente
client.initialize();
