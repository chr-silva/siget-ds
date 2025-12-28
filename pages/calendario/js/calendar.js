document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'pt-br',
    initialView: 'dayGridMonth',
    height: 'auto'
    // aqui dentro vão só as configurações do FullCalendar
  });


    //carrega o json de dias especiais
    fetch("./js/events.json") //dar fetch SEMPRE no caminho correto relativo ao html
    .then(res => res.json())
    .then(eventos => calendar.addEventSource(eventos)).catch( err => {
        console.error("Erro:", err);
        calendar.render();
    });

    calendar.render(); //depois renderiza o calendario
});
