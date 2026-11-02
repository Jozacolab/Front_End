/**
 * ==========================================================================
 * JozaTech Soluções - Fase 02: Lógica JavaScript & Manipulação do DOM
 * Disciplina: Desenvolvimento Front-end (6º Período)
 * Autor: Josias Soares de Souza (JozaTech)
 * 
 * Este arquivo implementa:
 * 1. Seleção e manipulação dinâmica de elementos do DOM
 * 2. Manipulação de estilos e temas (Dark Mode, Tamanho de Fonte, Paleta de Cores)
 * 3. Gestão de múltiplos tipos de eventos (click, input, change, submit, keydown)
 * 4. Renderização dinâmica de catálogo de serviços a partir de dados (JSON)
 * 5. Sistema interativo de cálculo (Simulador de Economia de Carbono)
 * 6. Validação robusta de formulário em tempo real com mensagens de feedback
 * 7. Janela Modal acessível e Sistema de Notificações Toast no DOM
 * ==========================================================================
 */

// Executa após o carregamento completo da árvore DOM
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ==========================================================================
       DADOS DA APLICAÇÃO (Simulação de base de dados / JSON)
       ========================================================================== */
    const solucoesData = [
        {
            id: 1,
            categoria: "cloud",
            tag: "Cloud Verde",
            titulo: "Migração para Nuvem Sustentável",
            descricao: "Transição planejada de datacenters locais para infraestruturas de nuvem 100% abastecidas por energias renováveis e servidores de baixo consumo.",
            impacto: "Até 65% menos emissão de carbono",
            detalhes: "Nosso serviço de migração verde analisa detalhadamente o perfil de consumo da sua empresa e adota provedores certificados com net-zero. Reduz custos operacionais enquanto alinha seu negócio às metas globais ESG."
        },
        {
            id: 2,
            categoria: "codigo",
            tag: "Código Limpo",
            titulo: "Otimização e Green Coding",
            descricao: "Refatoração de algoritmos e redução de processamento computacional inútil, economizando ciclos de CPU e tempo de renderização no navegador.",
            impacto: "Redução de até 40% no processamento",
            detalhes: "O desenvolvimento sustentável (Green Software) foca na eliminação de payloads excessivos de JavaScript, requisições redundantes e rotinas pesadas, gerando interfaces ultrarrápidas e energeticamente conscientes."
        },
        {
            id: 3,
            categoria: "design",
            tag: "UX Verde",
            titulo: "Eco-Design & Dark Mode Nativo",
            descricao: "Criação de interfaces que minimizam o consumo energético em telas OLED/AMOLED, com paletas otimizadas e hierarquia visual leve.",
            impacto: "Até 30% de economia de bateria em telas OLED",
            detalhes: "Ao priorizar o modo escuro e paletas com contraste balanceado, usuários com monitores modernos reduzem o consumo individual de energia, sem sacrificar a legibilidade e o design moderno."
        },
        {
            id: 4,
            categoria: "cloud",
            tag: "Arquitetura",
            titulo: "Arquitetura Serverless & Microserviços",
            descricao: "Implementação de microsserviços sob demanda que só consomem energia durante o momento exato da execução, eliminando servidores ociosos.",
            impacto: "Zero gasto energético com máquinas ociosas",
            detalhes: "Sistemas tradicionais mantêm instâncias ativas 24 horas por dia consumindo energia desnecessária. Com arquiteturas Serverless orientadas a eventos, os recursos computacionais são escalados a zero quando o tráfego cessa."
        },
        {
            id: 5,
            categoria: "codigo",
            tag: "Front-End",
            titulo: "Compressão e Cache Inteligente de Ativos",
            descricao: "Utilização de formatos de imagem modernos (WebP/AVIF), compressão Brotli e políticas estritas de cache HTTP para reduzir o tráfego na rede.",
            impacto: "Economia média de 70% na transferência de dados",
            detalhes: "Cada gigabyte transferido pela internet consome eletricidade em roteadores, antenas e servidores de borda. Imagens comprimidas e caches duradouros poupam recursos globais e aceleram seu SEO."
        },
        {
            id: 6,
            categoria: "design",
            tag: "Acessibilidade",
            titulo: "Acessibilidade Universal (WCAG 2.1)",
            descricao: "Adequação completa das páginas web para pessoas com deficiência através de semântica correta, navegação por teclado e suporte a leitores de tela.",
            impacto: "100% de conformidade com diretrizes internacionais",
            detalhes: "Acessibilidade digital não é apenas um direito civil, mas uma boa prática de engenharia de software que melhora o tempo de permanência, reduz taxa de rejeição e amplia seu alcance de público."
        }
    ];

    const insightsSustentaveis = [
        {
            frase: "Transferir 1 GB de dados pela internet gera, em média, entre 20g e 50g de CO2. Otimizar imagens e scripts salva o planeta.",
            autor: "Green Software Foundation"
        },
        {
            frase: "Páginas web mais leves consomem menos ciclos de CPU no dispositivo do usuário, prologando a vida útil de baterias.",
            autor: "W3C Sustainable Web Design"
        },
        {
            frase: "O Dark Mode em dispositivos com telas OLED/AMOLED pode reduzir o consumo de energia da tela em até 63% no brilho máximo.",
            autor: "Purdue University Research"
        },
        {
            frase: "Acessibilidade digital e performance caminham juntos: código semântico é lido mais rápido por humanos e por robôs de busca.",
            autor: "JozaTech Soluções Sustentáveis"
        },
        {
            frase: "Desligar instâncias de staging e testes fora do horário comercial pode cortar mais de 60% da pegada de carbono da infraestrutura.",
            autor: "Cloud Sustainability Alliance"
        }
    ];

    /* ==========================================================================
       1. CONTROLE DE ESTILOS E ACESSIBILIDADE (Manipulação do DOM)
       ========================================================================== */

    // 1.1 Alternador de Modo Escuro / Claro (Dark Mode)
    const btnThemeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    // Recupera tema preferido do localStorage se existir
    const temaSalvo = localStorage.getItem('jozatech-theme');
    if (temaSalvo === 'dark') {
        document.body.classList.add('dark-theme');
        atualizarIconeTema(true);
    }

    if (btnThemeToggle) {
        btnThemeToggle.addEventListener('click', () => {
            // Alterna a classe no elemento <body> através do DOM
            const isDark = document.body.classList.toggle('dark-theme');
            atualizarIconeTema(isDark);
            
            // Persistência no armazenamento local do navegador
            localStorage.setItem('jozatech-theme', isDark ? 'dark' : 'light');

            // Feedback dinâmico ao usuário via Toast
            exibirToast(isDark ? 'Modo Escuro ativado 🌙' : 'Modo Claro ativado ☀️', 'info');
        });
    }

    function atualizarIconeTema(isDark) {
        if (!themeIcon || !themeText) return;
        if (isDark) {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Modo Claro';
            btnThemeToggle.setAttribute('aria-label', 'Alternar para Modo Claro');
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Modo Escuro';
            btnThemeToggle.setAttribute('aria-label', 'Alternar para Modo Escuro');
        }
    }

    // 1.2 Ajuste de Tamanho da Fonte (Acessibilidade)
    const btnFontDec = document.getElementById('font-decrease');
    const btnFontReset = document.getElementById('font-reset');
    const btnFontInc = document.getElementById('font-increase');

    // Níveis de escala de fonte suportados
    const tamanhosFonte = ['0.875rem', '1rem', '1.15rem'];
    let indiceFonteAtual = 1; // Padrão: 1rem

    function aplicarTamanhoFonte(novoIndice) {
        indiceFonteAtual = novoIndice;
        // Manipula variável CSS diretamente no elemento :root (HTML)
        document.documentElement.style.setProperty('--font-scale', tamanhosFonte[indiceFonteAtual]);
        
        // Atualiza estado visual ativo nos botões
        [btnFontDec, btnFontReset, btnFontInc].forEach((btn, idx) => {
            if (btn) btn.classList.toggle('active', idx === indiceFonteAtual);
        });
    }

    if (btnFontDec) {
        btnFontDec.addEventListener('click', () => {
            if (indiceFonteAtual > 0) {
                aplicarTamanhoFonte(indiceFonteAtual - 1);
                exibirToast('Tamanho do texto diminuído (A-)', 'info');
            }
        });
    }

    if (btnFontReset) {
        btnFontReset.addEventListener('click', () => {
            aplicarTamanhoFonte(1);
            exibirToast('Tamanho do texto restaurado ao padrão', 'info');
        });
    }

    if (btnFontInc) {
        btnFontInc.addEventListener('click', () => {
            if (indiceFonteAtual < tamanhosFonte.length - 1) {
                aplicarTamanhoFonte(indiceFonteAtual + 1);
                exibirToast('Tamanho do texto aumentado (A+)', 'info');
            }
        });
    }

    // 1.3 Seletor de Paleta de Cores Dinâmica (Accent Color)
    const colorDots = document.querySelectorAll('.dot-color');
    colorDots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const corSelecionada = event.target.getAttribute('data-color');
            if (corSelecionada) {
                // Altera dinamicamente as variáveis CSS de cor no elemento :root
                document.documentElement.style.setProperty('--primary-color', corSelecionada);
                
                // Converte hex para rgba com transparência para o efeito de brilho
                const r = parseInt(corSelecionada.slice(1, 3), 16);
                const g = parseInt(corSelecionada.slice(3, 5), 16);
                const b = parseInt(corSelecionada.slice(5, 7), 16);
                document.documentElement.style.setProperty('--primary-glow', `rgba(${r}, ${g}, ${b}, 0.25)`);
                
                exibirToast(`Cor de destaque alterada com sucesso!`, 'info');
            }
        });
    });

    // 1.4 Menu Mobile Responsivo (Toggle de visibilidade)
    const btnMobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (btnMobileToggle && navMenu) {
        btnMobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            btnMobileToggle.setAttribute('aria-expanded', isOpen);
            btnMobileToggle.textContent = isOpen ? '✕' : '☰';
        });

        // Fecha menu ao clicar em um link de navegação
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                btnMobileToggle.textContent = '☰';
            });
        });
    }

    /* ==========================================================================
       2. CATÁLOGO DINÂMICO DE SOLUÇÕES (Manipulação de Conteúdo e Filtros)
       ========================================================================== */
    const catalogGrid = document.getElementById('catalog-grid');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const catalogCount = document.getElementById('catalog-count');

    let categoriaFiltroAtiva = 'all';
    let termoBuscaAtivo = '';

    /**
     * Renderiza os cards de soluções manipulando os nós do DOM
     */
    function renderizarCatalogo() {
        if (!catalogGrid) return;

        // Limpa conteúdo anterior do grid
        catalogGrid.innerHTML = '';

        // Filtra os dados de acordo com a categoria e o termo de busca
        const dadosFiltrados = solucoesData.filter(item => {
            const bateCategoria = (categoriaFiltroAtiva === 'all') || (item.categoria === categoriaFiltroAtiva);
            const termo = termoBuscaAtivo.toLowerCase().trim();
            const bateBusca = item.titulo.toLowerCase().includes(termo) ||
                              item.descricao.toLowerCase().includes(termo) ||
                              item.tag.toLowerCase().includes(termo);
            return bateCategoria && bateBusca;
        });

        // Atualiza contador textual de resultados no DOM
        if (catalogCount) {
            catalogCount.textContent = `Exibindo ${dadosFiltrados.length} de ${solucoesData.length} soluções`;
        }

        // Se não houver itens compatíveis, injeta um estado vazio estilizado
        if (dadosFiltrados.length === 0) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-state';
            emptyDiv.innerHTML = `
                <span style="font-size: 2.5rem;">🔍</span>
                <h4>Nenhuma solução encontrada</h4>
                <p>Tente usar outros termos de busca ou selecione a categoria "Todas".</p>
            `;
            catalogGrid.appendChild(emptyDiv);
            return;
        }

        // Cria os nós HTML para cada solução encontrada
        dadosFiltrados.forEach(item => {
            const card = document.createElement('article');
            card.className = 'solution-card';
            card.setAttribute('data-id', item.id);

            card.innerHTML = `
                <div class="solution-header">
                    <span class="solution-tag">${item.tag}</span>
                </div>
                <h4>${item.titulo}</h4>
                <p>${item.descricao}</p>
                <div class="solution-metric">
                    <span>🌱</span>
                    <span>${item.impacto}</span>
                </div>
                <button class="btn btn-outline btn-details" data-id="${item.id}" type="button">
                    Ver Detalhes
                </button>
            `;

            catalogGrid.appendChild(card);
        });

        // Adiciona evento de clique aos botões de detalhes recém-criados
        catalogGrid.querySelectorAll('.btn-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
                abrirModalDetalhes(id);
            });
        });
    }

    // Evento de input em tempo real na barra de busca
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            termoBuscaAtivo = e.target.value;
            renderizarCatalogo();
        });
    }

    // Evento de clique nos botões de filtro de categoria
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            categoriaFiltroAtiva = e.currentTarget.getAttribute('data-filter');
            renderizarCatalogo();
        });
    });

    // Render inicial do catálogo
    renderizarCatalogo();

    /* ==========================================================================
       3. SIMULADOR DE ECONOMIA DE CARBONO (Cálculos e Manipulação Visual)
       ========================================================================== */
    const rangeServers = document.getElementById('range-servers');
    const rangeValue = document.getElementById('range-value');
    const selectStrategy = document.getElementById('select-strategy');
    const metricCo2 = document.getElementById('metric-co2');
    const metricTrees = document.getElementById('metric-trees');
    const metricEconomy = document.getElementById('metric-economy');
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');

    function recalcularSimulador() {
        if (!rangeServers || !selectStrategy) return;

        const qtdServidores = parseInt(rangeServers.value, 10);
        const fatorEstrategia = parseFloat(selectStrategy.value);

        // Atualiza o valor do indicador de quantidade
        if (rangeValue) {
            rangeValue.textContent = qtdServidores === 1 ? '1 servidor' : `${qtdServidores} servidores`;
        }

        // Fórmulas pedagógicas de estimativa:
        // Cada servidor médio emite aprox. 450 kg CO2/ano
        const emissaoBasePorServidor = 450;
        const totalEmissaoAnual = qtdServidores * emissaoBasePorServidor;
        const co2EconomizadoKg = Math.round(totalEmissaoAnual * fatorEstrategia);
        
        // 1 árvore adulta absorve em média 22 kg de CO2/ano
        const arvoresEquivalentes = Math.max(1, Math.round(co2EconomizadoKg / 22));
        
        // Economia financeira estimada média: R$ 320 por servidor otimizado
        const economiaFinanceira = Math.round(qtdServidores * 320 * (fatorEstrategia / 0.5));

        // Atualiza textos nos elementos do DOM
        if (metricCo2) {
            metricCo2.textContent = co2EconomizadoKg >= 1000 
                ? `${(co2EconomizadoKg / 1000).toFixed(1)} ton` 
                : `${co2EconomizadoKg} kg`;
        }
        if (metricTrees) metricTrees.textContent = arvoresEquivalentes.toLocaleString('pt-BR');
        if (metricEconomy) metricEconomy.textContent = `R$ ${economiaFinanceira.toLocaleString('pt-BR')}`;

        // Manipulação de estilos dinâmicos da barra de progresso (Width e Cor)
        const percentualEficiencia = Math.min(100, Math.round((fatorEstrategia / 0.7) * (qtdServidores / 150) * 100));
        if (progressFill && progressPercent) {
            progressFill.style.width = `${percentualEficiencia}%`;
            progressPercent.textContent = `${percentualEficiencia}%`;

            // Altera a cor de acordo com o nível alcançado
            if (percentualEficiencia > 70) {
                progressFill.style.backgroundColor = '#10b981'; // Verde alto
            } else if (percentualEficiencia > 35) {
                progressFill.style.backgroundColor = '#0284c7'; // Azul médio
            } else {
                progressFill.style.backgroundColor = '#f59e0b'; // Laranja inicial
            }
        }
    }

    if (rangeServers) {
        rangeServers.addEventListener('input', recalcularSimulador);
    }
    if (selectStrategy) {
        selectStrategy.addEventListener('change', recalcularSimulador);
    }

    // Cálculo inicial
    recalcularSimulador();

    /* ==========================================================================
       4. GERADOR DE INSIGHTS / DICAS SUSTENTÁVEIS (Atualização de Conteúdo)
       ========================================================================== */
    const btnNewInsight = document.getElementById('btn-new-insight');
    const quoteElement = document.getElementById('insight-quote');
    const authorElement = document.getElementById('insight-author');

    let ultimoIndiceInsight = -1;

    function carregarNovoInsight() {
        if (!quoteElement || !authorElement || !btnNewInsight) return;

        // Feedback de carregamento (desabilita botão temporariamente e anima)
        btnNewInsight.disabled = true;
        btnNewInsight.textContent = 'Carregando...';
        quoteElement.style.opacity = '0.3';

        setTimeout(() => {
            let sorteio;
            // Evita repetir a mesma frase em sequência
            do {
                sorteio = Math.floor(Math.random() * insightsSustentaveis.length);
            } while (sorteio === ultimoIndiceInsight && insightsSustentaveis.length > 1);

            ultimoIndiceInsight = sorteio;
            const insight = insightsSustentaveis[sorteio];

            // Atualiza o DOM
            quoteElement.textContent = `“${insight.frase}”`;
            authorElement.textContent = `— Fonte: ${insight.autor}`;
            quoteElement.style.opacity = '1';

            btnNewInsight.disabled = false;
            btnNewInsight.textContent = '💡 Obter Outro Insight';
        }, 350);
    }

    if (btnNewInsight) {
        btnNewInsight.addEventListener('click', carregarNovoInsight);
    }

    /* ==========================================================================
       5. MODAL DINÂMICO DE DETALHES (Criação, Abertura e Fechamento)
       ========================================================================== */
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const modalImpact = document.getElementById('modal-impact');
    const btnCloseModal = document.getElementById('btn-close-modal');

    function abrirModalDetalhes(solucaoId) {
        const solucao = solucoesData.find(item => item.id === solucaoId);
        if (!solucao || !modalOverlay) return;

        // Preenche o conteúdo do modal no DOM
        if (modalTitle) modalTitle.textContent = solucao.titulo;
        if (modalCategory) modalCategory.textContent = `Categoria: ${solucao.tag}`;
        if (modalDescription) modalDescription.textContent = solucao.detalhes;
        if (modalImpact) modalImpact.textContent = `Meta de Impacto: ${solucao.impacto}`;

        // Abre modal alterando classe CSS
        modalOverlay.classList.add('open');
        modalOverlay.setAttribute('aria-hidden', 'false');

        // Foca no botão de fechar para acessibilidade por teclado
        if (btnCloseModal) btnCloseModal.focus();
    }

    function fecharModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
    }

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', fecharModal);
    }

    // Fechar ao clicar fora da caixa do modal (no backdrop)
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                fecharModal();
            }
        });
    }

    // Fechar modal ao pressionar tecla ESC (Acessibilidade)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
            fecharModal();
        }
    });

    /* ==========================================================================
       6. VALIDAÇÃO DE FORMULÁRIO EM TEMPO REAL & SUBMISSÃO
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');
    const selectAssunto = document.getElementById('assunto');
    const inputMensagem = document.getElementById('mensagem');
    const checkTermos = document.getElementById('termos');
    const charCounter = document.getElementById('char-counter');
    const submissionsList = document.getElementById('submissions-list');

    // Regras de validação com expressões regulares e funções
    const validadores = {
        nome: (valor) => {
            const v = valor.trim();
            if (v.length < 3) return 'O nome deve conter ao menos 3 caracteres.';
            if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(v)) return 'O nome deve conter apenas letras e espaços.';
            return '';
        },
        email: (valor) => {
            const v = valor.trim();
            if (!v) return 'O e-mail é obrigatório.';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(v)) return 'Informe um endereço de e-mail válido (ex: contato@exemplo.com).';
            return '';
        },
        assunto: (valor) => {
            if (!valor) return 'Por favor, selecione um assunto de interesse.';
            return '';
        },
        mensagem: (valor) => {
            const v = valor.trim();
            if (v.length < 15) return 'A mensagem deve conter pelo menos 15 caracteres.';
            return '';
        },
        termos: (elemento) => {
            if (!elemento.checked) return 'Você deve concordar com as diretrizes para prosseguir.';
            return '';
        }
    };

    /**
     * Valida um campo individual e manipula classes e mensagens de erro no DOM
     */
    function validarCampo(campo, validador) {
        const errorEl = document.getElementById(`error-${campo.id}`);
        const valor = campo.type === 'checkbox' ? campo : campo.value;
        const mensagemErro = validador(valor);

        if (mensagemErro) {
            campo.classList.remove('is-valid');
            campo.classList.add('is-invalid');
            if (errorEl) {
                errorEl.textContent = mensagemErro;
                errorEl.classList.add('visible');
            }
            return false;
        } else {
            campo.classList.remove('is-invalid');
            campo.classList.add('is-valid');
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('visible');
            }
            return true;
        }
    }

    // Configuração dos eventos de escuta (input e blur) para validação instantânea
    if (inputNome) {
        inputNome.addEventListener('input', () => validarCampo(inputNome, validadores.nome));
        inputNome.addEventListener('blur', () => validarCampo(inputNome, validadores.nome));
    }

    if (inputEmail) {
        inputEmail.addEventListener('input', () => validarCampo(inputEmail, validadores.email));
        inputEmail.addEventListener('blur', () => validarCampo(inputEmail, validadores.email));
    }

    if (selectAssunto) {
        selectAssunto.addEventListener('change', () => validarCampo(selectAssunto, validadores.assunto));
    }

    if (checkTermos) {
        checkTermos.addEventListener('change', () => validarCampo(checkTermos, validadores.termos));
    }

    // Contador dinâmico de caracteres na mensagem
    if (inputMensagem && charCounter) {
        const maxCaracteres = 300;
        inputMensagem.addEventListener('input', () => {
            const digitados = inputMensagem.value.length;
            const restantes = maxCaracteres - digitados;
            
            charCounter.textContent = `${digitados} / ${maxCaracteres} caracteres`;

            // Altera estilo visual conforme o limite se aproxima
            charCounter.classList.toggle('warning', restantes <= 50 && restantes > 10);
            charCounter.classList.toggle('limit', restantes <= 10);

            validarCampo(inputMensagem, validadores.mensagem);
        });

        inputMensagem.addEventListener('blur', () => validarCampo(inputMensagem, validadores.mensagem));
    }

    // Submissão do Formulário
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Impede o envio padrão da página
            event.preventDefault();

            // Executa a validação de todos os campos
            const isNomeValido = validarCampo(inputNome, validadores.nome);
            const isEmailValido = validarCampo(inputEmail, validadores.email);
            const isAssuntoValido = validarCampo(selectAssunto, validadores.assunto);
            const isMensagemValida = validarCampo(inputMensagem, validadores.mensagem);
            const isTermosValidos = validarCampo(checkTermos, validadores.termos);

            const isFormValido = isNomeValido && isEmailValido && isAssuntoValido && isMensagemValida && isTermosValidos;

            if (!isFormValido) {
                exibirToast('Por favor, corrija os erros sinalizados no formulário.', 'error');
                
                // Dá foco automático ao primeiro elemento com erro no DOM
                const primeiroInvalido = contactForm.querySelector('.is-invalid');
                if (primeiroInvalido) primeiroInvalido.focus();
                return;
            }

            // Simula envio bem-sucedido com botão em loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const textoOriginal = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>⏳ Enviando mensagem...</span>';

            setTimeout(() => {
                // Adiciona a mensagem no histórico recente manipulando o DOM
                if (submissionsList) {
                    const agora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    const novoItem = document.createElement('div');
                    novoItem.className = 'submission-item';
                    novoItem.innerHTML = `
                        <div>
                            <strong>${inputNome.value.trim()}</strong> 
                            <span style="color: var(--text-light); font-size: 0.8rem;">(${inputEmail.value.trim()})</span>
                            <p style="margin-top: 0.2rem; color: var(--text-main);">${inputMensagem.value.trim().substring(0, 60)}...</p>
                        </div>
                        <span style="font-size: 0.75rem; color: var(--text-light); white-space: nowrap;">${agora}</span>
                    `;
                    submissionsList.prepend(novoItem);
                }

                // Reseta os campos do formulário
                contactForm.reset();
                [inputNome, inputEmail, selectAssunto, inputMensagem, checkTermos].forEach(campo => {
                    campo.classList.remove('is-valid', 'is-invalid');
                });
                if (charCounter) {
                    charCounter.textContent = '0 / 300 caracteres';
                    charCounter.className = 'char-counter';
                }

                submitBtn.disabled = false;
                submitBtn.innerHTML = textoOriginal;

                exibirToast('Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
            }, 800);
        });
    }

    /* ==========================================================================
       7. SISTEMA DE TOAST NOTIFICATIONS (Manipulação Dinâmica no DOM)
       ========================================================================== */
    function exibirToast(mensagem, tipo = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${tipo}`;
        
        const icones = {
            success: '✅',
            error: '⚠️',
            info: '💡'
        };

        toast.innerHTML = `
            <span>${icones[tipo] || '💡'}</span>
            <span>${mensagem}</span>
        `;

        container.appendChild(toast);

        // Remove elemento do DOM automaticamente após 4 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 4000);
    }
});

