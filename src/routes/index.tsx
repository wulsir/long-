import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LinkCard } from "@/components/link-card";
import { LogicQuiz } from "@/components/logic-quiz";
import { ProfileHeader } from "@/components/profile-header";
import { ShareLink } from "@/components/share-link";
import { SocialRow } from "@/components/social-row";
import { ThemeToggle } from "@/components/theme-toggle";
import { VideoModal } from "@/components/video-modal";
import { featuredLinks, profile } from "@/lib/profile";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="relative min-h-dvh">
      <div
        className="absolute right-4 z-10 sm:right-6"
        style={{ top: "max(1rem, env(safe-area-inset-top))" }}
      >
        <ThemeToggle />
      </div>

      <main
        className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-12"
        style={{
          paddingTop: "max(4.5rem, calc(env(safe-area-inset-top) + 3.25rem))",
        }}
      >
        <ProfileHeader onPlayVideo={() => setVideoOpen(true)} />

        <nav className="mt-8 flex flex-col gap-2.5" aria-label="精選連結">
          {featuredLinks.map((link, index) => (
            <LinkCard
              key={link.title}
              link={link}
              index={index}
              onOpenQuiz={() => setQuizOpen(true)}
            />
          ))}
        </nav>

        <div className="mt-8">
          <SocialRow />
        </div>

        <footer
          className="footer-enter mt-10 flex flex-col items-center gap-3 pb-[env(safe-area-inset-bottom)] text-center"
          style={{ animationDelay: "760ms" }}
        >
          <ShareLink />
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </footer>
      </main>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      <LogicQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}
