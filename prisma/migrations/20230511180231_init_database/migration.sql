-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Office" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isUrlValid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OfficeToWebsite" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Department_name_idx" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_categoryId_key" ON "Department"("name", "categoryId");

-- CreateIndex
CREATE INDEX "Office_name_idx" ON "Office"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Office_name_departmentId_key" ON "Office"("name", "departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Website_url_name_key" ON "Website"("url", "name");

-- CreateIndex
CREATE UNIQUE INDEX "_OfficeToWebsite_AB_unique" ON "_OfficeToWebsite"("A", "B");

-- CreateIndex
CREATE INDEX "_OfficeToWebsite_B_index" ON "_OfficeToWebsite"("B");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OfficeToWebsite" ADD CONSTRAINT "_OfficeToWebsite_A_fkey" FOREIGN KEY ("A") REFERENCES "Office"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OfficeToWebsite" ADD CONSTRAINT "_OfficeToWebsite_B_fkey" FOREIGN KEY ("B") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;
