import { MigrationInterface, QueryRunner } from 'typeorm'

export class PostEntity1718370728101 implements MigrationInterface {
    name = 'PostEntity1718370728101'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "post" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "content" character varying, "isFeatured" boolean NOT NULL DEFAULT false, "isDraft" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))')
        await queryRunner.query('ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"')
        await queryRunner.query('DROP TABLE "post"')
    }

}
