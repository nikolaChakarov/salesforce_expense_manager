import { LightningElement, track } from "lwc";

const SERVER_URL = "http://localhost:5005";

export default class Home extends LightningElement {
  expenseRecords = [];

  async connectedCallback() {
    const expenses = await this.getExpenses();
    console.log("expenses:", expenses);
    this.expenseRecords = expenses.totalSize > 0 ? expenses.records : [];
  }

  async getExpenses() {
    // const url = `${SERVER_URL}/expenses`;
    // try {
    //   const data = await this.makeApiRequest(url);
    //   if (data) {
    //     this.expenses = await data.json();
    //     console.log(
    //       "this.expenses:::",
    //       JSON.parse(JSON.stringify(this.expenses))
    //     );
    //   }
    // } catch (error) {
    //   console.log("err:", error);
    // }

    return await this.makeApiRequest(SERVER_URL + "/expenses");
  }

  async makeApiRequest(url, method = "GET", data = null) {
    try {
      const requestOptions = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : null,
      };

      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }
}
