import { RequestTypes } from "src/app/modules/services/doi/api.service";
import { environment } from "src/environments/environment";

export interface urlModel {
    url: string;
    type: RequestTypes;
    mapping_field?: string;
}

export const APIConst = {
    DOI: {
        DIRECT_BUSINESS: {
                COMMON: {
                    GET_DB_PARTY_TYPES: { url: `${environment.baseUrl}doi/db-party-types`, type: RequestTypes.GET },
                    GET_DISTRICT_LIST: { url: `${environment.baseUrl}doi/common-district-list-gujrat`, type: RequestTypes.GET },
                    GET_TALUKA_LIST(districtId: number) { return { url: `${environment.baseUrl}doi/common-taluka-list-by-districtid?pathVariable=`+ districtId, type: RequestTypes.GET} },
                    GET_DB_OFFICE_TYPES: { url: `${environment.baseUrl}doi/db-office-types`, type: RequestTypes.GET },
                    GET_BANK_DETAILS: { url: `${environment.baseUrl}doi/common-bank-list`, type: RequestTypes.GET },
                    GET_BANK_BRANCHES(bankId: number) { return { url: `${environment.baseUrl}doi/common-bank-branch-list?pathVariable=`+bankId, type: RequestTypes.GET} },
                    GET_BANK_BRANCH_TYPES: { url: `${environment.baseUrl}doi/bank-branch-types`, type: RequestTypes.GET },
                    GET_PAYMENT_MODES: { url: `${environment.baseUrl}doi/payment-modes`, type: RequestTypes.GET }
                },
                PARTY_MASTER: {
                    ADD_PARTY_MASTER_ENTRY: { url: `${environment.baseUrl}doi/party-master`, type: RequestTypes.POST },
                    DELETE_PARTY_MASTER_ENTRY(id: number) { return { url: `${environment.baseUrl}doi/party-master-delete?id=`+id, type: RequestTypes.DELETE} },
                    GET_PARTY_MASTER_LISTING: { url: `${environment.baseUrl}doi/party-master-listing`, type: RequestTypes.POST }
                },
                FIRE: {
                    coverIncluded: { url: `${environment.baseUrl}doi/cover-included-basic-cover`, type: RequestTypes.GET, mapping_field: 'coversIncluded' },
                    coverPlinthFoundation: { url: `${environment.baseUrl}doi/cover-plinth-foundation`, type: RequestTypes.GET, mapping_field: 'isCoverPinth', particulars: 'Plinth & Foundation' },
                    architectsConsulting: { url: `${environment.baseUrl}doi/architect-fees`, type: RequestTypes.GET, mapping_field: 'architectFees', particulars: 'Architects consulting & Engineers fee' },
                    debrisRemoval: { url: `${environment.baseUrl}doi/debris-removal`, type: RequestTypes.GET, mapping_field: 'debrisRemvlAmt', particulars: 'Debris Removal' },
                    earthquake: { url: `${environment.baseUrl}doi/cover-earthquake`, type: RequestTypes.GET, mapping_field: 'isEarthquakeCov', particulars: 'Earthquake' },
                    insuredWithOtherInsuranceCo: { url: `${environment.baseUrl}doi/insured-with-other-company`, type: RequestTypes.GET, mapping_field: 'isOthrCompIns' },
                    insuredWithOtherInsuranceCoDeclined: { url: `${environment.baseUrl}doi/insurance-declined-by-other-company`, type: RequestTypes.GET, mapping_field: 'isInsrDeclined' },
                    residenceOfficeShops: { url: `${environment.baseUrl}doi/resi-office-shop-details`, type: RequestTypes.GET, mapping_field: 'isResiOffcShop' },
                    industrialManufacturingRisk: { url: `${environment.baseUrl}doi/industrial-or-manufacturing-risk`, type: RequestTypes.GET, mapping_field: 'anyIndustryRisk' },
                    storageOutsideIndustrialRisk: { url: `${environment.baseUrl}doi/storage-outside-indus-risk`, type: RequestTypes.GET, mapping_field: 'outStorgRisk' },
                    tankGasHolder: { url: `${environment.baseUrl}doi/tank-gas-outside-indus-risk`, type: RequestTypes.GET, mapping_field: 'outGasTanksRisk' },
                    utilities: { url: `${environment.baseUrl}doi/utilities-outside-indus`, type: RequestTypes.GET, mapping_field: 'utilitiesOutRisk' },
                    usedAsShop: { url: `${environment.baseUrl}doi/used-as-shop`, type: RequestTypes.GET, mapping_field: 'isUsedAsShop' },
                    usedAsWarehouse: { url: `${environment.baseUrl}doi/used-as-warehouse-or-godown`, type: RequestTypes.GET, mapping_field: 'usedWarehouseGodwn' },
                    usedAsIndustrialManufacturingUnit: { url: `${environment.baseUrl}doi/used-as-indus-manuf-unit`, type: RequestTypes.GET, mapping_field: 'usedAsIndustry' },
                    fireProtectionDeviceInstalled: { url: `${environment.baseUrl}doi/fire-protect-device-installed`, type: RequestTypes.GET, mapping_field: 'fireProtectDevice' },
                    basicProposedForInsurance: { url: `${environment.baseUrl}doi/basis-proposed-for-insu`, type: RequestTypes.GET, mapping_field: 'basisPropInsur' },
                    marketValueBasis: { url: `${environment.baseUrl}doi/market-value-basis`, type: RequestTypes.GET, mapping_field: 'marketValBasis' },
                    reinstatementValueBasis: { url: `${environment.baseUrl}doi/reinstament-value-basis`, type: RequestTypes.GET, mapping_field: 'reinstatValBasis' },
                    detoriationOfStocks: {url: '', type: undefined, mapping_field: 'coldStrgDetor', particulars: 'Detoriation of Stocks in cold storage premises on account failure due to insured peril'},
                    forestFire: {url: '', type: undefined, mapping_field: 'forestFire', particulars: 'Forest Fire'},
                    vehicleDamageImpact: {url: '', type: undefined, mapping_field: 'vehicleDamage', particulars: 'Impact damage due to Insured own vehicle'},
                    spontaneousCombustion: {url: '', type: undefined, mapping_field: 'spontCombustion', particulars: 'Spontaneous Combustion'},
                    omission: {url: '', type: undefined, mapping_field: 'ommissionAddtn', particulars: 'Omission to Insure aditions alteration extension'},
                    age_of_building_list: { url: `${environment.baseUrl}doi/age-of-building-list`, type: RequestTypes.GET, mapping_field: 'buildingAgeId' },
                    floaterBasis: { url: `${environment.baseUrl}doi/floater-basis`, type: RequestTypes.GET, mapping_field: 'isFloaterBasis', particulars: 'Stocks Floater Basis'},
                    declarationBasis: { url: '', type: RequestTypes.GET, mapping_field: 'isDeclaraeBasis', particulars: 'Stocks Declaration Basis'},
                    floaterDeclarationBasis: { url: '', type: RequestTypes.GET, mapping_field: 'isFloatDecBasis', particulars: 'Stocks Floater Declaration Basis'},
                    stocksStoredInOpen: { url: `${environment.baseUrl}doi/stock-stored-in-open`, type: RequestTypes.GET, mapping_field: 'isStockStorOpen', particulars: 'Stocks in Open-outside factory compound' },
                    db_ri_required: { url: `${environment.baseUrl}doi/db-ri-required`, type: RequestTypes.GET, mapping_field: 'isRiReqd' },
                    CREATE_PROPOSAL: { url: `${environment.baseUrl}doi/db/standard-fire-proposal-entry`, type: RequestTypes.POST},
                    CREATE_POLICY: { url: `${environment.baseUrl}doi/db/standard-fire-policy-entry`, type: RequestTypes.POST},
                },
                MONEY: {
                    CREATE_PROPOSAL: { url: `${environment.baseUrl}doi/db/money-in-transit-proposal-entry`, type: RequestTypes.POST},
                    CREATE_POLICY: { url: `${environment.baseUrl}doi/db/money-in-transit-policy-entry`, type: RequestTypes.POST},
                }
        }
    }
}