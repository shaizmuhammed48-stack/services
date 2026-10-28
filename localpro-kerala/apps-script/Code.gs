/**
 * LocalPro Kerala - Google Apps Script Backend
 * 
 * Deploy as Web App with:
 * - Execute as: Me
 * - Who has access: Anyone
 * 
 * Spreadsheet ID: 1IICtQpRRfL-NWHamt-P5FRLk5jFYqfNzSvtKdZLONdo
 */

const SPREADSHEET_ID = "1IICtQpRRfL-NWHamt-P5FRLk5jFYqfNzSvtKdZLONdo";

// Sheet names - adjust based on actual spreadsheet
const SHEETS = {
  PROVIDERS: "Providers",
  COMPANIES: "Companies", 
  BOOKINGS: "Bookings",
  CATEGORIES: "Categories"
};

function doGet(e) {
  try {
    const action = e.parameter.action || "getProviders";
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    switch(action) {
      case "getProviders":
        return getProviders(ss, e.parameter);
      case "getProviderById":
        return getProviderById(ss, e.parameter);
      case "getCompanies":
        return getCompanies(ss, e.parameter);
      case "getCompanyById":
        return getCompanyById(ss, e.parameter);
      case "getBookings":
        return getBookings(ss, e.parameter);
      case "getCategories":
        return getCategories(ss, e.parameter);
      case "health":
        return ContentService.createTextOutput(JSON.stringify({status: "ok", message: "LocalPro Kerala API is running"}))
          .setMimeType(ContentService.MimeType.JSON);
      default:
        return getProviders(ss, e.parameter);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || "createBooking";
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    switch(action) {
      case "createBooking":
        return createBooking(ss, data);
      case "updateBookingStatus":
        return updateBookingStatus(ss, data);
      case "updateProviderStatus":
        return updateProviderStatus(ss, data);
      default:
        return createBooking(ss, data);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getProviders(ss, params) {
  try {
    const sheet = ss.getSheetByName(SHEETS.PROVIDERS);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: true,
        message: "Providers sheet not found. Check sheet names."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const providers = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const provider = {};
      headers.forEach((header, index) => {
        provider[header.toString().toLowerCase().replace(/\s+/g, '')] = row[index];
      });
      provider.rowIndex = i + 1;
      providers.push(provider);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: providers,
      count: providers.length
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getProviderById(ss, params) {
  const providers = JSON.parse(getProviders(ss, params).getContent());
  const id = params.id;
  const provider = providers.data.find(p => 
    p.id == id || p.providerid == id || p.provider_id == id
  );
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    data: provider || null
  })).setMimeType(ContentService.MimeType.JSON);
}

function getCompanies(ss, params) {
  try {
    const sheet = ss.getSheetByName(SHEETS.COMPANIES);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: true,
        message: "Companies sheet not found."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const companies = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const company = {};
      headers.forEach((header, index) => {
        company[header.toString().toLowerCase().replace(/\s+/g, '')] = row[index];
      });
      companies.push(company);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: companies,
      count: companies.length
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getCompanyById(ss, params) {
  const companies = JSON.parse(getCompanies(ss, params).getContent());
  const id = params.id;
  const company = companies.data.find(c => 
    c.id == id || c.companyid == id || c.company_id == id
  );
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    data: company || null
  })).setMimeType(ContentService.MimeType.JSON);
}

function getBookings(ss, params) {
  try {
    const sheet = ss.getSheetByName(SHEETS.BOOKINGS);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: true,
        message: "Bookings sheet not found."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const bookings = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const booking = {};
      headers.forEach((header, index) => {
        booking[header.toString().toLowerCase().replace(/\s+/g, '')] = row[index];
      });
      booking.rowIndex = i + 1;
      bookings.push(booking);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: bookings,
      count: bookings.length
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function createBooking(ss, data) {
  try {
    let sheet = ss.getSheetByName(SHEETS.BOOKINGS);
    if (!sheet) {
      sheet = ss.insertSheet(SHEETS.BOOKINGS);
      sheet.appendRow(["BookingID", "CustomerName", "CustomerPhone", "ProviderID", "ServiceRequest", "PreferredDate", "PreferredTime", "Status", "PaymentStatus", "CreatedAt"]);
    }
    
    const bookingId = "BK" + Date.now().toString().slice(-8);
    const timestamp = new Date().toISOString();
    
    sheet.appendRow([
      bookingId,
      data.customerName || "",
      data.customerPhone || "",
      data.providerId || "",
      data.serviceRequest || data.message || "",
      data.preferredDate || "",
      data.preferredTime || data.startTime || "",
      "pending",
      "unpaid",
      timestamp
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Booking created successfully",
      bookingId: bookingId
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function updateBookingStatus(ss, data) {
  try {
    const sheet = ss.getSheetByName(SHEETS.BOOKINGS);
    if (!sheet) throw new Error("Bookings sheet not found");
    
    const values = sheet.getDataRange().getValues();
    const headers = values[0];
    const idIndex = headers.findIndex(h => h.toString().toLowerCase().includes('booking'));
    const statusIndex = headers.findIndex(h => h.toString().toLowerCase() === 'status');
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][idIndex] == data.bookingId) {
        if (statusIndex >= 0) {
          sheet.getRange(i + 1, statusIndex + 1).setValue(data.status);
        }
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          message: "Booking status updated"
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    throw new Error("Booking not found");
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function updateProviderStatus(ss, data) {
  try {
    const sheet = ss.getSheetByName(SHEETS.PROVIDERS);
    if (!sheet) throw new Error("Providers sheet not found");
    
    const values = sheet.getDataRange().getValues();
    const headers = values[0];
    const idIndex = headers.findIndex(h => h.toString().toLowerCase().includes('id'));
    const statusIndex = headers.findIndex(h => h.toString().toLowerCase() === 'status' || h.toString().toLowerCase() === 'active');
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][idIndex] == data.providerId) {
        if (statusIndex >= 0) {
          sheet.getRange(i + 1, statusIndex + 1).setValue(data.status || data.active);
        }
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          message: "Provider status updated"
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    throw new Error("Provider not found");
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getCategories(ss, params) {
  try {
    const sheet = ss.getSheetByName(SHEETS.CATEGORIES);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        data: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const categories = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const category = {};
      headers.forEach((header, index) => {
        category[header.toString().toLowerCase().replace(/\s+/g, '')] = row[index];
      });
      categories.push(category);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: categories
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: true,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
