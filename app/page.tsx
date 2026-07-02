import MobileHeader from "@/components/mobile-header";
import Home from "@/components/home";
import HomeProgressBar from "@/components/home-progress-bar";

export default function HomePage() {
  return (
    <div className="font-sans text-white">
      <HomeProgressBar />
      <MobileHeader />
      <main>
        <Home />
      </main>
    </div>
  );
}
