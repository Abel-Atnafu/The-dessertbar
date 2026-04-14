import AdminLayout from "@/components/AdminLayout";
import ReservationsClient from "./ReservationsClient";
import { prisma } from "@dessertbar/db";

async function getReservations() {
  return prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function ReservationsPage() {
  const reservations = await getReservations();

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-500 text-sm mt-1">
            {reservations.filter((r) => r.status === "pending").length} pending confirmation
          </p>
        </div>
        <ReservationsClient initialReservations={JSON.parse(JSON.stringify(reservations))} />
      </div>
    </AdminLayout>
  );
}
