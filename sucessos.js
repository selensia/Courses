

function sucessoSqlTransacao(){
    console.log("Tabelas: OK!\n\nAguardando Inclusoes...\n");
}

function sucessoInclusaoBD(){
    console.log(document.getElementById("nomeHTML").value + " - " + document.getElementById("cargoHTML").value + " - " + document.getElementById("salarioHTML").value);
    document.getElementById("nomeHTML").value = "";
    document.getElementById("cargoHTML").value = "";
    document.getElementById("salarioHTML").value = "";
    console.log("Novos Dados incluidos");
}

function sucessoSelecaoBD(){
    console.log("selecao bem sucedida");
}

function sucessoDelete(){
    console.log("exclusao bem sucedida");
    document.getElementById("editaId").value = "";
}

function sucessoAlterar(){
    console.log("alteração bem sucedida");
    document.getElementById("editaId").value = "";
    document.getElementById("editaNome").value = "";
    document.getElementById("editaCargo").value = "";
    document.getElementById("editaSalario").value = "";
}

function sucessoPesquisa(_NOSSOBANCO, _results){
    console.log("pesquisa bem sucedida");
    document.getElementById("pesquisarNome").value = "";
    if(_results.rows.length == 0){
        alert("Nome não encontrado no banco de dados!");
    }else{  
        for (var i=0; i < _results.rows.length; i++){
            row = _results.rows.item(i);
        
            if(row['id'] < 10){
                var imprimirNaTela = "0" + row['id'] + " - Nome: " + row['nome_bd'] + " - Cargo: " + row['cargo_bd'] + " - Salario: " + row['salario_bd'] + "\n";
            }else{
                var imprimirNaTela = row['id'] + " - Nome: " + row['nome_bd'] + " - Cargo: " + row['cargo_bd'] + " - Salario: " + row['salario_bd'] + "\n";
            }
            
        document.getElementById("resultadoPesquisa").value = document.getElementById("resultadoPesquisa").value + imprimirNaTela; // para toda vez que                                                                                                              passar no for adicionar o imprimir na tela   
        }
    }
}