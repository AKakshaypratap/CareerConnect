import { Company } from "../models/company.model.js";

//function to register the company
export const registerCompany = async(req, res) => {
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        };
        let company = await Company.findOne({name: companyName});
        if(company){
            return res.status(400).json({
                message: "Company already exists.",
                success: false
            });
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });
    } catch (error) {
        console.error(error);
    }
};

// function to get the company
export const getCompany = async(req, res) => {
    try {
        const userId = req.id;  // logged in user id
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message: "Companies not found",
                success: false
            });
        };
        return res.status(200).json({
            message: "company fetched successfully",
            companies,
            success: true
        })
    } catch (error) {
        console.error(error);
    }
}

// function to getCompany by id
export const getCompanyById = async(req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
             return res.status(404).json({
                message: "Company not found",
                success: false
            });
        };
        return res.status(200).json({
            message: "Company found successfully",
            company,
            success: true
        })
    } catch (error) {
        console.error(error);
    }
};

export const udpateCompany = async(req, res) => {
    try {
        const {name, description, website, location} =  req.body;
        const file = req.file;
        // cloudinary
        const updateData = {name, description, website, location};
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true});
        if(!company){
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        };
        return res.status(200).json({
            message: "company details updated successfully",
            
            success: true
        })
    } catch (error) {
        console.error(error);
    }
}