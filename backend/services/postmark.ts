import * as postmark from "postmark";

const { NODE_ENV } = process.env;

const POSTMARK_API_KEY = NODE_ENV === "production" ? "bork" : "";

let client: any = null;

if (NODE_ENV === "production") {
  client = new postmark.ServerClient(POSTMARK_API_KEY, {
    useHttps: true,
  });
}

export enum EmailType {
  ONE_TIME_CODE = "one-time-code",
}

const sendTransactionalEmail = async ({
  to,
  emailType,
  variables,
  from,
}: {
  to: string;
  emailType: EmailType;
  variables?: any;
  from?: string;
}) => {
  try {
    if (!emailType) {
      // logError(`Invalid email type.`, null, { emailType });
      throw Error("Invalid email type.");
    }

    const messageData = {
      From: from || "team@dogeville.com",
      To: to,
      TemplateAlias: emailType,
      TemplateModel: {
        ...variables,
      },
    };

    if (NODE_ENV === "production") {
      client.sendEmailWithTemplate(messageData);
      console.log("Sent transactional email.", { messageData });
    } else {
      console.log("Would have sent transactional email", { messageData });
    }
  } catch (err) {
    // c.f. https://postmarkapp.com/developer/api/overview#error-codes
    const { Message } = err;
    console.error(Message);
  }
};

export default {
  sendTransactionalEmail,
};
