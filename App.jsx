
import { useState, useEffect } from "react";
import "./styles.css";

const vermelho = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const coluna1 = [1,4,7,10,13,16,19,22,25,28,31,34];
const coluna2 = [2,5,8,11,14,17,20,23,26,29,32,35];
const coluna3 = [3,6,9,12,15,18,21,24,27,30,33,36];
const duzia1 = [1,2,3,4,5,6,7,8,9,10,11,12];
const duzia2 = [13,14,15,16,17,18,19,20,21,22,23,24];
const duzia3 = [25,26,27,28,29,30,31,32,33,34,35,36];

export default function App() {
  const [historico, setHistorico] = useState([]);
  const [entrada, setEntrada] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [meta, setMeta] = useState(0);
  const [stoploss, setStoploss] = useState(0);
  const [lucro, setLucro] = useState(0);
  const [status, setStatus] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const corDoNumero = (n) => n === 0 ? "verde" : vermelho.includes(n) ? "vermelho" : "preto";
  const coluna = (n) => coluna1.includes(n) ? 1 : coluna2.includes(n) ? 2 : coluna3.includes(n) ? 3 : "-";
  const duzia = (n) => duzia1.includes(n) ? 1 : duzia2.includes(n) ? 2 : duzia3.includes(n) ? 3 : "-";

  const analisarPadroes = () => {
    const ultimos = historico.slice(-8);
    const cores = ultimos.map(r => corDoNumero(r));
    const colunas = ultimos.map(r => coluna(r));
    const duzias = ultimos.map(r => duzia(r));

    if (cores.every(c => c === cores[0]) && cores.length >= 4) setStatus("Padrão de cor detectado: " + cores[0]);
    else if (new Set(colunas).size === 2 && colunas.length >= 6) setStatus("Alternância entre colunas detectada");
    else if (duzias.every(d => d === duzias[0]) && duzias.length >= 4) setStatus("Padrão de dúzia detectado: " + duzias[0]);
    else setStatus("");
  };

  const adicionarResultado = () => {
    const n = parseInt(entrada);
    if (!isNaN(n) && n >= 0 && n <= 36) {
      const novoHistorico = [...historico, n];
      setHistorico(novoHistorico);
      analisarPadroes();
      setEntrada("");
      if (lucro >= meta) setObservacoes("Meta batida!");
      if (lucro <= -Math.abs(stoploss)) setObservacoes("Stoploss atingido!");
    }
  };

  useEffect(() => {
    const novoLucro = historico.length * 0; // Aqui pode usar lógica real com vitórias/derrotas
    setLucro(novoLucro);
  }, [historico]);

  return (
    <div className="painel">
      <h1>Painel de Roleta</h1>
      <div className="input-group">
        <input type="number" placeholder="Número da mesa" value={entrada} onChange={(e) => setEntrada(e.target.value)} />
        <button onClick={adicionarResultado}>Inserir</button>
      </div>
      <div className="painel-info">
        <p>Saldo Inicial: <input type="number" value={saldo} onChange={(e) => setSaldo(parseFloat(e.target.value))} /></p>
        <p>Meta de Lucro: <input type="number" value={meta} onChange={(e) => setMeta(parseFloat(e.target.value))} /></p>
        <p>Stoploss: <input type="number" value={stoploss} onChange={(e) => setStoploss(parseFloat(e.target.value))} /></p>
        <p>Lucro Atual: <strong>{lucro}</strong></p>
        <p>Status: <strong>{status}</strong></p>
        <p>Observações: <strong>{observacoes}</strong></p>
      </div>
      <div className="historico">
        <h3>Histórico</h3>
        <div>{historico.map((n, i) => <span key={i} className={"bola " + corDoNumero(n)}>{n}</span>)}</div>
      </div>
    </div>
  );
}
