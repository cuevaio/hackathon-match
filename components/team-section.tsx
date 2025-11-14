"use client";

import { motion } from "motion/react";
import ParticipantCard from "./participant-card";
import type { Participant } from "@/db/schema";

interface TeamSectionProps {
  teamName: string;
  members: Participant[];
}

function getTeamColor(teamName: string): string {
  let hash = 0;
  for (let i = 0; i < teamName.length; i++) {
    hash = teamName.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    "hsl(210, 100%, 50%)",
    "hsl(340, 80%, 50%)",
    "hsl(160, 70%, 45%)",
    "hsl(270, 70%, 50%)",
    "hsl(30, 90%, 50%)",
    "hsl(190, 80%, 45%)",
  ];
  
  return colors[Math.abs(hash) % colors.length];
}

export function TeamSection({ teamName, members }: TeamSectionProps) {
  const teamColor = getTeamColor(teamName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <div className="mb-4 flex items-center gap-4">
        <div
          className="h-1 flex-1 rounded-sm"
          style={{ backgroundColor: teamColor }}
        />
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold uppercase tracking-wide text-foreground">
            {teamName}
          </h2>
          <span
            className="px-3 py-1 text-xs font-bold uppercase border-2 rounded-sm"
            style={{
              borderColor: teamColor,
              color: teamColor,
            }}
          >
            {members.length} {members.length === 1 ? "Member" : "Members"}
          </span>
        </div>
        <div
          className="h-1 flex-1 rounded-sm"
          style={{ backgroundColor: teamColor }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25,
            }}
          >
            <ParticipantCard participant={member} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
