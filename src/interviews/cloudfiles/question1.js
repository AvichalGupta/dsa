/*
Problem Statement:
You are given a list of API tasks. Each task contains:
A unique identifier


The API endpoint (with method and path)


A set of inputs, which may be constants or outputs from other APIs


A set of outputs
Your goal is to write pseudocode to determine the most optimized execution order for these API calls.
Requirements:
Resolve Dependencies: APIs may depend on the output of other APIs. Ensure dependencies are respected.


Handle Constants: Constants can be used as inputs without waiting for other APIs.


Output Final Execution Order: Return the APIs in the order they should be executed.
Example Input:
[
  {
     identifier: 'oauth',
     API: 'POST /oauth',
     inputs: { refreshToken: 'constant' },
     outputs: { accessToken: true }
  },
  {
     identifier: 'get-user',
     API: 'GET /user',
     inputs: { accessToken: 'oauth.accessToken' },
     outputs: { name: true, email: true }
  },
  {
     identifier: 'get-notifications',
     API: 'GET /notifications',
     inputs: { accessToken: 'oauth.accessToken' },
     outputs: { notifications: true }
  }
]
*/

// The question revolves around identifying API calls that are not dependent on other calls and grouping them together, then ordering the other API's to be called based on the input parameters.
// Basically, check inputs if it is of type constant move it to top of list. If input depends on previous calls output, then group it based on API outputs and re-order the array.

function getAPIExecutionOrder(inputData) {
    const constantInputAPIsMap = new Map();
    const outputFieldsArr = [];
    const dependantInputAPIs = [];
    let index = 0;
    let pushAPIToConstants = false;
    while (index < inputData.length) {
       
        const inputDataObj = inputData[index];
        const inputValues = Object.values(inputDataObj.inputs);
        
        if (!inputValues.length) {
            outputFieldsArr.push(...(inputDataObj.outputs || []));
            inputData.splice(index,1);
            continue;
        }

        for (const inputValue of inputValues) {
            if (inputValue !== 'constant') {
                pushAPIToConstants = false;
                break;
            }
            pushAPIToConstants = true;
        }

        if (pushAPIToConstants === true) {
            outputFieldsArr.push(...(inputDataObj.outputs || []));
            inputData.splice(index, 1);
            continue;
        }

        index++;
    }

    index = 0;

    while(index < inputData.length) {
        const inputDataObj = inputData[index];

        const inputValues = Object.values(inputDataObj.inputs);

        for (const inputValue of inputValues) {
            const outputKeysFromMap = constantInputAPIsMap.get(inputDataObj.identifier);
    
            if (outputKeysFromMap?.length) {
                
            }
        }
        
        index++;
    }
}
