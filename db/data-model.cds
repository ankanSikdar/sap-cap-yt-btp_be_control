namespace com.cntrl;

@cds.persistence.skip
entity Controller {
    key ID          : Integer;
        Name        : String(100);
        Description : String(255);
};
