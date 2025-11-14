import { db } from "@/db";
import { participants as participantsTable } from "@/db/schema";
import { PixelatedTitle } from "@/components/pixelated-title";
import { ThemeToggle } from "@/components/theme-toggle";
import { ParticipantGrid } from "@/components/participant-grid";
import { TeamSection } from "@/components/team-section";
import Link from "next/link";
import { User } from "lucide-react";
import type { Participant } from "@/db/schema";

export const revalidate = 60;

export default async function Home() {
  const participants = await db.select().from(participantsTable);

  const participantsWithoutTeam = participants.filter((p) => !p.teamName);
  const participantsWithTeam = participants.filter((p) => p.teamName);

  const teamGroups = participantsWithTeam.reduce(
    (acc, participant) => {
      const teamName = participant.teamName!;
      if (!acc[teamName]) {
        acc[teamName] = [];
      }
      acc[teamName].push(participant);
      return acc;
    },
    {} as Record<string, Participant[]>
  );

  const sortedTeamNames = Object.keys(teamGroups).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div className="min-h-screen bg-background pb-12">
      <main className="container mx-auto px-4 py-12">
        <div className="relative mb-12">
          <div className="absolute top-0 right-0 z-20 flex gap-2">
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 px-3 py-2 bg-background border-2 border-foreground text-foreground hover:bg-muted transition-colors duration-100 rounded-sm h-10"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium uppercase hidden sm:inline">
                Profile
              </span>
            </Link>
            <ThemeToggle />
          </div>

          <div className="text-center space-y-4">
            <PixelatedTitle />
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              Meet the amazing builders of this hackathon
            </p>
          </div>
        </div>

        {participantsWithoutTeam.length > 0 && (
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-foreground text-center mb-2">
                Looking for Teammates
              </h2>
              <p className="text-sm text-muted-foreground text-center">
                {participantsWithoutTeam.length}{" "}
                {participantsWithoutTeam.length === 1
                  ? "participant"
                  : "participants"}{" "}
                available
              </p>
            </div>
            <ParticipantGrid initialParticipants={participantsWithoutTeam} />
          </div>
        )}

        {sortedTeamNames.length > 0 && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-foreground text-center mb-2">
                Teams
              </h2>
              <p className="text-sm text-muted-foreground text-center">
                {sortedTeamNames.length}{" "}
                {sortedTeamNames.length === 1 ? "team" : "teams"} formed
              </p>
            </div>
            {sortedTeamNames.map((teamName) => (
              <TeamSection
                key={teamName}
                teamName={teamName}
                members={teamGroups[teamName]}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
