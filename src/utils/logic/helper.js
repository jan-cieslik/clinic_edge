export function formatDateTime(inputDateTime, region) {
    const date = new Date(inputDateTime);

    // Format date using your custom function
    const formattedDate = formatDate(
        `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`,
        region
    );

    // Format time based on region
    const timeFormatter = new Intl.DateTimeFormat(region === 'de' ? 'de-DE' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: region !== 'de',
    });
    const formattedTime = timeFormatter.format(date);

    return `${formattedDate} ${formattedTime}`;
}

export function formatDate(inputDate, region) {
    // Ensure the date is in the correct format: YYYY.MM.DD
    const dateParts = inputDate.split(".");
    if (dateParts.length !== 3) {
        throw new Error("Invalid date format. Expected YYYY.MM.DD");
    }

    const [year, month, day] = dateParts;

    if (region === "de") {
        // German format: DD.MM.YYYY
        return `${day}.${month}.${year}`;
    } else {
        // Map of month numbers to three-letter English month codes
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const monthIndex = parseInt(month, 10) - 1;

        if (monthIndex < 0 || monthIndex > 11) {
            throw new Error("Invalid month in date.");
        }

        const monthCode = monthNames[monthIndex];
        return `${day} ${monthCode} ${year}`;
    }
}

export function setNestedValue(obj, keys, value) {
    let current = obj;
    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            // If it's the last key, set the value
            if (current[key]) {
                // If the key already exists, convert to array or push to array
                if (Array.isArray(current[key])) {
                    current[key].push(value);
                } else {
                    current[key] = [current[key], value];
                }
            } else {
                current[key] = value;
            }
        } else {
            // If the key doesn't exist, create an empty object
            if (!current[key]) {
                current[key] = {};
            } else if (typeof current[key] !== 'object') {
                // If current[key] is not an object, convert it to an object
                current[key] = {};
            }
            current = current[key];
        }
    });
}