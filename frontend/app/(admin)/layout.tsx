import Sidebar from "@/components/Sidebar";
import { SearchProvider } from "@/contexts/SearchContext";



export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1">

                {children}

            </main>
        </div>
    );
}
