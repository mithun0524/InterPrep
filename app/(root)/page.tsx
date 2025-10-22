import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  let userInterviews = [] as Interview[];

  if (user?.id) {
    userInterviews = (await getInterviewsByUserId(user.id)) ?? [];
  }

  const hasPastInterviews = (userInterviews?.length ?? 0) > 0;

  return (
    <>
      <section className="card-cta hero-section">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="hero-title">
            Ace Your Interviews with{" "}
            <span className="gradient-text">AI-Powered</span> Practice
          </h2>
          <p className="text-lg text-light-100/90">
            Practice real interview scenarios and receive instant, personalized feedback to boost your confidence
          </p>

          <Button asChild className="btn-primary max-sm:w-full btn-enhanced">
            <Link href="/interview">🚀 Start Your Interview Journey</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="AI Interview Assistant"
          width={400}
          height={400}
          className="max-sm:hidden hero-image"
        />
      </section>

      <section className="flex flex-col gap-6 mt-12 section-enhanced">
        <div className="flex items-center gap-3">
          <div className="section-icon">📚</div>
          <h2 className="gradient-text">Your Interview History</h2>
        </div>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <div className="empty-state">
              <p className="text-lg">🎯 You haven&apos;t taken any interviews yet</p>
              <p className="text-sm text-light-400 mt-2">Start your first interview to track your progress!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;