import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { string } from 'joi';

@Schema()
@ObjectType()
class Country {
  @Prop()
  @Field(() => String, { nullable: true })
  country: string;
}

@Schema()
@ObjectType()
class Genre {
  @Prop()
  @Field(() => String, { nullable: true })
  genre: string;
}

@Schema()
@ObjectType()
export class Film {
  @Prop()
  @Field(() => Number, { nullable: true })
  kinopoiskId: number;
  @Prop()
  @Field(() => String, { nullable: true })
  imdbId: string;
  @Prop()
  @Field(() => String, { nullable: true })
  nameRu: string;
  @Prop()
  @Field(() => String, { nullable: true })
  nameEn: string;
  @Prop()
  @Field(() => String, { nullable: true })
  nameOriginal: string;
  @Prop()
  @Field(() => String, { nullable: true })
  posterUrl: string;
  @Prop()
  @Field(() => String, { nullable: true })
  posterUrlPreview: string;
  @Prop()
  @Field(() => String, { nullable: true })
  coverUrl: string;
  @Prop()
  @Field(() => String, { nullable: true })
  logoUrl: string;
  @Prop()
  @Field(() => Number, { nullable: true })
  reviewsCount: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  ratingGoodReview: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  ratingGoodReviewVoteCount: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  ratingKinopoisk: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  ratingKinopoiskVoteCount: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  ratingImdb: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  ratingImdbVoteCount: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  ratingFilmCritics: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  ratingFilmCriticsVoteCount: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  ratingAwait: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  ratingAwaitCount: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  ratingRfCritics: number;
  @Prop()
  @Field(() => Number, { nullable: true })
  ratingRfCriticsVoteCount: number;
  @Prop()
  @Field(() => String, { nullable: true })
  webUrl: string;
  @Prop()
  @Field(() => String, { nullable: true })
  year: string;
  @Prop()
  @Field(() => String, { nullable: true })
  filmLength: string;
  @Prop()
  @Field(() => String, { nullable: true })
  slogan: string;
  @Prop()
  @Field(() => String, { nullable: true })
  description: string;
  @Prop()
  @Field(() => String, { nullable: true })
  shortDescription: string;
  @Prop()
  @Field(() => String, { nullable: true })
  editorAnnotation: string;
  @Prop()
  @Field(() => Boolean, { nullable: true })
  isTicketsAvailable: boolean;
  @Prop()
  @Field(() => String, { nullable: true })
  productionStatus: string;
  @Prop()
  @Field(() => String, { nullable: true })
  type: string;
  @Prop()
  @Field(() => String, { nullable: true })
  ratingMpaa: string;
  @Prop()
  @Field(() => String, { nullable: true })
  ratingAgeLimits: string;
  @Prop()
  @Field(() => String, { nullable: true })
  hasImax: string;
  @Prop()
  @Field(() => Boolean, { nullable: true })
  has3D: boolean;
  @Prop()
  @Field(() => String, { nullable: true })
  lastSync: string;
  @Prop()
  @Field(() => [Country], { nullable: true })
  countries: [Country];
  @Prop()
  @Field(() => [Genre], { nullable: true })
  genres: [Genre];
  @Prop()
  @Field(() => String, { nullable: true })
  startYear: string;
  @Prop()
  @Field(() => String, { nullable: true })
  endYear: string;
  @Prop()
  @Field(() => Boolean, { nullable: true })
  serial: boolean;
  @Prop()
  @Field(() => Boolean, { nullable: true })
  shortFilm: boolean;
  @Prop()
  @Field(() => Boolean, { nullable: true })
  completed: boolean;
}
