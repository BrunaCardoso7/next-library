import { OnboardingForm } from "../features/onboarding/components/OnboardingForm";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-blue-50 font-sans dark:bg-black">
        <OnboardingForm />
    </div>
  );
}
