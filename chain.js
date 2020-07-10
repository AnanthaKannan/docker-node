// @ts-check

const datafn = require('./myfn')
const DateDiff = require('date-diff');

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
        let isObc = true;
        try{
            let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'OBC_certificate');
            const cert_no = cert.CERTIFICATE_NUMBER;
            console.log(cert_no)
        }
        catch(e){
            isObc = false
        }

        const finalJson = await this.buildFinalJson({applicationData, income, nativity, hsc, first_graduate, community, obc, isObc})

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

        if(Object.keys(NativityData).length < 1)
            return {}

        NativityData.NATIONALITY = 'Indian';
        NativityData.NATIVITY = 'Tamil Nadu';
        const checkKeys = ['NAME', 'NATIONALITY', 'NATIVITY', 'STUDENT_STUDIED', 'DISTRICT', 'STATE', 
        'PARENT_NAME', 'PINCODE'] 
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

        if(Object.keys(incomeData).length < 1) return {}

        const checkKeys = ['PARENT_NAME', 'PARENT_OCCUPATION', 'ANNUAL_INCOME', 'DISTRICT', 'PINCODE']
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
        if(Object.keys(incomeData).length < 1) return {}
        const checkKeys = ['NAME','PARENT_NAME', 'PINCODE']
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

        if(Object.keys(incomeData).length < 1) return {}
        const checkKeys = ['NAME', 'RELIGION', 'GENDER', 'COMMUNITY', 'DISTRICT', 'PARENT_NAME', 'CASTE', 'PINCODE']
         
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
        if(Object.keys(incomeData).length < 1) return {}
        const checkKeys = ['NAME', 'COMMUNITY', 'DISTRICT', 'PARENT_NAME', 'CASTE', 'PINCODE', 'RELIGION']

        // if the community is obc, then only need to check the OBC data is avaliable or not 
        if(applicationData.COMMUNITY && applicationData.COMMUNITY.trim().toLowerCase()  === 'obc'){
            let keys = Object.keys(incomeData);
            if(keys.length > 0)
                incomeData.COMMUNITY = 'obc'
        }
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
        if(Object.keys(incomeData).length < 1) return {}
        const checkKeys = ['NAME', 'DOB', 'COMMUNITY', 'RELIGION', 'GENDER', 'CASTE', 'YEAR_OF_PASSING',
        'OPTIONAL', 'QUALIFICATION_EXAMINATION', 'BOARD_OD_EXAMINATION', 
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
        let failed = { Verification_result: 'failed' }
        const success = { Verification_result: 'success' }
        // const empty_res = { Verification_result: 'empty_res' }

        // if(Object.keys(incomeData).length < 1)
        //     failed = empty_res

        checkKeys.forEach((checkKey) => {
            let incomeDataKey = checkKey;

            // #nativity #income
            // key change in income
            if (from === 'income') {
                if(checkKey === 'PARENT_NAME') incomeDataKey = 'APPLICANTNAME';
                else if(checkKey === 'PARENT_OCCUPATION') incomeDataKey = 'OCCUPATION';
                else if(checkKey === 'ANNUAL_INCOME') incomeDataKey = 'ANNUALINCOME';
            } 
            else if (from === 'nativity') {
             // fatherhubandname, mothersname
             if(checkKey === 'NAME') incomeDataKey = 'APPLICANTNAME';
             else if(checkKey === 'PARENT_NAME') incomeDataKey = 'FATHERHUSNAME';
            }

            else if (from === 'first_graduate') {
                if(checkKey === 'NAME') incomeDataKey = 'APPLICANTNAME';
                else if(checkKey === 'PARENT_NAME') incomeDataKey = 'FATHERHUSNAME';
            }

            else if (from === 'hsc') {
                if(checkKey === 'COMMUNITY') incomeDataKey = 'Community';
                else if(checkKey === 'RELIGION') incomeDataKey = 'Religion';
                else if(checkKey === 'GROUP_CODE') incomeDataKey = 'group_code';
                else if(checkKey === 'PHYSICS_MARKS_OBTAINED') incomeDataKey = 'physics';
                else if(checkKey === 'CHEMISTRY_MARKS_OBTAINED') incomeDataKey = 'chemistry';
                else if(checkKey === 'MATHS_MARKS_OBTAINED') incomeDataKey = 'Maths';
            }

             else if (from === 'community' || from === 'obc') {
                if(checkKey === 'NAME') incomeDataKey = 'APPLICANTNAME';
                else if(checkKey === 'PARENT_NAME') incomeDataKey = 'FATHERHUSNAME';
            }

            const incomeValue = incomeData[incomeDataKey];
            const applicationValue = applicationData[checkKey];
            // console.log(checkKey, incomeValue, applicationValue)

            if (!incomeValue || !applicationValue)
                status[checkKey] = failed
            else {
                if (incomeValue.toString().trim().toLowerCase() === applicationValue.toString().trim().toLowerCase())
                    status[checkKey] = success
                else
                    status[checkKey] = failed
            }
        })
        console.log(status)
        return status
    }

    async buildFinalJson(allVerifyResult) {

        // if you are add the data here, the you should add the condition in compare with bellow, otherwise throw error
        const verify = ['NAME','PARENT_NAME', 'DISTRICT', 'STATE', 
        'PARENT_OCCUPATION', 'ANNUAL_INCOME', 'NATIVITY', 'GENDER', 'NATIONALITY', 
        'CASTE', 'COMMUNITY', 'HSC_REGISTER_NO', 'GROUP_CODE', 
        'PINCODE', 'DOB', 'RELIGION',
        'MATHS_MARKS_OBTAINED', 'PHYSICS_MARKS_OBTAINED', 'CHEMISTRY_MARKS_OBTAINED',
        'PERMANENT_ADDRESS', 'CIVIC_STATUS', 'AADHAR',
        'YEAR_OF_PASSING', 'OPTIONAL', 'QUALIFICATION_EXAMINATION', 'BOARD_OD_EXAMINATION',
        ]



        let verification_status = [];
        verify.forEach((key) => {

            // console.log(income, nativity)
            const finalStatus = this.compareWith(allVerifyResult, key) //[income, nativity];
            console.log(key, finalStatus)
            let verification_remarks = "";
            let verified_flag;

            if(finalStatus.length < 1){
                verified_flag = verification_remarks = null
            }
            else if (finalStatus.every((obj) => obj.Verification_result === 'success') === true) {
                verification_remarks = 'all certificate successfully matched'
                verified_flag = 'green'
            } else if (finalStatus.every((obj) => obj.Verification_result === 'failed') === true) {
                verification_remarks = 'does not match any of the verification data.'
                verified_flag = 'red'
            } 
            else {
                let remark = ''
                verified_flag = 'amber'
                finalStatus.forEach((obj, index) => {
                    if (obj.Verification_result === 'failed')
                        remark += `${key} doesn’t match against ${obj.verify} Certificate, `
                    if (obj.Verification_result === 'empty_res')
                        remark += `${key} verification data could not complete hence ${obj.verify} data is not there, `
                });

                if (finalStatus.every((obj) => obj.Verification_result === 'empty_res') === true) 
                    verified_flag = 'red'
                
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

     compareWith({applicationData, income, nativity, hsc, first_graduate, community, obc, isObc}, key){

        

        const income_ = { verify: 'income' }
        income_.Verification_result = income[key] ? income[key]['Verification_result']: 'failed';
        if(Object.keys(income).length < 1) income_.Verification_result = 'empty_res'
        if(!applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'income'))
            income_.Verification_result = 'success'

        const nativity_ = { verify: 'nativity' }
        nativity_.Verification_result = nativity[key] ? nativity[key]['Verification_result'] : 'failed';
        if(Object.keys(nativity).length < 1) nativity_.Verification_result = 'empty_res'
        if(!applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'nativity_certificate'))
            nativity_.Verification_result = 'success'
        
        const hsc_ = { verify: 'hsc' }
        hsc_.Verification_result = hsc[key] ? hsc[key]['Verification_result'] : 'failed';
        if(Object.keys(hsc).length < 1) hsc_.Verification_result = 'empty_res'
        if(!applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'hsc'))
            hsc_.Verification_result = 'success'

        const first_graduate_ = { verify: 'first_graduate' }
        first_graduate_.Verification_result = first_graduate[key] ? first_graduate[key]['Verification_result'] : 'failed';
        if(Object.keys(first_graduate).length < 1) first_graduate_.Verification_result = 'empty_res'
        if(!applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'NoGraduate Certificate'))
            first_graduate_.Verification_result = 'success'

        const community_ = { verify: 'community' }
        community_.Verification_result = community[key] ? community[key]['Verification_result'] : 'failed';
        if(Object.keys(community).length < 1) community_.Verification_result = 'empty_res'
        if(!applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'community_certificate'))
            community_.Verification_result = 'success'

        const obc_ = { verify: 'obc' }
        obc_.Verification_result = obc[key] ? obc[key]['Verification_result'] : 'failed';
        if(Object.keys(obc).length < 1) obc_.Verification_result = 'empty_res'
        if(!applicationData.cert.find((obj) => obj.CERTIFICATE_NAME === 'OBC_certificate'))
            obc_.Verification_result = 'success'

        // check obc or community
        let anyOne = community_;
        if(isObc)
            anyOne = obc_;

        if(key === 'NAME') return [anyOne, nativity_, first_graduate_, hsc_];
        else if(key === 'PARENT_NAME') return [income_, nativity_, first_graduate_, anyOne];
        else if(key === 'DISTRICT') return [nativity_, anyOne];
        else if(key === 'STATE') return [nativity_];
        else if(key === 'PARENT_OCCUPATION') return [income_];
        else if(key === 'ANNUAL_INCOME') return [income_];
        else if(key === 'NATIVITY') return [nativity_];
        else if(key === 'GENDER') return [anyOne, hsc_];
        else if(key === 'NATIONALITY') return [nativity_];
        else if(key === 'CASTE') return [anyOne];
        else if(key === 'COMMUNITY') return [anyOne];
        else if(key === 'PINCODE') return [income_, nativity_, first_graduate_, anyOne]
        else if(key === 'RELIGION') return [hsc_, anyOne]

        else if(key === 'HSC_REGISTER_NO' 
        || key === 'GROUP_CODE'
        || key === 'MATHS_MARKS_OBTAINED'
        || key === 'PHYSICS_MARKS_OBTAINED'
        || key === 'CHEMISTRY_MARKS_OBTAINED'
        || key === 'DOB'
        || key === 'YEAR_OF_PASSING'
        || key === 'OPTIONAL'
        || key === 'QUALIFICATION_EXAMINATION'
        || key === 'BOARD_OD_EXAMINATION') return [hsc_];

        else if(key === 'PERMANENT_ADDRESS' || key === 'CIVIC_STATUS' || key === 'AADHAR') 
        return []
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