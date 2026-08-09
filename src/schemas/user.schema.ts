import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoles } from '../user/user.roles';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  fname!: string;

  @Prop({ required: true })
  lname!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: UserRoles.STUDENT, enum: UserRoles })
  role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
