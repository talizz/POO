// 1 Crie uma função que receba 2 números e retorne um objeto
// contendo a média e também um indicador booleano de
// aprovado/reprovado. Considere aprovado com média >= 6.

import { log } from "console";

function calcularMediaEStatus(nota1: number, nota2: number): { media: number; aprovado: boolean } {
  const media = (nota1 + nota2) / 2;
  const aprovado = media >= 6;

  return { media, aprovado };
}

const resultado = calcularMediaEStatus(7, 8);

if (resultado.aprovado) {
  console.log(`O aluno foi aprovado com média ${resultado.media}`);
} else {
  console.log(`O aluno foi reprovado com média ${resultado.media}`);
}

console.log("------------------------------------------");


// 2. Crie uma função que receba uma lista de objetos contendo nota e
// peso, realize a média das notas considerando o peso. Exemplos:
// Lista com 2 notas: (N1*P1) + (N2*P2) / 2 = Resultado
// Lista com 3 notas: (N1*P1) + (N2*P2) + (N3*P3) / 3 = Resultado

interface NotaComPeso {
  nota: number;
  peso: number;
}

function calcularMediaPonderada(notasComPesos: NotaComPeso[]): number {
  let somaNotasPonderadas = 0;
  let somaPesos = 0;

  for (const notaComPeso of notasComPesos) {
    somaNotasPonderadas += notaComPeso.nota * notaComPeso.peso;
    somaPesos += notaComPeso.peso;
  }

  if (somaPesos === 0) {
    throw new Error("A soma dos pesos não pode ser zero.");
  }

  const mediaPonderada = somaNotasPonderadas / somaPesos;
  return mediaPonderada;
}

const notasComPesos: NotaComPeso[] = [
  { nota: 8, peso: 2 },
  { nota: 9, peso: 3 },
];

const media = calcularMediaPonderada(notasComPesos);
console.log(`A média ponderada é ${media}`);

console.log("------------------------------------------");


// 3. Crie um programa que simule uma carteira de dinheiro. Este
// programa vai precisar ter uma carteira contendo saldo, transações
// de entrada e saídas. Ou seja, será um objeto com estas
// propriedades. Depois crie uma função para lançar uma entrada e
// uma saída. Caso ao lançar uma saída e não tiver saldo, precisa dar
// um erro ou avisar.

interface Carteira{
    saldo: number,
    transacoes: {descricao: string, valor: number}[];
}

const carteira: Carteira = {
    saldo: 100,
    transacoes: []
}

function transacao(descricao: string, valor: number): string | number {
    // Caso de entrada de dinheiro
    if (descricao === 'entrada') {
      carteira.transacoes.push({ descricao, valor });
      return carteira.saldo += valor;
    }
  
    // Caso de saída de dinheiro
    if (descricao === 'saida') {
      if (carteira.saldo <= 0) {
        return 'saldo insuficiente';
      }
      carteira.transacoes.push({ descricao, valor });
      return carteira.saldo -= valor;
    }
  
    // Caso de descrição inválida
    return 'transação inválida';
}


carteira.transacoes.push()

console.log(transacao('entrada', 200));

console.log("------------------------------------------");


// 4. Crie um programa para cadastrar, listar e excluir produtos de uma
// lista com tipagem de Produto.

// Definindo a tipagem do Produto
interface Produto {
  id: number;
  nome: string;
  preco: number;
}

// Inicializando a lista de produtos
const listaDeProdutos: Produto[] = [];

// Função para cadastrar um produto
function cadastrarProduto(id: number, nome: string, preco: number) {
  const novoProduto: Produto = { id, nome, preco };
  listaDeProdutos.push(novoProduto);
  console.log(`Produto ${nome} cadastrado com sucesso!`);
}

// Função para listar todos os produtos
function listarProdutos() {
  console.log("Lista de Produtos:");
  listaDeProdutos.forEach((produto) => {
    console.log(`ID: ${produto.id}, Nome: ${produto.nome}, Preço: R$ ${produto.preco.toFixed(2)}`);
  });
}

// Função para excluir um produto por ID
function excluirProduto(id: number) {
  const index = listaDeProdutos.findIndex((produto) => produto.id === id);
  if (index !== -1) {
    const produtoExcluido = listaDeProdutos.splice(index, 1)[0];
    console.log(`Produto ${produtoExcluido.nome} excluído com sucesso!`);
  } else {
    console.log(`Produto com ID ${id} não encontrado.`);
  }
}

cadastrarProduto(1, "Produto 1", 10.99);
cadastrarProduto(2, "Produto 2", 15.49);
listarProdutos();
excluirProduto(1);
listarProdutos();

console.log("------------------------------------------");


// 5. Crie um programa para mostrar informações de usuários (User) de
// uma empresa. Crie o tipo User com as seguintes propriedades:
// nome, idade, ocupação e salário (opcional). Caso o salário do
// usuário não seja informado, mostre o valor “N/A”. Exemplo:
// a. “Daphne, 23 anos, analista de TI, salário R$ 1000”
// b. “Daphne, 23 anos, analista de TI, salário N/A”

// Definindo a tipagem do User
interface User {
  nome: string;
  idade: number;
  ocupacao: string;
  salario?: number;
}

// Função para mostrar informações de um usuário
function mostrarInformacoesDoUsuario(user: User) {
  const salario = user.salario !== undefined ? `salário R$ ${user.salario.toFixed(2)}` : 'salário N/A';
  console.log(`${user.nome}, ${user.idade} anos, ${user.ocupacao}, ${salario}`);
}

const usuario1: User = {
  nome: "Daphne",
  idade: 23,
  ocupacao: "analista de TI",
  salario: 1000,
};

const usuario2: User = {
  nome: "João",
  idade: 30,
  ocupacao: "engenheiro de software",
};

mostrarInformacoesDoUsuario(usuario1);
mostrarInformacoesDoUsuario(usuario2);

console.log("------------------------------------------");


// 6. Usando o contexto do exercício 6, crie um tipo de usuário que
// representa funcionários da diretoria da empresa. O tipo Diretor deve
// conter as propriedades: nome, idade, salário (opcional) e nível de
// comissionamento (numérico). Crie uma função que receba um
// Diretor e mostre suas informações. Exemplos:
// a. “Diretor(a) Daphne, 23 anos, comissão nível 5, salário R$ 1000”
// b. “Diretor(a) Daphne, 23 anos, comissão nível 5, salário N/A”

// Definindo o tipo Diretor
type Diretor = {
  nome: string;
  idade: number;
  salario?: number;
  nivelComissionamento: number;
};

// Função para mostrar informações de um Diretor
function mostrarInformacoesDoDiretor(diretor: Diretor) {
  const salario = diretor.salario !== undefined ? `salário R$ ${diretor.salario.toFixed(2)}` : 'salário N/A';
  console.log(`Diretor(a) ${diretor.nome}, ${diretor.idade} anos, comissão nível ${diretor.nivelComissionamento}, ${salario}`);
}

const diretor1: Diretor = {
  nome: "Daphne",
  idade: 23,
  salario: 1000,
  nivelComissionamento: 5,
};

const diretor2: Diretor = {
  nome: "João",
  idade: 30,
  nivelComissionamento: 3,
};

mostrarInformacoesDoDiretor(diretor1);
mostrarInformacoesDoDiretor(diretor2);

console.log("------------------------------------------");


