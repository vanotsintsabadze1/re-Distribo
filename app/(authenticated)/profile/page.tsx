import ProfileForm from "@/components/profile/profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <section className="w-dvw min-h-dvh flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-[.9rem]">Profile</CardTitle>
          <CardDescription className="text-xs">You can edit your profile information here</CardDescription>
        </CardHeader>
        <CardContent className="flex min-w-[36rem] justify-between">
          <ProfileForm />
        </CardContent>
      </Card>
    </section>
  );
}
