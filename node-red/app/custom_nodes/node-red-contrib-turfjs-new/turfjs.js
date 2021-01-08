module.exports = function(RED) {
    function TurfJSNode(config) {
        const turf = require('turf');
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            const turfFunction = msg.topic;
            if(!turfFunction){
                msg.error = 'No turf function specified in msg.topic';
                node.send([null, msg]);
                return;
            }
            const turfContext = msg.payload;
            try {
                this.status({fill:"blue",shape:"dot",text:"processing"});
                msg.payload = turf[turfFunction].apply(null, turfContext);
                this.status({});
                node.send(msg)
            } catch (err) {
                this.status({fill:"red",shape:"dot",text:"error"});
                msg.error = err;
                node.send([null, msg]);
                this.status({});
            }
        });
    }
    RED.nodes.registerType("turfjs",TurfJSNode);
};