document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-agendamento");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const tipo = document.getElementById("tipo").value;

    const agendamento = {
      nome,
      data,
      hora,
      tipo,
      status: "Pendente",
      criadoEm: new Date().toISOString()
    };

    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos.push(agendamento);

    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    mensagemSucesso.classList.remove("d-none");
    form.reset();
    atualizarListaRecentes();

    setTimeout(() => mensagemSucesso.classList.add("d-none"), 3000);
  });

  function atualizarListaRecentes() {
    const lista = document.getElementById("lista-recentes");
    if (!lista) return;

    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    const ultimos = agendamentos.slice(-5).reverse();

    lista.innerHTML = "";

    ultimos.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <div>
          <strong>${item.nome}</strong><br>
          <small>${item.data} às ${item.hora} — ${item.tipo}</small>
        </div>
        <span class="badge bg-${getBadge(item.status)}">${item.status}</span>
      `;
      lista.appendChild(li);
    });
  }

  function getBadge(status) {
    return status === "Confirmado" ? "success" : status === "Cancelado" ? "danger" : "secondary";
  }

  atualizarListaRecentes();
});