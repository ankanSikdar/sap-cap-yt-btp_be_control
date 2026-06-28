const cds = require('@sap/cds');

class ControllerService extends cds.ApplicationService {
    init() {
        this.before("READ", "Controllers", (req) => {
            console.log('BEFORE READ Request: ', req);
        })
        this.on("READ", "Controllers", (req, next) => {
            console.log('ON READ Request: ', req);
            console.log('ON READ Next: ', next);
            return next();      // Default exection will continue
        })
        this.after("READ", "Controllers", (results, req) => {
            console.log('AFTER READ Request: ', req);
            console.log('AFTER READ Results: ', results);
        })

        this.before("CREATE", "Assesments", (req) => {
            const data = req.data;

            if (data.StartDate > data.EndDate) {
                req.error({
                    code: 501,
                    message: 'End Date cannot be earlier than Start Date',
                    target: 'in/EndDate'
                });
            }

            if (data.DueDate < data.EndDate) {
                req.error({
                    code: 501,
                    message: 'Due Date cannot be earlier than End Date',
                    target: 'in/DueDate'
                });
            }
        })

        return super.init();
    }
}

module.exports = ControllerService;
