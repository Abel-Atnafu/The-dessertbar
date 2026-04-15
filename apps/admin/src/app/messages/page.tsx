export const dynamic = "force-dynamic";

import AdminLayout from "@/components/AdminLayout";
import MessagesClient from "./MessagesClient";
import { prisma } from "@dessertbar/db";

async function getMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function MessagesPage() {
  const messages = await getMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500 text-sm mt-1">
            {messages.length === 0
              ? "No messages yet"
              : `${messages.length} total · ${unread} unread`}
          </p>
        </div>
        <MessagesClient initialMessages={JSON.parse(JSON.stringify(messages))} />
      </div>
    </AdminLayout>
  );
}
