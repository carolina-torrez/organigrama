import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type NodoOrganigramaDocument = NodoOrganigrama & Document;

@Schema()
export class NodoOrganigrama {
  @Prop({ required: true, set: value => value.toUpperCase() })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'NodoOrganigrama' })
  father?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NodoOrganigrama' }] })
  children?: string[];
}

export const NodoOrganigramaSchema = SchemaFactory.createForClass(NodoOrganigrama);
