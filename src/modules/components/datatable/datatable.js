import { LightningElement, api } from "lwc";
const ACTIONS = [
  { label: "Edit", name: "edit" },
  { label: "Delete", name: "delete" },
];
const COLUMNS = [
  { label: "Name", type: "text", fieldName: "Expense_Name__c" },
  {
    label: "Amount",
    type: "currency",
    fieldName: "Amount__c",
    cellAttributes: {
      alignment: "left",
    },
    typeAttributes: { currencyCode: "USD", step: "0.001" },
  },
  { label: "Expense Date", type: "date", fieldName: "Date__c" },
  { label: "Category", type: "text", fieldName: "Category__c" },
  { label: "Notes", type: "text", fieldName: "Notes__c" },
  {
    type: "action",
    typeAttributes: {
      rowActions: ACTIONS,
    },
  },
];

export default class Datatable extends LightningElement {
  keyField = "Id";
  columns = COLUMNS;
  data = [];

  _records = [];
  @api
  set records(val) {
    this._records = JSON.parse(JSON.stringify(val));
  }
  get records() {
    return this._records;
  }

  handleRowAction(e) {
    console.log(e.detail.action);
  }

  renderedCallback() {
    console.log("expenses:::", JSON.parse(JSON.stringify(this.records)));
  }
}
