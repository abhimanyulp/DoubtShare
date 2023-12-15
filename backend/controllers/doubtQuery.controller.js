const { doubtQueryModel } = require("../models/doubtQuery.model")
const { userModel } = require("../models/user.model")

exports.create = async (req, res) => {
    const { userId, subject, question } = req.body;

    try {
        const student = await userModel.findOne({ _id: userId, type: 'Student' });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const availableTutors = await userModel.find({
            subject: subject,
            language: student.language,
            classGrade: student.classGrade,
            type: "Tutor"
        });


        if (availableTutors.length === 0) {
            return res.status(404).json({ message: 'No available tutors for the given subject' });
        }

        const assignedTutor = availableTutors[0];

        const doubtRequest = await doubtQueryModel.create({
            studentId: userId,
            subject,
            question,
            assignedTutorId: assignedTutor._id,
        });


        // Provide response
        return res.status(201).json({ message: 'Doubt query created successfully', doubtRequest });
    } catch (error) {
        console.error('Error creating doubt request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.logs = async (req, res) => {
    const { userId } = req.body;

    try {
        const logData = await doubtQueryModel.find({ studentId: userId });

        if (!logData.length) {
            return res.status(404).json({ message: 'Student log not found' });
        }

        return res.status(201).json({ message: 'Logs fetched successfully', logData });

    } catch (error) {
        console.error('Error fetching doubt request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}