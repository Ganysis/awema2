-- AlterTable
ALTER TABLE "projects" ADD COLUMN "data" TEXT;

-- CreateTable
CREATE TABLE "form_links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uniqueId" TEXT NOT NULL,
    "clientId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "expiresAt" DATETIME,
    "maxUses" INTEGER DEFAULT 1,
    "views" INTEGER NOT NULL DEFAULT 0,
    "started" INTEGER NOT NULL DEFAULT 0,
    "completed" INTEGER NOT NULL DEFAULT 0,
    "formData" TEXT,
    "completedAt" DATETIME,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" TEXT,
    CONSTRAINT "form_links_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "form_submissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formLinkId" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "step" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "ip" TEXT,
    "userAgent" TEXT,
    "sessionId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "form_submissions_formLinkId_fkey" FOREIGN KEY ("formLinkId") REFERENCES "form_links" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "form_links_uniqueId_key" ON "form_links"("uniqueId");

-- CreateIndex
CREATE INDEX "form_links_uniqueId_idx" ON "form_links"("uniqueId");

-- CreateIndex
CREATE INDEX "form_links_status_idx" ON "form_links"("status");

-- CreateIndex
CREATE INDEX "form_links_clientId_idx" ON "form_links"("clientId");

-- CreateIndex
CREATE INDEX "form_submissions_formLinkId_idx" ON "form_submissions"("formLinkId");

-- CreateIndex
CREATE INDEX "form_submissions_sessionId_idx" ON "form_submissions"("sessionId");
