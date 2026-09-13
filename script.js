/* =========================
   MENU RESPONSIVO
========================= */

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("main-menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!expanded));
        menu.classList.toggle("active");
    });

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

/* =========================
   TEMA ESCURO
========================= */

const temaBtn = document.getElementById("tema-btn");
const temaSalvo = localStorage.getItem("tema");

function atualizarIconeTema() {
    if (!temaBtn) return;

    if (document.body.classList.contains("dark-mode")) {
        temaBtn.textContent = "☀️";
    } else {
        temaBtn.textContent = "🌙";
    }
}

if (temaSalvo === "escuro") {
    document.body.classList.add("dark-mode");
}

atualizarIconeTema();

if (temaBtn) {
    temaBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const modo = document.body.classList.contains("dark-mode")
            ? "escuro"
            : "claro";

        localStorage.setItem("tema", modo);
        atualizarIconeTema();
    });
}

/* =========================
   CARROSSEL
========================= */

const track = document.getElementById("carousel-track");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const scrollAmount = 200;

if (track && prev && next) {

    next.addEventListener("click", () => {
        track.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    });

    prev.addEventListener("click", () => {
        track.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    });

}

/* =========================
   PESQUISA DE LIVROS
========================= */

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

/* =========================
   FILTROS DO ACERVO
========================= */

const botoesFiltro = document.querySelectorAll(".filter-btn");

if (botoesFiltro.length > 0) {

    botoesFiltro.forEach((botao) => {

        botao.addEventListener("click", () => {

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

                if (categoria === "todos") {

                    livro.style.display = "block";

                } else if (categoria === "disponíveis") {

                    if (statusLivro === "disponivel") {
                        livro.style.display = "block";
                    } else {
                        livro.style.display = "none";
                    }

                } else {

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

/* =========================
   ADICIONAR LIVRO
========================= */

function adicionarLivro() {

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;

    const grid = document.querySelector(".books-grid");

    if (!grid) return;

    grid.innerHTML += `
        <div class="book-card" data-category="ficção" data-status="disponivel">

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

/* =========================
   SALVAR LIVROS
========================= */

const listaLivros = [];

localStorage.setItem(
    "livros",
    JSON.stringify(listaLivros)
);
