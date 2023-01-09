import { Field, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/users.schema';

@Schema()
@ObjectType()
export class PostContent {
  @Prop()
  @Field(() => String)
  text?: string;
  @Prop({ default: [] })
  @Field(() => [String])
  images?: string[];
  @Prop({ default: [] })
  @Field(() => [String])
  videos?: string[];
}

@Schema()
@ObjectType()
export class Post {
  @Prop()
  @Field(() => String)
  public _id: MongooseSchema.Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'user' })
  @Field(() => User)
  public author: MongooseSchema.Types.ObjectId;
  @Prop({
    default: new Date().toISOString(),
  })
  @Field(() => String)
  public date: string;
  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: 'user',
      default: [],
      unique: true,
    },
  ])
  @Field(() => [String])
  likes?: MongooseSchema.Types.ObjectId[];
  @Prop({ type: PostContent })
  @Field(() => PostContent)
  public content: PostContent;
}

export const PostSchema = SchemaFactory.createForClass(Post);
