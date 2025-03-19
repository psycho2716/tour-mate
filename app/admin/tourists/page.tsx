import { TouristLogsTable } from "@/components/admin/tourists/TouristLogsTable";

export default function TouristLogsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Tourists Logs</h1>
                <p className="text-sm text-gray-500">View tourists logs here.</p>
            </div>
            <TouristLogsTable />
        </div>
    );
}
