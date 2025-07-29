/* eslint-disable @typescript-eslint/no-explicit-any */
import { COUNTRY_DATA } from "@/constants/country";

export const formatMoney = (amount: string): string => {
  if (!amount || !amount.trim() || isNaN(Number(amount))) return "";

  const [integerPart, decimalPart] = amount.toString().split(".");

  const formattedInt = parseInt(integerPart, 10).toLocaleString("en-US");
  if (amount.endsWith(".")) {
    return `${formattedInt}.`;
  }

  return decimalPart ? `${formattedInt}.${decimalPart}` : formattedInt;
};

export const formatFileSize = (size: number): string => {
  if (size === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  const formattedSize = parseFloat((size / Math.pow(k, i)).toFixed(1));

  return `${formattedSize} ${sizes[i]}`;
};

export const validatePassword = (password: string) => {
  const validation = {
    minimumOfEight: true,
    specialChar: true,
    number: true,
    upperCase: true,
    lowerCase: true,
    validCount: 5,
  };

  // Minimum 8 characters
  if (password.length < 8) {
    validation.minimumOfEight = false;
    validation.validCount -= 1;
  }

  // At least one lowercase letter
  if (!/[a-z]/.test(password)) {
    validation.lowerCase = false;
    validation.validCount -= 1;
  }

  // At least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    validation.upperCase = false;
    validation.validCount -= 1;
  }

  // At least a number
  if (!/[0-9]/.test(password)) {
    validation.number = false;
    validation.validCount -= 1;
  }

  // At least one special character
  if (!/[^a-zA-Z0-9]/.test(password)) {
    validation.specialChar = false;
    validation.validCount -= 1;
  }

  return validation;
};

export const outSideClickHandler = ({
  className,
  setState,
  document,
}: {
  className: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  document: Document;
}) => {
  const handleClickOutside = (event: any) => {
    if (event.target && !event.target.closest(`#${className}`)) {
      setState(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
};

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

export const getFileName = (file: File): string => {
  return file.name;
};

export const getFileSize = (file: File): string => {
  const fileSizeInBytes = file.size;
  const kilobytes = fileSizeInBytes / 1024;
  const megabytes = kilobytes / 1024;

  if (megabytes >= 1) {
    return megabytes.toFixed(2) + " MB";
  } else {
    return kilobytes.toFixed(2) + " KB";
  }
};

export const getFile = (file: File) => {
  return URL.createObjectURL(file);
};
interface Payload {
  checkoutId: string;
  merchantId: string;
}

export const getCheckoutInfo = (): Payload | undefined => {
  const info = window.sessionStorage.getItem("checkout");
  if (info) {
    return JSON.parse(info);
  }
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const appendUrl = ({
  param,
  value,
}: {
  param: string;
  value: string;
  window: Window;
}): string => {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;

  // Check if the parameter already exists, if yes, update its value
  if (searchParams.has(param)) {
    searchParams.set(param, value);
  } else {
    // If the parameter does not exist, append it
    searchParams.append(param, value);
  }

  // Return the updated URL
  return url.toString();
};

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export const formatAddress = (addr: string) => {
  const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2);
  return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(
    39
  )}`;
};

export const convertImageToDataString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read the file as data URL."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the file."));
    };

    reader.readAsDataURL(file);
  });
};

export const imageUrlToFileObject = async (
  imageUrl: string,
  fileName: string
): Promise<File> => {
  // Fetch the image data
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  // Create a File object
  const file = new File([blob], fileName, { type: blob.type });

  return file;
};

export const dataURLtoFile = (dataURL: string, fileName: string): File => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const file = new File([u8arr], fileName, { type: mime });
  return file;
};

export const shortenAddress = (address: string): string => {
  // if (!address.startsWith("0x") || address.length <= 10) {
  //   throw new Error("Invalid address format");
  // }

  const start = address.slice(0, 6);
  const end = address.slice(-4);
  return `${start}...${end}`;
};

export const isSuccessfulResponse = (statusCode: number): boolean => {
  return statusCode >= 200 && statusCode < 300;
};

export const removeFileExtension = (fileName: string): string => {
  const lastIndex = fileName.lastIndexOf(".");
  if (lastIndex === -1) {
    return fileName;
  } else {
    return fileName.substring(0, lastIndex);
  }
};

export function formatSeconds(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secsStr = secs.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hoursStr}:${minutesStr}:${secsStr}`;
  } else {
    return `${minutesStr}:${secsStr}`;
  }
}

export const formatString = (input: string): string => {
  if (input.length < 9) {
    return input;
  }

  const firstFive = input.substring(0, 5);
  const lastThree = input.substring(input.length - 4);

  const formattedString = `${firstFive}...${lastThree}`;
  return formattedString;
};

export const formatStringV2 = (
  input: string,
  start: number = 8,
  end: number = 5
): string => {
  if (input.length < start + end) {
    return input;
  }

  const first = input.substring(0, start);
  const last = input.substring(input.length - end);

  const formattedString = `${first}...${last}`;
  return formattedString;
};

export const formatTimeV2 = (dateString: string): string => {
  if (!dateString) return "null";
  const date = new Date(dateString);

  // Format date part
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() returns month from 0-11
  const year = date.getUTCFullYear();

  // Format time part
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, "0");

  return `${day}/${month}/${year}. ${formattedHours}:${minutes} ${ampm}`;
};

