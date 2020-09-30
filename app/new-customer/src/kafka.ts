import {Kafka} from "kafkajs";

export const kafka = new Kafka({
    clientId: 'new-customer',
    brokers:  process.env.BROKERS ? process.env.BROKERS.split(" ") : []
});


