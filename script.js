/* ======================================================
   1. MENU RESPONSIVO
   Abre e fecha o menu em telas menores.
   Também fecha automaticamente ao clicar fora.
====================================================== */

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("main-menu");

if (menuToggle && menu) {

    // Abrir/fechar menu
    menuToggle.addEventListener("click", () => {

        const expanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!expanded));
        menu.classList.toggle("active");
    });

    // Fechar ao clicar fora
    document.addEventListener("click", (e) => {

        if (
            !menu.contains(e.target) &&
            !menuToggle.contains(e.target) &&
            menu.classList.contains("active")
        ) {

            menu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}


/* ======================================================
   2. TEMA ESCURO
   Alterna entre modo claro e escuro.
   O tema fica salvo no navegador (localStorage).
====================================================== */

const temaBtn = document.getElementById("tema-btn");
const temaSalvo = localStorage.getItem("tema");

// Atualiza o ícone do botão
function atualizarIconeTema() {

    if (!temaBtn) return;

    if (document.body.classList.contains("dark-mode")) {
        temaBtn.textContent = "☀️";
    } else {
        temaBtn.textContent = "🌙";
    }
}

// Carrega o tema salvo
if (temaSalvo === "escuro") {
    document.body.classList.add("dark-mode");
}

atualizarIconeTema();

// Troca o tema ao clicar
if (temaBtn) {

    temaBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const modo =
            document.body.classList.contains("dark-mode")
                ? "escuro"
                : "claro";

        localStorage.setItem("tema", modo);
        atualizarIconeTema();
    });
}


/* ======================================================
   3. CARROSSEL DE LIVROS
   Move os livros horizontalmente usando os botões
   de avançar e voltar.
====================================================== */

document.querySelectorAll(".carousel").forEach(carousel => {

    const track = carousel.querySelector(".carousel-track");
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");

    const scrollAmount = 200;

    // Próximo
    next.addEventListener("click", () => {

        track.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });

    // Anterior
    prev.addEventListener("click", () => {

        track.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    });
});


/* ======================================================
   4. PESQUISA DE LIVROS
   Procura livros pelo título ou autor enquanto
   o usuário digita.
====================================================== */

const pesquisa = document.getElementById("search");

if (pesquisa) {

    pesquisa.addEventListener("keyup", () => {

        const texto = pesquisa.value.toLowerCase();
        const livros = document.querySelectorAll(".book-card");

        livros.forEach((livro) => {

            const titulo = livro
                .querySelector(".book-title")
                .textContent
                .toLowerCase();

            const autor = livro
                .querySelector(".book-author")
                .textContent
                .toLowerCase();

            if (
                titulo.includes(texto) ||
                autor.includes(texto)
            ) {
                livro.style.display = "block";
            } else {
                livro.style.display = "none";
            }
        });
    });
}


/* ======================================================
   5. FILTROS DO ACERVO
   Filtra os livros por categoria ou disponibilidade.
====================================================== */

const botoesFiltro = document.querySelectorAll(".filter-btn");

if (botoesFiltro.length > 0) {

    botoesFiltro.forEach((botao) => {

        botao.addEventListener("click", () => {

            // Destaca o botão selecionado
            botoesFiltro.forEach((btn) =>
                btn.classList.remove("active")
            );

            botao.classList.add("active");

            const categoria = botao.textContent
                .trim()
                .toLowerCase();

            const livros = document.querySelectorAll(".book-card");

            livros.forEach((livro) => {

                const categoriaLivro = livro.dataset.category;
                const statusLivro = livro.dataset.status;

                // Mostrar todos
                if (categoria === "todos") {

                    livro.style.display = "block";
                }

                // Mostrar apenas disponíveis
                else if (categoria === "disponíveis") {

                    if (statusLivro === "disponivel") {
                        livro.style.display = "block";
                    } else {
                        livro.style.display = "none";
                    }
                }

                // Filtrar por categoria
                else {

                    if (categoriaLivro === categoria) {
                        livro.style.display = "block";
                    } else {
                        livro.style.display = "none";
                    }
                }
            });
        });
    });
}


/* ======================================================
   6. ADICIONAR LIVRO
   Cria um novo cartão de livro usando os dados
   digitados no formulário.
====================================================== */

function adicionarLivro() {

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;

    const grid = document.querySelector(".books-grid");

    if (!grid) return;

    grid.innerHTML += `
        <div class="book-card"
             data-category="ficção"
             data-status="disponivel">

            <div class="book-cover">
                📘
            </div>

            <div class="book-info">

                <div class="book-title">
                    ${titulo}
                </div>

                <div class="book-author">
                    ${autor}
                </div>

                <span class="book-status available">
                    Disponível
                </span>

            </div>
        </div>
    `;
}


/* ======================================================
   7. SALVAR LIVROS
   Cria uma lista e salva no navegador.
   (Ainda será integrada ao formulário futuramente.)
====================================================== */

const listaLivros = [];

localStorage.setItem(
    "livros",
    JSON.stringify(listaLivros)
);
