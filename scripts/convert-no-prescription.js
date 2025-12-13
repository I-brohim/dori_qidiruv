const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '../../Рецептсиз_бериладиган_дорилар_рўйхати.csv');
console.log('Reading CSV file:', csvPath);

const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV manually to handle special characters
const lines = csvContent.split('\n');
const headers = lines[0].split(',').map(h => h.trim());

console.log('Headers found:', headers);
console.log('Total lines:', lines.length);

const medicines = [];

// Start from line 2 (skip header and category line)
for (let i = 2; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  
  // Split by comma, but handle quoted fields
  const values = [];
  let currentValue = '';
  let insideQuotes = false;
  
  for (let char of lines[i]) {
    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      values.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  values.push(currentValue.trim());
  
  if (values.length >= 12) {
    const medicine = {
      id: `np-${i - 1}`, // np = no prescription
      number: values[0] || '',
      registrationNumber: values[1] || '',
      registrationExpiry: values[2] || '',
      brandName: values[3] || '',
      dosageForm: values[4] || '',
      manufacturer: values[5] || '',
      registrationHolder: values[6] || '',
      pharmacotherapyGroup: values[7] || '',
      routeOfAdministration: values[8] || '',
      atcCode: values[9] || '',
      atcName: values[10] || '',
      inn: values[11] || '',
      dispensingCondition: values[12] || 'Без рецепта',
      prescriptionRequired: false
    };
    
    medicines.push(medicine);
  }
}

console.log(`✅ Parsed ${medicines.length} medicines without prescription`);

// Write to JSON file
const outputPath = path.join(__dirname, '../public/medicines-no-prescription.json');
fs.writeFileSync(outputPath, JSON.stringify(medicines, null, 2), 'utf-8');

console.log('✅ JSON file created:', outputPath);
console.log('✅ Done!');
