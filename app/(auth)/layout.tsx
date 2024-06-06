import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="relative h-scree w-full">
        <div className="absolute size-full">
          <Image
            src="/images/bg-img.png"
            alt="Background"
            fill
            className="size-full"
          />
        </div>
        {children}
      </main>
    </>
  );
}
