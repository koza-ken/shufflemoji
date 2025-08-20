/*
  Warnings:

  - You are about to drop the column `completedAt` on the `game_records` table. All the data in the column will be lost.
  - You are about to drop the column `questionsAnswered` on the `game_records` table. All the data in the column will be lost.
  - You are about to drop the column `totalTime` on the `game_records` table. All the data in the column will be lost.
  - Added the required column `correctAnswers` to the `game_records` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameEndReason` to the `game_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."game_records" DROP COLUMN "completedAt",
DROP COLUMN "questionsAnswered",
DROP COLUMN "totalTime",
ADD COLUMN     "correctAnswers" JSONB NOT NULL,
ADD COLUMN     "gameEndReason" TEXT NOT NULL,
ADD COLUMN     "incorrectAnswer" JSONB,
ADD COLUMN     "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "game_records_mode_score_idx" ON "public"."game_records"("mode", "score");

-- CreateIndex
CREATE INDEX "game_records_userId_playedAt_idx" ON "public"."game_records"("userId", "playedAt");
