// Stub — install 'socket.io' in production: npm install socket.io
// import { Server } from "socket.io";
// import type { NextApiResponse } from "next";
//
// export function initSocketServer(res: NextApiResponse) {
//   if ((res.socket as any).server.io) return (res.socket as any).server.io;
//   const io = new Server((res.socket as any).server, {
//     path: "/api/socket",
//     cors: { origin: process.env.NEXT_PUBLIC_BASE_URL },
//   });
//   (res.socket as any).server.io = io;
//   return io;
// }

/**
 * Emit an alert notification to a specific user room (stub).
 * In production, use the real Socket.io server instance.
 */
export function emitAlert(
  userId: string,
  payload: Record<string, unknown>,
): void {
  console.warn(`[socket stub] emit to user:${userId}`, payload);
}

/**
 * Emit a case message to a case room (stub).
 */
export function emitCaseMessage(
  caseId: string,
  message: Record<string, unknown>,
): void {
  console.warn(`[socket stub] emit to case:${caseId}`, message);
}
