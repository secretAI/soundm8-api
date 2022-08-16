import { 
  IsBoolean,
  IsDate,
  IsEmail,
  IsFQDN, 
  IsIn, 
  IsInt, 
  IsNotEmpty, 
  IsOptional, 
  IsUUID, 
  Length, 
  Max, 
  Min, 
  UUIDVersion 
} from "class-validator";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  Index, 
  JoinColumn, 
  ManyToOne, 
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import { UserEntity } from "../";
import { PitchKeyList } from "../../../lib/";

@Entity('orders', {
  orderBy: { 
    created_at: 'DESC' 
  }
})
export class OrderEntity {
  @IsUUID(4 as UUIDVersion)
  @PrimaryColumn('uuid', {
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  public readonly id: string;

  @IsNotEmpty()
  @Length(30, 350)
  @IsFQDN() /* check if url suits pattern: abc.com */
  @Index('order_url_index', ['url'])
  @Column('text', {
    name: 'url',
    unique: true,
    nullable: false
  })
  public url: string;

  @IsOptional()
  @IsIn(PitchKeyList.uniqueKeys)
  @Column('enum', {
    name: 'key',
    enum: PitchKeyList.uniqueKeys
  })
  public key?: string;

  @IsOptional()
  @IsInt()
  @Min(30) 
  @Max(240)
  @Column('int', {
    name: 'bpm',
    default: 0
  })
  public bpm?: number;

  @IsDate()
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()::timestamp'
  })
  public created_at: Date;

  // @IsNotEmpty()
  // @IsEmail()
  // @Length(6, 48)
  // @Column('varchar', {
  //   name: 'user_email',
  //   nullable: false
  // })
  // @ManyToOne(() => UserEntity, (user) => user.email, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE'
  // })
  // @JoinColumn({
  //   name: 'user_email',
  //   referencedColumnName: 'email'
  // })
  // public user: UserEntity;

  @IsBoolean()
  @Column('bool', {
    name: 'completed',
    default: false
  })
  public completed: boolean;
};
