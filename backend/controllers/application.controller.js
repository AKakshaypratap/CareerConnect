import { Application } from '../models/application.model';
import { Job } from '../models/job.model';

export const applyJob = async(req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message: "Job id is required",
                success: false
            });
        };
        // check if user had already applied for the job
        const existingApplication = await Application.findOne({job: jobId, applicant: userId});
        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        };

        //check if the job exists or not
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        };

        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(200).json({
            message: "Job applied successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
    };
};


export const getAppliedJobs = async(req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
            path: 'job',
            options: {sort: {createdAt: -1}},
            populate: {
                path: 'company',
                options: {sort: {createdAt: -1}}
            }
        });

        if(!application){
            return res.status(404).json({
                message: "No application",
                success: false
            });
        };
        return res.status(200).json({
            message: "Application found successfully",
            success: true,
            application
        })
    } catch (error) {
        console.error(error);
    };
};

// admin will check how many applicant have applied for particular job
export const getApplicants = async(req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: {sort: {createdAt: -1 }},
            populate: {
                path: 'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        };
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
    };
};

export const updateStatus = async(req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        };

        //find the application by application id
        const applicaton = await Application.findOne({_id: applicationId});
        if(!applicaton){
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        };

        // update the status
        application.status = status.toLowerCase();
        await applicaton.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
    }
}