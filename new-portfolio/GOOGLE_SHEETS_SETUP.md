# Google Sheets transmission setup

The contact form saves through `netlify/functions/transmission.mjs`. It does not open an email client when saving fails.

Configure these environment variables in the Netlify site under **Project configuration → Environment variables**:

- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `GOOGLE_SPREADSHEET_ID` (optional; defaults to the existing portfolio sheet)
- `GOOGLE_SHEET_RANGE` (optional; defaults to `Sheet1!A4:C`)

The private key may contain escaped newlines (`\n`); the function converts them before signing.

Share the target Google Sheet with the value of `GOOGLE_SERVICE_ACCOUNT_EMAIL` and grant **Editor** access.

The deployed function endpoint is:

`/.netlify/functions/transmission`
