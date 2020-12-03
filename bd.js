var NOSSOBANCO;
var NOMEBD = 'NossoBD';
var VERSAOBD = '1.0.0';
var DESCRICAOBD = 'BDteste';
var TAMANHOBD = 2;

function iniciandoAplicacao(){
    try{
        console.log("Chamando o Banco...");
        /** Nome do BD, Versão BD, Descrição BD, Tamanho BD */
        
        NOSSOBANCO = window.openDatabase(NOMEBD, VERSAOBD, DESCRICAOBD, TAMANHOBD * 1024 * 1024);
        console.log("Banco: OK!\n\nCriando Tabelas...");
        NOSSOBANCO.transaction(criarTabelasSql, erroSqlTransacao, sucessoSqlTransacao);
    }catch(_erro){
        alert(_erro);
    }
}

function criarTabelasSql(_NOSSOBANCO){
    
    try{
        _NOSSOBANCO.executeSql('CREATE TABLE IF NOT EXISTS CADASTRO (id INTEGER PRIMARY KEY, nome_bd VARCHAR(30), cargo_bd VARCHAR(30), salario_bd VARCHAR(30))');
        carregarBD(_NOSSOBANCO); // n sei se era o local correto mas chamei a função aqui para n perder os dados da pesquisa se atualizar a tela
    }catch(_erro){
        alert(_erro);
    }
}



function alterarBD(){
    
    document.getElementById('exibeCampoAlterar').style.display = 'block';
    document.getElementById('exibePesquisarNome').style.display = 'none';
}

function pesquisarPorNome(){
    
    document.getElementById('exibePesquisarNome').style.display = 'block';
    document.getElementById('exibeCampoAlterar').style.display = 'none';
}

function carregarBD(_NOSSOBANCO){
    document.getElementById('exibeBD').style.display = 'block';
    document.getElementById('formCadastro').style.display = 'block';
    document.getElementById("tabela").value = "";
    console.log("Lendo BD...");
    try{
        _NOSSOBANCO.executeSql('SELECT * FROM CADASTRO', [], aplicarSelecaoCompleta, erroConexaoBD);        
    }catch(_erro){
        alert(_erro);
    }
}
    
function aplicarSelecaoCompleta(_NOSSOBANCO, _results){
    for (var i=0; i < _results.rows.length; i++){
            row = _results.rows.item(i);
        
        if(row['id'] < 10){
            var imprimirNaTela = "0" + row['id'] + " - Nome: " + row['nome_bd'] + " - Cargo: " + row['cargo_bd'] + " - Salario: " + row['salario_bd'] + "\n";
        }else{
            var imprimirNaTela = row['id'] + " - Nome: " + row['nome_bd'] + " - Cargo: " + row['cargo_bd'] + " - Salario: " + row['salario_bd'] + "\n";
        }
            
     document.getElementById("tabela").value = document.getElementById("tabela").value + imprimirNaTela;    
    }
}

function enviarDadosBD(){
    
    if(document.getElementById('nomeHTML').value != "" || document.getElementById('cargoHTML').value != "" || document.getElementById('salarioHTML').value != ""){
        try{
            console.log("Enviando Dados...");
            NOSSOBANCO.transaction(incluirDados, erroConexaoBD, sucessoInclusaoBD);
        }catch(_erro){
            alert(_erro);
        }
    }else{
        document.getElementById('exibeBD').style.display = 'none';
        alert("Campo Vazio!\nConfira o formulario e preecha novamente\nSem deixar nada em branco\n\nObrigado!");
    }
}

function incluirDados(_NOSSOBANCO){
    
    var novoNome = document.getElementById("nomeHTML").value;
    var novoTelefone = document.getElementById("cargoHTML").value;
    var novoSalario = document.getElementById("salarioHTML").value;
    
    try{
        _NOSSOBANCO.executeSql('INSERT INTO CADASTRO (nome_bd, cargo_bd, salario_bd) VALUES (?,?,?)', [novoNome, novoTelefone, novoSalario], carregarBD);
        console.log("Envio de Dados: ok\n");
    }catch(_erro){
        alert(_erro);
    }
}

function deleteCadastro(){
    
    if(document.getElementById("editaId").value != ""){
        try{
            NOSSOBANCO.transaction(deletarCadastro, erroConexaoBD, sucessoSelecaoBD);
        }catch(_erro){
            alert(_erro);
        }
    }else{
        alert("Por favor, digite o id!");
    }
}

function deletarCadastro(_NOSSOBANCO){
    var idPesquisa = document.getElementById("editaId").value;
    try{
        _NOSSOBANCO.executeSql('DELETE FROM CADASTRO WHERE id = ?', [idPesquisa], sucessoDelete);
        carregarBD(_NOSSOBANCO);
    }catch(_erro){
        alert(_erro);
    }
}

function salvarNovoCadastro(){
    if(document.getElementById("editaId").value != ""){
        if(document.getElementById("editaNome").value != ""){
            if(document.getElementById("editaCargo").value != ""){
                if(document.getElementById("editaSalario").value != ""){
                    try{
                        NOSSOBANCO.transaction(alterarCadastro, erroConexaoBD, sucessoSelecaoBD);
                    }catch(_erro){
                        alert(_erro);
                    }
                }else{
                    alert("Por favor, preencha o campo Salario!");
                }
            }else{
                alert("Por favor, preencha o campo Cargo!");
            }
        }else{
            alert("Por favor, preencha o campo Nome!");
        }
    }else{
        alert("Por favor, preencha o campo id!");
    }
}

function alterarCadastro(_NOSSOBANCO){
    
    var idPesquisa = document.getElementById("editaId").value;
    var novoNome = document.getElementById("editaNome").value;
    var novoCargo = document.getElementById("editaCargo").value;
    var novoSalario = document.getElementById("editaSalario").value;
    
    try{
        _NOSSOBANCO.executeSql('UPDATE CADASTRO SET nome_bd = ?, cargo_bd = ?, salario_bd = ? WHERE id = ?', [novoNome, novoCargo, novoSalario, idPesquisa], sucessoAlterar);
        carregarBD(_NOSSOBANCO);
    }catch(_erro){
        alert(_erro);
    }
}

function pesquisaNome(){
    if(document.getElementById("pesquisarNome").value != ""){
        try{
            NOSSOBANCO.transaction(pesquisarNome, erroPesquisar, sucessoSelecaoBD);
        }catch(_erro){
            alert(_erro);
        }
    }else{
        alert("Por favor, digite o nome!");
    }
}

function pesquisarNome(_NOSSOBANCO){
    document.getElementById("resultadoPesquisa").value = "";
//    var nomePesquisa = document.getElementById("pesquisarNome").value;
    try{
        _NOSSOBANCO.executeSql("SELECT * FROM CADASTRO WHERE nome_bd LIKE ('%" + document.getElementById("pesquisarNome").value + "%')", [],  sucessoPesquisa, erroConexaoBD);
    }catch(_erro){
        alert(_erro);
    }
}

document.getElementById('enviar').addEventListener('click', enviarDadosBD);
document.getElementById('alterarCadastro').addEventListener('click', alterarBD);
document.getElementById('pesquisaPorNome').addEventListener('click', pesquisarPorNome);
document.getElementById('excluirCadastro').addEventListener('click', deleteCadastro);
document.getElementById('salvarEdicao').addEventListener('click', salvarNovoCadastro);
document.getElementById('pesquisar').addEventListener('click', pesquisaNome);

window.addEventListener("load", iniciandoAplicacao, false);

