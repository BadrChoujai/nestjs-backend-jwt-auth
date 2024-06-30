import Cat from 'src/cats/cat.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Breed {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => Cat, (cat) => cat.breed)
  public cats: Cat[];
}

export default Breed;
