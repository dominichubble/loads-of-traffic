import Home from "@/components/home";
import HomeProgressBar from "@/components/home-progress-bar";

export default function HomePage() {
  return (
    <div className="font-sans text-white">
      <HomeProgressBar />
      <main>
        <Home />
      </main>
    </div>
  );
}
