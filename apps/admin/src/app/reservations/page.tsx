export const dynamic = "force-dynamic";

import AdminLayout from "@/components/AdminLayout";
import ReservationsClient from "./ReservationsClient";
import { prisma } from "@dessertbar/db";

async function getReservations() {
  return prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });
}

const DbError = () => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
    <p className="font-semibold mb-1">Failed to load data</p>
    <p className="text-sm">Could not connect to the database. Please check your DATABASE_URL.</p>
  </div>
);

export default async function ReservationsPage() {
  let reservations;
  try {
    reservations = await getReservations();
  } catch (error) {
    console.error("Reservations page error:", error);
    return <AdminLayout><div className="p-8"><h1 className="text-2xl font-bold text-gray-900 mb-8">Reservations</h1><DbError /></div></AdminLayout>;
  }

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
