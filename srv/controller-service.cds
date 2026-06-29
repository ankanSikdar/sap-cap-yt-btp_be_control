using com.cntrl as datamodel from '../db/data-model';

namespace com.cntrl;

service ControllerService {

    @odata.draft.enabled
    entity Assesments  as select from datamodel.Assesments
    actions {
        action MarkAsObsolete (
            ReasonComment : String(50)
        );
    };

    @readonly
    entity Controllers as projection on datamodel.Controller;
}


annotate ControllerService.Assesments with @(UI: {
    LineItem             : [
        {
            $Type: 'UI.DataField',
            Value: Agenda,
        },
        {
            $Type: 'UI.DataField',
            Value: StartDate,
        },
        {
            $Type: 'UI.DataField',
            Value: EndDate,
        },
        {
            $Type: 'UI.DataField',
            Value: DueDate,
        },
        {
            $Type: 'UI.DataField',
            Value: DaysPlanned,
        },
        {
            $Type      : 'UI.DataField',
            Value      : OverallStatus,
            Criticality: OverallStatusCriticality
        },
        {
            $Type: 'UI.DataField',
            Value: IsObsolete,
        },
        {
            $Type: 'UI.DataField',
            Value: ReasonComment,
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'com.cntrl.ControllerService.MarkAsObsolete',
            Label: 'Mark As Obsolete'
        }
    ],
    FieldGroup #BasicData: {

        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: Agenda,
            },
            {
                $Type: 'UI.DataField',
                Value: StartDate,
            },
            {
                $Type: 'UI.DataField',
                Value: EndDate,
            },
            {
                $Type: 'UI.DataField',
                Value: DueDate,
            },
            {
                $Type: 'UI.DataField',
                Value: DaysPlanned,
            },
            {
                $Type      : 'UI.DataField',
                Value      : OverallStatus,
                Criticality: OverallStatusCriticality
            },
        ],
    },
    Facets               : [{
        $Type : 'UI.ReferenceFacet',
        Target: '@UI.FieldGroup#BasicData',
        Label : 'Basic Data',
        ID    : 'idBasicData'
    }, ],
}) {
    Agenda        @title: 'Agenda';
    StartDate     @title: 'Start Date';
    EndDate       @title: 'End Date';
    DueDate       @title: 'Due Date';
    DaysPlanned   @title: 'Days Planned';
    OverallStatus @title: 'Overall Status';
    IsObsolete    @title: 'Is Obsolete?';
    ReasonComment @title: 'Reason Comment';
};
