const { generateRandomNumber } = require("./generateRandomNumber");

const generateId = (entity) => {
    const randomNum = generateRandomNumber();
    return `${entity}/${randomNum}`;
};

const generateApartmentId = () => generateId("apt");
const generateTenantId = () => generateId("tenant");
const generateRoomId = () => generateId("room");
const generateInvoiceId = () => generateId("invoice");
const generateContractId = () => generateId("contract");
const generateExpenseId = () => generateId("expense");
const generateReportId = () => generateId("report");
const generateUserId = () => generateId("user");

module.exports = {
    generateApartmentId,
    generateTenantId,
    generateRoomId,
    generateInvoiceId,
    generateContractId,
    generateExpenseId,
    generateReportId,
    generateUserId
};