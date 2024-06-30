import { MigrationInterface, QueryRunner } from 'typeorm';

export class CatRefactor1718965462920 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cat" ADD COLUMN "breed_id" INTEGER, ADD CONSTRAINT "fk_breed" FOREIGN KEY ("breed_id") REFERENCES "breed" ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cat" DROP CONSTRAINT "fk_breed", DROP COLUMN "breed_id"`,
    );
  }
}
