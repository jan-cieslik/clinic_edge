import { pushCaseTemplates } from '@/utils/logic/logic_server';
import fs from 'fs';
import path from 'path';

function transformData(data) {
    const keysToRemove = ["row_index", "case_id", "internal_name", "subcategory", "cs_id"];

    // Function to remove keys dynamically
    const removeKeys = (obj) => {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            if (!keysToRemove.includes(key)) {
                // Recursively process nested objects
                acc[key] = (typeof value === "object" && value !== null && !Array.isArray(value))
                    ? removeKeys(value)
                    : value;
            }
            return acc;
        }, {});
    };

    // Function to replace "single" with "singular"
    const replaceKeys = (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(replaceKeys); // Process arrays
        } else if (typeof obj === "object" && obj !== null) {
            return Object.entries(obj).reduce((acc, [key, value]) => {
                const newKey = key === "single" ? "singular" : key;
                acc[newKey] = replaceKeys(value); // Recursively process values
                return acc;
            }, {});
        }
        return obj; // Return the value if not an object or array
    };

    // Transform cardinal_symptoms to an array of keys if it's an object
    if (typeof data.cardinal_symptoms === "object" && !Array.isArray(data.cardinal_symptoms)) {
        data.cardinal_symptoms = Object.keys(data.cardinal_symptoms);
    }

    // Apply transformations
    let cleanedData = removeKeys(data);
    cleanedData = replaceKeys(cleanedData);

    return {
        case_id: data.case_id,
        internal_name: data.internal_name,
        case_data:cleanedData};
}

export default async function Page() {
  const dataFolderPath = path.join(process.cwd(), '/import'); // Path to the folder
  const fileNames = fs.readdirSync(dataFolderPath).filter((fileName) => fileName.endsWith('.json')); // Read file names in the folder

  const jsonData = fileNames.map((fileName) => {
    console.log("Reading file: ", fileName);
    const filePath = path.join(dataFolderPath, fileName); // Get full path
    const fileContents = fs.readFileSync(filePath, 'utf-8'); // Read the file
    const fileJSON = JSON.parse(fileContents)
    const fileTransformed = transformData(fileJSON)
    pushCaseTemplates(fileTransformed)
    return fileTransformed; // Parse JSON
  });

  return (
    <div>
      <h1>JSON Data</h1>
      <ul>
        {jsonData.map((item, index) => (
          <li key={index}>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
