-- Migrations pour les tables workflow

-- Table des clients
CREATE TABLE IF NOT EXISTS "clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "phone" TEXT,
    "businessType" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table des workflows
CREATE TABLE IF NOT EXISTS "workflows" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'form_received',
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE CASCADE
);

-- Table des mockups
CREATE TABLE IF NOT EXISTS "workflow_mockups" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workflowId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "isChosen" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("workflowId") REFERENCES "workflows" ("id") ON DELETE CASCADE
);

-- Table des actions
CREATE TABLE IF NOT EXISTS "workflow_actions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workflowId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("workflowId") REFERENCES "workflows" ("id") ON DELETE CASCADE
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS "idx_workflows_status" ON "workflows" ("status");
CREATE INDEX IF NOT EXISTS "idx_workflows_client_id" ON "workflows" ("clientId");
CREATE INDEX IF NOT EXISTS "idx_workflows_created_at" ON "workflows" ("createdAt");
CREATE INDEX IF NOT EXISTS "idx_workflow_actions_workflow_id" ON "workflow_actions" ("workflowId");
CREATE INDEX IF NOT EXISTS "idx_workflow_actions_type" ON "workflow_actions" ("type");
CREATE INDEX IF NOT EXISTS "idx_workflow_mockups_workflow_id" ON "workflow_mockups" ("workflowId");
CREATE INDEX IF NOT EXISTS "idx_clients_business_type" ON "clients" ("businessType");
CREATE INDEX IF NOT EXISTS "idx_clients_email" ON "clients" ("email");