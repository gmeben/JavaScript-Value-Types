const root = document.getElementById("root");

const sampleData = [
  {
    valueName: "array",
    value: [],
    valueString: "[]",
    expectedType: "object"
  },
  {
    valueName: "BigInt",
    value: BigInt(12345678901234567),
    valueString: "BigInt(12345678901234567)",
    expectedType: "bigint"
  },
  {
    valueName: "boolean",
    value: true,
    valueString: "true",
    expectedType: "boolean"
  },
  {
    valueName: "Date",
    value: new Date(),
    valueString: "new Date()",
    expectedType: "object"
  },
  {
    valueName: "function",
    value: (x) => x * 2,
    valueString: "(x) => x * 2",
    expectedType: "function"
  },
  {
    valueName: "Infinity",
    value: Infinity,
    valueString: "Infinity",
    expectedType: "number"
  },
  {
    valueName: "Map",
    value: new Map(),
    valueString: "new Map()",
    expectedType: "object"
  },
  { valueName: "NaN", value: NaN, valueString: "NaN", expectedType: "number" },
  { valueName: "null", value: null, valueString: "null", expectedType: "null" },
  { valueName: "number", value: 9, valueString: "9", expectedType: "number" },
  { valueName: "object", value: {}, valueString: "{}", expectedType: "object" },
  {
    valueName: "Rectangle",
    value: class Rectangle {
      constructor(height, width) {
        this.height = height;
        this.width = width;
      }
    },
    valueString: `class Rectangle {
      constructor(height, width) {
        this.height = height;
        this.width = width;
      }
    }`,
    expectedType: "function"
  },
  {
    valueName: "string",
    value: "cantaloupe",
    valueString: '"cantaloupe"',
    expectedType: "string"
  },
  {
    valueName: "Set",
    value: new Set(),
    valueString: "new Set()",
    expectedType: "object"
  },
  {
    valueName: "Symbol",
    value: Symbol("des"),
    valueString: 'Symbol("des")',
    expectedType: "symbol"
  },
  {
    valueName: "undefined",
    value: undefined,
    valueString: "undefined",
    expectedType: "undefined"
  },
  {
    valueName: "WeakMap",
    value: new WeakMap(),
    valueString: "new WeakMap()",
    expectedType: "object"
  },
  {
    valueName: "WeakSet",
    value: new WeakSet(),
    valueString: "new WeakSet()",
    expectedType: "object"
  }
];

const state = {
  title: `JavaScript Value Types`,
  uniqueValues: () => {
    let set = new Set();
    sampleData.forEach(function (item) {
      set.add(typeof item.value);
    });
    return set;
  }
};

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

class Title extends React.Component {
  render() {
    const title = state.title;
    return <h1>{title}</h1>;
  }
}

class ValueTypesTable extends React.Component {
  render() {
    let processedSampleData = sampleData.slice();
    const rows = processedSampleData.map((item) => (
      <tr
        key={item.valueName}
        className={item.expectedType !== typeof item.value ? "mismatched" : ""}
      >
        <td style={{ textAlign: "right" }}>{item.valueName}</td>
        <td>
          <samp>{item.valueString}</samp>
        </td>
        <td>{item.expectedType}</td>
        <td>{typeof item.value}</td>
      </tr>
    ));
    return (
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "right" }}>Value</th>
            <th>Sample</th>
            <th style={{ textAlign: "left" }}>Expected Type</th>
            <th style={{ textAlign: "left" }}>Actual Type</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class ValueTypeCountsTable extends React.Component {
  render() {
    const valuesData = function () {
      let values = [];
      state.uniqueValues().forEach(function (item) {
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
    };
    const rows = valuesData().map((item) => (
      <tr key={item.valueName}>
        <td style={{ textAlign: "right" }}>{item.valueName}</td>
        <td>{item.valueCount}</td>
      </tr>
    ));
    return (
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "right" }}>Value</th>
            <th>Number of Possible Values</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

function renderApp() {
  const uniqueValues = function () {
    let set = new Set();
    sampleData.forEach(function (item) {
      set.add(typeof item.value);
    });
    return set;
  };
  const uniqueValuesSize = uniqueValues().size;
  const uniqueValuesListed = function () {
    let uniq = "";
    let i = 1;
    let sortedArray = Array.from(uniqueValues()).sort();
    for (let item of sortedArray) {
      uniq += i == sortedArray.length ? `and ${item}.` : `${item}, `;
      i++;
    }
    return uniq;
  };
  const primitiveValues = function () {
    let primitives = [];
    sampleData.forEach(function (item) {
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
  };
  const primitivesList = primitiveValues().map((value) => (
    <li key={value}>{value}</li>
  ));
  const nonPrimitiveValues = function () {
    let nonprimitives = [];
    sampleData.forEach(function (item) {
      if (
        item.value === Object(item.value) &&
        nonprimitives.includes(typeof item.value) === false
      ) {
        let value = typeof item.value;
        nonprimitives.push(value);
      }
    });
    return nonprimitives.sort();
  };
  const nonPrimitivesList = nonPrimitiveValues().map((value) => (
    <li key={value}>{value}</li>
  ));
  const App = (
    <div>
      <Title />
      <ValueTypesTable />
      <p>
        There are {uniqueValuesSize} unique value types: {uniqueValuesListed()}
      </p>
      <h2>Primitive Values</h2>
      <p>
        These are values that are innately immutable. Null is considered a
        primitive value despite (accidentally) being of the 'object' value type.
      </p>
      <ul>{primitivesList}</ul>
      <h2>Non-Primitive Values</h2>
      <ul>{nonPrimitivesList}</ul>
      <h2>Possible Value Counts</h2>
      <ValueTypeCountsTable />
    </div>
  );
  ReactDOM.render(App, root);
}
renderApp();
