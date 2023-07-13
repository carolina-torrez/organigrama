import { Module } from '@nestjs/common';
import { OrganigramaService } from './organigrama.service';
import { OrganigramaController } from './organigrama.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NodoOrganigrama, NodoOrganigramaSchema } from './schema/organigrama.schema';
import { DataDefaultService } from './dafault.data.service';
import { SVGOrganigramaService } from './svg.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: NodoOrganigrama.name, schema: NodoOrganigramaSchema},
    ])
  ],
  controllers: [OrganigramaController],
  providers: [OrganigramaService,DataDefaultService,SVGOrganigramaService]
})
export class OrganigramaModule {}
