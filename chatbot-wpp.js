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
    if (msg.body.match(/(menu|Menu|oi|Oi|Olá|olá|ola|Ola|suporte|Lift Detox)/i) && msg.from.endsWith('@c.us') && userState.menu != 'atendimentoHumano') {
        await delay(2000);
        await chat.sendStateTyping(); // Simulando digitação
        await delay(2000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, `Olá! 👋 Bem-vindo(a)!
Estamos aqui para ajudar você a conquistar seus objetivos de emagrecimento com o LiftDetox, um produto 100% natural e em cápsulas, que ajuda a:
✅ Acelerar o metabolismo;
✅ Reduzir a retenção de líquidos;
✅ Diminuir o apetite;
✅ Melhorar sua energia e disposição.

🌟 Aproveite nossas promoções exclusivas:

1 pote por apenas R$ 137: Clique aqui para comprar!
Promoção Black Friday!
👉 Compre 2 e ganhe 1 por R$ 168,30: Clique aqui para aproveitar!
👉 Compre 3 e ganhe 2 por R$ 213,30: Clique aqui para garantir!
`);
        await delay(2000);
        await client.sendMessage(msg.from, `Dê uma olhada em alguns depoimentos de quem já experimentou e aprovou! 👇`);
        await delay(3000);
        const media = MessageMedia.fromFilePath(path.join(__dirname, '/images/prova1.jpg'));
        await client.sendMessage(msg.from, media);
        const media2 = MessageMedia.fromFilePath(path.join(__dirname, '/images/prova2.jpg'));
        await client.sendMessage(msg.from, media2);
        await delay(3000);
        await client.sendMessage(msg.from, `Acredito que faça sentido para você investir um baixo custo para alcançar um corpo saudável e ter mais bem-estar. 🧐`);
        
        await client.sendMessage(msg.from, `O que você deseja fazer agora? Escolha uma das opções:

1️⃣ Comprar agora
2️⃣ Informações sobre o Lift Detox Black
3️⃣ Rastrear pedido
9️⃣ Falar com um atendente humano`);

        // Atualiza o estado para o menu principal
        userStates[userId] = { menu: 'main' };
    }


// INICIAR
if (msg.body === 'Iniciar/iniciar|INICIAR' && userState.menu === 'iniciar') {
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, `O que você deseja fazer agora? Escolha uma das opções:

1️⃣ Comprar agora
2️⃣ Informações sobre o Lift Detox Black
3️⃣ Rastrear pedido
9️⃣ Falar com um atendente humano`);
    
    // Atualiza o estado para a escolha do kit de compra
    userStates[userId] = { menu: 'main' };
}

if (msg.body === 'Ola' && userState.menu === 'atendimentoHumano') {
    await delay(3000);
    await chat.sendStateTyping();
    await delay(3000);
    await client.sendMessage(msg.from, `Aguarde, em breve um atendente irá entrar em contato.
Ou então navegue entre as opções:

1️⃣ Comprar agora
2️⃣ Informações sobre o Lift Detox Black
3️⃣ Rastrear pedido
9️⃣ Falar com um atendente humano`);
    
    // Atualiza o estado para a escolha do kit de compra
    userStates[userId] = { menu: 'main' };
}



//OPÇÃO 1 - VENDAS
    if (msg.body === '1' && userState.menu === 'main') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Qual opção de compra?:
1️⃣ 1 pote: Ideal para 1 mês de tratamento. (R$137,00)
2️⃣ 2 potes + 1 grátis (Recomendado): Ideal para 3 meses de tratamento. (R$168,30)
3️⃣ 3 potes + 2 grátis: Ideal para 5 meses de tratamento. (213,30)`);
        
        // Atualiza o estado para a escolha do kit de compra
        userStates[userId] = { menu: 'purchase' };
    }

    // Se o usuário escolher a opção de potes
    if (msg.body === '1' && userState.menu === 'purchase') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Você escolheu 1 pote por R$ 137, ideal para começar e experimentar os benefícios do LiftDetox. Uma excelente escolha para quem deseja iniciar o processo de emagrecimento com segurança. Vamos finalizar sua compra?`);
        await delay(2000);
        //const media = MessageMedia.fromFilePath(path.join(__dirname, '/images/1pote.jpg'));
        //await client.sendMessage(msg.from, media);
        //await delay(2000);
        await client.sendMessage(msg.from, `Oque deseja fazer?
1️⃣ - Gerar link de compra
2️⃣ - Voltar ao inicio
3️⃣ - Falar com atendente`);
        
        // Atualiza o estado para a opção selecao de potes
        userStates[userId] = { menu: 'selectPurchase1' };
    }

    if (msg.body === '2' && userState.menu === 'purchase') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Você escolheu Compre 2 e leve 3 por R$ 168,30, nossa promoção mais popular! Essa é a escolha perfeita para garantir resultados consistentes e aproveitar o melhor custo-benefício. Vamos seguir com essa oferta?`);
        await delay(2000);
        //const media = MessageMedia.fromFilePath(path.join(__dirname, '/images/3potes.jpg'));
        //await client.sendMessage(msg.from, media);
        //await delay(2000);
        await client.sendMessage(msg.from, `Oque deseja fazer?
