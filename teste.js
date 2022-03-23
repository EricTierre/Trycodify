var grafo = {}
var inicio
var vetor = []

for(let i = 0; i < 256; i++)
    vetor[i] = []

function ord(str){return str.charCodeAt(0);}

function Cria_Grafo(texto){
    
    var codificado = ''
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

    console.log('Grafo: ', grafo)
    
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

function main(){

    const texto = 'bananas de pijamas'
    var codificado, descodificado
    inicio = texto[0]


    codificado = Cria_Grafo(texto)
    
    console.log('Texto: ', texto)
    console.log('Codificado: ', codificado)  
    //Imprime_vetor()

    descodificado = Descodificar(codificado)
    console.log('Descodificado: ', descodificado)

    for(x in grafo)
        console.log(grafo[x])


}

main()