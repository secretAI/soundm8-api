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
  IsUrl
} from "class-validator";
import { OrderEntity } from "src/domain/orders";
import { UserEntity } from "src/domain/users";
import { PitchKey, PitchKeyList } from "src/lib";
import { CreateDateColumn, Column } from "typeorm";

export class OrderResponseDto {
  constructor(data: OrderEntity) {
    this.id = data.id;
    this.url = data.id;
    this.bpm = data.bpm;
    this.key = data.key;
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