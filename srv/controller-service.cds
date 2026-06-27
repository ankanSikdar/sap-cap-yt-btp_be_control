using com.cntrl as datamodel from '../db/data-model';

namespace com.cntrl;

service ControllerService {

    @readonly
    entity Controllers as projection on datamodel.Controller;
}
