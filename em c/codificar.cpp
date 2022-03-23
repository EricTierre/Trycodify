#include<iostream>
#include<map>
#include<vector>
#include<queue>
#include<utility>
#include<fstream>

using namespace std;

map<char, vector<pair<char, char>>> grafo;
map<char, vector<pair<char, char>>>::iterator it;

//map<char, pair<queue<int>, vector<pair<char, char>>>> grafo;



vector<queue<int>> vetor(256);
char inicio;

string codificar(string texto){
	string codificado = "";
	
	for(int i = 0; i < texto.size() - 1; i++){
		
		it = grafo.find(texto[i+1]);
		if(it != grafo.end()){
			bool flag = false;
			char cod;
			for(int j = 0; j < grafo[texto[i]].size(); j++){
				if(texto[i+1] == grafo[texto[i]][j].first){
					flag = true;
					cod = grafo[texto[i]][j].second;
					break;
				}
			}
			
			if(flag == false){
				grafo[texto[i]].push_back(make_pair(texto[i+1], '0'));
				codificado += '0';
				vetor[texto[i+1] - 0].push(i+1);
			}else{
				codificado += cod;
				vetor[texto[i+1] - 0].push(i+1);
			}
			
		}else{
			grafo[texto[i]].push_back(make_pair(texto[i+1], '1'));
			codificado += '1';
			vetor[texto[i+1] - 0].push(i+1);
		}
	}
	
	
	//cout<<endl<<"G: "<<grafo.find('b')->second.front().first<<endl;
	
	return codificado;
}


string descodificar(string codificado){
	string descodificado = "";
	
	descodificado += inicio;
	
	char no = inicio;
	for(int i = 0; i < codificado.size(); i++){
		for(int j = 0; j < grafo[no].size(); j++){
			if(codificado[i] == grafo[no][j].second){
				if(vetor[grafo[no][j].first - 0].front() == i+1){
					vetor[grafo[no][j].first - 0].pop();
                    descodificado += grafo[no][j].first;
                    no = grafo[no][j].first;
                    break;		
				}
			}
		}
	}
	
	
	return descodificado;
}

void Imprimir_vetor(){
	for(int i = 0; i < vetor.size(); i++){
		cout<<endl<<"VET["<<i<<"] : ";
		while(vetor[i].size() != 0){
			cout<<vetor[i].front()<<"   ";
			vetor[i].pop();
		
			
		}

		
	}
	
	
	
}


int main(){
	string texto = "bananas de pijamas";
	inicio = texto[0];
	
	cout<<codificar("bananas de pijamas, descendo as escadas, bananas")<<endl;
	cout<<descodificar("11010111101110101101101000100110010001100110101")<<endl;
	
	
	ofstream file;
	file.open ("arquivo.kro", std::ios::binary);
	
	byte c = 1;
	
	file << 1;
	
	file.close();
	
	
	

	
	
	
	return 0;
}


