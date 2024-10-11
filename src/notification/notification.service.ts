import { Injectable } from '@nestjs/common';

/**
 * Service responsible for sending notifications.
 */
@Injectable()
export class NotificationService {
  /**
   * Sends an email notification.
   * @param email Recipient's email address.
   * @param message The message content.
   */
  sendEmail(email: string, message: string): void {
    // Logic to send email
  }
}
