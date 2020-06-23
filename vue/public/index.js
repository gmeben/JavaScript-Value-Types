const sampleData = [
  { valueName: "array", value: [], expectedType: "object" },
  {
    valueName: "BigInt",
    value: BigInt(12345678901234567),
    expectedType: "bigint"
  },
  { valueName: "boolean", value: true, expectedType: "boolean" },
  { valueName: "Date", value: new Date(), expectedType: "object" },
  { valueName: "function", value: (x) => x * 2, expectedType: "function" },
  { valueName: "Infinity", value: Infinity, expectedType: "number" },
  { valueName: "Map", value: new Map(), expectedType: "object" },
  { valueName: "NaN", value: NaN, expectedType: "number" },
  { valueName: "null", value: null, expectedType: "null" },
  { valueName: "number", value: 9, expectedType: "number" },
  { valueName: "object", value: {}, expectedType: "object" },
  {
    valueName: "Rectangle",
    value: class Rectangle {
      constructor(height, width) {
        this.height = height;
        this.width = width;
      }
    },
    expectedType: "function"
  },
  { valueName: "string", value: "cantaloupe", expectedType: "string" },
  { valueName: "Set", value: new Set(), expectedType: "object" },
  { valueName: "Symbol", value: Symbol("des"), expectedType: "symbol" },
  { valueName: "undefined", value: undefined, expectedType: "undefined" },
  { valueName: "WeakMap", value: new WeakMap(), expectedType: "object" },
  { valueName: "WeakSet", value: new WeakSet(), expectedType: "object" }
];

Vue.component("value-types-table", {
  data: {
    sampleData: sampleData
  },
  computed: {
    valueTypeTableData() {
      let processedSampleData = sampleData;
      processedSampleData.forEach(function (element) {
        element.actualType = typeof element.value;
        if (element.expectedType !== element.actualType) {
          element.isMismatched = true;
        }
      });
      return processedSampleData;
    }
  },
  template: `
    <table>
      <thead>
        <tr>
          <th style="text-align:right">Value</th>
          <th>Sample</th>
          <th style="text-align:left">Expected Type</th>
          <th style="text-align:left">Actual Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in this.valueTypeTableData" v-bind:class="{ mismatched: item.isMismatched }">
          <td style="text-align:right">{{ item.valueName }}</td>
          <td><samp>{{ item.value }}</samp></td>
          <td>{{ item.expectedType }}</td>
          <td>{{ item.actualType }}</td>
        </tr>
      </tbody>
    </table>
  `
});

Vue.component('value-type-counts-table',{
  computed: {
    countedValues: function () {
      let values = [];
      this.$root.uniqueValues.forEach(function (item) {
        values.push({
          valueName: item,
          valueCount: getPossibleValueCountByType(item)
        });
      });
      values.push({
        valueName: "null",
        valueCount: getPossibleValueCountByType("null")
      });
      return values.sort(function(a,b){
        return a.valueName > b.valueName;
      });
    }
  },
  template: `
    <table>
      <thead>
      <tr>
        <th style="text-align:right;">Value</th>
        <th>Number of Possible Values</th>
      </tr>
      </thead>
      <tr v-for="item in this.countedValues">
        <td style="text-align:right;">{{ item.valueName }}</td>
        <td>{{ item.valueCount }}</td>
      </tr>
    </table>
  `
})

function getPossibleValueCountByType(type) {
  switch (type) {
    case "undefined":
    case "null": // ha
      return 1;
    case "boolean":
      return 2;
    case "number":
      return "Eighteen quintillion, four hundred and thirty-seven quadrillion, seven hundred and thirty-six trillion, eight hundred and seventy-four billion, four hundred and fifty-four million, eight hundred and twelve thousand, six hundred and twenty-four";
    case "bigint":
    case "string":
      return "Infinite";
    case "object":
      return `Infinite - One object value for every object created. Variables can still point to the same object value.`;
    case "function":
      return "Infinite - One function value for every function definition stepped through.";
    default:
      return "Unknown";
  }
}

const app = new Vue({
  el: "#app",
  data: {
    title: "JavaScript Value Types",
    sampleData: sampleData
  },
  computed: {
    uniqueValues() {
      let set = new Set();
      this.sampleData.forEach(function (item) {
        let typeName = typeof item.value;
        set.add(typeName);
      });
      return set;
    },
    uniqueValuesSize() {
      return this.uniqueValues.size;
    },
    uniqueValuesListed() {
      let uniq = "";
      let i = 1;
      let sortedArray = Array.from(this.uniqueValues).sort();
      for (let item of sortedArray) {
        uniq += i == sortedArray.length ? `and ${item}.` : `${item}, `;
        i++;
      }
      return uniq;
    },
    primitiveValues: function () {
      let primitives = [];
      this.sampleData.forEach(function (item) {
        if (
          item.value !== Object(item.value) &&
          primitives.includes(typeof item.value) === false
        ) {
          let value = typeof item.value;
          if (item.value === null) {
            value += ` (null only)`;
          }
          primitives.push(value);
        }
      });
      return primitives.sort();
    },
    nonPrimitiveValues: function () {
      let nonprimitives = [];
      this.sampleData.forEach(function (item) {
        if (
          item.value === Object(item.value) &&
          nonprimitives.includes(typeof item.value) === false
        ) {
          let value = typeof item.value;
          nonprimitives.push(value);
        }
      });
      return nonprimitives.sort();
    }
  }
});

const normalize = require('normalize.css')
