function applicationData() {
    return {
        "APPLICATION_NUMBER": 1234,
        "cert": [
            // {
            //     "CERTIFICATE_NAME": "income",
            //     "CERTIFICATE_NUMBER": "TN-10006"
            // }, 
            {
                "CERTIFICATE_NAME": "NoGraduate Certificate",
                "CERTIFICATE_NUMBER": "TN-10001"
            }, 
            // {
            //     "CERTIFICATE_NAME": "community_certificate",
            //     "CERTIFICATE_NUMBER": "TN-10011"
            // },
             {
                "CERTIFICATE_NAME": "nativity_certificate",
                "CERTIFICATE_NUMBER": "TN-10016"
            },
            // {
            //     "CERTIFICATE_NAME": "OBC_certificate",
            //     "CERTIFICATE_NUMBER": "KL-10024"
            // },
            {
                "CERTIFICATE_NAME": "hsc",
                "CERTIFICATE_NUMBER": "TN1234"
            }
        ],
        "NAME": "Raj",
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
        "RELIGION": "H",
        "COMMUNITY": "obc",
        "CASTE": "gja",
        "OPTIONAL":"dvxv",
        "AADHAR": "dav5465435",
        "MOTHER_TONGUE": "jhacv",
        "ELIGIBILITY_TYPE": "bhba42",
        "PARENT_OCCUPATION": "Private",
        "ANNUAL_INCOME": "1200000",
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
        'STUDIED_IN_TAMILNADU':'yes',
        'FIRST_GRADUATE_SCHOLARSHIP':'yes',
        "request_id": "001"

    }
}


function income(nativity_cert_no) {
    // return {}
    return {
        SERVICENAME: 'Income Certificate',
        APPLICANTNAME: 'abc',
        FATHERHUSNAME: 'Guru',
        ADDRESS: 'Street -Other, Door/Building No.-44',
        VILLTOWN: 'Chennai',
        TALUK: 'Maduravoyal',
        DISTRICT: 'Chennai',
        PINCODE: '634232',
        OCCUPATION: 'Private',
        ANNUALINCOME: '1200000.0',
        ISSUINGAUTHORITY: 'Deputy Tahsildar',
        AADHARNO: '747574363664',
        DATEOFISSUE: '18-05-2020',
        DATEOFEXPIRY: '12-07-2021',
        CERTIFICATENO: 'TN-10006',
        Created_at: "2020/02/07 11:46:33",
        ATTACHEMENT: 'http://14.192.18.150/stagging/DownloadAttachments?AppNo=iFBa+q0Q1KHU4dq9Z13dPg==',
        OUTPUTPDF: 'http://14.192.18.150/stagging/downloadCertificate?AppNo=iFBa+q0Q1KHU4dq9Z13dPg=='
    }
}

function nativity(nativity_cert_no) {
    return {
        SERVICENAME: 'Nativity certificate',
        APPLICANTNAME: 'Gopal',
        FATHERHUSNAME: 'abc',
        ADDRESS: 'Street -Street, Door/Building No.-23',
        VILLTOWN: 'Theni',
        TALUK: 'Aundipatti',
        DISTRICT: 'Theni',
        PINCODE: '600091',
        MOTHERNAME: 'Amma',
        NATIVITYTYPE: 'Nativity By Residence',
        FROMDATE: '2004-04-07',
        ISSUINGAUTHORITY: 'Deputy Tahsildar',
        AADHARNO: '879789768975',
        DATEOFISSUE: '09-04-2020',
        DATEOFEXPIRY: 'NA',
        CERTIFICATENO: 'TN-10016',
        Created_at: "2020/02/07 11:46:33",
        ATTACHEMENT: 'http://14.192.18.150/stagging/DownloadAttachments?AppNo=2psEEIzqwYfJiIHi7snpxQ==',
        OUTPUTPDF: 'http://14.192.18.150/stagging/downloadCertificate?AppNo=2psEEIzqwYfJiIHi7snpxQ=='
    }
}

