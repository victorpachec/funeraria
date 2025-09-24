async function criarConta() {
  const dados = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("emailCadastro").value,
    senha: document.getElementById("senhaCadastro").value,
    rua: document.getElementById("rua").value,
    numero: document.getElementById("numero").value,
    complemento: document.getElementById("complemento").value,
    cep: document.getElementById("cep").value,
  };
  const res = await fetch('api/cadastro.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  const result = await res.json();
  if(result.status==="sucesso"){
    alert("Cadastro realizado!");
    document.getElementById("cadastro").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
  } else {
    alert("Erro: " + result.mensagem);
  }
}

async function fazerLogin() {
  const dados = {
    email: document.getElementById("emailLogin").value,
    senha: document.getElementById("senhaLogin").value
  };
  const res = await fetch('api/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  const result = await res.json();
  if(result.status==="sucesso"){
    alert("Login realizado!");
    window.usuarioLogado = result.usuario;
    document.getElementById("login").classList.add("hidden");
    document.getElementById("siteFuneraria").classList.remove("hidden");
    carregarServicos();
  } else {
    alert(result.mensagem);
  }
}

async function carregarServicos() {
  const res = await fetch('api/servicos.php');
  const servicos = await res.json();
  const loja = document.getElementById("servicos");
  loja.innerHTML = "";
  servicos.forEach(s=>{
    loja.innerHTML += `
      <div class="produto" onclick="toggleDescricao(this)">
        <img src="img/${s.img}" alt="${s.nome}">
        <h3>${s.nome}</h3>
        <p><strong>R$ ${s.preco.toFixed(2)}</strong></p>
        <div class="descricao">${s.descricao}</div>
      </div>
    `;
  });

  const admin = document.getElementById("adminServicos");
  admin.innerHTML = "";
  servicos.forEach((s, i)=>{
    admin.innerHTML += `
      <div class="card">
        <label>Nome</label>
        <input type="text" id="admNome${i}" value="${s.nome}">
        <label>Preço</label>
        <input type="number" step="0.01" id="admPreco${i}" value="${s.preco}">
        <label>Descrição</label>
        <input type="text" id="admDescricao${i}" value="${s.descricao}">
        <input type="hidden" id="admId${i}" value="${s.id}">
      </div>
    `;
  });
}

async function salvarServicos() {
  const cards = document.querySelectorAll("#adminServicos .card");
  const servicos = [];
  cards.forEach((card, i)=>{
    servicos.push({
      id: parseInt(document.getElementById("admId"+i).value),
      nome: document.getElementById("admNome"+i).value,
      preco: parseFloat(document.getElementById("admPreco"+i).value),
      descricao: document.getElementById("admDescricao"+i).value
    });
  });
  const res = await fetch('api/editar_servicos.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(servicos)
  });
  const result = await res.json();
  if(result.status==="sucesso"){
    alert("Serviços atualizados!");
    carregarServicos();
  } else {
    alert("Erro ao salvar serviços!");
  }
}

function toggleDescricao(el){
  const desc = el.querySelector(".descricao");
  desc.style.display = desc.style.display==="block" ? "none" : "block";
}
