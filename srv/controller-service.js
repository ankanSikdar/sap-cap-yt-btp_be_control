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

        this.after("READ", "Assesments", (results, req) => {

            results.forEach(item => {
                let ls_status_info = calculateStatus(item);

                item.OverallStatus = ls_status_info.OverallStatus;
                item.OverallStatusCriticality = ls_status_info.OverallStatusCriticality;
            })
        })

        return super.init();
    }
}

function calculateStatus(data) {
    if (!data.StartDate || !data.EndDate || !data.DueDate) {
        return {
            "OverallStatus": "In Preparation",
            "OverallStatusCriticality": 0
        }
    } else {
        let lv_today = new Date();
        lv_today.setHours(0, 0, 0, 0);

        let lv_dueDate = new Date(data.DueDate);
        lv_dueDate.setHours(0, 0, 0, 0);

        return (lv_dueDate < lv_today) ? {
            "OverallStatus": "Overdue",
            "OverallStatusCriticality": 1,
        } : {
            "OverallStatus": "On Track",
            "OverallStatusCriticality": 3,
        }
    }
};

module.exports = ControllerService;