export const formatTimeV3 = (input: string): string => {
  const date = new Date(input);

  const pad = (num: number): string => num.toString().padStart(2, "0");

  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());

  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const convertTo12HourTime = (dateTime: string): string => {
  // Create a new Date object from the input datetime string
  const date = new Date(dateTime);

  // Extract hours and minutes
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to be two digits
  const minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();

  // Construct the 12-hour time string
  const timeString = `${hours}:${minutesStr} ${ampm}`;

  return timeString;
};

export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the month and year
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};

export const formatTxDate = (
  dateString: string | null,
  withTime: boolean = true
): string => {
  if (!dateString) return "--";
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(withTime && {
      hour: "numeric",
      minute: "numeric",
    }),
  };

  return date.toLocaleString("en-US", options);
};

export const capitalize = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const customToFixed = (num: number, precision = 4) => {
  const fixed = Number(num).toFixed(precision);
  return parseFloat(fixed).toString();
};

export const openInNewTab = ({ pathname }: { pathname: string }) => {
  window.open(
    `${window.location.origin}/${pathname}`,
    "_blank",
    "noopener,noreferrer"
  );
};

export const getCountryByCode = (code: string) => {
  return COUNTRY_DATA.find((c) => c.code === code);
};

export const formatStringToMoney = (inputValue: string) => {
  const numericValue = inputValue.replace(/,/g, "").replace(/\D/g, "");
  return numericValue ? Number(numericValue).toLocaleString() : "";
};

// export const formatStringToMoney = (inputValue: string) => {
//   // Remove all non-numeric characters except the decimal point
//   const numericValue = inputValue.replace(/,/g, "").replace(/[^0-9.]/g, "");

//   // Ensure only one decimal point is kept
//   const sanitizedValue =
//     numericValue.split(".").length > 2
//       ? numericValue.split(".").slice(0, 2).join(".")
//       : numericValue;

//   return sanitizedValue ? Number(sanitizedValue).toLocaleString() : "";
// };

export const formatMoneyToNumber = (formattedString: string) => {
  return Number(formattedString.replace(/,/g, ""));
};

