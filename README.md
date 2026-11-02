# Desenvolvimento Front-End • Projeto JozaTech Soluções

Repositório acadêmico desenvolvido para a disciplina de **Desenvolvimento Front-End** do 6º período de graduação. O projeto consiste na evolução progressiva de uma plataforma web focada em sustentabilidade digital e tecnologia consciente (**JozaTech Soluções**), abrangendo as Fases 01, 02 e 03.

---

## 📁 Estrutura do Repositório

```text
Front_End/
├── Site_Fase_01/               # Fase 01: Estrutura semântica e estilização
│   └── index.html              # HTML5, CSS3 Grid/Flexbox, responsividade e acessibilidade
├── Site_Fase_02/               # Fase 02: Interatividade e manipulação dinâmica do DOM
│   ├── css/
│   │   └── style.css           # Estilos modulares, variáveis CSS, temas e componentes
│   ├── js/
│   │   └── script.js           # Lógica JavaScript, eventos, validações e manipulação do DOM
│   └── index.html              # Interface interativa completa da Fase 02
├── .gitattributes
├── LICENSE
└── README.md                   # Documentação detalhada do projeto e critérios atendidos
```

---

## 🌿 Contexto do Projeto: JozaTech Soluções

A **JozaTech Soluções** é uma iniciativa web voltada à disseminação e aplicação de **Green IT (TI Verde)**, desenvolvimento de software sustentável, eco-design e acessibilidade universal. O projeto demonstra como unir excelente experiência do usuário, código limpo de alto desempenho e práticas responsáveis de redução de pegada de carbono digital.

---

## 📌 Fase 01 • Fundamentos de Estrutura, Estilização e Acessibilidade

### Objetivos da Fase 1:
- Construção de páginas web limpas e altamente acessíveis seguindo os padrões modernos de HTML5 e CSS3.
- Utilização rigorosa de semântica HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- Criação de layouts responsivos com CSS Grid e Flexbox sem dependência de frameworks externos.
- Acessibilidade visual com foco em contraste de cores, navegação por teclado e conformidade com diretrizes WCAG.

Acesse o diretório: [`Site_Fase_01/index.html`](Site_Fase_01/index.html)

---

## 🚀 Fase 02 • Interatividade, Eventos e Manipulação do DOM com JavaScript

### Orientações da Avaliação:
> **Descrição da avaliação:** Criar uma aplicação simples que manipule o DOM para alterar o conteúdo e estilo de uma página com base em interações do usuário.

A aplicação desenvolvida em [`Site_Fase_02/`](Site_Fase_02/) atende com excelência e profundidade a todos os requisitos solicitados:

### 1. 🎯 Seleção e Manipulação de Elementos do DOM
- **Seletores Modernos:** Utilização de `document.getElementById`, `document.querySelector` e `document.querySelectorAll`.
- **Alteração Dinâmica de Propriedades e Conteúdo:** Modificação de `textContent`, `innerHTML`, atributos de acessibilidade (`aria-expanded`, `aria-hidden`, `aria-label`) e classes (`classList.add`, `classList.remove`, `classList.toggle`).
- **Geração Dinâmica de Elementos:** O catálogo de soluções e a lista de mensagens recentes são gerados no DOM via JavaScript (`document.createElement`, `appendChild`, `prepend`) com base em estruturas de dados JSON locais.

### 2. ⚡ Interatividade com Múltiplos Tipos de Eventos
A aplicação contempla e integra diversos tipos de eventos:
- **`click`**:
  - Alternância de Modo Claro e Escuro (Dark Mode).
  - Controle de tamanho tipográfico (A-, A, A+).
  - Seleção de paleta de cores primárias de destaque.
  - Filtro por categorias de soluções sustentáveis.
  - Abertura e fechamento de modal interativo de detalhes (inclusive clique fora da janela no backdrop).
  - Botão gerador de novas citações/insights de TI verde.
  - Alternância do menu de navegação responsivo em dispositivos móveis.
- **`input`**:
  - Campo de busca instantânea no catálogo (filtra cards no DOM em tempo real conforme digitação).
  - Contador de caracteres em tempo real no campo de mensagem do formulário (`X / 300 caracteres`).
  - Slider do simulador ESG (atualiza imediatamente os cálculos e métricas ao arrastar).
