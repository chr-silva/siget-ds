/**
 * apenas esboço
 */

const calendario = new Date();

const data = calendario.toLocaleDateString('pt-BR');
document.getElementById("data").innerHTML = `${data}`;
