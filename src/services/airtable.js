import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(
  process.env.AIRTABLE_ID
);

export default base;