- **`change`**:
  - Seletor de estratégia de otimização sustentável no simulador.
  - Validação imediata de seleção no dropdown e checkbox de termos.
- **`submit`**:
  - Interceptação com `event.preventDefault()` no envio do formulário para validação customizada e tratamento assíncrono com feedback dinâmico.
- **`keydown`**:
  - Fechamento da janela modal com a tecla <kbd>Esc</kbd> para conformidade com acessibilidade.

### 3. 🎨 Manipulação Dinâmica de Estilos
A aplicação oferece um painel completo de customização de estilos via JavaScript:
- **Alternador Dark Mode / Light Mode:** Alterna a classe `.dark-theme` no `document.body` e atualiza ícones e textos explicativos, com preferência persistida no `localStorage`.
- **Ajuste de Escala de Fonte:** Modifica dinamicamente a variável CSS `--font-scale` no elemento `:root`, redimensionando harmoniosamente a tipografia de toda a página.
- **Seletor de Cor de Destaque:** Altera em tempo de execução o valor de `--primary-color` e `--primary-glow` no `:root`, transformando botões, links, bordas e destaques visuais.
- **Barra de Progresso Adaptativa:** No simulador de impacto ambiental, a barra de progresso tem sua largura (`style.width`) e sua cor de fundo (`style.backgroundColor`) manipuladas pelo JavaScript conforme o percentual de eficiência calculado.

### 4. 🛡️ Validação Completa de Formulários com Feedback em Tempo Real
- **Campos Validados:**
  - **Nome Completo:** Validação de mínimo de 3 caracteres e restrição a apenas letras e espaços.
  - **E-mail:** Validação com Expressão Regular (Regex) para formato de e-mail válido.
  - **Área de Interesse:** Validação de seleção obrigatória em elemento `<select>`.
  - **Mensagem:** Verificação de tamanho mínimo (15 caracteres) e limite máximo com contador dinâmico.
  - **Termos de Privacidade:** Checkbox de aceite obrigatório.
- **Comportamento e Feedback Visual:**
  - Validação em tempo real ao digitar (`input`) e ao perder o foco (`blur`).
  - Aplicação de classes `.is-valid` e `.is-invalid` nos inputs.
  - Mensagens de erro dinâmicas exibidas abaixo de cada campo inválido.
  - Foco automático no primeiro campo com erro em caso de tentativa de envio inválida.
  - Notificações flutuantes (*Toast*) criadas dinamicamente no DOM com animações de entrada e saída automática.
  - Ao enviar com sucesso, os dados são limpos e uma nova entrada é inserida na seção de atendimentos recentes do DOM.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica, formulários acessíveis e atributos ARIA.
- **CSS3:** Variáveis CSS (Custom Properties), CSS Grid, Flexbox, Media Queries e animações fluidas.
- **JavaScript (ES6+):** Manipulação da árvore DOM, escutadores de eventos (`EventListeners`), manipulação de objetos JSON, LocalStorage e validações Regex.
- **Git & GitHub:** Controle de versão distribuído e histórico de commits.

---

## 💻 Como Executar o Projeto Localmente

1. Clone o repositório em sua máquina:
   ```bash
   git clone https://github.com/Jozacolab/Front_End.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd Front_End
   ```

3. Abra a página da Fase desejada em qualquer navegador moderno:
   - **Fase 01:** Abra o arquivo `Site_Fase_01/index.html`
   - **Fase 02:** Abra o arquivo `Site_Fase_02/index.html`

> 💡 **Dica de Desenvolvimento:** Caso utilize o **VS Code**, clique com o botão direito sobre o arquivo `index.html` e selecione **"Open with Live Server"**.

---

## 👤 Autor

- **Aluno:** Josias Soares de Souza
- **Repositório:** [github.com/Jozacolab/Front_End](https://github.com/Jozacolab/Front_End)
- **Curso:** Graduação em Tecnologia (6º Período)
- **Disciplina:** Desenvolvimento Front-End
