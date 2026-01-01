export function criarModalEmailNaoVerificado() {
  if (document.getElementById("modalEmailNaoVerificado")) return;

  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal fade" id="modalEmailNaoVerificado" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">Email não verificado</h5>
          </div>

          <div class="modal-body">
            <p>
              Seu email ainda não foi confirmado.
              Algumas funcionalidades ficarão indisponíveis até a verificação.
            </p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">
              Fechar
            </button>
            <button class="btn btn-primary" id="reenviarEmailModal">
              Reenviar email
            </button>
          </div>

        </div>
      </div>
    </div>
  `);
}
