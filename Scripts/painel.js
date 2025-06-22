document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("lista-agendamentos");
  let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

  function atualizarLista() {
    container.innerHTML = "";

    if (agendamentos.length === 0) {
      container.innerHTML = `<p class='text-center'>Nenhum agendamento encontrado.</p>`;
      return;
    }

    agendamentos.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "col-md-4";

      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title">${item.nome}</h5>
              <p class="card-text"><strong>Data:</strong> ${item.data}</p>
              <p class="card-text"><strong>Hora:</strong> ${item.hora}</p>
              <p class="card-text"><strong>Tipo:</strong> ${item.tipo}</p>
              <p class="card-text"><strong>Status:</strong> <span class="badge bg-${getBadge(item.status)}">${item.status}</span></p>
            </div>
            <div class="mt-3 d-flex gap-2">
              <button class="btn btn-success btn-sm" onclick="alterarStatus(${index}, 'Confirmado')">Confirmar</button>
              <button class="btn btn-danger btn-sm" onclick="alterarStatus(${index}, 'Cancelado')">Cancelar</button>
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  window.alterarStatus = function (index, novoStatus) {
    agendamentos[index].status = novoStatus;
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    atualizarLista();
  };

  function getBadge(status) {
    return status === "Confirmado" ? "success" : status === "Cancelado" ? "danger" : "secondary";
  }

  atualizarLista();
});
