import {RunConsumer} from "./customer";

(async () => {
    try {
        await RunConsumer();
    } catch (e) {
        console.log(e);
    }
})();
