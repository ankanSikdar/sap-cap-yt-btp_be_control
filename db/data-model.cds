namespace com.cntrl;

using {cuid} from '@sap/cds/common';

entity Assesments : cuid {
    Agenda                           : String(30) @mandatory;
    StartDate                        : Date       @mandatory;
    EndDate                          : Date       @mandatory;
    DueDate                          : Date       @mandatory;
    DaysPlanned                      : Integer    @assert.range: [7, 21];
    virtual OverallStatus            : String(50);
    virtual OverallStatusCriticality : Integer;
    IsObsolete                       : Boolean;
    ReasonComment                    : String(50);
}

@cds.persistence.skip
entity Controller {
    key ID          : Integer;
        Name        : String(100);
        Description : String(255);
};
