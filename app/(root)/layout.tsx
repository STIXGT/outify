import Sidebar from "../components/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-20 w-full min-h-screen flex">
      <Sidebar />
      <main className="flex-1 ml-16">{children}</main>
    </div>
  );
}
