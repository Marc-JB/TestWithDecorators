[![Node.js linter & tests](https://github.com/Marc-JB/TestWithDecorators/workflows/Node.js%20linter%20&%20tests/badge.svg)](https://github.com/Marc-JB/TestWithDecorators/actions)
[![Node.js deployment](https://github.com/Marc-JB/TestWithDecorators/workflows/Node.js%20deployment/badge.svg)](https://github.com/Marc-JB/TestWithDecorators/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Marc-JB_TestWithDecorators&metric=alert_status)](https://sonarcloud.io/dashboard?id=Marc-JB_TestWithDecorators)
[![license](https://badgen.net/github/license/Marc-JB/TestWithDecorators?color=cyan)](https://github.com/Marc-JB/TestWithDecorators/blob/main/LICENSE)
[![npm](https://badgen.net/badge/icon/npm?icon=npm&color=cyan&label)](https://www.npmjs.com/package/@peregrine/test-with-decorators)
![node version](https://badgen.net/npm/node/@peregrine/test-with-decorators)
![types](https://badgen.net/npm/types/@peregrine/test-with-decorators?icon=typescript)
# Test with decorators
Experimental library for testing with decorators using mocha and chai

## Demo
```TypeScript
import { suite, test, expect } from "@peregrine/test-with-decorators"
import { camelCaseToText, snakeCaseToText } from "../main/textUtils"

@suite
export class TextUtilsTests {
    @test
    public camelCaseToTextShouldConvertTextCorrectly(): void {
        // Arrange
        const camelCaseText = "thisTextIsWrittenInCamelCase"
        const expectedResult = "This text is written in camel case"

        // Act
        const actualResult = camelCaseToText(camelCaseText)

        // Assert
        expect(actualResult).to.equal(expectedResult)
    }

    @test
    public snakeCaseToTextShouldConvertTextCorrectly(): void {
        // Arrange
        const snakeCaseText = "this_text_is_written_in_snake_case"
        const expectedResult = "This text is written in snake case"

        // Act
        const actualResult = snakeCaseToText(snakeCaseText)

        // Assert
        expect(actualResult).to.equal(expectedResult)
    }
}
```
