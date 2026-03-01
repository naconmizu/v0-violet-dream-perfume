# Configuração de Email - Gmail

## Erro de Autenticação (EAUTH)

Se você está recebendo o erro `535-5.7.8 Username and Password not accepted`, siga estes passos:

### 1. Ativar Verificação em Duas Etapas

1. Acesse: https://myaccount.google.com/security
2. Ative a "Verificação em duas etapas"
3. Siga as instruções para configurar

### 2. Gerar uma App Password

1. Acesse: https://myaccount.google.com/apppasswords
2. Selecione "App" e escolha "Mail"
3. Selecione "Other (Custom name)" e digite "Violet Dream"
4. Clique em "Generate"
5. **Copie a senha gerada** (16 caracteres, sem espaços)

### 3. Configurar Variáveis de Ambiente

Crie ou edite o arquivo `.env.local` na raiz do projeto:

\`\`\`env
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
CONTACT_EMAIL=contato@violetdream.com
\`\`\`

**Importante:**
- Use o **email completo** (com @gmail.com)
- Use a **App Password** gerada (não sua senha normal do Gmail)
- Remova os espaços da App Password se houver

### 4. Reiniciar o Servidor

Após configurar, reinicie o servidor de desenvolvimento:

\`\`\`bash
npm run dev
\`\`\`

## Alternativas ao Gmail

Se preferir usar outro provedor de email, ajuste a configuração em `app/api/contact/route.js`:

### Outlook/Hotmail
\`\`\`javascript
const transporter = createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})
\`\`\`

### SMTP Personalizado
\`\`\`javascript
const transporter = createTransport({
    host: 'smtp.seu-provedor.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})
\`\`\`

## Testando a Configuração

Após configurar, teste enviando uma mensagem pelo formulário de contato. Se ainda houver erros, verifique:

1. ✅ As variáveis de ambiente estão no `.env.local` (não `.env`)
2. ✅ A App Password está correta (sem espaços)
3. ✅ O email está completo (com @gmail.com)
4. ✅ A verificação em duas etapas está ativada
5. ✅ O servidor foi reiniciado após alterar o `.env.local`
