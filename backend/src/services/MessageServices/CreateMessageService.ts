import { getIO } from "../../libs/socket";
import Contact from "../../models/Contact";
import Message from "../../models/Message";
import Queue from "../../models/Queue";
import Tag from "../../models/Tag";
import Ticket from "../../models/Ticket";
import User from "../../models/User";
import Whatsapp from "../../models/Whatsapp";

export interface MessageData {
  wid: string;
  ticketId: number;
  body: string;
  contactId?: number;
  fromMe?: boolean;
  read?: boolean;
  mediaType?: string;
  quotedMsgId?: number|string;
  mediaUrl?: string;
  ack?: number;
  queueId?: number;
  channel?: string;
  ticketTrakingId?: number;
  isPrivate?: boolean;
  ticketImported?: any;
  isForwarded?: boolean;
}
interface Request {
  messageData: MessageData;
  companyId: number;
}

const CreateMessageService = async ({
  messageData,
  companyId
}: Request): Promise<Message> => {
  const io = getIO();

  if(messageData.quotedMsgId && messageData.mediaType === "reactionMessage" && !messageData?.ticketImported){

    if(messageData.fromMe){
      const oldReaction = await Message.findOne({
        where: {
          quotedMsgId: messageData.quotedMsgId,
          fromMe: true
        }
      })

      if(oldReaction){

        const reactionId = oldReaction.id
        const ticketTemp = await Ticket.findOne({where:{id: messageData.ticketId}});
        await oldReaction.destroy()
        io.of(String(companyId))
        .emit(`company-${companyId}-appMessage`, {
          action: "delete",
          message:{
            messageId: oldReaction.quotedMsgId,
            reactionId,
            contactId: oldReaction.contactId,
            fromMe: oldReaction.fromMe,
            uuid: ticketTemp.uuid,
            mediaType: "reactionMessage"
          }
        });
      }
    }else{
      const oldReaction = await Message.findOne({
        where: {
          quotedMsgId: messageData.quotedMsgId,
          fromMe: false,
          contactId: messageData.contactId
        }
      })

      if(oldReaction){
        const reactionId = oldReaction.id
        const ticketTemp = await Ticket.findByPk(messageData.ticketId);
        await oldReaction.destroy()
        io
        .of(String(companyId))
        .emit(`company-${companyId}-appMessage`, {
          action: "delete",
          message:
          {
            messageId: oldReaction.quotedMsgId,
            reactionId,
            contactId: oldReaction.contactId,
            fromMe: oldReaction.fromMe,
            uuid: ticketTemp.uuid,
            mediaType: "reactionMessage"
          }
        });
      }
    }
  }

  await Message.upsert({ ...messageData, companyId });

  const message = await Message.findOne({
    where: {
      wid: messageData.wid,
      companyId
    },
    include: [
      "contact",
      {
        model: Ticket,
        as: "ticket",
        include: [
          {
            model: Contact,
            attributes: ["id", "name", "number", "email", "profilePicUrl", "acceptAudioMessage", "active", "urlPicture", "companyId"],
            include: ["extraInfo", "tags"]
          },
          {
            model: Queue,
            attributes: ["id", "name", "color"]
          },
          {
            model: Whatsapp,
            attributes: ["id", "name", "groupAsTicket"]
          },
          {
            model: User,
            attributes: ["id", "name"]
          },
          {
            model: Tag,
            as: "tags",
            attributes: ["id", "name", "color"]
          }
        ]
      },
      {
        model: Message,
        as: "quotedMsg",
        include: ["contact"]
      }
    ]
  });

  if (message.ticket.queueId !== null && message.queueId === null) {
    await message.update({ queueId: message.ticket.queueId });
  }

  if (message.isPrivate) {
    await message.update({ wid: `PVT${message.id}` });
  }



  if (!message) {
    throw new Error("ERR_CREATING_MESSAGE");
  }


  if (!messageData?.ticketImported) {
    io.of(String(companyId))
      .emit(`company-${companyId}-appMessage`, {
        action: "create",
        message,
        ticket: message.ticket,
        contact: message.ticket.contact
      });
  }


  return message;
};

export default CreateMessageService;
