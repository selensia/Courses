function erroSqlTransacao(_NOSSOBANCO, _erro){
    console.log("ERRO no BD: " + _NOSSOBANCO + "\n" + _erro);
}

function erroConexaoBD(_NOSSOBANCO, _erro){
    console.log("ERRO na conexao, N°: " + _erro);
}

function erroPesquisar(_NOSSOBANCO, _erro){
    console.log("ERRO na pesquisa: " + _erro);
}