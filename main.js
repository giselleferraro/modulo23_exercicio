// USANDO APENAS O JS E AJAX
// document.addEventListener('DOMContentLoaded', function(){
//     document.getElementById('btn-buscar-cep').addEventListener('click', function(){
//         //AJAX - interação do html e js sem carregar a página
//         const xhttp = new XMLHttpRequest();
//         const cep = document.getElementById('cep').value;
//         const endpoint = `https://viacep.com.br/ws/${cep}/json`;

//         xhttp.open('GET', endpoint);
//         xhttp.send();
//     })
// })


$(document).ready(function(){
    //aplicando a máscara
    $('#cep').mask('00000-000');
    
    $('#btn-buscar-cep').click(function(){
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json/`;
        const botao = $(this);
        // "this" é o mesmo que o buscando anteriormente, no caso "btn-bsuca-cep"
        
        //exibindo e ocultando o ícone de "carregando"
        $(botao).find('i').addClass('d-none');
        $(botao).find('span').removeClass('d-none');

        // UTILIZANDO AJAX E JQUERRY
        // $.ajax(endpoint).done(function(resposta){
        //     const logradouro = resposta.logradouro;
        //     const bairro = resposta.bairro;
        //     const cidade = resposta.localidade;
        //     const estado = resposta.uf;

        //     const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
        //     $('#endereco').val(endereco);

        //     //tempo de carregamento proposital:
        //     setTimeout(function(){
        //         $(botao).find('i').removeClass('d-none');
        //         $(botao).find('span').addClass('d-none');
        //     },2000)
        // })

        //UTILIAZANDO AJAX E FETCH API
        fetch(endpoint)

        // then é o bloco positivo
        .then(function(resposta){
            return resposta.json()
        })

        .then(function(json){
            const logradouro = json.logradouro;
            const bairro = json.bairro;
            const cidade = json.localidade;
            const estado = json.uf;

            const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
            $('#endereco').val(endereco);
            
        })

        //caso de algum erro será corrigido pelo comando catch
        .catch(function(erro){
            alert("Ocorreu um erro ao acessar o endereço. Tente novamente mais tarde")
        })
        
        //o finally executará dando erro ou nao
        .finally(function(){
            setTimeout(function(){
                $(botao).find('i').removeClass('d-none');
                $(botao).find('span').addClass('d-none');
            },2000)    
        })
    })

    $('#formulario-pedido').submit(function(evento){
        event.preventDefault();

        if($('#nome').val().length == 0){
            throw new Error ('Digita o nome');
        }

    })
})

