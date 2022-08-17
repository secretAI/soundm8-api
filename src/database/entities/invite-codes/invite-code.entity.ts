import { 
  IsBoolean, 
  IsDate, 
  IsInstance, 
  IsString, 
  IsUUID, 
  Length, 
  UUIDVersion 
} from "class-validator";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  PrimaryColumn 
} from "typeorm";

@Entity('invite_codes')
export class InviteCodeEntity {
  @IsUUID(4 as UUIDVersion)
  @PrimaryColumn('uuid', {
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  public readonly id: string;

  @IsString()
  @Column('text', {
    name: 'body',
    unique: true
  })
  public body: string;

  @IsDate()
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()::timestamp'
  })
  public generated_at: Date;

  @IsBoolean()
  @Column('bool', {
    name: 'created_at',
    default: () => 'now()::timestamp'
  })
  public is_used: boolean;

  /* add user instance */
}
