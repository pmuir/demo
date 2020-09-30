import {kafka} from "./kafka";
import {smtp} from "./mailer";

interface Customer {
    first_name: string
    last_name: string
    email: string
}

export const RunConsumer = async () => {
    const consumer = kafka.consumer({ groupId: 'test-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'inventory-connector.inventory.customers', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const value = JSON.parse(message.value.toString());
            const payload = value.payload;
            if (payload.before === null && payload.after !== null) {
                // it's a new customer!
                console.log(`New customer ${payload.after.first_name} ${payload.after.last_name} created`);
                await onNewCustomer(payload.after);
            }
        },
    })
};

export const onNewCustomer = async (customer: Customer) => {
    // send mail with defined transport object
    let info = await smtp.sendMail({
        from: 'Demo App <pete.muir@gmail.com>', // sender address
        to: `${customer.first_name} ${customer.last_name} <${customer.email}>`, // list of receivers
        subject: "Welcome to Demo App!", // Subject line
        text: `Hello ${customer.first_name},
        
        Welcome to Demo App!
        
        The Demo App team
        ` // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
