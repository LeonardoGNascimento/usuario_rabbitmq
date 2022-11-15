-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_id_key" ON "usuario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_key" ON "usuario"("cpf");
