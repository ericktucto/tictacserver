import { Table, Model, PrimaryKey, IsUUID, Default, DataType, Column, Min, Length } from "sequelize-typescript";

@Table
export class Room extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Length({ min: 3 })
  @Column(DataType.STRING)
  name: string;

  @Min(3)
  @Column(DataType.INTEGER)
  level: number;

  @Min(3)
  @Column(DataType.INTEGER)
  winWith: number;

  @Min(2)
  @Column(DataType.INTEGER)
  players: number;
}
