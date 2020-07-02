// @ts-check

const datafn = require('./myfn')

class DoVerification {

    async Verification(ctx, applicationData) {
        console.log('init Verification');
        applicationData = JSON.parse(applicationData)
        const income_ = await this.verifyIncome(ctx, applicationData);
        const income_cert_no_key = Object.keys(income_)[0]  // TN123_INCOME
        let income = income_[income_cert_no_key] 
        if(!income_cert_no_key)
            income ={}

        const nativity_ = await this.verifyNativity(ctx, applicationData);
        const nativity_cert_no_key = Object.keys(nativity_)[0]  // TN123_nativity
        let nativity = nativity_[nativity_cert_no_key] 
        if(!nativity_cert_no_key)
            nativity = {}

        const hsc_ = await this.verifyHSC(ctx, applicationData);
        const hsc_cert_no_key = Object.keys(hsc_)[0]  // TN123_nativity
        let hsc = hsc_[hsc_cert_no_key] 
        if(!hsc_cert_no_key)
            hsc = {}

        const first_graduate_ = await this.verifyFirstGraduate(ctx, applicationData);
        const first_graduate_cert_no_key = Object.keys(first_graduate_)[0]  // TN123_nativity
        let first_graduate = first_graduate_[first_graduate_cert_no_key] 
        if(!first_graduate_cert_no_key)
            first_graduate = {}

        const community_ = await this.verifyCommunity(ctx, applicationData);
        const community_cert_no_key = Object.keys(community_)[0]  // TN123_nativity
        let community = community_[community_cert_no_key] 
        if(!community_cert_no_key)
            community = {}

        const obc_ = await this.verifyOBC(ctx, applicationData);
        const obc_cert_no_key = Object.keys(obc_)[0]  // TN123_nativity
        let obc = obc_[obc_cert_no_key] 
        if(!obc_cert_no_key)
            obc = {}

        // console.log('income_',income_)
        // console.log('nativity_', nativity_)

        const finalJson = await this.buildFinalJson({income, nativity, hsc, first_graduate, community, obc})
        applicationData.verification_status = finalJson;

        applicationData.Created_at = {
            'income_certificate_Created_at': income && income.Created_at,
            'nativity_certificate_Created_at': nativity && nativity.Created_at,
            'community_certificate_Created_at': community && community.Created_at,
            'OBC_certificate_Created_at': obc && obc.Created_at,
            'first_graduate_certificate_Created_at': first_graduate && first_graduate.Created_at,
            'HSC_certificate_Created_at': hsc && hsc.Created_at
        }

        // console.log('Created_at', applicationData.Created_at)

        let APPLICATION_NUMBER = applicationData.APPLICATION_NUMBER
        applicationData = { [APPLICATION_NUMBER]: applicationData }
        // console.log(finalJson)
        const finalData = [applicationData, income_, nativity_, hsc_, first_graduate_, community_, obc_]
        // console.log(finalData)
        return JSON.stringify(finalData) 
    }


