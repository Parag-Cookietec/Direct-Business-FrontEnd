import * as moment from 'moment';


// Advice Master
export const getAdviceMasterListObject = (element) => {
    return {
        id: element.id ? element.id:'',
        adviceCode: element.adviceAgencyCd ? element.adviceAgencyCd : '',
        adviceBy: element.adviceAgencyBy ? element.adviceAgencyBy : '',       
        addDetails: element.addDetails ? element.addDetails : true
    }
}


export const setAdviceMasterObject = (reqObj, adviceMasterDPObj) => {
    return {
         "adviceAgencyCd": reqObj.adviceCode,
         "adviceAgencyBy": reqObj.adviceBy,
         "effectiveFrmDt": "2014-01-01",
    "effectiveToDt": "2014-01-01"
    }
}

export const updateAdviceMasterObject = (reqObj, MasterIdObj) => {
    return {
        "id":MasterIdObj,
         "adviceAgencyCd": reqObj.adviceCode,
         "adviceAgencyBy": reqObj.adviceBy,
         "effectiveFrmDt": "2014-01-01",
    "effectiveToDt": "2014-01-01"
    }
}


//Goi Department Ministry Name Master

export const getGoiDepartmentMinistryNameMasterObject = (element) => {
    return {
        id: element.id ? element.id:'',
        departmentMinistryName: element.deptMinistryName ? element.deptMinistryName : ''
    }
}

export const setGoiDepartmentMinistryNameMasterObject = (reqObj, MasterDPObj) => {
    return {
        "deptMinistryName":reqObj.departmentMinistryName,
        "deptMinistryGuj":reqObj.departmentMinistryName,
        "effectiveFrmDt": "2014-01-01",
        "effectiveToDt": "2014-01-01"
    }
}

export const updateGoiDepartmentMinistryNameMasterObject = (reqObj, MasterIdObj) => {
    return {
        "id":MasterIdObj,
        "deptMinistryName":reqObj.departmentMinistryName,
        "deptMinistryGuj":reqObj.departmentMinistryName,
        "effectiveFrmDt": "2014-01-01",
        "effectiveToDt": "2014-01-01"
    }
}



//Goi Loan Purpose Master

export const getGoiLoanPurposeMasterObject = (element) => {
    return {
        id: element.id ? element.id:'',
        loanPurpose: element.loanPurpose ? element.loanPurpose : '',
        planSchemeName: element.planSchemeName ? element.planSchemeName : ''
    }
}

export const setGoiLoanPurposeMasterObject = (reqObj, MasterDPObj) => {
    return {

        "loanPurpose": reqObj.loanPurpose,
        "planSchemeName": reqObj.planSchemeName,
        "effectiveFrmDt": "2014-01-01",
        "effectiveToDt": "2014-01-01"
    }
}

export const updateGoiLoanPurposeMasterObject = (reqObj, MasterIdObj) => {
    return {
        "id":MasterIdObj,
        "loanPurpose": reqObj.loanPurpose,
        "planSchemeName": reqObj.planSchemeName,
        "effectiveFrmDt": "2014-01-01",
        "effectiveToDt": "2014-01-01"
    }
}




//Institute Master

export const getInstituteMasterObject = (element) => {
    return {
        id: element.id ? element.id:'',
        nameOfinstitute: element.instituteName ? element.instituteName : ''
    }
}


export const setInstituteMasterObject = (reqObj, MasterDPObj) => {
    return {
    "instituteName":reqObj.nameOfinstitute,
    "effectiveFrmDt": "2013-01-01",
    "effectiveToDt": "2014-01-01"
    }
}

export const updateInstituteMasterObject = (reqObj, MasterIdObj) => {
    return {
        "id":MasterIdObj,
    "instituteName":reqObj.nameOfinstitute,
    "effectiveFrmDt": "2013-01-01",
    "effectiveToDt": "2014-01-01"
    }
}




//Security Master

export const getSecurityMasterObject = (element) => {
    return {
        id: element.id ? element.id:'',
        nameOfSecurity: element.securityName ? element.securityName : ''
    }
}

export const setSecurityMasterObject = (reqObj, MasterDPObj) => {
    return {
    
        "securityName":reqObj.nameOfSecurity,
        "effectiveFrmDt":"2013-01-01",
        "effectiveToDt":"2014-01-01"
    }
}

export const updateSecurityMasterObject = (reqObj, MasterIdObj) => {
    return {
        "id":MasterIdObj,
        "securityName":reqObj.nameOfSecurity,
        "effectiveFrmDt":"2013-01-01",
        "effectiveToDt":"2014-01-01"
    }
}



//Goi Loan Purpose Master

export const getwmaMasterObject = (element) => {
    return {
        id: element.id ? element.id:'',
        wmaType: element.wmaType ? element.wmaType : '',
        limit: element.limit ? element.limit : '',
        roi: element.roi ? element.roi : '',
        startDate: element.startDate ? element.startDate : '',
        endDate: element.endDate ? element.endDate : ''
    }
}

export const setwmaMasterObject = (reqObj, MasterDPObj) => {
    return {

    "wmaType":reqObj.wmaType,
    "wmaLimit":reqObj.wmaLimit,
    "wmaRoi": reqObj.wmaRoi,
    "startFrmDt": "2014-01-01",
    "endToDt":"2015-01-01"
    }
}

export const updatewmaMasterObject = (reqObj, MasterIdObj) => {
    return {
        "id":MasterIdObj,
        "wmaType":reqObj.wmaType,
    "wmaLimit":reqObj.wmaLimit,
    "wmaRoi": reqObj.wmaRoi,
    "startFrmDt": "2014-01-01",
    "endToDt":"2015-01-01"
    }
}