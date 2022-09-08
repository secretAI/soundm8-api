import { 
  IsUUID, 
  UUIDVersion, 
  IsNotEmpty, 
  Length, 
  IsFQDN, 
  IsOptional, 
  IsIn, 
  IsInt, 
  Min, 
  Max, 
  IsDate, 
  IsBoolean, 
  IsUrl,
  IsString
} from "class-validator";
import { CreateDateColumn, Column } from "typeorm";
import { OrderEntity } from "../../../domain/orders/entity";
import { UserEntity } from "../../../domain/users/entity";
import { Bitrate, Codec, Extension, KnownCodecs, KnownExtensions, PitchKey, PitchKeyList } from "../../../lib";

export class OrderResponseDto {
  constructor(data: OrderEntity) {
    this.id = data.id;
    this.url = data.id;
    this.bpm = data.bpm;
    this.key = data.key;
    this.bitrate = data.bitrate;
    this.codec = data.codec;
    this.ext = data.ext;
    this.created_at = data.created_at;
    this.is_completed = data.is_completed;
    this.user = data.user;
  }

  @IsUUID()
  public readonly id: string;

  @IsNotEmpty()
  @Length(30, 350)
  @IsUrl() /* check if url suits pattern: abc.com */
  public url: string;

  @IsOptional()
  @IsIn(PitchKeyList)
  public key?: PitchKey;

  @IsOptional()
  @IsInt()
  @Min(30) 
  @Max(240)
  public bpm?: number;

  @IsOptional()
  @IsInt()
  @Max(320)
  public bitrate?: Bitrate;

  @IsOptional()
  @IsString()
  @IsIn(KnownCodecs)
  public codec?: Codec;

  @IsOptional()
  @IsString()
  @IsIn(KnownExtensions)
  public ext?: Extension

  @IsDate()
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()::timestamp'
  })
  public created_at: Date;

  @IsBoolean()
  @Column('bool', {
    name: 'is_completed',
    default: false
  })
  public is_completed: boolean;

  /* relations */
  public user?: UserEntity;
}