    async verifyNativity(ctx, applicationData) {
        try{
        console.info('init verifyNativity');
        let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'nativity_certificate');
        const nativity_cert_no = `${cert.CERTIFICATE_NUMBER}_nativity`
        console.log(nativity_cert_no)
        const CC_NAME = "nativity"
        // let results = await ctx.stub.invokeChaincode(CC_NAME, ['checkAvailability', 'TN12345_income']);
     
        let result = await datafn.nativity(nativity_cert_no)
        // let json = JSON.stringify(results.payload);
        // let bufferOriginal = Buffer.from(JSON.parse(json).data);
        // let data = bufferOriginal.toString('utf8');
        // console.info('mydata', JSON.parse(data))
        // console.info('address', JSON.parse(data).address)

        let NativityData = result;
        NativityData.NATIONALITY = 'Indian';
        NativityData.NATIVITY = 'Tamil Nadu';
        const checkKeys = ['NAME', 'NATIONALITY', 'NATIVITY', 'STUDENT_STUDIED', 'DISTRICT', 'STATE', 'PARENT_NAME'] 
        const verifyResult = await this.compare(checkKeys, applicationData, NativityData, 'nativity')
        verifyResult.Created_at = NativityData.Created_at;
        

        // only for this exception
        verifyResult.STUDIED_IN_TAMILNADU = { Verification_result: 'success' }
        const STUDIED_IN_TAMILNADU = applicationData.STUDIED_IN_TAMILNADU;
        if(!STUDIED_IN_TAMILNADU || (STUDIED_IN_TAMILNADU && STUDIED_IN_TAMILNADU.trim().toLowerCase() === 'no')){
                verifyResult.STUDIED_IN_TAMILNADU = { Verification_result: 'failed' }
             }

        // return verifyResult
        return { [nativity_cert_no]:verifyResult }
        }
        catch(e){
            console.log(e)
            return {}
        }
    }

    async verifyIncome(ctx, applicationData) {
        try{
        console.info('init verifyIncome');
        let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'income');
        const income_cert_no = `${cert.CERTIFICATE_NUMBER}_income`
        console.log(income_cert_no)

        const CC_NAME = "income"
        // let results = await ctx.stub.invokeChaincode(CC_NAME, ['checkAvailability', 'TN12345_income']);
        let result = await datafn.income(income_cert_no)
        let incomeData = result
        const checkKeys = ['PARENT_NAME', 'PARENT_OCCUPATION', 'ANNUAL_INCOME']
        const verifyResult = await this.compare(checkKeys, applicationData, incomeData, 'income')
        verifyResult.Created_at = incomeData.Created_at
        // return verifyResult

        return { [income_cert_no]:verifyResult }
        // console.log(verifyResult)
    }   
    catch(e){
                console.log(e)
                return {}
            }
    }

    async verifyFirstGraduate(ctx, applicationData) {
        try{
        console.info('init verifyFirstGraduate');
        let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'NoGraduate Certificate');
        const first_graduate_cert_no = `${cert.CERTIFICATE_NUMBER}_firstgraduate`
        console.log(first_graduate_cert_no)
        // console.info('data', applicationData)
        const CC_NAME = "firstgraduate"
        let result = await datafn.first_graduate(first_graduate_cert_no) //await ctx.stub.invokeChaincode(CC_NAME, ['checkAvailability', 'TN12345_income']);
        let incomeData = result
        const checkKeys = ['NAME','PARENT_NAME']
        const verifyResult = await this.compare(checkKeys, applicationData, incomeData, 'first_graduate')
        verifyResult.Created_at = incomeData.Created_at
        // return verifyResult

        // exception case
        verifyResult.FIRST_GRADUATE_SCHOLARSHIP = { Verification_result: 'success' }
        const FIRST_GRADUATE_SCHOLARSHIP = applicationData.FIRST_GRADUATE_SCHOLARSHIP;
        if(!FIRST_GRADUATE_SCHOLARSHIP || (FIRST_GRADUATE_SCHOLARSHIP && FIRST_GRADUATE_SCHOLARSHIP.trim().toLowerCase() === 'no')){
                verifyResult.FIRST_GRADUATE_SCHOLARSHIP = { Verification_result: 'failed' }
             }

        return { [first_graduate_cert_no]:verifyResult }
    }   
    catch(e){
                console.log(e)
                return {}
            }
    }

    async verifyCommunity(ctx, applicationData) {
        try{
        console.info('init verifyCommunity');
        let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'community_certificate');
        const community_cert_no = `${cert.CERTIFICATE_NUMBER}_community`
        console.log(community_cert_no)
        // console.info('data', applicationData)
        const CC_NAME = "community"
        let result = await datafn.community(community_cert_no) //await ctx.stub.invokeChaincode(CC_NAME, ['checkAvailability', 'TN12345_income']);
        let incomeData = result
        const checkKeys = ['NAME', 'RELIGION', 'GENDER', 'COMMUNITY', 'DISTRICT', 'STATE', 'PARENT_NAME', 'CASTE']
        const verifyResult = await this.compare(checkKeys, applicationData, incomeData, 'community')
        verifyResult.Created_at = incomeData.Created_at
        // return verifyResult

        return { [community_cert_no]:verifyResult }
    }   
    catch(e){
                console.log(e)
                return {}
            }
    }

    async verifyOBC(ctx, applicationData) {
        try{
        console.info('init verifyOBC');
        let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'OBC_certificate');
        const obc_cert_no = `${cert.CERTIFICATE_NUMBER}_obc`
        console.log(obc_cert_no)

        const CC_NAME = "obc"
        let result = await datafn.obc(obc_cert_no) //await ctx.stub.invokeChaincode(CC_NAME, ['checkAvailability', 'TN12345_income']);
        let incomeData = result
        const checkKeys = ['NAME', 'COMMUNITY', 'DISTRICT', 'STATE', 'PARENT_NAME', 'CASTE']
        const verifyResult = await this.compare(checkKeys, applicationData, incomeData, 'obc')
        verifyResult.Created_at = incomeData.Created_at
        // return verifyResult
        return { [obc_cert_no]:verifyResult }
        }
        catch(e){
            console.log(e)
            return {}
        }
    }

    async verifyHSC(ctx, applicationData) {
    try{
        let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'hsc');
        const hsc_cert_no = `${cert.CERTIFICATE_NUMBER}_hsc`
        console.log(hsc_cert_no)
        
        console.info('init verifyHSC');
        const CC_NAME = "hsc"
        let result = await datafn.hsc(hsc_cert_no) //await ctx.stub.invokeChaincode(CC_NAME, ['checkAvailability', 'TN12345_income']);
        let incomeData = result
        const checkKeys = ['ROLLNO', 'DOB', 'COMMUNITY', 'RELIGION', 
        'GROUP_CODE', 'PHYSICS_MARKS_OBTAINED', 'CHEMISTRY_MARKS_OBTAINED', 'MATHS_MARKS_OBTAINED']

        const verifyResult = await this.compare(checkKeys, applicationData, incomeData, 'hsc')
        verifyResult.Created_at = incomeData.Created_at
        // return verifyResult

        return { [hsc_cert_no]:verifyResult }
    }   
    catch(e){
                console.log(e)
                return {}
            }
    }



    async compare(checkKeys, applicationData, incomeData, from) {
        let status = {}
        const failed = { Verification_result: 'failed' }
        const success = { Verification_result: 'success' }

        checkKeys.forEach((checkKey) => {
            let incomeDataKey = checkKey;

            // #nativity #income
            // key change in income
            if (from === 'income') {
                (checkKey === 'PARENT_NAME') ? incomeDataKey = 'FATHERHUSNAME': '';
                (checkKey === 'PARENT_OCCUPATION') ? incomeDataKey = 'OCCUPATION': '';
                (checkKey === 'ANNUAL_INCOME') ? incomeDataKey = 'ANNUALINCOME': '';
            } 
            else if (from === 'nativity') {
             // fatherhubandname, mothersname
             (checkKey === 'NAME') ? incomeDataKey = 'APPLICANTNAME': '';
             (checkKey === 'PARENT_NAME') ? incomeDataKey = 'FATHERHUSNAME': '';
            }

            else if (from === 'first_graduate') {
                (checkKey === 'NAME') ? incomeDataKey = 'APPLICANTNAME': '';
                (checkKey === 'PARENT_NAME') ? incomeDataKey = 'FATHERHUSNAME': '';
            }

            else if (from === 'hsc') {
                (checkKey === 'COMMUNITY') ? incomeDataKey = 'Community': '';
                (checkKey === 'RELIGION') ? incomeDataKey = 'Religion': '';
                (checkKey === 'GROUP_CODE') ? incomeDataKey = 'group_code': '';
                (checkKey === 'PHYSICS_MARKS_OBTAINED') ? incomeDataKey = 'physics': '';
                (checkKey === 'CHEMISTRY_MARKS_OBTAINED') ? incomeDataKey = 'chemistry': '';
                (checkKey === 'MATHS_MARKS_OBTAINED') ? incomeDataKey = 'Maths': '';
            }

             else if (from === 'community' || from === 'obc') {
                (checkKey === 'NAME') ? incomeDataKey = 'APPLICANTNAME': '';
                (checkKey === 'PARENT_NAME') ? incomeDataKey = 'FATHERHUSNAME': '';
            }

            const incomeValue = incomeData[incomeDataKey];
            const applicationValue = applicationData[checkKey];
            // console.log(checkKey, incomeValue, applicationValue)
            if (!incomeValue || !applicationValue)
                status[checkKey] = failed
            else {
                if (incomeValue.trim().toLowerCase() === applicationValue.trim().toLowerCase())
                    status[checkKey] = success
                else
                    status[checkKey] = failed
            }
        })
        // console.log(status)
        return status
    }

    async buildFinalJson(allVerifyResult) {

        // if you are add the data here, the you should add the condition in compare with bellow, otherwise throw error
        const verify = ['NAME','PARENT_NAME', 'DISTRICT', 'STATE', 
        'PARENT_OCCUPATION', 'ANNUAL_INCOME', 'NATIVITY', 'GENDER', 'NATIONALITY', 
        'CASTE', 'COMMUNITY', 'HSC_REGISTER_NO', 'GROUP_CODE', 
        
        'MATHS_MARKS_OBTAINED', 'PHYSICS_MARKS_OBTAINED', 'CHEMISTRY_MARKS_OBTAINED']

        let verification_status = [];
        verify.forEach((key) => {

            // console.log(income, nativity)
            const finalStatus = this.compareWith(allVerifyResult, key) //[income, nativity];
            console.log(key, finalStatus)
            let verification_remarks = "";
            let verified_flag;
            if (finalStatus.every((obj) => obj.Verification_result === 'success') === true) {
                verification_remarks = 'all certificate successfully matched'
                verified_flag = 'green'
            } else if (finalStatus.every((obj) => obj.Verification_result === 'failed') === true) {
                verification_remarks = 'all certificate are not matched'
                verified_flag = 'red'
            } else {
                let remark = ''
                verified_flag = 'amber'
                finalStatus.forEach((obj, index) => {
                    if (obj.Verification_result === 'failed')
                        remark += `${key} doesn’t match against ${obj.verify} Certificate, `
                });
                verification_remarks = remark;
            }
            verification_status.push({
                [key]: {
                    verification_remarks,
                    verified_flag
                }
            })
        })
        // console.log(verification_status);
        return verification_status
    }

     compareWith({income, nativity, hsc, first_graduate, community, obc}, key){

        const income_ = { verify: 'income' }
        income_.Verification_result = income[key] ? income[key]['Verification_result']: 'success';

        const nativity_ = { verify: 'nativity' }
        nativity_.Verification_result = nativity[key] ? nativity[key]['Verification_result'] : 'success';
        
        const hsc_ = { verify: 'hsc' }
        hsc_.Verification_result = hsc[key] ? hsc[key]['Verification_result'] : 'success';

        const first_graduate_ = { verify: 'first_graduate' }
        first_graduate_.Verification_result = first_graduate[key] ? first_graduate[key]['Verification_result'] : 'success';

        const community_ = { verify: 'community' }
        community_.Verification_result = community[key] ? community[key]['Verification_result'] : 'success';

        const obc_ = { verify: 'obc' }
        obc_.Verification_result = obc[key] ? obc[key]['Verification_result'] : 'success';

        if(key === 'NAME') return [community_, nativity_, first_graduate_, obc_, hsc_];
        if(key === 'PARENT_NAME') return [income_, community_, nativity_, first_graduate_, obc_];
        if(key === 'DISTRICT') return [community_, nativity_, obc_];
        if(key === 'STATE') return [nativity_];
        if(key === 'PARENT_OCCUPATION') return [income_];
        if(key === 'ANNUAL_INCOME') return [income_];
        if(key === 'NATIVITY') return [nativity_];
        if(key === 'GENDER') return [community_, hsc_];
        if(key === 'NATIONALITY') return [nativity_];
        if(key === 'CASTE') return [community_];
        if(key === 'COMMUNITY') return [community_];
        if(key === 'HSC_REGISTER_NO') return [hsc_];
        if(key === 'GROUP_CODE') return [hsc_];
        if(key === 'MATHS_MARKS_OBTAINED') return [hsc_]
        if(key === 'PHYSICS_MARKS_OBTAINED') return [hsc_]
        if(key === 'CHEMISTRY_MARKS_OBTAINED') return [hsc_]
        
    }
}


async function callData(){
    console.log('eeeeeeee')
const result = new DoVerification()
const application_data = datafn.applicationData()

 const retdata = await result.Verification('ctx', JSON.stringify(application_data))

return JSON.parse(retdata) 
}

module.exports = {
    callData
}