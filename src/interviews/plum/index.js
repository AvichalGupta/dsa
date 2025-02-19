class SpreadSheet {
    spreadSheet;
    constructor(spreadSheetInput) {
        if (spreadSheetInput.length > 26) throw new Error('Max Rows Exceeded');
        if (spreadSheetInput[0].length > 9) throw new Error('Max Columns Exceeded');
        this.spreadSheet = spreadSheetInput;
    }

    // Return an array which will contain both operators and cellLocations
    getExpressionValues(str) {
        // Handle multiple spaces case.
        if (!str.includes(' ')) return [];
        return str.split(' ');
    }

    isExpression(str) {
        const minASCIICharCode = 'A'.charCodeAt(0);
        const splitCell = str.split('');
        const row = +(splitCell[0].charCodeAt(0) - minASCIICharCode);
        return (row>=0 && row <=26) && (+splitCell[1] >=1 && +splitCell[1] <= 9);
    }

    getOperatorPosition(expressionsArr) {
        const operatorIndexMap = new Map();
        if (expressionsArr.indexOf('/') > -1) {
            if (operatorIndexMap.has('/')) {
                operatorIndexMap.set('/',operatorIndexMap.get('/').push(expressionsArr.indexOf('/')));
            } else {
                operatorIndexMap.set('/',[expressionsArr.indexOf('/')]);
            }
        }
        if (expressionsArr.indexOf('*') > -1) {
            if (operatorIndexMap.has('*')) {
                operatorIndexMap.set('*',operatorIndexMap.get('*').push(expressionsArr.indexOf('*')));
            } else {
                operatorIndexMap.set('*',[expressionsArr.indexOf('*')]);
            }        
        }
        if (expressionsArr.indexOf('+') > -1) {
            if (operatorIndexMap.has('+')) {
                operatorIndexMap.set('+',operatorIndexMap.get('+').push(expressionsArr.indexOf('+')));
            } else {
                operatorIndexMap.set('+',[expressionsArr.indexOf('+')]);
            }        
        }
        if (expressionsArr.indexOf('-') > -1) {
            if (operatorIndexMap.has('-')) {
                operatorIndexMap.set('-',operatorIndexMap.get('-').push(expressionsArr.indexOf('-')));
            } else {
                operatorIndexMap.set('-',[expressionsArr.indexOf('-')]);
            }        
        }
        return operatorIndexMap;
    }

    getValue(cellLocation) {
        const minASCIICharCode = 'A'.charCodeAt(0);
        const splitCell = cellLocation.split('');
        const row = +(splitCell[0].charCodeAt(0) - minASCIICharCode);
        const col = +splitCell[1] - 1;

        const valueInCell = this.spreadSheet[row][col];

        const expressionValues = this.getExpressionValues(valueInCell);

        if(expressionValues.length) {
            const operatorPositionsIndexMap = this.getOperatorPosition(expressionValues);
            let operatedValue = null;
            if (operatorPositionsIndexMap.has('/')) {
                const index = operatorPositionsIndexMap.get('/');
                if (this.isExpression(expressionValues[index - 1]) && this.isExpression(expressionValues[index + 1])) {
                    operatedValue = this.getValue(expressionValues[index - 1]) / this.getValue(expressionValues[index + 1]);
                } else {
                    operatedValue = expressionValues[index - 1] / expressionValues[index + 1];
                }
            } else if (operatorPositionsIndexMap.has('*')) {
                const index = operatorPositionsIndexMap.get('*');
                if (this.isExpression(expressionValues[index - 1]) && this.isExpression(expressionValues[index + 1])) {
                    if (operatedValue) {
                        operatedValue = this.getValue(expressionValues[index - 1]) * operatedValue;
                    } else {
                        operatedValue = this.getValue(expressionValues[index - 1]) * this.getValue(expressionValues[index + 1]);
                    }
                } else {
                    if (operatedValue) {
                        operatedValue = expressionValues[index - 1] * operatedValue;
                    } else {
                        operatedValue = expressionValues[index - 1] * expressionValues[index + 1];
                    }
                }
            } else if (operatorPositionsIndexMap.has('+')) {
                const index = operatorPositionsIndexMap.get('+');
                if (this.isExpression(expressionValues[index - 1]) && this.isExpression(expressionValues[index + 1])) {
                    if (operatedValue) {
                        operatedValue = this.getValue(expressionValues[index - 1]) + operatedValue;
                    } else {
                        operatedValue = this.getValue(expressionValues[index - 1]) + this.getValue(expressionValues[index + 1]);
                    }
                } else {
                    if (operatedValue) {
                        operatedValue = expressionValues[index - 1] + operatedValue;
                    } else {
                        operatedValue = expressionValues[index - 1] + expressionValues[index + 1];
                    }                    
                }
            } else if (operatorPositionsIndexMap.has('-')) {
                const index = operatorPositionsIndexMap.get('-');
                if (this.isExpression(expressionValues[index - 1]) && this.isExpression(expressionValues[index + 1])) {
                    if (operatedValue) {
                        operatedValue = this.getValue(expressionValues[index - 1]) - operatedValue;
                    } else {
                        operatedValue = this.getValue(expressionValues[index - 1]) - this.getValue(expressionValues[index + 1]);
                    }                    
                } else {
                    if (operatedValue) {
                        operatedValue = expressionValues[index - 1] - operatedValue;
                    } else {
                        operatedValue = expressionValues[index - 1] - expressionValues[index + 1];
                    }                    
                }
            }
            return operatedValue;
        } else {
            if (this.isExpression(valueInCell)) {
                return +this.getValue(valueInCell);
            } else {
                return +valueInCell;
            }
        }
    }
}

// '/','*','+','-'
const spreadSheet = new SpreadSheet([['9','A1 + C2 / D3','5','B4'],['4','-10','A3 + D3','6'],['-23','2','9','A1 * B2'],['A4','0','-10','B3']]);

const valueFromSpreadSheet = spreadSheet.getValue('A2');

console.log('valueFromSpreadSheet: ', valueFromSpreadSheet);
