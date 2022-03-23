
var grafo = {}
var inicio
var vetor = []


for(let i = 0; i < 256; i++)
    vetor[i] = []


function ord(str){return str.charCodeAt(0);}

function Cria_Grafo(texto){
    grafo = {}
    vetor = []
    for(let i = 0; i < 256; i++)
        vetor[i] = []

    var codificado = ''

    document.getElementById('grafo').innerHTML = ''
    document.getElementById('vetor').innerHTML = ''

    for(let i = 0; i < texto.length -1; i++){
        
        if(texto[i] in grafo){
            if(texto[i+1] in grafo){
                var flag = 0, cod;
                for(let j = 0; j < grafo[texto[i]].length; j++){
                    if(texto[i+1] === grafo[texto[i]][j][0]){
                        flag = 1
                        cod = grafo[texto[i]][j][1]
                        break
                    }   
                }

                if(flag == 0){
                    grafo[texto[i]].push([texto[i+1], 0 ])
                    codificado += '0'
                    vetor[ord(texto[i+1])].push(i+1)
                }
                else{
                    codificado += cod
                    vetor[ord(texto[i+1])].push(i+1)
                }
            }
            else{
                grafo[texto[i]].push([texto[i+1], 1 ])
                codificado += '1'
                vetor[ord(texto[i+1])].push(i+1)
            }
        }
        else{
            grafo[texto[i]] = []
            i--
        }
    }
    
    return codificado
}

function Descodificar(codificado){
    var descodificado = ''
    descodificado += inicio

    var no = inicio
    for(let i = 0; i < codificado.length; i++){
        for(let j = 0; j < grafo[no].length; j++){
            if(parseInt(codificado[i]) === grafo[no][j][1]){
                if(vetor[ord(grafo[no][j][0])][0] == i+1){
                    vetor[ord(grafo[no][j][0])].shift()
                    descodificado += grafo[no][j][0]
                    no = grafo[no][j][0]
                    break
                }
            }
            
        }
    }   
    
    return descodificado
}

function Imprime_vetor(){
    for(let i = 0; i < 256; i++)
        console.log(String.fromCharCode(i), ':  ',vetor[i])
}

function codificacao(){

    const texto = document.getElementById('codificar').value
    var codificado, descodificado
    inicio = texto[0]

    codificado = Cria_Grafo(texto)

    document.getElementById('descodificar').value = codificado

    document.getElementById('salva-grafo').something = JSON.parse(JSON.stringify(grafo))
    document.getElementById('salva-vetor').something = JSON.parse(JSON.stringify(vetor))

    document.getElementById('tamanho_original').innerText = 'Tamanho original: '+texto.length + ' bytes ou '+texto.length*8 + ' bits' 
    document.getElementById('tamanho_comprimido').innerText = 'Tamanho comprimido: ' +codificado.length + ' bits'
    
    
    //document.getElementById('texto').innerText = 'Texto: ' + texto
    //document.getElementById('texto-codificado').innerText = 'Codificado: ' + codificado

    //console.log(document.getElementById('salva-vetor').something)
    //console.log(grafo)

    //GRAFO
        
        for(i in grafo){

            divNova = document.createElement("div")
            var show = ''
            for(j in grafo[i]){
                //console.log(grafo[i][j][0])
                if(j != grafo[i].length-1)
                    show += '|'+grafo[i][j][0] + ' | ' + grafo[i][j][1] + '|   ->   '
                else
                show += '|'+grafo[i][j][0] + ' | ' + grafo[i][j][1] + '|'
            }
            //console.log(i, '  ->  ',show)
            divNova.innerHTML = '<div class="font-weight-bold lead" > '+i+ '&nbsp;&nbsp;&nbsp;&nbsp;->&nbsp;&nbsp;&nbsp;&nbsp;'+show+'</div>'

            var divAtual = document.getElementById('grafo')
            divAtual.appendChild(divNova)

        }

     //VETOR
        

        for(i in vetor){

            divNova = document.createElement("tr")
            var show = ''
            for(j in vetor[i]){
                //console.log(grafo[i][j][0])
                if(j != vetor[i].length-1)
                    show += +vetor[i][j] + ', '
                else
                    show += +vetor[i][j]
            }
            divNova.innerHTML = '<th scope="row">'+i+'</th><td>'+String.fromCharCode(i)+'</td> <td>'+show+'</td'
            //console.log(divNova)
            var divAtual = document.getElementById('vetor')
            divAtual.appendChild(divNova)



        }

}

function descodificacao(){

    vetor = JSON.parse(JSON.stringify(document.getElementById('salva-vetor').something))

    descodificado = Descodificar(document.getElementById('descodificar').value)

    document.getElementById('codificar').value = descodificado



}

function M_grafo(){



}


function M_vetor(){


}

