
import React, { useState, useEffect } from 'react';

const cores = ['vermelho', 'preto', 'verde'];
const colunas = {
  1: [1,4,7,10,13,16,19,22,25,28,31,34],
  2: [2,5,8,11,14,17,20,23,26,29,32,35],
  3: [3,6,9,12,15,18,21,24,27,30,33,36]
};
const dezenas = {
  1: [1,2,3,4,5,6,7,8,9,10,11,12],
  2: [13,14,15,16,17,18,19,20,21,22,23,24],
  3: [25,26,27,28,29,30,31,32,33,34,35,36]
};
const corMap = {
  0: 'verde',
  1: 'vermelho', 2: 'preto', 3: 'vermelho', 4: 'preto', 5: 'vermelho',
  6: 'preto', 7: 'vermelho', 8: 'preto', 9: 'vermelho', 10: 'preto',
  11: 'preto', 12: 'vermelho', 13: 'preto', 14: 'vermelho', 15: 'preto',
  16: 'vermelho', 17: 'preto', 18: 'vermelho', 19: 'vermelho', 20: 'preto',
  21: 'vermelho', 22: 'preto', 23: 'vermelho', 24: 'preto', 25: 'vermelho',
  26: 'preto', 27: 'vermelho', 28: 'preto', 29: 'preto', 30: 'vermelho',
  31: 'preto', 32: 'vermelho', 33: 'preto', 34: 'vermelho', 35: 'preto',
  36: 'vermelho'
};

function getColuna(numero) {
  for (let c = 1; c <= 3; c++) {
    if (colunas[c].includes(numero)) return `coluna${c}`;
  }
  return 'fora';
}

function getDezena(numero) {
  for (let d = 1; d <= 3; d++) {
    if (dezenas[d].includes(numero)) return `duzia${d}`;
  }
  return 'fora';
}

function fibonacciSequence(n) {
  const seq = [1, 1];
  for (let i = 2; i < n; i++) {
    seq[i] = seq[i - 1] + seq[i - 2];
  }
  return seq;
}

export default function App() {
  const [historico, setHistorico] = useState([]);
  const [inputNumero, setInputNumero] = useState('');
  const [alerta, setAlerta] = useState('');
  const [saldoInicial, setSaldoInicial] = useState(0);
  const [meta, setMeta] = useState(0);
  const [perda, setPerda] = useState(0);
  const [lucro, setLucro] = useState(0);
  const [fibonacci, setFibonacci] = useState([]);
  const [indiceFibo, setIndiceFibo] = useState(0);

  useEffect(() => {
    if (historico.length >= 4) {
      const ultimos = historico.slice(-4);
      const corPadrao = ultimos.map(e => e.cor);
      if (new Set(corPadrao).size === 1) {
        setAlerta(`Padrão detectado: ${corPadrao[0]} 4x - ALERTA DE ENTRADA!`);
      }
    }
  }, [historico]);

  function analisar(numero) {
    const cor = corMap[numero] || 'desconhecido';
    const coluna = getColuna(numero);
    const dezena = getDezena(numero);
    const novoHist = [...historico, { numero, cor, coluna, dezena }];
    setHistorico(novoHist);

    if (numero === 0) {
      setAlerta("Número 0! Quebra de padrão - ALERTA DE SAÍDA!");
    }
    if (novoHist.length > 1) {
      const anterior = novoHist[novoHist.length - 2];
      if (anterior.cor !== cor) {
        const alternancia = novoHist.slice(-6).map(e => e.cor);
        if (new Set(alternancia).size === 2) {
          setAlerta(`Alternância de cor detectada - ALERTA DE ENTRADA!`);
        }
      }
    }

    const novaFibo = fibonacciSequence(20);
    setFibonacci(novaFibo);
  }

  function registrarNumero() {
    const n = parseInt(inputNumero);
    if (!isNaN(n) && n >= 0 && n <= 36) {
      analisar(n);
      setInputNumero('');
    } else {
      setAlerta("Número inválido!");
    }
  }

  return (
    <div style={{
      backgroundColor: '#0f0f0f',
      color: '#fff',
      fontFamily: 'Arial',
      padding: 20
    }}>
      <h1 style={{ color: 'violet' }}>Painel Inteligente Roleta</h1>
      <div>
        <input type="number" placeholder="Número da roleta"
          value={inputNumero} onChange={e => setInputNumero(e.target.value)} />
        <button onClick={registrarNumero}>Registrar</button>
      </div>
      <div style={{ marginTop: 10 }}>
        <input type="number" placeholder="Saldo Inicial" onChange={e => setSaldoInicial(Number(e.target.value))} />
        <input type="number" placeholder="Stopwin" onChange={e => setMeta(Number(e.target.value))} />
        <input type="number" placeholder="Stoploss" onChange={e => setPerda(Number(e.target.value))} />
      </div>
      <div style={{ marginTop: 10 }}>
        <strong>Alerta:</strong> <span style={{ color: 'lime' }}>{alerta}</span>
      </div>
      <div>
        <h3>Histórico:</h3>
        <ul>
          {historico.map((h, i) => (
            <li key={i}>
              {h.numero} - {h.cor} - {h.coluna} - {h.dezena}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