1️⃣ - Gerar link de compra
2️⃣ - Voltar ao inicio
3️⃣ - Falar com atendente`);
        
        // Atualiza o estado para a opção selecao de potes
        userStates[userId] = { menu: 'selectPurchase2' };
    }

    if (msg.body === '3' && userState.menu === 'purchase') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Você escolheu Compre 3 e leve 5 por R$ 213,30, ideal para quem busca um compromisso completo com seus objetivos de emagrecimento. Com essa oferta, você garante ótimos resultados e economia máxima. Deseja confirmar?`);
        await delay(2000);
        //const media = MessageMedia.fromFilePath(path.join(__dirname, '/images/5potes.jpg'));
        //await client.sendMessage(msg.from, media);
        //await delay(2000);
        await client.sendMessage(msg.from, `Oque deseja fazer?
1️⃣ - Gerar link de compra
2️⃣ - Voltar ao inicio
3️⃣ - Falar com atendente`);
        
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
        await client.sendMessage(msg.from, 'Digite "iniciar" para iniciar um novo atendimento');
        userStates[userId] = { menu: 'iniciar' };
    }


    // Se o usuário escolher a opção 2 Voltar ao inicio
    if (msg.body === '2' && userState.menu === 'selectPurchase1') {
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
            userStates[userId] = { menu: 'atendimentoHumano' };
            // Atualiza o estado para a opção selecao de potes
            
        }

    if (msg.body === '1' && userState.menu === 'selectPurchase2') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Obrigado pela sua escolha! Vou te enviar o link para pagamento:');
        await client.sendMessage(msg.from, 'https://ev.braip.com/campanhas/cpa/camm7kmgp');

        userStates[userId] = { menu: 'compraFinalizada' };
        await delay(3000);
        await client.sendMessage(msg.from, 'Obrigado pela sua escolha!');
        await delay(3000);
        await client.sendMessage(msg.from, 'Digite "iniciar" para iniciar um novo atendimento');
        userStates[userId] = { menu: 'iniciar' };

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
        await client.sendMessage(msg.from, `Aguarde, em breve um atendente irá entrar em contato.

Ou então navegue entre as opções:
            
1️⃣ Comprar agora
2️⃣ Informações sobre o Lift Detox Black
3️⃣ Rastrear pedido
9️⃣ Falar com um atendente humano`);
                
                // Atualiza o estado para a escolha do kit de compra
                userStates[userId] = { menu: 'main' };
        // Atualiza o estado para a opção selecao de potes
      
    }

        if (msg.body === '1' && userState.menu === 'selectPurchase3') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, 'Obrigado pela sua escolha! Vou te enviar o link para pagamento:');
        await client.sendMessage(msg.from, 'https://ev.braip.com/campanhas/cpa/cam8m6m1z');

        userStates[userId] = { menu: 'compraFinalizada' };
        await delay(3000);
        await client.sendMessage(msg.from, 'Obrigado pela sua escolha!');
        await delay(3000);
        await client.sendMessage(msg.from, 'Digite "iniciar" para iniciar um novo atendimento');
        userStates[userId] = { menu: 'iniciar' };
    }


    if (msg.body === '2' && userState.menu === 'selectPurchase3') {
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
    if (msg.body === '3' && userState.menu === 'selectPurchase3') {
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, `Aguarde, em breve um atendente irá entrar em contato.
Ou então navegue entre as opções:
            
1️⃣ Comprar agora
2️⃣ Informações sobre o Lift Detox Black
3️⃣ Rastrear pedido
9️⃣ Falar com um atendente humano`);
                
                // Atualiza o estado para a escolha do kit de compra
                userStates[userId] = { menu: 'main' };
        // Atualiza o estado para a opção selecao de potes
        
    }

// OPCAO 2 INFORMAÇÕES SOBRE O PRODUTO
    if (msg.body === '2' && userState.menu === 'main') {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, `O Lift Detox é um suplemento natural eficaz para quem deseja emagrecer de forma saudável. Ele acelera o metabolismo e promove a queima de gordura, graças aos seus ingredientes como chá verde, gengibre, hibisco e guaraná. Além disso, auxilia na desintoxicação do organismo, elimina toxinas e controla o apetite, proporcionando maior saciedade ao longo do dia.

            
A recomendação é consumir duas cápsulas por dia, preferencialmente antes das refeições principais​. Se você está buscando um emagrecedor natural e eficaz, o Lift Detox pode ser a escolha ideal para alcançar seus objetivos de forma sustentável e com mais energia.

Caso tenha mais dúvidas ou queira saber onde comprar, estou à disposição!
            `);
            await delay(2000);
            await client.sendMessage(msg.from, `O que você deseja fazer agora? Escolha uma das opções:
    
1️⃣ Comprar o Lift Detox Black  
2️⃣ Informações sobre o Lift Detox Black  
3️⃣ Rastrear pedido  
9️⃣ Falar com atendente`);
            
        
        // Atualiza o estado para a escolha do kit de compra
        userStates[userId] = { menu: 'main' };
    }




// OPCAO 3 RASTREAR PEDIDO
    if (msg.body === '3' && userState.menu === 'main') {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, `Acesse o link e insira seus dados para rastrear o pedido:`);
        await delay(2000);
        await client.sendMessage(msg.from, `https://www.siterastreio.com.br/`);
        await delay(2000);
        await client.sendMessage(msg.from, `O que você deseja fazer agora? Escolha uma das opções:
    
1️⃣ Comprar o Lift Detox Black  
2️⃣ Informações sobre o Lift Detox Black  
3️⃣ Rastrear pedido  
9️⃣ Falar com atendente`);
            
        
        // Atualiza o estado para a escolha do kit de compra
        userStates[userId] = { menu: 'main' };
    }



    if (msg.body === '9' && userState.menu === 'main') {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, `Aguarde, em breve um atendente irá entrar em contato.
Ou então navegue entre as opções:
            
1️⃣ Comprar agora
2️⃣ Informações sobre o Lift Detox Black
3️⃣ Rastrear pedido
9️⃣ Falar com um atendente humano`);
                
                // Atualiza o estado para a escolha do kit de compra
                userStates[userId] = { menu: 'main' };
    }

});




// Inicializa o cliente
client.initialize();
