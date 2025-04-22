import HomeMain from "@/components/home/home-main";

export default function HomePage() {
  return (
    <div>
      <h2 className=" font-sans">
        <div className="bg-background h-[100dvh] flex flex-col gap-4">
          <HomeMain />
        </div>
      </h2>
    </div>
  );
}
