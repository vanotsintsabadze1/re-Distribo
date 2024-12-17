import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import ProfileForm from "./profile-form";

export default function ProfileUserCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[.9rem]">Profile</CardTitle>
        <CardDescription className="text-xs">You can edit your profile information here</CardDescription>
      </CardHeader>
      <CardContent className="flex min-w-[36rem] justify-between">
        <ProfileForm />
      </CardContent>
    </Card>
  );
}
