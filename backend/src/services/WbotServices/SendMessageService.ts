import Ticket from '../../models/Ticket';
import TicketTraking from '../../models/TicketTraking';
import { verifyMessageFace } from '../FacebookServices/facebookMessageListener';
import sendFacebookMessage from '../FacebookServices/sendFacebookMessage';
import SendWhatsAppMessage from './SendWhatsAppMessage';
import { verifyMessage } from './wbotMessageListener';
import * as Sentry from "@sentry/node";

type IParams = {
  ticketTracking?: TicketTraking;
  message: string;
  ticket: Ticket;
  ticketGroupEnabled?: boolean;
  isForwarded?: boolean;
}

export const SendMessageService = async ({
  ticketTracking,
  message,
  ticket,
  ticketGroupEnabled = false,
  isForwarded = false,
}:IParams) => {
  let bodyMessage = `\u200e ${message}\n`;
  try {

    if (
        ticket.channel === "whatsapp" &&
        (!ticket.isGroup || ticketGroupEnabled) &&
        ticket.whatsapp.status === 'CONNECTED'
      ) {
      const msg = await SendWhatsAppMessage({ body: bodyMessage, ticket, isForwarded });
      await verifyMessage(msg, ticket, ticket.contact, ticketTracking);
    } else if (["facebook", "instagram"].includes(ticket.channel) && (!ticket.isGroup || ticketGroupEnabled)) {

      const msg = await sendFacebookMessage({ body: bodyMessage, ticket });
      await verifyMessageFace(msg, bodyMessage, ticket, ticket.contact);
    }
  } catch (error) {
    Sentry.captureException(error);
    console.log(error);
  }

};
