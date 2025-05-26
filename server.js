import express from 'express';
import cors from 'cors';

const app = express();

// Configurações do servidor
app.use(cors());
app.use(express.json());

// Banco de dados inicial
let habitos = [
    { id: 1, nome: 'Estudar', feito: false, metaSemanal: 5, acompanhamentoFreq: 0 },
    { id: 2, nome: 'Exercitar', feito: false, metaSemanal: 3, acompanhamentoFreq: 0 },
    { id: 3, nome: 'Ler', feito: false, metaSemanal: 4, acompanhamentoFreq: 0 },
];

// Rotas
app.get('/habitos', (req, res) => {
    res.json(habitos);
});

app.get('/habitos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const habito = habitos.find(h => h.id === id);
    habito ? res.json(habito) : res.status(404).json({ message: 'Hábito não encontrado' });
});

app.post('/habitos', (req, res) => {
    const novoHabito = {
        id: habitos.length + 1,
        nome: req.body.nome,
        feito: req.body.feito || false,
        metaSemanal: req.body.metaSemanal || 0,
        acompanhamentoFreq: req.body.acompanhamentoFreq || 0
    };
    habitos.push(novoHabito);
    res.status(201).json(novoHabito);
});

app.put('/habitos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const habito = habitos.find(h => h.id === id);

    if (!habito) {
        return res.status(404).json({ message: 'Hábito não encontrado' });
    }

    habito.nome = req.body.nome !== undefined ? req.body.nome : habito.nome;
    habito.feito = req.body.feito !== undefined ? req.body.feito : habito.feito;
    habito.metaSemanal = req.body.metaSemanal !== undefined ? req.body.metaSemanal : habito.metaSemanal;
    habito.acompanhamentoFreq = req.body.acompanhamentoFreq !== undefined ? req.body.acompanhamentoFreq : habito.acompanhamentoFreq;

    res.json(habito);
});

app.delete('/habitos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = habitos.findIndex(h => h.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Hábito não encontrado' });
    }

    habitos.splice(index, 1);
    res.status(204).send();
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});