function first_graduate(nativity_cert_no) {
    // return{}
    return {
        SERVICENAME: 'First Graduate Certificate',
        APPLICANTNAME: 'Raj',
        FATHERHUSNAME: 'Guru',
        ADDRESS: 'Street -Gandhi Nagar, Door/Building No.-22',
        VILLTOWN: 'Perambalur',
        TALUK: 'Perambalur',
        DISTRICT: 'Perambalur',
        PINCODE: '613566',
        COURSECOMPLETION: 'Graduate',
        PASSINGYEAR: '2016',
        CURRENTCOURSE: 'Graduate',
        ACADEMICYEAR: '2020',
        INSTNAME: 'sastra',
        INSTADDRESS: 'Anna Street',
        ISSUINGAUTHORITY: 'Deputy Tahsildar',
        FAMILYDETAILS: [{
                NAME: 'Vignesh',
                AGE: '23',
                RELATIONSHIP: 'Elder Brother',
                QUALIFICATION: 'Post Graduate'
            },
            {
                NAME: 'Guru',
                AGE: '45',
                RELATIONSHIP: 'Father',
                QUALIFICATION: '10th or 12th Standard'
            },
            {
                NAME: 'Priyanka',
                AGE: '33',
                RELATIONSHIP: 'Mother',
                QUALIFICATION: 'Diploma'
            },
            {
                NAME: 'Vignesh',
                AGE: '23',
                RELATIONSHIP: 'Elder Brother',
                QUALIFICATION: 'Post Graduate'
            },
            {
                NAME: 'Guru',
                AGE: '45',
                RELATIONSHIP: 'Father',
                QUALIFICATION: '10th or 12th Standard'
            },
            {
                NAME: 'Priyanka',
                AGE: '33',
                RELATIONSHIP: 'Mother',
                QUALIFICATION: 'Diploma'
            },
            {
                NAME: 'Vignesh',
                AGE: '23',
                RELATIONSHIP: 'Elder Brother',
                QUALIFICATION: 'Post Graduate'
            },
            {
                NAME: 'Guru',
                AGE: '45',
                RELATIONSHIP: 'Father',
                QUALIFICATION: '10th or 12th Standard'
            },
            {
                NAME: 'Priyanka',
                AGE: '33',
                RELATIONSHIP: 'Mother',
                QUALIFICATION: 'Diploma'
            },
            {
                NAME: 'Vignesh',
                AGE: '23',
                RELATIONSHIP: 'Elder Brother',
                QUALIFICATION: 'Post Graduate'
            },
            {
                NAME: 'Guru',
                AGE: '45',
                RELATIONSHIP: 'Father',
                QUALIFICATION: '10th or 12th Standard'
            },
            {
                NAME: 'Priyanka',
                AGE: '33',
                RELATIONSHIP: 'Mother',
                QUALIFICATION: 'Diploma'
            }
        ],
        AADHARNO: '939438347756',
        DATEOFISSUE: '21-05-2020',
        DATEOFEXPIRY: 'NA',
        CERTIFICATENO: 'TN-10001',
        Created_at: "2020/02/07 11:46:33",
        ATTACHEMENT: 'http://14.192.18.150/stagging/DownloadAttachments?AppNo=rHRxE5Kf5tbDjHdVStBh3X/e3aGd4U2T',
        OUTPUTPDF: 'http://14.192.18.150/stagging/downloadCertificate?AppNo=rHRxE5Kf5tbDjHdVStBh3X/e3aGd4U2T'
    }
}

function obc(nativity_cert_no) {
    // return {}
    return {
        SERVICENAME: 'OBC Certificate',
        APPLICANTNAME: 'Raj22',
        FATHERHUSNAME: 'Sak',
        ADDRESS: 'Street -Bvbw , Door/Building No.-ef',
        VILLTOWN: 'Salem',
        TALUK: 'Attur',
        DISTRICT: 'Salem',
        PINCODE: '654567',
        RELIGION: 'Hindu',
        CAST: 'Agamudayar',
        STATUS: 'Creamy Layer',
        ISSUINGAUTHORITY: 'Tahsildar',
        AADHARNO: '765768909876',
        DATEOFISSUE: '16-04-2020',
        DATEOFEXPIRY: '31-03-2021',
        CERTIFICATENO: 'KL-10024',
        Created_at: "2020/02/07 11:46:33",
        ATTACHEMENT: 'http://14.192.18.150/stagging/DownloadAttachments?AppNo=CmMseg0XCPCGmgiQRRM1XQ==',
        OUTPUTPDF: 'http://14.192.18.150/stagging/downloadCertificate?AppNo=CmMseg0XCPCGmgiQRRM1XQ=='
    }
}


function community(nativity_cert_no) {
    return {
        SERVICENAME: 'Community certificate',
        APPLICANTNAME: 'Roja',
        FATHERHUSNAME: 'Guru',
        ADDRESS: 'Street -Anna Street, Door/Building No.-22',
        VILLTOWN: 'Perambalur',
        TALUK: 'Perambalur',
        DISTRICT: 'Perambalur',
        PINCODE: '612346',
        GENDER: 'Female',
        RELIGION: 'Hindu',
        COMMUNITY: 'BC',
        CAST: 'Adhaviyar',
        ISSUINGAUTHORITY: 'Deputy Tahsildar',
        AADHARNO: '998457466756',
        DATEOFISSUE: '19-05-2020',
        DATEOFEXPIRY: 'NA',
        CERTIFICATENO: 'TN-520200519101',
        Created_at: "2020/02/07 11:46:33",
        ATTACHEMENT: 'http://14.192.18.150/stagging/DownloadAttachments?AppNo=js0+mAnqn5iGR9rcPK4DBQ==',
        OUTPUTPDF: 'http://14.192.18.150/stagging/downloadCertificate?AppNo=js0+mAnqn5iGR9rcPK4DBQ=='
    }
}

function hsc(nativity_cert_no) {
    // return {}
    return {
        "Name": '',
        "ROLLNO": '',
        "DOB": '',
        "Community": '',
        "Religion": '',
        "group_code": 'dsd',
        "Maths": '80',
        "physics": '80',
        "chemistry": '50',
        "docType": "hsc",
        CERTIFICATENO: 'TN1234',
        "Created_at": '',
        "Gender":'M'
    }
}
module.exports = {
    applicationData,
    income,
    nativity,
    first_graduate,
    obc,
    community,
    hsc
}



















// peer1.cadv.cvs.org	peer0.org1.example.com
// peer1.tnega.cvs.org	peer0.org2.example.com
// peer2.tnega.cvs.org	peer1.org2.example.com
// peer1.sed.cvs.org	peer0.org3.example.com

// orderer1.cvs.org	orderer.example.com
// orderer2.cvs.org	orderer2.example.com
// orderer3.cvs.org	orderer3.example.com

// ca.cadv.cvs.org		ca.org1.example.com
// ca.tnega.cvs.org	ca.org2.example.com
// ca.sed.cvs.org		ca.org3.example.com


// Org1	CADV
// Org2	TNEGA
// Org3	SED


// Org1MSP		CadvMSP
// Org2MSP		TnegaMSP
// Org3MSP		SedMSP