import ProfileCompanyCard from "@/components/profile/profile-company-card";
import ProfileUserCard from "@/components/profile/profile-user-card";

export default async function ProfilePage() {
  return (
    <section className="w-full min-h-dvh flex flex-col items-center justify-center gap-y-8">
      <ProfileUserCard />
      <ProfileCompanyCard />
    </section>
  );
}
