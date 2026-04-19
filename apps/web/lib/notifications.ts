/**
 * Notification dispatcher stub.
 *
 * In production, replace each channel with its real provider:
 * - Email: Resend (https://resend.com)
 * - WhatsApp: WhatsApp Cloud API
 * - Telegram: Telegram Bot API
 * - In-app: Socket.io emit
 */

export type NotificationChannel = "email" | "whatsapp" | "telegram" | "in_app";
export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface NotificationPayload {
  userId: string;
  channel: NotificationChannel;
  message: string;
  subject?: string;
}

/**
 * Send a notification via the specified channel.
 * Returns true on success (stub always returns true).
 */
export async function sendNotification(payload: NotificationPayload): Promise<boolean> {
  console.warn(`[notifications] ${payload.channel} → user:${payload.userId}: ${payload.message}`);

  switch (payload.channel) {
    case "email":
      // Production: await resend.emails.send({ from, to, subject, html })
      break;
    case "whatsapp":
      // Production: POST https://graph.facebook.com/v19.0/{phone_id}/messages
      break;
    case "telegram":
      // Production: POST https://api.telegram.org/bot{token}/sendMessage
      break;
    case "in_app":
      // Production: emitAlert(payload.userId, { message: payload.message })
      break;
  }

  return true;
}

/**
 * Dispatch alert notifications across relevant channels based on severity.
 *
 * CRITICAL → all channels
 * HIGH     → whatsapp + email + in_app
 * MEDIUM   → email + in_app
 * LOW      → in_app only
 */
export async function dispatchAlertNotifications(
  userId: string,
  severity: AlertSeverity,
  message: string,
): Promise<void> {
  const channelsBySeverity: Record<AlertSeverity, NotificationChannel[]> = {
    CRITICAL: ["whatsapp", "email", "telegram", "in_app"],
    HIGH: ["whatsapp", "email", "in_app"],
    MEDIUM: ["email", "in_app"],
    LOW: ["in_app"],
  };

  const channels = channelsBySeverity[severity];
  await Promise.all(
    channels.map((channel) =>
      sendNotification({ userId, channel, message, subject: `[${severity}] OS Defender Alert` }),
    ),
  );
}
