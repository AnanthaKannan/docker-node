const { checkAvailability } = require('./myfn')

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

        // console.log(income_)
        // console.log(nativity_)

        const finalJson = await this.buildFinalJson({income, nativity, hsc, first_graduate, community, obc})
        applicationData.verification_status = finalJson;
        let APPLICATION_NUMBER = applicationData.APPLICATION_NUMBER
        applicationData = { [APPLICATION_NUMBER]: applicationData }
        // console.log(finalJson)
        const finalData = [applicationData, income_, nativity_, hsc_, first_graduate_, community_, obc_]
        console.log(finalData)
        return JSON.stringify(finalData)
    }


    async verifyNativity(ctx, applicationData) {
        console.info('init verifyNativity');
        let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_TYPE === 'nativity');
        const nativity_cert_no = `${cert.CERTIFICATE_NUMBER}_nativity`
        console.log(nativity_cert_no)
        const CC_NAME = "nativity"
        // let results = await ctx.stub.invokeChaincode(CC_NAME, ['checkAvailability', 'TN12345_income']);
     
        let result = await checkAvailability(nativity_cert_no)
        // let json = JSON.stringify(results.payload);
        // let bufferOriginal = Buffer.from(JSON.parse(json).data);
        // let data = bufferOriginal.toString('utf8');
        // console.info('mydata', JSON.parse(data))
        // console.info('address', JSON.parse(data).address)

        let NativityData = result
        const checkKeys = ['NAME', 'NATIONALITY', 'NATIVITY', 'STUDENT_STUDIED', 'DISTRICT', 'STATE', 'PARENT_NAME'] 
        const verifyResult = await this.compare(checkKeys, applicationData, NativityData, 'nativity')
        verifyResult.date_created = "03-01-03"

        // return verifyResult
        const nativity_cert_key = `${nativity_cert_no}_verify`
        return { [nativity_cert_key]:verifyResult }
    }

    async verifyIncome(ctx, applicationData) {
        console.info('init verifyIncome');
        let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_TYPE === 'income');
        const income_cert_no = `${cert.CERTIFICATE_NUMBER}_income`
        console.log(income_cert_no)

        const CC_NAME = "income"
        // let results = await ctx.stub.invokeChaincode(CC_NAME, ['checkAvailability', 'TN12345_income']);
        let result = await checkAvailability(income_cert_no)
        let incomeData = result
        const checkKeys = ['PARENT_NAME', 'PARENT_OCCUPATION', 'ANNUAL_INCOME']
        const verifyResult = await this.compare(checkKeys, applicationData, incomeData, 'income')
        verifyResult.date_created = "03-01-03"
        // return verifyResult

        const income_cert_key = `${income_cert_no}_income`
        return { [income_cert_key]:verifyResult }
        // console.log(verifyResult)
    }

    async verifyFirstGraduate(ctx, applicationData) {
        console.info('init verifyFirstGraduate');
        let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_TYPE === 'firstgraduate');
        const first_graduate_cert_no = `${cert.CERTIFICATE_NUMBER}_firstgraduate`
        console.log(first_graduate_cert_no)
        // console.info('data', applicationData)
        const CC_NAME = "firstgraduate"
        let result = await checkAvailability(first_graduate_cert_no) //await ctx.stub.invokeChaincode(CC_NAME, ['checkAvailability', 'TN12345_income']);
        let incomeData = result
        const checkKeys = ['PARENT_NAME', 'PARENT_OCCUPATION', 'ANNUAL_INCOME']
        const verifyResult = await this.compare(checkKeys, applicationData, incomeData, 'first_graduate')
        verifyResult.date_created = "03-01-03"
        // return verifyResult

        const first_graduate_cert_key = `${first_graduate_cert_no}_first_graduate`
        return { [first_graduate_cert_key]:verifyResult }
    }

    async verifyCommunity(ctx, applicationData) {
        console.info('init verifyCommunity');
        let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_TYPE === 'community');
        const community_cert_no = `${cert.CERTIFICATE_NUMBER}_community`
        console.log(community_cert_no)
        // console.info('data', applicationData)
        const CC_NAME = "community"
        let result = await checkAvailability(community_cert_no) //await ctx.stub.invokeChaincode(CC_NAME, ['checkAvailability', 'TN12345_income']);
        let incomeData = result
        const checkKeys = ['PARENT_NAME', 'PARENT_OCCUPATION', 'ANNUAL_INCOME']
        const verifyResult = await this.compare(checkKeys, applicationData, incomeData, 'community')
        verifyResult.date_created = "03-01-03"
        // return verifyResult

        const community_cert_key = `${community_cert_no}_community`
        return { [community_cert_key]:verifyResult }
    }

    async verifyOBC(ctx, applicationData) {
        return {}
        console.info('init verifyOBC');
        let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_TYPE === 'community');
        const obc_cert_no = `${cert.CERTIFICATE_NUMBER}_community`
        console.log(obc_cert_no)

        const CC_NAME = "community"
        let result = await checkAvailability(obc_cert_no) //await ctx.stub.invokeChaincode(CC_NAME, ['checkAvailability', 'TN12345_income']);
        let incomeData = result
        const checkKeys = ['PARENT_NAME', 'PARENT_OCCUPATION', 'ANNUAL_INCOME']
        const verifyResult = await this.compare(checkKeys, applicationData, incomeData, 'obc')
        verifyResult.date_created = "03-01-03"
        // return verifyResult

        const obc_cert_key = `${obc_cert_no}_obc`
        return { [obc_cert_key]:verifyResult }
    }

    async verifyHSC(ctx, applicationData) {

        let cert = applicationData.cert.find((obj) => obj.CERTIFICATE_TYPE === 'hsc');
        const hsc_cert_no = `${cert.CERTIFICATE_NUMBER}_hsc`
        console.log(hsc_cert_no)
        
        console.info('init verifyHSC');
        const CC_NAME = "hsc"
        let result = await checkAvailability(hsc_cert_no) //await ctx.stub.invokeChaincode(CC_NAME, ['checkAvailability', 'TN12345_income']);
        let incomeData = result
        const checkKeys = ['PARENT_NAME', 'PARENT_OCCUPATION', 'ANNUAL_INCOME']
        const verifyResult = await this.compare(checkKeys, applicationData, incomeData, 'hsc')
        verifyResult.date_created = "03-01-03"
        // return verifyResult

        const hsc_cert_key = `${hsc_cert_no}_hsc`
        return { [hsc_cert_key]:verifyResult }
    }



    async compare(checkKeys, applicationData, incomeData, from) {
        let status = {}
        const failed = { Verification_result: 'failed' }
        const success = { Verification_result: 'success' }

        checkKeys.forEach((checkKey) => {
            let incomeDataKey = checkKey;

            // #nativity #income
            // key change in income
            if(from === 'income'){
                (checkKey === 'PARENT_NAME') ? incomeDataKey = 'name':''; 
            }
            else if(from === 'nativity'){

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

        const verify = ['NAME','PARENT_NAME', 'DISTRICT', 'STATE', 
        'PARENT_OCCUPATION', 'ANNUAL_INCOME', 'NATIVITY', 'GENDER', 'NATIONALITY', 
        'CASTE', 'COMMUNITY', 'HSC_REGISTER_NO', 'GROUP_CODE']

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
                        remark += `${key} ${obj.verify} application not match`
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
        
    }
}



const result = new DoVerification()
const application_data = {
    "APPLICATION_NUMBER": "1234",
    "cert": [{
        "CERTIFICATE_TYPE": "income",
        "CERTIFICATE_NUMBER": "TN1234"
    },
    {
        "CERTIFICATE_TYPE": "community",
        "CERTIFICATE_NUMBER": "TN7890"
    },
    {
        "CERTIFICATE_TYPE": "firstgraduate",
        "CERTIFICATE_NUMBER": "TN7890"
    },
    {
        "CERTIFICATE_TYPE": "hsc",
        "CERTIFICATE_NUMBER": "TN7890"
    },
    {
        "CERTIFICATE_TYPE": "nativity",
        "CERTIFICATE_NUMBER": "TN45678"
    }],
    "NAME": "abc",
    "PARENT_NAME": "abc",
    "PERMANENT_ADDRESS": "xyz",
    "DISTRICT": "chennai",
    "STATE": "chennai",
    "PINCODE": 600091,
    "CIVIC_STATUS": "en",
    "NATIVE_DISTRICT": "chennai",
    "DOB": "YYYY-MM-DD",
    "GENDER": "male",
    "NATIONALITY": "Indian",
    "NATIVITY": "TN",
    "RELIGION": "H/M/C",
    "COMMUNITY": "BC",
    "CASTE": "gja",
    "AADHAR": "dav5465435",
    "MOTHER_TONGUE": "jhacv",
    "ELIGIBILITY_TYPE": "bhba42",
    "PARENT_OCCUPATION": "sbhjvbs",
    "ANNUAL_INCOME": "1000000",
    "QUALIFYING_EXAM": "vdhjva",
    "NAME_OF_BOARD": "vjadvc",
    "HSC_REGISTER_NO": "gd3663",
    "QUALIFIED_YEAR": "2020",
    "HSC_GROUP": "gaad",
    "GROUP_CODE": "991",
    "MEDIUM_OF_INSTRUCTION": "en",
    "MATHS_MARKS_OBTAINED": "80",
    "PHYSICS_MARKS_OBTAINED": "80",
    "CHEMISTRY_MARKS_OBTAINED": "80",
    "OPTIONAL_MARKS_OBTAINED": "90",
    "THEORY_MARKS_OBTAINED": "80",
    "MATHS_PHY_CHEM_MARKS_OBTAINED": "240",
    "PRACTICAL_I_MARKS_OBTAINED": "90",
    "PRACTICAL_II_MARKS_OBTAINED": "90",
    "request_id": "001"
}
result.Verification('ctx', JSON.stringify(application_data))