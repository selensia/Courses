function abrirNovoForm(){
    document.getElementById('formCadastro').style.display = 'block';
    document.getElementById('exibeBD').style.display = 'none';
    document.getElementById('editaBD').style.display = 'none';
    document.getElementById('exibeCampoAlterar').style.display = 'none';
    document.getElementById('exibePesquisarNome').style.display = 'none';
}

function fecharExibicao(){
    document.getElementById('formCadastro').style.display = 'none';
    document.getElementById('exibeBD').style.display = 'none';
    document.getElementById('editaBD').style.display = 'none';
    document.getElementById('exibeCampoAlterar').style.display = 'none';
    document.getElementById('exibePesquisarNome').style.display = 'none';
}

function editarBD(){
    document.getElementById('editaBD').style.display = 'block';
    document.getElementById('alterarCadastro').style.display = 'inline-block';
    document.getElementById('pesquisaPorNome').style.display = 'inline-block';
    document.getElementById('formCadastro').style.display = 'none';
}

function fecharEditar(){
    document.getElementById('editaBD').style.display = 'none';
    document.getElementById('alterarCadastro').style.display = 'none';
    document.getElementById('exibePesquisarNome').style.display = 'none';
    document.getElementById('exibeCampoAlterar').style.display = 'none';
}

function pesquisarPorNome(){
    document.getElementById('exibePesquisarNome').style.display = 'block';
    document.getElementById('exibeCampoAlterar').style.display = 'none';
}

function carregarBD(_NOSSOBANCO){
    document.getElementById('exibeBD').style.display = 'block';
    document.getElementById('formCadastro').style.display = 'none';
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
            var imprimirNaTela = "0" + row['id'] + " - Nome: " + row['nome_bd'] + " - cargo " + row['cargo_bd'] + " - salário " + row['salario_bd'] + "\n";
        }else{
            var imprimirNaTela = row['id'] + " - Nome: " + row['nome_bd'] + " - cargo " + row['cargo_bd'] + " - salário " + row['salario_bd'] + "\n";
        }
            
     document.getElementById("tabela").value = document.getElementById("tabela").value + imprimirNaTela; // para toda vez que passar no for adicionar o imprimir na tela   
    }
}

function visualizarBD(){    
    
    try{
        NOSSOBANCO.transaction(carregarBD, erroConexaoBD, sucessoSelecaoBD);
        //carregarBD, erroConexaoBD, sucessoSelecaoBD
    }catch(_erro){
        alert(_erro);
    }
}

document.getElementById('novoForm').addEventListener('click', abrirNovoForm);
document.getElementById('naoMostrar').addEventListener('click', fecharExibicao);
document.getElementById('mostrar').addEventListener('click', visualizarBD);
document.getElementById('editar').addEventListener('click', editarBD);
document.getElementById('naoMostrarEditar').addEventListener('click', fecharEditar);