import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jodador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4} from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    constructor(@InjectModel('Jogador') private readonly jogadorModel:Model<Jogador>){

    }

    private readonly looger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>{

        const { email } = criarJogadorDto

        //const jogadorEncontrato = this.jogadores.find(jogador => jogador.email === email)

        const jogadorEncontrato = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncontrato){
           await this.atualizar(criarJogadorDto);
        }else{
            this.criar(criarJogadorDto);
        }
        
        
    }


    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrato = await this.jogadorModel.findOne({email}).exec();
        if(!jogadorEncontrato){
            throw new NotFoundException(`Jogador ${email} não encontrado`)
        }
        return jogadorEncontrato
    }

    async deletarJogador(email): Promise<any> {
        return await this.jogadorModel.deleteMany({email}).exec()
        
    }


    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador>{

        const jogadorCriado = new this.jogadorModel(criarJogadorDto)

        return await jogadorCriado.save();

    }

    private async atualizar(criarJogadorDto:CriarJogadorDto): Promise<Jogador>{
       
        return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto.email},{$set:criarJogadorDto}).exec();
       
    }

}
