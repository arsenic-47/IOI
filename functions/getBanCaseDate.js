module.exports = function (caseNumber) {
    const fs = require('fs')
    try {
        const banCasesDateData = fs.readFileSync('banCasesDate.txt', 'utf8');
        const banCasesDateArray = banCasesDateData.trim().split('\n');
        if (caseNumber >= 0 && caseNumber < banCasesDateArray.length) {
            return banCasesDateArray[caseNumber];
        } else {
            return 'Date not available';
        }
    } catch (error) {
        console.error('Error reading banCasesDate.txt:', error);
        return 'Date not available';
    }
}