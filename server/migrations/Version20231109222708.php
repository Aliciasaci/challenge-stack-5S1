<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231109222708 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT fk_8d93d649ff631228');
        $this->addSql('DROP INDEX idx_8d93d649ff631228');
        $this->addSql('ALTER TABLE "user" DROP etablissement_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "user" ADD etablissement_id INT NOT NULL');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT fk_8d93d649ff631228 FOREIGN KEY (etablissement_id) REFERENCES etablissement (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_8d93d649ff631228 ON "user" (etablissement_id)');
    }
}
