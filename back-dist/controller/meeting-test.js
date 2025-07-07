"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingTest = void 0;
const meetingTest = async (req, res) => {
    const { testResponse } = req.body;
    try {
        // Validate the request body
        if (!testResponse) {
            return res.status(400).json({ error: "testResponse is required" });
        }
        else {
            res.status(200).json({ message: "testResponse received successfully. This is the test text: " });
            console.log("testResponse:", testResponse);
        }
    }
    catch (error) {
        console.error("Error in meetingTest:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.meetingTest = meetingTest;
