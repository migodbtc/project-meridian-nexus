import { redirect } from "next/navigation";

export default function PolarisAuthPage() {
  redirect("/polaris/auth/login");
}
