const fs = require('fs');
const path = require('path');

// Read the CSV file using glob pattern to avoid apostrophe encoding issues
const csvDir = path.join(__dirname, '../../');
const files = fs.readdirSync(csvDir);
const csvFile = files.find(f => f.startsWith('Cheklangan') && f.endsWith('.csv'));

if (!csvFile) {
  console.error('❌ CSV file not found!');
  process.exit(1);
}

const csvPath = path.join(csvDir, csvFile);
console.log('Reading CSV file:', csvPath);

const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV manually to handle special characters
const lines = csvContent.split('\n');
// Skip first line (title) and use second line as headers
const headers = lines[1].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

console.log('Headers found:', headers);
console.log('Total lines:', lines.length);

const medicines = [];

// Start from line 2 (skip title and headers)
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
  
  if (values.length >= 11) {
    const medicine = {
      id: values[0],
      brandName: values[1],
      activeIngredient: values[2],
      manufacturer: values[3],
      packaging: values[4],
      registrationNumber: values[5],
      currency: values[6],
      basePrice: values[7],
      wholesalePrice: values[8],
      retailPrice: values[9],
      dispensingCondition: values[10]
    };
    medicines.push(medicine);
  }
}

console.log(`Parsed ${medicines.length} medicines`);
console.log('Sample medicine:', medicines[0]);

// Write to JSON file
const outputPath = path.join(__dirname, '../public/medicines.json');
fs.writeFileSync(outputPath, JSON.stringify(medicines, null, 2), 'utf-8');

console.log(`✅ Successfully created ${outputPath}`);
