import Breed from 'src/breed/breed.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Cat {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public color: string;

  @ManyToOne(() => Breed, (breed) => breed.cats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'breed_id' })
  public breed: Breed;
}

export default Cat;
