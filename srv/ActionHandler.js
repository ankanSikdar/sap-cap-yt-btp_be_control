const cds = require('@sap/cds');

module.exports.MarkAsObsolete = async (req) => {
    let reasonComment = req.data.ReasonComment;
    let assesmentID = req.params[0].ID;

    const tx = cds.transaction(req);

    // Define the query to call the procedure. 
    const sQuery = 'CALL ST_MARK_AS_OBSOLETE(IN_ASID => ?, IN_REASONCOMMENT => ?)';

    // Execute the procedure
    const procedure_call = await tx.run(sQuery, [assesmentID, reasonComment]);

}