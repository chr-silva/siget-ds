let tabelaHorarios = null;
let tabelaGeral = null;

export function renderTabelaHorarios() {
    const t1 = document.getElementById("tabela-horarios");
    const t2 = document.getElementById("tabela-geral");
    
    if (!t1) {
        console.warn("Elemento #tabela-horarios não encontrado");
        return;
    }
    if (!t2) {
        console.warn("Elemento #tabela-geral não encontrado");
        return;
    }


    if (tabelaHorarios && tabelaGeral) {
        tabelaHorarios.destroy();
        tabelaGeral.destroy();
    }

    tabelaHorarios = new window.Tabulator(t1, {
        layout: "fitColumns",
        height: "18rem", 

        data: [
            {
                horario: "13:00–13:50",
                domingo: "---",
                segunda: "Inglês",
                terca: "Algoritmos e Prog. de Computadores",
                quarta: "Filosofia",
                quinta: "Geografia",
                sexta: "Biologia",
                sabado: "Fundamentos de Informática"
            },
            {
                horario: "13:50–14:40",
                domingo: "---",
                segunda: "Inglês",
                terca: "Algoritmos e Prog. de Computadores",
                quarta: "Filosofia",
                quinta: "Geografia",
                sexta: "Língua Portuguesa",
                sabado: "Fundamentos de Informática"
            },
            {
                horario: "14:40–15:30",
                domingo: "---",
                segunda: "Matemática",
                terca: "Algoritmos e Prog. de Computadores",
                quarta: "Biologia",
                quinta: "Sociologia",
                sexta: "História",
                sabado: "---"
            },
            {
                horario: "15:30–16:40",
                domingo: "---",
                segunda: "Matemática",
                terca: "Algoritmos e Prog. de Computadores",
                quarta: "Biologia",
                quinta: "Sociologia",
                sexta: "História",
                sabado: "---"
            },
            {
                horario: "16:40-17:30",
                domingo: "---",
                segunda: "Química",
                terca: "Algoritmos e Prog. de Computadores",
                quarta: "Ed. Física",
                quinta: "S.O.",
                sexta: "Física",
                sabado: "---"
            },
            {
                horario: "17:30–18:20",
                domingo: "---",
                segunda: "Química",
                terca: "Algoritmos e Prog. de Computadores",
                quarta: "Ed. Física",
                quinta: "S.O.",
                sexta: "Física",
                sabado: "---"
            }
        ],  

        columns: [
            { title: "Horário", field: "horario" },
            { title: "Domingo", field: "domingo" },
            { title: "Segunda", field: "segunda" },
            { title: "Terça", field: "terca" },
            { title: "Quarta", field: "quarta" },
            { title: "Quinta", field: "quinta" },
            { title: "Sexta", field: "sexta" },
            { title: "Sábado", field: "sabado"  },
        ]
    });

    tabelaGeral = new window.Tabulator(t2, {
        layout: "fitColumns",
        height: "40rem",

        data: [
        {
            cod: 'TIDES0353',
            materia: 'Língua Portuguesa',
            professor:'Mirian Pereira',
            turma: 'I2261TH',
            periodo: '6T12 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0354',
            materia: 'Inglês',
            professor:'Cristiane Ribeiro Barbosa da Silva',
            turma: 'I2261TH',
            periodo: '2T12 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0355',
            materia: 'Ed. Física',
            professor:'Biratan dos Santos Palmeira',
            turma: 'I2261TH',
            periodo: '4T56 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0357',
            materia: 'Sociologia',
            professor:'Breno Rodrigo de Oliveira Alencar',
            turma: 'I2261TH',
            periodo: '5T34 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0358',
            materia: 'Filosofia',
            professor:'Alessandra Bittencourt',
            turma: 'I2261TH',
            periodo: '4T12 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0359',
            materia: 'História',
            professor:'Humberto de Castro Brito',
            turma: 'I2261TH',
            periodo: '6T34 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0360',
            materia: 'Geografia',
            professor:'Ellen Cristina do Monte Silva',
            turma: 'I2261TH',
            periodo: '5T12 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0361',
            materia: 'Biologia',
            professor:'Elizete',
            turma: 'I2261TH',
            periodo: '4T34 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0362',
            materia: 'Química',
            professor:'Celio Hitoshi Wataya',
            turma: 'I2261TH',
            periodo: '2T56 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0363',
            materia: 'Física',
            professor:'Pedro Paulo Santos da Silva',
            turma: 'I2261TH',
            periodo: '6T56 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0364',
            materia: 'Matemática',
            professor:'Gilvan Lira Souza',
            turma: 'I2261TH',
            periodo: '2T34 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0365',
            materia: 'Algoritmos & Prog. de Computadores',
            professor:'Mauro de Jesus Pereira',
            turma: 'I2261TH',
            periodo: '3T123456 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0366',
            materia: 'Fundamentos de Informática',
            professor:'Clóvis Maxwell Andrade Martins',
            turma: 'I2261TH',
            periodo: '7T12 (12/03/2025 - 14/07/2025)',
        },
        {
            cod: 'TIDES0367',
            materia: 'Sistemas Operacionais',
            professor:'Geovane Nobre Lamarao',
            turma: 'I2261TH',
            periodo: '5T56 (12/03/2025 - 14/07/2025)',
        }
        ],

        columns: [
        { title: "Cód. Matéria", field: "cod" },
        { title: "Matéria", field: "materia" },
        { title: "Professor", field: "professor" },
        { title: "Turma", field: "turma" },
        { title: "Período - Matéria", field: "periodo" }
        ]

    });

}
