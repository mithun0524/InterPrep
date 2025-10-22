import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Link from "next/link";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <div className="flex items-center gap-3 mb-6">
          <div className="section-icon">✨</div>
          <h3 className="gradient-text">Create Your Interview</h3>
        </div>

        <div className="rounded-md border p-6">
          <p className="mb-4">You must be signed in to generate an interview.</p>
          <Link href="/sign-in" className="btn">
            Sign in
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="section-icon">✨</div>
        <h3 className="gradient-text">Create Your Interview</h3>
      </div>

      <Agent userName={user.name} userId={user.id} type="generate" />
    </>
  );
};

export default Page;
