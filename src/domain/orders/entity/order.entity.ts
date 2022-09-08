import { 
  IsBoolean,
  IsDate,
  IsFQDN, 
  IsIn, 
  IsInt, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsUrl, 
  IsUUID, 
  Length, 
  Max, 
  Min 
} from "class-validator";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  Index, 
  ManyToOne, 
  PrimaryColumn,
} from "typeorm";
import { UserEntity } from "../../users/entity";
import { Bitrate, Codec, CommonBitrates, Extension, KnownCodecs, KnownExtensions, PitchKey, PitchKeyList } from "../../../lib";

@Entity('orders', {
  orderBy: { 
    created_at: 'DESC' 
  }
})
export class OrderEntity {
  @IsUUID()
  @PrimaryColumn('uuid', {
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  public readonly id: string;

  @IsNotEmpty()
  @Length(30, 350)
  @IsUrl() /* check if url suits pattern: abc.com */
  @Index('order_url_index', ['url'])
  @Column('text', {
    name: 'url',
    unique: true,
    nullable: false
  })
  public url: string;

  @IsOptional()
  @IsIn(PitchKeyList)
  @Column('enum', {
    name: 'key',
    enum: PitchKeyList
  })
  public key?: PitchKey;

  @IsOptional()
  @IsInt()
  @Min(30) 
  @Max(240)
  @Column('int', {
    name: 'bpm',
    default: 0
  })
  public bpm?: number;

  @IsOptional()
  @IsInt()
  @Max(320)
  @IsIn(CommonBitrates)
  @Column('int', {
    name: 'bitrate',
    nullable: true
  })
  public bitrate?: Bitrate;

  @IsOptional()
  @IsString()
  @IsIn(KnownCodecs)
  @Column('varchar', {
    name: 'codec',
    length: 20,
    nullable: true
  })
  public codec?: Codec;

  @IsOptional()
  @IsString()
  @IsIn(KnownExtensions)
  @Column('varchar', {
    name: 'ext',
    length: 5,
    nullable: true
  })
  public ext?: Extension;

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
  @ManyToOne(
    () => UserEntity, 
    user => user.orders,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' }
  )
  public user?: UserEntity;
};
