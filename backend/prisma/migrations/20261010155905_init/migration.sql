-- CreateEnum
CREATE TYPE "ConceptStatus" AS ENUM ('pendiente', 'en-curso', 'terminado');

-- CreateEnum
CREATE TYPE "ExerciseCategory" AS ENUM ('js', 'react', 'ts', 'algoritmos', 'estructuras');

-- CreateTable
CREATE TABLE "concepts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ConceptStatus" NOT NULL,

    CONSTRAINT "concepts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,
    "category" "ExerciseCategory",
    "language" TEXT,
    "date" TEXT NOT NULL,
    "codePath" TEXT NOT NULL,
    "whatChanged" TEXT NOT NULL,
    "whatWasHard" TEXT NOT NULL,
    "codeSnippet" TEXT,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sections_progress" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ConceptStatus" NOT NULL,
    "completedItems" INTEGER NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "lastReview" TEXT NOT NULL,

    CONSTRAINT "sections_progress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "concepts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
