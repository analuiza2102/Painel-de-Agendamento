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

    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    const ultimos = agendamentos.slice(-5).reverse();

    lista.innerHTML = "";

    ultimos.forEach((item, index) => {
      const realIndex = agendamentos.length - 1 - index;
      const li = document.createElement("li");
      li.className = "card-agendamento d-flex justify-content-between align-items-center mb-2";
      li.innerHTML = `
        <div>
          <strong>${item.nome}</strong><br>
          <small>${item.data} às ${item.hora} — ${item.tipo}</small>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="badge badge-status badge-${getBadge(item.status)}">${item.status}</span>
          <button class="btn btn-sm btn-outline-success" onclick="alterarStatus(${realIndex}, 'Confirmado')">✔</button>
          <button class="btn btn-sm btn-outline-danger" onclick="alterarStatus(${realIndex}, 'Cancelado')">✖</button>
        </div>
      `;
      lista.appendChild(li);
    });
  }

  window.alterarStatus = function (index, novoStatus) {
    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos[index].status = novoStatus;
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    atualizarListaRecentes();
  };

  function getBadge(status) {
    return status === "Confirmado" ? "confirmado" : status === "Cancelado" ? "cancelado" : "pendente";
  }

  atualizarListaRecentes();
});
