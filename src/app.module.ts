import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganigramaModule } from './organigrama/organigrama.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/organigrama'),
    OrganigramaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
