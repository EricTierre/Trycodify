#include<iostream>
#include<bitset>
#include<fstream> 
#include<string>
#include<vector>
#include <typeinfo>
#include<deque>

using namespace std;

auto readBitsFromFile(string fileName){
	ifstream myReadFile;
	myReadFile.open(fileName);
	vector<bool> output;
	
	string stringRead;
	if(myReadFile.is_open()){
		while(!myReadFile.eof()){
			myReadFile >> stringRead;
			cout<<"String: "<<stringRead<<endl;
		
			
			for(char c : stringRead){
				if(c != myReadFile.eof()){
					bitset<8> byte = bitset<8>(static_cast<unsigned long long int>(c));
					//cout<<bitset<8>(c);
					for(int i = 0; i < 8; i++){
						output.push_back(byte[7 - i]);
					}
				}	
			}	
		}		
	}
	
	cout<<endl;
	
	for(int i = 0; i < output.size(); i++)
		cout<<output[i];
	
	myReadFile.close();
	return output;
}

void saveCompressedFile(vector<bool> bits){

	ofstream file;
	file.open("arquivo.txt", std::ios::binary);
	
	int count = 0;
	bitset<8> toAppend;
	string result;
	
	for(bool bit : bits){
		count++;
		toAppend[0] = bit;
		if(count == 8){
			char c = char(toAppend.to_ulong());
			result += c;
			count = 0;
			cout<<bitset<8>(static_cast<unsigned long long int>(c));
			toAppend = 0;
		}else{
			toAppend <<= 1;	
		}
	}
	
	if(count > 0){
		toAppend <<= (8 -count) - 1;
		char c = char(toAppend.to_ulong());
		result += c;
		cout << bitset<8>(static_cast<unsigned long long int>(c));	

	}

	cout<<endl;
	//cout<<result<<endl;
	file <<result;
	file.close();
}


int main()
{
	string codificado = "011000010110110001100101011000110111001001101001011011010010000001100100011011110111010101110010011000010110010001101111";
	
	vector<bool> texto;
	for(int i = 0; i < codificado.size(); i++){
		if(codificado[i] == '1')	
			texto.push_back(true);
		else
			texto.push_back(false);
	}
	
	
	//01100001
	//saveCompressedFile(texto);
	
	vector<bool> meudeque = readBitsFromFile("arquivo.txt");
	
	//for(int i = 0; i < meudeque.size(); i++)
		//cout<<meudeque[i];
	
	
	
	//string line;
	//ofstream file;
	//ofs.open ("program.bin", ofstream::out | ofstream::app);
	//file.open ("program.txt", std::ios::binary);
	
	/*
	if(file.is_open())
	{
		while(getline(file, line))
		{
			cout<<line;
		}
		file.close();
	}*/
	/*
	bitset<8> binario (string("01100001"));
	//binario.set(01100001);
	for(int i = binario.size()-1; i >= 0;i--){
		cout<<binario[i];
	}*/
	//binario.set();
	//file << "01100001";

	//cout<<ofs<<endl;
	//file.close();
	
	
	
	
	
	
	/*
	FILE *arq;
	char c;
	
	arq = fopen("arquivo.txt", "r");
	
	if (arq == NULL)
	{
		printf("Problem on creation a file\n");
		return 0;
	}
	
	do
	{
		//faz a leitura do caracter no arquivo apontado por pont_arq
		c = getc(arq);
		
		//exibe o caracter lido na tela
		cout<<c;   
		
	}while (c != EOF);
	
	fclose(arq);
	///////////////////////
	int n;
	struct threeNum num;
	FILE *fptr;

	if ((fptr = fopen("program.bin","wb")) == NULL){
       printf("Error! opening file");

       // Program exits if the file pointer returns NULL.
       exit(1);
	}

	int arr[3] = {101, 203, 303};

	fwrite(arr, sizeof(arr), 1, fptr);
	
	*/
	
	
	///bitset<8> binario;

	//cout << binario.set() <<endl;       // 1111
	//cout << binario<<endl;    // 1011
	//cout << binario.set(2) <<endl; 
	//fwrite(binario, sizeof(bitset binario), 1, fptr);
	
	/*for(n = 1; n < 5; ++n)
	{
      num.n1 = n;
      num.n2 = 5*n;
      num.n3 = 5*n + 1;
      fwrite(&num, sizeof(struct threeNum), 1, fptr); 
	}*/
	
	//fclose(fptr); 
	
	
	
	
	return 0;
}