export const toSentenceCase = (str?: string) => {
  if (!str) return ""; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatCounter = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds}`;
};

export const validatePasswordV2 = (password: string) => {
  const validation = {
    "8 characters": false,
    uppercase: false,
    lowercase: false,
    number: false,
    "Special Character": false,
  };

  // Minimum 8 characters
  if (password.length > 8) {
    validation["8 characters"] = true;
  }

  // At least one lowercase letter
  if (/[a-z]/.test(password)) {
    validation.lowercase = true;
  }

  // At least one uppercase letter
  if (/[A-Z]/.test(password)) {
    validation.uppercase = true;
  }

  // At least a number
  if (/[0-9]/.test(password)) {
    validation.number = true;
  }

  // At least one special character
  if (/[^a-zA-Z0-9]/.test(password)) {
    validation["Special Character"] = true;
  }

  return validation;
};

type FormatType =
  | "titleCase"
  | "sentenceCase"
  | "lowerCase"
  | "clipStart"
  | "clipEnd"
  | "clip";

export function formatText(
  input: string,
  format: FormatType = "titleCase",
  clipLength: number | [number, number] = 4
): string {
  if (!input) return "";

  const toWords = (text: string) =>
    text
      .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase to space
      .replace(/[_\-]+/g, " ") // underscores/dashes to space
      .trim()
      .split(/\s+/);

  switch (format) {
    case "titleCase":
      return toWords(input)
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

    case "sentenceCase":
      const words = toWords(input).map((w) => w.toLowerCase());
      if (words.length === 0) return "";
      return (
        words[0].charAt(0).toUpperCase() +
        words[0].slice(1) +
        " " +
        words.slice(1).join(" ")
      );

    case "lowerCase":
      return toWords(input)
        .map((w) => w.toLowerCase())
        .join(" ");

    case "clipStart":
      if (typeof clipLength !== "number") return input;
      return input.length <= clipLength
        ? input
        : `…${input.slice(-clipLength)}`;

    case "clipEnd":
      if (typeof clipLength !== "number") return input;
      return input.length <= clipLength
        ? input
        : `${input.slice(0, clipLength)}…`;

    case "clip":
      if (!Array.isArray(clipLength)) return input;
      const [start, end] = clipLength;
      if (input.length <= start + end + 3) return input;
      return `${input.slice(0, start)}…${input.slice(-end)}`;

    default:
      return input;
  }
}

export const constructQueryParams = (payload: Record<string, any>): string => {
  const query = Object.entries(payload)
    .filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return query ? `?${query}` : "";
};

export const getCurrencySymbol = (currencyCode: string): string => {
  const code = currencyCode.toUpperCase();

  const currencyMap: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    NGN: "₦",
    JPY: "¥",
    CNY: "¥",
    INR: "₹",
    CAD: "CA$",
    AUD: "A$",
    ZAR: "R",
    KES: "KSh",
    GHS: "₵",
  };

  return currencyMap[code] || code;
};

export const formatDateByInterval = (
  dateStr: string,
  interval: string
): string => {
  const date = new Date(dateStr);

  switch (interval) {
    case "1D":
      // Show full timestamp (e.g. "12:30 PM")
      return date.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      });

    case "7D":
    case "30D":
      // Show short date (e.g. "Jul 10")
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });

    default:
      // Default to full date (e.g. "2025-07-10")
      return date.toISOString().split("T")[0];
  }
};

export const formatDateCounter = (time: number) => {
  let remaining = time;

  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;
  const SECONDS_IN_WEEK = SECONDS_IN_DAY * 7;
  const SECONDS_IN_MONTH = SECONDS_IN_DAY * 30;
  const SECONDS_IN_YEAR = SECONDS_IN_DAY * 365;

  const years = Math.floor(remaining / SECONDS_IN_YEAR);
  remaining %= SECONDS_IN_YEAR;

  const months = Math.floor(remaining / SECONDS_IN_MONTH);
  remaining %= SECONDS_IN_MONTH;

  const weeks = Math.floor(remaining / SECONDS_IN_WEEK);
  remaining %= SECONDS_IN_WEEK;

  const days = Math.floor(remaining / SECONDS_IN_DAY);
  remaining %= SECONDS_IN_DAY;

  const hours = Math.floor(remaining / SECONDS_IN_HOUR);
  remaining %= SECONDS_IN_HOUR;

  const minutes = Math.floor(remaining / SECONDS_IN_MINUTE);
  const seconds = remaining % SECONDS_IN_MINUTE;

  // Readable long format
  let instant = "";
  if (years > 0) instant = years === 1 ? "1 year" : `${years} years`;
  else if (months > 0) instant = months === 1 ? "1 month" : `${months} months`;
  else if (weeks > 0) instant = weeks === 1 ? "1 week" : `${weeks} weeks`;
  else if (days > 0) instant = days === 1 ? "1 day" : `${days} days`;
  else if (hours > 0) instant = hours === 1 ? "1 hour" : `${hours} hours`;
  else if (minutes > 0)
    instant = minutes === 1 ? "1 minute" : `${minutes} minutes`;
  else instant = seconds === 1 ? "1 second" : `${seconds} seconds`;

  // Compact mode (e.g. "1y 2mo 3d 4h 5m 6s")
  const compactParts: string[] = [];
  if (years) compactParts.push(`${years}y`);
  if (months) compactParts.push(`${months}mo`);
  if (weeks) compactParts.push(`${weeks}w`);
  if (days) compactParts.push(`${days}d`);
  if (hours) compactParts.push(`${hours}h`);
  if (minutes) compactParts.push(`${minutes}m`);
  if (seconds) compactParts.push(`${seconds}s`);
  const compact = compactParts.join(" ") || "0s";

  return {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
    instant,
    compact,
  };
};
