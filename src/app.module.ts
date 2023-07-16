import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.klkhxuk.mongodb.net/smartApi?retryWrites=true&w=majority',
    ),
    JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
